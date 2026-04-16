import { format } from "date-fns";
import * as fs from "fs";
import path from "path";

import { processImages } from "./processImages.js";

const GENERATED_FILES_DIR = `./generated/${format(new Date(), "yyyy-LL-dd")}`;

const generateImages = () => {
    const images = {};

    const filenames = [
        "agents",
        "collectibles",
        "crates",
        "graffiti",
        "highlights",
        "keychains",
        "keys",
        "music_kits",
        "patches",
        "skins_not_grouped",
        "skins",
        "stickers_slab",
        "stickers",
        "tools",
    ];

    for (const filename of filenames) {
        const file = fs.readFileSync(`./public/api/en/${filename}.json`, "utf-8");

        const parsedFile = JSON.parse(file);

        Object.values(parsedFile)
            .filter(({ market_hash_name }) => market_hash_name !== null)
            .forEach(({ name, market_hash_name, image }) => {
                const marketHashName = market_hash_name || name;
                if (marketHashName) images[marketHashName] = image;
            });

        // These items are no longer available on the Steam market.
        Object.values(parsedFile)
            .filter(({ market_hash_name }) => market_hash_name === null)
            .forEach(({ name, image }) => {
                if (name) images[name] = image;
            });
    }

    return images;
};

let generatedImages = generateImages();

// GitHub blocks the GET requests when images are requested too often,
// preventing them from displaying correctly in filters.
// To fix this, we need to download all images from GitHub images and make them
// available to the client the using Next.js public folder.

let imagesToProcess = [];

for (const [market_hash_name, image] of Object.entries(generatedImages)) {
    if (image.startsWith("https://raw.githubusercontent.com/ByMykel/")) {
        imagesToProcess.push(image);
        const fileName = path.basename(new URL(image).pathname).replace("_png.png", ".png");
        generatedImages[market_hash_name] = `https://dashskins.com.br/images/items/${fileName}`;
    }
}

const processedImages = await processImages(
    imagesToProcess,
    `/generated/${format(new Date(), "yyyy-LL-dd")}/images/items`
);

// Remove failed images (very old items that are no longer available on the Steam
// market).
const parsedFailedImages = processedImages.failed.reduce((accumulator, image) => {
    const fileName = path.basename(new URL(image).pathname).replace("_png.png", ".png");
    return Object.assign(accumulator, { [`https://dashskins.com.br/images/items/${fileName}`]: false });
}, {});

for (const [market_hash_name, image] of Object.entries(generatedImages)) {
    if (image.startsWith("https://dashskins.com.br/images/items/")) {
        const failedToProcess = parsedFailedImages?.[image] === false;
        if (failedToProcess) delete generatedImages[market_hash_name];
    }
}

if (!fs.existsSync(GENERATED_FILES_DIR)) {
    fs.mkdirSync(GENERATED_FILES_DIR, { recursive: true });
}

fs.writeFileSync(`${GENERATED_FILES_DIR}/images.json`, JSON.stringify(generatedImages));

console.log("✅ Successfully generated images.json file");
