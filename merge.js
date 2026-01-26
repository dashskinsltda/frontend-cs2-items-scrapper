import { format } from "date-fns";
import { fileURLToPath } from "url";
import * as fs from "fs";
import path from "path";
import axios from "axios";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GENERATED_FILES_DIR = `./generated/${format(new Date(), "yyyy-LL-dd")}`;

const merge = categories => {
    let merged = {};

    for (const category of categories) {
        const filename =
            {
                charms: "keychains",
                equipments: "skins",
                shotguns: "skins",
                knives: "skins",
                gloves: "skins",
                pistols: "skins",
                rifles: "skins",
                machineguns: "skins",
                graffitis: "graffiti",
                passes: "collectibles",
                containers: "crates",
                smgs: "skins",
                musicKits: "music_kits",
            }?.[category] || category;

        const en = fs.readFileSync(`./public/api/en/${filename}.json`, "utf-8");
        const ptBR = fs.readFileSync(`./public/api/pt-BR/${filename}.json`, "utf-8");

        const parsedEN = JSON.parse(en);
        const parsedPTBR = JSON.parse(ptBR);

        const keyMapping = {}?.[category] || category;

        merged[keyMapping] = Object.values(parsedEN)
            .filter(({ market_hash_name }) => market_hash_name !== null)
            .filter(item => {
                switch (category) {
                    case "equipments":
                        return item?.weapon?.name === "Zeus x27";

                    case "shotguns":
                        return ["Nova", "XM1014", "MAG-7", "Sawed-Off"].includes(item?.weapon?.name);

                    case "knives":
                        return [
                            "Shadow Daggers",
                            "Bayonet",
                            "M9 Bayonet",
                            "Flip Knife",
                            "Butterfly Knife",
                            "Falchion Knife",
                            "Bowie Knife",
                            "Classic Knife",
                            "Paracord Knife",
                            "Survival Knife",
                            "Huntsman Knife",
                            "Skeleton Knife",
                            "Gut Knife",
                            "Kukri Knife",
                            "Navaja Knife",
                            "Nomad Knife",
                            "Stiletto Knife",
                            "Talon Knife",
                            "Ursus Knife",
                            "Karambit",
                        ].includes(item?.weapon?.name);

                    case "gloves":
                        return [
                            "Sport Gloves",
                            "Driver Gloves",
                            "Specialist Gloves",
                            "Moto Gloves",
                            "Hand Wraps",
                            "Hydra Gloves",
                            "Broken Fang Gloves",
                            "Bloodhound Gloves",
                        ].includes(item?.weapon?.name);

                    case "collectibles":
                        return item?.type === "Pin";

                    case "passes":
                        return item?.type === "Operation Pass";

                    case "pistols":
                        return [
                            "USP-S",
                            "Desert Eagle",
                            "Glock-18",
                            "Five-SeveN",
                            "P250",
                            "Tec-9",
                            "Dual Berettas",
                            "P2000",
                            "CZ75-Auto",
                            "R8 Revolver",
                        ].includes(item?.weapon?.name);

                    case "rifles":
                        return [
                            "AK-47",
                            "AWP",
                            "M4A1-S",
                            "M4A4",
                            "Galil AR",
                            "SSG 08",
                            "FAMAS",
                            "AUG",
                            "SG 553",
                            "SCAR-20",
                            "G3SG1",
                        ].includes(item?.weapon?.name);

                    case "smgs":
                        return ["MP9", "MAC-10", "P90", "MP7", "UMP-45", "MP5-SD", "PP-Bizon"].includes(
                            item?.weapon?.name
                        );

                    case "machineguns":
                        return ["M249", "Negev"].includes(item?.weapon?.name);

                    default:
                        return true;
                }
            })
            .map(({ id, market_hash_name, image, name, ...item }) => {
                const categoryId = {
                    agents: "Agente",
                    stickers: "Adesivo",
                    keys: "Chave",
                    charms: "Chaveiro",
                    collectibles: "Colecionável",
                    patches: "Emblema",
                    equipments: "Equipamento",
                    shotguns: "Escopeta",
                    knives: "Faca",
                    gloves: "Luvas",
                    pistols: "Pistola",
                    rifles: "Rifle",
                    machineguns: "Metralhadora",
                    graffitis: "Grafite",
                    passes: "Passe",
                    containers: "Recipiente",
                    smgs: "Submetralhadora",
                    musicKits: "Trilha Sonora",
                }?.[category];

                const subCategoryId =
                    {
                        "Shadow Daggers": "Adagas Sombrias",
                        Bayonet: "Baioneta",
                        "M9 Bayonet": "Baioneta M9",
                        "Flip Knife": "Canivete",
                        "Butterfly Knife": "Canivete Borboleta",
                        "Falchion Knife": "Canivete Falchion",
                        "Bowie Knife": "Faca Bowie",
                        "Classic Knife": "Faca Clássica",
                        "Paracord Knife": "Faca de Cordame",
                        "Survival Knife": "Faca de Sobrevivência",
                        "Huntsman Knife": "Faca do Caçador",
                        "Skeleton Knife": "Faca Esqueleto",
                        "Gut Knife": "Faca Gut Hook",
                        "Kukri Knife": "Faca Kukri",
                        "Navaja Knife": "Faca Navaja",
                        "Nomad Knife": "Faca Nômade",
                        "Stiletto Knife": "Faca Stiletto",
                        "Talon Knife": "Faca Talon",
                        "Ursus Knife": "Faca Ursus",
                        "R8 Revolver": "Revólver R8",
                        "Dual Berettas": "Berettas Duplas",
                    }?.[item?.weapon?.name] || item?.weapon?.name;

                let nameEN = name;
                let namePTBR = parsedPTBR.find(item => item.id === id)?.name;

                switch (category) {
                    case "stickers":
                        nameEN = nameEN.replace("Sticker | ", "");
                        namePTBR = namePTBR.replace("Adesivo | ", "");
                        break;

                    case "charms":
                        nameEN = nameEN.replace("Charm | ", "");
                        namePTBR = namePTBR.replace("Chaveiro | ", "");
                        break;

                    case "collectibles":
                        if (nameEN.endsWith(" Pin")) nameEN = nameEN.slice(0, -4);
                        namePTBR = namePTBR.replace("Broche | ", "");
                        break;

                    case "patches":
                        nameEN = nameEN.replace("Patch | ", "");
                        namePTBR = namePTBR.replace("Emblema | ", "");
                        break;

                    case "equipments":
                        nameEN = nameEN.replace("Zeus x27 | ", "");
                        namePTBR = namePTBR.replace("Zeus x27 | ", "");
                        break;

                    case "shotguns":
                        nameEN = nameEN
                            .replace("Nova | ", "")
                            .replace("XM1014 | ", "")
                            .replace("MAG-7 | ", "")
                            .replace("Sawed-Off | ", "");

                        namePTBR = namePTBR
                            .replace("Nova | ", "")
                            .replace("XM1014 | ", "")
                            .replace("MAG-7 | ", "")
                            .replace("Cano Curto | ", "");

                        break;

                    case "knives":
                        nameEN = nameEN
                            .replace("★", "")
                            .split(" ")
                            .map(substring => substring.trim())
                            .filter(substring => substring)
                            .join(" ")
                            .replace("Shadow Daggers | ", "")
                            .replace("Bayonet | ", "")
                            .replace("M9 Bayonet | ", "")
                            .replace("Flip Knife | ", "")
                            .replace("Butterfly Knife | ", "")
                            .replace("Falchion Knife | ", "")
                            .replace("Bowie Knife | ", "")
                            .replace("Classic Knife | ", "")
                            .replace("Paracord Knife | ", "")
                            .replace("Survival Knife | ", "")
                            .replace("Huntsman Knife | ", "")
                            .replace("Skeleton Knife | ", "")
                            .replace("Gut Knife | ", "")
                            .replace("Kukri Knife | ", "")
                            .replace("Navaja Knife | ", "")
                            .replace("Nomad Knife | ", "")
                            .replace("Stiletto Knife | ", "")
                            .replace("Talon Knife | ", "")
                            .replace("Ursus Knife | ", "")
                            .replace("Karambit | ", "");

                        namePTBR = namePTBR
                            .replace("★", "")
                            .split(" ")
                            .map(substring => substring.trim())
                            .filter(substring => substring)
                            .join(" ")
                            .replace("Adagas Sombrias | ", "")
                            .replace("Baioneta | ", "")
                            .replace("Baioneta M9 | ", "")
                            .replace("Canivete | ", "")
                            .replace("Canivete Borboleta | ", "")
                            .replace("Canivete Falchion | ", "")
                            .replace("Faca Bowie | ", "")
                            .replace("Faca Clássica | ", "")
                            .replace("Faca de Cordame | ", "")
                            .replace("Faca de Sobrevivência | ", "")
                            .replace("Faca do Caçador | ", "")
                            .replace("Faca Esqueleto | ", "")
                            .replace("Faca Gut Hook | ", "")
                            .replace("Faca Kukri | ", "")
                            .replace("Faca Navaja | ", "")
                            .replace("Faca Nômade | ", "")
                            .replace("Faca Stiletto | ", "")
                            .replace("Faca Talon | ", "")
                            .replace("Faca Ursus | ", "")
                            .replace("Karambit | ", "");

                        if (
                            [
                                "Shadow Daggers",
                                "Bayonet",
                                "M9 Bayonet",
                                "Flip Knife",
                                "Butterfly Knife",
                                "Falchion Knife",
                                "Bowie Knife",
                                "Classic Knife",
                                "Paracord Knife",
                                "Survival Knife",
                                "Huntsman Knife",
                                "Skeleton Knife",
                                "Gut Knife",
                                "Kukri Knife",
                                "Navaja Knife",
                                "Nomad Knife",
                                "Stiletto Knife",
                                "Talon Knife",
                                "Ursus Knife",
                                "Karambit",
                            ].includes(nameEN)
                        ) {
                            nameEN = "Vanilla";
                        }

                        if (
                            [
                                "Adagas Sombrias",
                                "Baioneta",
                                "Baioneta M9",
                                "Canivete",
                                "Canivete Borboleta",
                                "Canivete Falchion",
                                "Faca Bowie",
                                "Faca Clássica",
                                "Faca de Cordame",
                                "Faca de Sobrevivência",
                                "Faca do Caçador",
                                "Faca Esqueleto",
                                "Faca Gut Hook",
                                "Faca Kukri",
                                "Faca Navaja",
                                "Faca Nômade",
                                "Faca Stiletto",
                                "Faca Talon",
                                "Faca Ursus",
                                "Karambit",
                            ].includes(namePTBR)
                        ) {
                            namePTBR = "Vanilla";
                        }

                        break;

                    case "graffitis":
                        nameEN = nameEN.replace("Sealed Graffiti | ", "");
                        namePTBR = namePTBR.replace("Grafite Lacrado | ", "");
                        break;

                    case "gloves":
                        nameEN = nameEN
                            .replace("★", "")
                            .split(" ")
                            .map(substring => substring.trim())
                            .filter(substring => substring)
                            .join(" ")
                            .replace("Sport Gloves | ", "")
                            .replace("Driver Gloves | ", "")
                            .replace("Specialist Gloves | ", "")
                            .replace("Moto Gloves | ", "")
                            .replace("Hand Wraps | ", "")
                            .replace("Hydra Gloves | ", "")
                            .replace("Broken Fang Gloves | ", "")
                            .replace("Bloodhound Gloves | ", "");

                        namePTBR = namePTBR
                            .replace("★", "")
                            .split(" ")
                            .map(substring => substring.trim())
                            .filter(substring => substring)
                            .join(" ")
                            .replace("Luvas Esportivas | ", "")
                            .replace("Luvas de Motorista | ", "")
                            .replace("Luvas de Especialista | ", "")
                            .replace("Luvas de Motociclismo | ", "")
                            .replace("Faixas | ", "")
                            .replace("Luvas da Hidra | ", "")
                            .replace("Luvas da Presa Quebrada | ", "")
                            .replace("Luvas do Cão de Caça | ", "");

                        break;

                    case "pistols":
                        nameEN = nameEN
                            .replace("USP-S | ", "")
                            .replace("Desert Eagle | ", "")
                            .replace("Glock-18 | ", "")
                            .replace("Five-SeveN | ", "")
                            .replace("P250 | ", "")
                            .replace("Tec-9 | ", "")
                            .replace("Dual Berettas | ", "")
                            .replace("P2000 | ", "")
                            .replace("CZ75-Auto | ", "")
                            .replace("R8 Revolver | ", "");

                        namePTBR = namePTBR
                            .replace("USP-S | ", "")
                            .replace("Desert Eagle | ", "")
                            .replace("Glock-18 | ", "")
                            .replace("Five-SeveN | ", "")
                            .replace("P250 | ", "")
                            .replace("Tec-9 | ", "")
                            .replace("Berettas Duplas | ", "")
                            .replace("P2000 | ", "")
                            .replace("CZ75-Auto | ", "")
                            .replace("Revólver R8 | ", "");

                        break;

                    case "rifles":
                        nameEN = nameEN
                            .replace("AK-47 | ", "")
                            .replace("AWP | ", "")
                            .replace("M4A1-S | ", "")
                            .replace("M4A4 | ", "")
                            .replace("Galil AR | ", "")
                            .replace("SSG 08 | ", "")
                            .replace("FAMAS | ", "")
                            .replace("AUG | ", "")
                            .replace("SG 553 | ", "")
                            .replace("SCAR-20 | ", "")
                            .replace("G3SG1 | ", "");

                        namePTBR = namePTBR
                            .replace("AK-47 | ", "")
                            .replace("AWP | ", "")
                            .replace("M4A1-S | ", "")
                            .replace("M4A4 | ", "")
                            .replace("Galil AR | ", "")
                            .replace("SSG 08 | ", "")
                            .replace("FAMAS | ", "")
                            .replace("AUG | ", "")
                            .replace("SG 553 | ", "")
                            .replace("SCAR-20 | ", "")
                            .replace("G3SG1 | ", "");

                        break;

                    case "smgs":
                        nameEN = nameEN
                            .replace("MP9 | ", "")
                            .replace("MAC-10 | ", "")
                            .replace("P90 | ", "")
                            .replace("MP7 | ", "")
                            .replace("UMP-45 | ", "")
                            .replace("MP5-SD | ", "")
                            .replace("PP-Bizon | ", "");

                        namePTBR = namePTBR
                            .replace("MP9 | ", "")
                            .replace("MAC-10 | ", "")
                            .replace("P90 | ", "")
                            .replace("MP7 | ", "")
                            .replace("UMP-45 | ", "")
                            .replace("MP5-SD | ", "")
                            .replace("PP-Bizon | ", "");

                        break;

                    case "machineguns":
                        nameEN = nameEN.replace("M249 | ", "").replace("Negev | ", "");
                        namePTBR = namePTBR.replace("M249 | ", "").replace("Negev | ", "");
                        break;

                    case "musicKits":
                        nameEN = nameEN.replace("Music Kit | ", "");
                        namePTBR = namePTBR.replace("Trilha Sonora | ", "");
                        break;
                }

                let parsedMarketHashName = market_hash_name;

                switch (category) {
                    case "equipments":
                    case "shotguns":
                    case "pistols":
                    case "rifles":
                    case "smgs":
                    case "machineguns":
                        parsedMarketHashName = name;
                        break;

                    case "knives":
                    case "gloves":
                        parsedMarketHashName = name.replace("★ ", "");
                        break;
                }

                if (!subCategoryId) {
                    return {
                        id,
                        categoryId,
                        market_hash_name: parsedMarketHashName,
                        image,
                        name: {
                            en: nameEN,
                            pt: namePTBR,
                        },
                    };
                }

                return {
                    id,
                    categoryId,
                    subCategoryId,
                    market_hash_name: parsedMarketHashName,
                    image,
                    name: {
                        en: nameEN,
                        pt: namePTBR,
                    },
                };
            });
    }

    return merged;
};

