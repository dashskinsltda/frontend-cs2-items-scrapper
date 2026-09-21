// Assembles everything the two DashSkins platforms consume into a single publishable folder.
//
//   node buildDist.js
//
// Run after `update-data` (which writes public/api/<lang>/*.json) and `generate-files` (which writes
// generated/<date>/ with the flattened catalogue the bots frontend ships). `group-data` is NOT needed: it only
// builds a 62 MB public/api/<lang>/all.json that nothing downstream reads.
//
// Why one folder for both: the P2P api and the bots frontend need different shapes of the same data - per
// endpoint and both languages for the P2P, flattened plus generated TypeScript for the bots. Publishing them
// together from one pipeline run is what makes "are the two platforms on the same catalogue?" answerable: they
// are, by construction, because they read the same deployment.
//
// Everything sizeable is written pre-gzipped. The raw payload is ~117 MB across both languages and compresses
// about 14x, and skins_not_grouped.json alone is 26.5 MB per language - over Cloudflare Pages' 25 MiB per-file
// limit, and awkward everywhere else. Consumers gunzip on read, which is a handful of lines on each side.

import * as fs from "fs";
import path from "path";
import { gzipSync } from "zlib";

const DIST = "./dist";
const LANGUAGES = ["en", "pt-BR"];

// all.json is the 62 MB grouped blob produced by group.js. Neither platform reads it: the bots frontend ships
// generateFiles.js's own flattened all.json, which is a different, much smaller file.
const SKIP_API_FILES = new Set(["all.json"]);

const rm = target => fs.rmSync(target, { recursive: true, force: true });
const mkdir = target => fs.mkdirSync(target, { recursive: true });

const writeGzip = (from, to) => {
  const raw = fs.readFileSync(from);
  const packed = gzipSync(raw, { level: 9 });
  mkdir(path.dirname(to));
  fs.writeFileSync(to, packed);
  return { raw: raw.length, packed: packed.length };
};

const copy = (from, to) => {
  mkdir(path.dirname(to));
  fs.copyFileSync(from, to);
  return fs.statSync(to).size;
};

// Returns the published paths, not just a count: consumers fetching over HTTP cannot list a directory, so
// version.json has to name every file they might need.
const copyDir = (from, to, prefix) => {
  if (!fs.existsSync(from)) return [];
  mkdir(to);
  const files = fs.readdirSync(from).filter(file => /\.(png|svg)$/i.test(file));
  for (const file of files) fs.copyFileSync(path.join(from, file), path.join(to, file));
  return files.map(file => path.posix.join(prefix, file));
};

const die = message => {
  console.error(`\nerro: ${message}\n`);
  process.exit(1);
};

// --------------------------------------------------------------------- inputs

if (!fs.existsSync("./public/api")) {
  die("public/api não existe — rode `npm run update-data-force` antes");
}

const generatedRoot = "./generated";
if (!fs.existsSync(generatedRoot)) {
  die("generated/ não existe — rode `npm run generate-files` antes");
}

const latest = fs
  .readdirSync(generatedRoot)
  .filter(entry => fs.statSync(path.join(generatedRoot, entry)).isDirectory())
  .sort()
  .pop();

if (!latest) die("nenhuma saída em generated/");

const OUT = path.join(generatedRoot, latest);

const manifestId = fs.existsSync("./manifestIdUpdate.txt")
  ? fs.readFileSync("./manifestIdUpdate.txt", "utf-8").trim()
  : null;

if (!manifestId) die("manifestIdUpdate.txt não existe — a geração não completou");

// ---------------------------------------------------------------------- build

rm(DIST);
mkdir(DIST);

console.log(`build ${manifestId}  (geração ${latest})\n`);

let totalRaw = 0;
let totalPacked = 0;
const files = [];

// the P2P side: every endpoint, both languages, gzipped
for (const language of LANGUAGES) {
  const dir = path.join("./public/api", language);
  if (!fs.existsSync(dir)) die(`idioma ausente: ${dir}`);

  for (const file of fs.readdirSync(dir).filter(name => name.endsWith(".json"))) {
    if (SKIP_API_FILES.has(file)) continue;

    const target = path.posix.join("api", language, `${file}.gz`);
    const { raw, packed } = writeGzip(path.join(dir, file), path.join(DIST, target));
    totalRaw += raw;
    totalPacked += packed;
    files.push(target);
  }
}

// the bots side: the flattened catalogue plus the two generated TypeScript files
const botsAll = writeGzip(path.join(OUT, "all.json"), path.join(DIST, "bots/all.json.gz"));
totalRaw += botsAll.raw;
totalPacked += botsAll.packed;
files.push("bots/all.json.gz");

for (const file of ["hash.json", "collections.ts", "ESet.ts"]) {
  const from = path.join(OUT, file);
  if (!fs.existsSync(from)) die(`generate-files não produziu ${file}`);
  totalPacked += copy(from, path.join(DIST, "bots", file));
  files.push(path.posix.join("bots", file));
}

const collectionImages = copyDir(
  path.join(OUT, "images", "collections"),
  path.join(DIST, "bots/images/collections"),
  "bots/images/collections",
);
const itemImages = copyDir(
  path.join(OUT, "images", "items"),
  path.join(DIST, "bots/images/items"),
  "bots/images/items",
);
files.push(...collectionImages, ...itemImages);

// The stamp both platforms record, so a mismatch is visible without comparing file trees.
fs.writeFileSync(path.join(DIST, "manifestIdUpdate.txt"), manifestId);
fs.writeFileSync(
  path.join(DIST, "version.json"),
  JSON.stringify(
    {
      manifestId,
      generatedAt: new Date().toISOString(),
      generation: latest,
      files,
    },
    null,
    2,
  ),
);

// Pages hosts here serve .gz as an opaque asset, and Jekyll would otherwise skip directories it does not like.
fs.writeFileSync(path.join(DIST, ".nojekyll"), "");

const mb = bytes => `${(bytes / 1048576).toFixed(1)} MB`;

console.log(`  api + bots        ${files.length} arquivos`);
console.log(`  imagens           ${collectionImages.length} coleções, ${itemImages.length} itens`);
console.log(`  bruto             ${mb(totalRaw)}`);
console.log(`  publicado         ${mb(totalPacked)}`);
console.log(`\ndist/ pronto\n`);
