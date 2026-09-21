// Compares the catalogue just built in dist/ with the one currently published, and writes changes.json.
//
//   node compareWithPublished.js [url-base-publicado]
//
// Exists so the publish notification can say what actually arrived instead of just "done". A game update that
// adds 579 stickers and one that fixes a typo in a description both end in a successful workflow run; only the
// counts tell them apart, and only one of them is worth anyone's attention.
//
// Items are matched by `market_hash_name`, the same key the bots frontend and this project's update script use.
// Never by `id`: the generator migrated skin ids from a numeric scheme to a hash, so an id-keyed comparison
// would report the entire skin catalogue as new.

import * as fs from "fs";
import { gunzipSync } from "zlib";

const PUBLISHED =
    process.argv[2] ??
    "https://raw.githubusercontent.com/dashskinsltda/frontend-cs2-items-scrapper/gh-pages";

const readLocal = path => JSON.parse(gunzipSync(fs.readFileSync(path)).toString("utf-8"));

const fetchPublished = async path => {
    try {
        const response = await fetch(`${PUBLISHED}/${path}`);
        if (!response.ok) return null;
        const buffer = Buffer.from(await response.arrayBuffer());
        return path.endsWith(".gz")
            ? JSON.parse(gunzipSync(buffer).toString("utf-8"))
            : JSON.parse(buffer.toString("utf-8"));
    } catch {
        return null;
    }
};

const byName = catalogue => {
    const map = new Map();
    for (const [category, items] of Object.entries(catalogue ?? {})) {
        if (!Array.isArray(items)) continue;
        for (const item of items) {
            if (item?.market_hash_name) map.set(item.market_hash_name, { category, item });
        }
    }
    return map;
};

const incoming = byName(readLocal("./dist/bots/all.json.gz"));
const previous = byName(await fetchPublished("bots/all.json.gz"));
const previousVersion = await fetchPublished("version.json");

const added = [];
const removed = [];
let changed = 0;

for (const [name, entry] of incoming) {
    const before = previous.get(name);
    if (!before) {
        added.push({ name, category: entry.category });
    } else if (
        before.item.image !== entry.item.image ||
        JSON.stringify(before.item.name) !== JSON.stringify(entry.item.name)
    ) {
        changed += 1;
    }
}

for (const [name, entry] of previous) {
    if (!incoming.has(name)) removed.push({ name, category: entry.category });
}

const perCategory = list => {
    const totals = {};
    for (const entry of list) totals[entry.category] = (totals[entry.category] ?? 0) + 1;
    return Object.fromEntries(Object.entries(totals).sort((a, b) => b[1] - a[1]));
};

const version = JSON.parse(fs.readFileSync("./dist/version.json", "utf-8"));

const changes = {
    manifestId: version.manifestId,
    // null on the very first publish, which is how the notification knows to say so
    previousManifestId: previousVersion?.manifestId ?? null,
    total: incoming.size,
    added: added.length,
    removed: removed.length,
    changed,
    addedByCategory: perCategory(added),
    removedByCategory: perCategory(removed),
    addedSamples: added.slice(0, 5).map(entry => entry.name),
};

fs.writeFileSync("./changes.json", JSON.stringify(changes, null, 2));

console.log(
    `entram ${changes.added} · mudam ${changes.changed} · somem ${changes.removed} · total ${changes.total}`,
);
if (changes.addedSamples.length) console.log(`ex.: ${changes.addedSamples.join(", ")}`);