const generateTimestampHash = () => {
    const timestamp = Date.now().toString();
    return crypto.createHash("sha256").update(timestamp).digest("hex");
};

const mergeCollections = () => {
    const en = fs.readFileSync("./public/api/en/collections.json", "utf-8");
    const ptBR = fs.readFileSync("./public/api/pt-BR/collections.json", "utf-8");

    const parsedEN = JSON.parse(en);
    const parsedPTBR = JSON.parse(ptBR);

    const collections = Object.values(parsedEN).map(({ id, name, image }) => {
        const nameEN = name;
        const namePTBR = parsedPTBR.find(item => item.id === id)?.name;

        return {
            id,
            name: {
                en: nameEN,
                pt: namePTBR,
            },
            image,
        };
    });

    return collections;
};

// ---------------- DOWNLOAD IMAGE FUNCTION ----------------
const downloadImage = async (url, outputPath) => {
    const response = await axios({
        url,
        method: "GET",
        responseType: "stream",
    });

    return new Promise((resolve, reject) => {
        const writer = fs.createWriteStream(outputPath);
        response.data.pipe(writer);
        writer.on("finish", resolve);
        writer.on("error", reject);
    });
};

// ---------------- PROCESS IMAGES ----------------
const processImages = async (images, outputPath = "/images/items") => {
    for (const [index, url] of Object.entries(images)) {
        // extract filename from URL
        const fileName = path.basename(new URL(url).pathname).replace("_png.png", ".png");
        const filePath = path.join(__dirname + outputPath, fileName);

        try {
            if (!fs.existsSync(__dirname + outputPath)) {
                fs.mkdirSync(__dirname + outputPath, { recursive: true });
            }

            console.log(`⬇️ Downloading ${+index + 1} of ${images.length}:`, fileName);
            if (!fs.existsSync(filePath)) await downloadImage(url, filePath);
        } catch (err) {
            console.error("❌ Error:", err.message, `for image ${fileName}`);
        }
    }
};

