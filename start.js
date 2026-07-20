import "dotenv/config";

import * as fs from "fs";
import cron from "node-cron";
import path from "path";

import { fork } from "child_process";
import { format } from "date-fns";

import { parseItemNameEN, parseItemNamePTBR } from "./parsers.js";
import { downloadImages } from "./downloadImages.js";
import { deleteAvailableImages } from "./deleteAvailableImages.js";
import { publishNotification } from "./publishNotification.js";

if (!process.env.RABBITMQ_URL) {
    throw new Error("Please set RABBITMQ_URL in .env");
}

const timestamp = () => format(new Date(), "dd/MM/yyyy hh:mm:ss");

const dashBotsCategoryId = category =>
    ({
        Agent: "Agente",
        Charm: "Chaveiro",
        Sticker: "Adesivo",
        Container: "Recipiente",
        Key: "Chave",
        Patch: "Emblema",
        Graffiti: "Grafite",
        Collectible: "Colecionável",
        "Music Kit": "Trilha Sonora",
        Equipment: "Equipamento",
        Shotgun: "Escopeta",
        Knife: "Faca",
        Gloves: "Luvas",
        Pass: "Passe",
        Pistol: "Pistola",
        Rifle: "Rifle",
        SMG: "Submetralhadora",
        Machinegun: "Metralhadora",
    })?.[category];

const dashBotsSubCategoryId = weaponName =>
    ({
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
    })?.[weaponName] || weaponName;

const updateFiles = async () =>
    new Promise((resolve, reject) => {
        try {
            const args = ["--languages", "en,ptBR"];

            const update = fork("./update.js", args);

            update.once("close", code => {
                if (code === 0) {
                    console.log(`[${timestamp()}] ✅ update.js script finished successfully`);

                    const group = fork("./group.js", args);

                    group.once("close", exitCode => {
                        if (exitCode === 0) {
                            resolve("✅ Successfully updated CS2 files");
                        } else {
                            reject(`❌ Failed to group CS2 files with exit code ${exitCode}`);
                        }
                    });
                } else {
                    console.error(`[${timestamp()}] ❌ update.js failed with exit code ${code}`);
                    reject(`❌ Failed to update CS2 files with exit code ${code}`);
                }
            });
        } catch (error) {
            reject(error.message);
        }
    });

