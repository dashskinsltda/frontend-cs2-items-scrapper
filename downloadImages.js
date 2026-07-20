import { fileURLToPath } from "url";
import * as fs from "fs";
import path from "path";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const _downloadImage = async (url, outputPath) => {
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

export const downloadImages = async (images, outputPath = "/images/items") => {
    const response = {
        fulfilled: [],
        failed: [],
    };

    let validatedOutputPath = outputPath;

    if (outputPath.startsWith("./")) {
        validatedOutputPath = outputPath.slice(1);
    }

    for (const [index, url] of Object.entries(images)) {
        // extract filename from URL
        const filename = path.basename(new URL(url).pathname).replace("_png.png", ".png");
        const filePath = path.join(__dirname + validatedOutputPath, filename);

        try {
            if (!fs.existsSync(__dirname + validatedOutputPath)) {
                fs.mkdirSync(__dirname + validatedOutputPath, { recursive: true });
            }

            if (!fs.existsSync(filePath)) {
                console.log(`⬇️  Downloading ${+index + 1} of ${images.length}:`, filename);
                await _downloadImage(url, filePath);
                response.fulfilled.push({ filename, url });
            } else {
                console.log(`✅ Downloading ${+index + 1} of ${images.length}:`, filename);
                response.fulfilled.push({ filename, url });
            }
        } catch (err) {
            console.error("❌ Error:", err.message, `for image ${filename} [${url}]`);
            response.failed.push({ filename, url });
        }
    }

    return response;
};