if (!fs.existsSync(GENERATED_FILES_DIR)) {
    fs.mkdirSync(GENERATED_FILES_DIR, { recursive: true });
}

// ---------------- GENERATE ALL.JSON ----------------
const allItems = merge([
    "agents",
    "stickers",
    "keys",
    "charms",
    "collectibles",
    "patches",
    "equipments",
    "shotguns",
    "knives",
    "graffitis",
    "gloves",
    "machineguns",
    "passes",
    "pistols",
    "containers",
    "rifles",
    "smgs",
    "musicKits",
]);

// GitHub blocks the GET requests when images are requested too often
// because of this images are not shown correctly on filters images
// to fix this we need to download all the GitHub images and serve them
// to the client the using Next.js public folder
let imagesToProcess = [];

for (const [key, items] of Object.entries(allItems)) {
    items.forEach((item, index) => {
        if (item.image.startsWith("https://raw.githubusercontent.com/ByMykel/")) {
            imagesToProcess.push(item.image);
            const fileName = path.basename(new URL(item.image).pathname).replace("_png.png", ".png");
            allItems[key][index].image = `/images/items/${fileName}`;
        }
    });
}

await processImages(imagesToProcess);

imagesToProcess = [];

fs.writeFileSync(`${GENERATED_FILES_DIR}/all.json`, JSON.stringify(allItems));

