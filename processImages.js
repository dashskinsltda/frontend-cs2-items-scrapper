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

export const processImages = async (images, outputPath = "/images/items") => {
    const response = {
        fulfilled: [],
        failed: [],
    };

    for (const [index, url] of Object.entries(images)) {
        // extract filename from URL
        const fileName = path.basename(new URL(url).pathname).replace("_png.png", ".png");
        const filePath = path.join(__dirname + outputPath, fileName);

        try {
            if (!fs.existsSync(__dirname + outputPath)) {
                fs.mkdirSync(__dirname + outputPath, { recursive: true });
            }

            if (!fs.existsSync(filePath)) {
                console.log(`⬇️ Downloading ${+index + 1} of ${images.length}:`, fileName);
                await _downloadImage(url, filePath);
                response.fulfilled.push(url);
            } else {
                console.log(`✅ Downloading ${+index + 1} of ${images.length}:`, fileName);
                response.fulfilled.push(url);
            }
        } catch (err) {
            console.error("❌ Error:", err.message, `for image ${fileName} [${url}]`);
            response.failed.push(url);
        }
    }

    return response;
};
