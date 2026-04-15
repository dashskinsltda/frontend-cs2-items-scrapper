## Update Dashskins files (all.json, hash.json, ESet.ts and collections.ts)

Install all dependencies:

```
npm install
```

Get up to date CS2 data:

```
npm run update-data-force
```

Group up to date CS2 data (generate _`public/api/[languages]/all.json`_):

```
npm run group-data-force
```

Then generate [Dashskins.com.br](https://dashskins.com.br) front-end files:

```
npm run generate-files
```

Finally generate images.json file:

```
npm run generate-images
```

Output:

```
.
└── generated
    └── [yyyy-mm-dd]
            ├── images
            │   ├── collections
            │   │   └── *.png    (these are the images without Steam CDN link, copy and paste
            │   │                 them inside public/images/collections in frontend-bots
            │   │                 repository)
            │   │
            │   └── items
            │       └── *.png    (these are the images without Steam CDN link, copy and paste
            │                     them inside public/images/items in frontend-bots repository)
            │
            ├── all.json         (replace public/items/all.json from frontend-bots repository
            │                     with this file)
            │
            ├── collections.ts   (replace src/constants/filters/collections.ts from frontend-bots
            │                     repository with this file)
            │
            ├── ESet.ts          (this file content goes inside src/types/Item.ts in
            │                     frontend-bots repository)
            │
            │── hash.ts          (replace public/items/hash.json from frontend-bots repository
            │                     with this file to use the updated items in client)
            │
            └── images.json
```