fs.writeFileSync(`${GENERATED_FILES_DIR}/hash.json`, JSON.stringify({ hash: generateTimestampHash() }));

// ---------------- GENERATE ESET.TS ----------------
let ESet = `const ESet = {\n`;

mergeCollections().map(({ id, name }) => {
    ESet += `  ${id.toUpperCase().replaceAll("-", "_")}: "${name.pt}",\n`;
});

ESet += `} as const;
\ntype TSet = (typeof ESet)[keyof typeof ESet];\n`;

fs.writeFileSync(`${GENERATED_FILES_DIR}/ESet.ts`, ESet);

// ---------------- GENERATE COLLECTIONS.TS ----------------
let collections = `import { Collection } from '@/types/Filters';
import { ESet } from '@/types/Item';\n
const COLLECTIONS: Collection[] = [\n`;

mergeCollections().forEach(({ id, name, image }) => {
    let parsedImage = image;

    if (image.startsWith("https://raw.githubusercontent.com/ByMykel/")) {
        imagesToProcess.push(image);
        const fileName = path.basename(new URL(image).pathname).replace("_png.png", ".png");
        parsedImage = `/images/collections/${fileName}`;
    }

    collections += `  {
    id: ESet.${id.toUpperCase().replaceAll("-", "_")},
    name: {
      pt: '${name.pt}',
      en: '${name.en}'
    },
    image:
      '${parsedImage}'
  },\n`;
});

collections += `]\n
export default COLLECTIONS;\n`;

await processImages(imagesToProcess, "/images/collections");

fs.writeFileSync(`${GENERATED_FILES_DIR}/collections.ts`, collections);

console.log("✅ Successfully generated files");
