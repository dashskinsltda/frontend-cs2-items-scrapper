import * as fs from "fs/promises";
import path from "path";

export const deleteAvailableImages = async (directoryPath, processedImages) => {
    try {
        const allowedSet = new Set(processedImages);

        const allFiles = await fs.readdir(directoryPath);

        for (const file of allFiles) {
            const filePath = path.join(directoryPath, file);
            const stats = await fs.stat(filePath);

            if (stats.isFile()) {
                if (!allowedSet.has(file)) {
                    await fs.unlink(filePath);
                    console.log(`🗑️  Deleted: ${file}`);
                } else {
                    console.log(`✅ Kept: ${file}`);
                }
            }
        }

        console.log("✨ Directory cleanup finished.");
    } catch (error) {
        console.error(`❌ Error during cleanup: ${error.message}`);
    }
};