const update = () =>
    updateFiles()
        .then(async () => {
            const GENERATED_BOTS_COLLECTIONS_FILES_DIR = "./bots";
            const GENERATED_BOTS_ITEMS_FILES_DIR = "./bots/items";

            const GENERATED_COLLECTIONS_FILES_DIR = "./collections";
            const GENERATED_ITEMS_FILES_DIR = "./items";

            const getItems = filenames => {
                let all = {};
                let botsAutoComplete = {};
                let autoComplete = {};

                for (const filename of filenames) {
                    const en = fs.readFileSync(`./public/api/en/${filename}.json`, "utf-8");
                    const ptBR = fs.readFileSync(`./public/api/pt-BR/${filename}.json`, "utf-8");

                    const parsedENData = JSON.parse(en);
                    const parsedPTBRData = JSON.parse(ptBR);

                    Object.values(parsedENData)
                        .filter(({ market_hash_name, name }) => (market_hash_name || name || null) !== null)
                        .map(item => {
                            let category = null;

                            switch (true) {
                                case ["Tournament Pass", "Operation Pass"].includes(item?.type):
                                    category = "Pass";
                                    break;

                                case (item?.id || "").startsWith("agent-"):
                                    category = "Agent";
                                    break;

                                case (item?.id || "").startsWith("keychain-"):
                                    category = "Charm";
                                    break;

                                case (item?.id || "").startsWith("highlight-"):
                                    category = "Charm";
                                    break;

                                case (item?.id || "").startsWith("sticker_slab-"):
                                case (item?.id || "").startsWith("sticker-"):
                                    category = "Sticker";
                                    break;

                                case (item?.id || "").startsWith("crate-"):
                                    category = "Container";
                                    break;

                                case (item?.id || "").startsWith("key-"):
                                    category = "Key";
                                    break;

                                case (item?.id || "").startsWith("patch-"):
                                    category = "Patch";
                                    break;

                                case (item?.id || "").startsWith("graffiti-"):
                                    category = "Graffiti";
                                    break;

                                case (item?.id || "").startsWith("collectible-"):
                                    category = "Collectible";
                                    break;

                                case (item?.id || "").startsWith("music_kit-"):
                                    category = "Music Kit";
                                    break;

                                case (item?.id || "").startsWith("tool-"):
                                    category = "Tool";
                                    break;

                                case item?.weapon?.name === "Zeus x27":
                                    category = "Equipment";
                                    break;

                                case ["Nova", "XM1014", "MAG-7", "Sawed-Off"].includes(item?.weapon?.name):
                                    category = "Shotgun";
                                    break;

                                case [
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
                                ].includes(item?.weapon?.name):
                                    category = "Knife";
                                    break;

                                case [
                                    "Sport Gloves",
                                    "Driver Gloves",
                                    "Specialist Gloves",
                                    "Moto Gloves",
                                    "Hand Wraps",
                                    "Hydra Gloves",
                                    "Broken Fang Gloves",
                                    "Bloodhound Gloves",
                                ].includes(item?.weapon?.name):
                                    category = "Gloves";
                                    break;

                                case item?.type === "Pin":
                                    category = "Collectible";
                                    break;

                                case [
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
                                ].includes(item?.weapon?.name):
                                    category = "Pistol";
                                    break;

                                case [
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
                                ].includes(item?.weapon?.name):
                                    category = "Rifle";
                                    break;

                                case ["MP9", "MAC-10", "P90", "MP7", "UMP-45", "MP5-SD", "PP-Bizon"].includes(
                                    item?.weapon?.name
                                ):
                                    category = "SMG";
                                    break;

                                case ["M249", "Negev"].includes(item?.weapon?.name):
                                    category = "Machinegun";
                                    break;
                            }

                            return { ...item, category };
                        })
                        .forEach(({ id, category, image, description, ...item }, index, array) => {
                            const market_hash_name = item.market_hash_name || item.name;

                            console.log(`[${index + 1}/${array.length}] ${market_hash_name}`);

                            const subcategory = item?.weapon?.name;

                            const nameEN = parseItemNameEN(item.name);

                            const namePTBR =
                                parseItemNamePTBR(parsedPTBRData.find(item => item.id === id)?.name || "") ||
                                nameEN;

                            const descriptionPTBR =
                                parsedPTBRData.find(item => item.id === id)?.description || "";

                            let cleanMarketHashName = item.market_hash_name;

                            switch (category) {
                                case "Equipment":
                                case "Shotgun":
                                case "Pistol":
                                case "Rifle":
                                case "SMG":
                                case "Machinegun":
                                    cleanMarketHashName = item.name;
                                    break;

                                case "Knife":
                                case "Gloves":
                                    cleanMarketHashName = item.name.replace("★ ", "");
                                    break;
                            }

                            all = {
                                ...all,
                                [cleanMarketHashName]: {
                                    id,
                                    category,
                                    subcategory,
                                    market_hash_name: cleanMarketHashName,
                                    image,
                                    name: {
                                        en: nameEN,
                                        ptBR: namePTBR,
                                    },
                                    description: {
                                        en: description,
                                        ptBR: descriptionPTBR,
                                    },
                                },
                            };

                            const categoryId = dashBotsCategoryId(category);

                            const subCategoryId = dashBotsSubCategoryId(item?.weapon?.name);

                            const key = {
                                Agent: "agents",
                                Charm: "charms",
                                Sticker: "stickers",
                                Container: "containers",
                                Key: "keys",
                                Patch: "patches",
                                Graffiti: "graffitis",
                                Collectible: "collectibles",
                                "Music Kit": "musicKits",
                                Equipment: "equipments",
                                Shotgun: "shotguns",
                                Knife: "knives",
                                Gloves: "gloves",
                                Pass: "passes",
                                Pistol: "pistols",
                                Rifle: "rifles",
                                SMG: "smgs",
                                Machinegun: "machineguns",
                            }?.[category];

                            if (key) {
                                let addItemToAutoComplete = true;

                                if (category === "Sticker" && id.startsWith("sticker_slab-")) {
                                    addItemToAutoComplete = false;
                                }

                                if (category === "Tool") addItemToAutoComplete = false;

                                if (addItemToAutoComplete) {
                                    botsAutoComplete = {
                                        ...botsAutoComplete,
                                        [key]: {
                                            ...(botsAutoComplete?.[key] || {}),
                                            [cleanMarketHashName]: {
                                                id,
                                                categoryId,
                                                subCategoryId,
                                                market_hash_name: cleanMarketHashName,
                                                image,
                                                name: {
                                                    en: nameEN,
                                                    pt: namePTBR,
                                                },
                                            },
                                        },
                                    };

                                    autoComplete = {
                                        ...autoComplete,
                                        [cleanMarketHashName]: {
                                            id,
                                            market_hash_name: cleanMarketHashName,
                                            name: {
                                                en: nameEN,
                                                ptBR: namePTBR,
                                            },
                                            image,
                                        },
                                    };
                                }
                            }
                        });
                }

                botsAutoComplete = Object.entries(botsAutoComplete).reduce(
                    (accumulator, [key, value]) =>
                        Object.assign(accumulator, { [key]: Object.values(value) }),
                    {}
                );

                return {
                    all: Object.values(all),
                    bots: {
                        autoComplete: botsAutoComplete,
                    },
                    autoComplete: Object.values(autoComplete),
                };
            };

            const getCollections = () => {
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
                            ptBR: namePTBR || nameEN,
                        },
                        image,
                    };
                });

                return collections;
            };

            if (!fs.existsSync(GENERATED_BOTS_COLLECTIONS_FILES_DIR)) {
                fs.mkdirSync(GENERATED_BOTS_COLLECTIONS_FILES_DIR, { recursive: true });
            }

            if (!fs.existsSync(GENERATED_BOTS_ITEMS_FILES_DIR)) {
                fs.mkdirSync(GENERATED_BOTS_ITEMS_FILES_DIR, { recursive: true });
            }

            if (!fs.existsSync(GENERATED_COLLECTIONS_FILES_DIR)) {
                fs.mkdirSync(GENERATED_COLLECTIONS_FILES_DIR, { recursive: true });
            }

            if (!fs.existsSync(GENERATED_ITEMS_FILES_DIR)) {
                fs.mkdirSync(GENERATED_ITEMS_FILES_DIR, { recursive: true });
            }

            // ---------------- GENERATE JSON FILES ----------------
            const items = getItems([
                "agents",
                "collectibles",
                "crates",
                "graffiti",
                "highlights",
                "keychains",
                "keys",
                "music_kits",
                "patches",
                "skins",
                "sticker_slabs",
                "stickers",
                "tools",
            ]);

            // GitHub blocks the GET requests when images are requested too often,
            // preventing them from displaying correctly in filters.
            // To fix this, we need to download all images from GitHub images and make them
            // available to the client the using Next.js public folder.
            let imagesToDownload = [];

            for (const [index, item] of Object.entries(items.all)) {
                if (item.image.startsWith("https://raw.githubusercontent.com/ByMykel/")) {
                    imagesToDownload.push(item.image);
                    const fileName = path.basename(new URL(item.image).pathname).replace("_png.png", ".png");
                    items.all[+index].image = `/images/items/${fileName}`;
                }
            }

            const downloadedImages = await downloadImages(imagesToDownload, "./images/items");

            await deleteAvailableImages(
                "./images/items",
                downloadedImages.fulfilled.map(({ filename }) => filename)
            );

            for (const category of Object.keys(items.bots.autoComplete)) {
                for (const [index, item] of Object.entries(items.bots.autoComplete[category])) {
                    if (item.image.startsWith("https://raw.githubusercontent.com/ByMykel/")) {
                        // imagesToDownload.push(item.image);

                        const fileName = path
                            .basename(new URL(item.image).pathname)
                            .replace("_png.png", ".png");

                        console.log(category, item.market_hash_name, index, fileName);

                        items.bots.autoComplete[category][+index].image =
                            `https://dashskins.com.br/images/items/${fileName}`;
                    }
                }
            }

            fs.writeFileSync(
                `${GENERATED_BOTS_ITEMS_FILES_DIR}/all.json`,
                JSON.stringify(items.bots.autoComplete)
            );

            fs.writeFileSync(
                `${GENERATED_ITEMS_FILES_DIR}/names.json`,
                JSON.stringify(
                    items.all.reduce(
                        (accumulator, { market_hash_name, name }) =>
                            Object.assign(accumulator, { [market_hash_name]: name }),
                        {}
                    )
                )
            );

            for (const [index, item] of Object.entries(items.autoComplete)) {
                if (item.image.startsWith("https://raw.githubusercontent.com/ByMykel/")) {
                    imagesToDownload.push(item.image);
                    const fileName = path.basename(new URL(item.image).pathname).replace("_png.png", ".png");
                    items.all[+index].image = `https://dashskins.com.br/images/items/${fileName}`;
                }
            }

            fs.writeFileSync(
                `${GENERATED_ITEMS_FILES_DIR}/autocomplete.json`,
                JSON.stringify(items.autoComplete)
            );

            // ---------------- GENERATE ESET.TS ----------------
            const collections = getCollections();

            let ESetFileContent = `export const ESet = {\n`;

            collections.forEach(({ id, name }) => {
                ESetFileContent += `  ${id.toUpperCase().replaceAll("-", "_")}: '${name.ptBR}',\n`;
            });

            ESetFileContent += `} as const;\n`;

            fs.writeFileSync(`${GENERATED_BOTS_COLLECTIONS_FILES_DIR}/ESet.ts`, ESetFileContent);

            ESetFileContent = `export const ESet = {\n`;

            collections.forEach(({ id, name }) => {
                ESetFileContent += `  ${id.toUpperCase().replaceAll("-", "_")}: '${name.en}',\n`;
            });

            ESetFileContent += `} as const;\n`;

            fs.writeFileSync(`${GENERATED_COLLECTIONS_FILES_DIR}/ESet.ts`, ESetFileContent);

            // ---------------- GENERATE COLLECTIONS.TS ----------------
            imagesToDownload = [];

            let collectionsFileContent = `import { Collection } from '@/types/Filters';
        import { ESet } from '@/types/Item';\n
        const COLLECTIONS: Collection[] = [\n`;

            collections.forEach(({ id, name, image }) => {
                let parsedImage = image;

                if (image.startsWith("https://raw.githubusercontent.com/ByMykel/")) {
                    imagesToDownload.push(image);
                    const fileName = path.basename(new URL(image).pathname).replace("_png.png", ".png");
                    parsedImage = `/images/collections/${fileName}`;
                }

                collectionsFileContent += `  {
            id: ESet.${id.toUpperCase().replaceAll("-", "_")},
            name: {
              pt: '${name.ptBR}',
              en: '${name.en}',
            },
            image: '${parsedImage}',
          },\n`;
            });

            collectionsFileContent += `]\n
        export default COLLECTIONS;\n`;

            await downloadImages(imagesToDownload, "./images/collections");

            fs.writeFileSync(
                `${GENERATED_BOTS_COLLECTIONS_FILES_DIR}/collections.ts`,
                collectionsFileContent
            );

            collectionsFileContent = `import { ESet } from '@/enums/item.enum/set.enum';
        import { Collection } from '@/providers/FiltersProvider/types';\n
        export const COLLECTIONS: Collection[] = [\n`;

            collections.forEach(({ id, name, image }) => {
                let parsedImage = image;

                if (image.startsWith("https://raw.githubusercontent.com/ByMykel/")) {
                    const fileName = path.basename(new URL(image).pathname).replace("_png.png", ".png");
                    parsedImage = `https://dashskins.com.br/images/collections/${fileName}`;
                }

                collectionsFileContent += `  {
            id: ESet.${id.toUpperCase().replaceAll("-", "_")},
            name: {
              pt: '${name.ptBR}',
              en: '${name.en}',
            },
            image: '${parsedImage}',
          },\n`;
            });

            collectionsFileContent += `]\n
        export default COLLECTIONS;\n`;

            fs.writeFileSync(`${GENERATED_COLLECTIONS_FILES_DIR}/collections.ts`, collectionsFileContent);

            await publishNotification(true);

            console.log(`[${timestamp()}] ✅ Successfully generated files`);
        })
        .catch(async error => {
            await publishNotification(false, error);
            console.error(`[${timestamp()}]`, error);
        });

// Every monday at 00:00
cron.schedule("0 0 * * 1", () => {
    update();
});

update();

process.on("uncaughtException", error => {
    console.error(`[${timestamp()}] Captured critical uncaught exception:`, error);
});

process.on("unhandledRejection", reason => {
    console.error(`[${timestamp()}] Captured unhandled promise rejection:`, reason);
});
