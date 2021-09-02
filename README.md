# xloot

Launch tweet for [xLoot](https://twitter.com/colingplatt/status/1433404301515370496).

<img src="https://pbs.twimg.com/profile_images/1433443326330642434/dXpdgpsN_400x400.jpg" width="300">

## Distribution

- tokenIds `8001` to `15777` claimable by user.
- tokenIds `15778` to `16000` claimable by contract owner.
- Each token has attributes: `chest`, `foot`, `hand`, `head`, `neck`, `ring`, `waist`, `weapon`.

## Output

- `output/loot.json` contains all tokenIds and their attributes.
- `output/occurences.json` contains the number of occurences by attribute.
- `output/rare.json` contains a mapping of `lootId` to `score` (which is the sum of number of occcrences of each child attribute for a `lootId`), sorted ascending by `score`. It also includes `rarest` which is how rare the loot bags attributes are (`1` == `rarest`, `8000` == `least rare`).
- `output/images.json` contains the base64 encoded SVG of each tokenId

## Run locally

```bash
# Install dependencies
npm install

# Collect all loot
npm run collect

# Parse statistics
npm run parse

# Collect base64 encoded images
npm run images
```

## Extras

- `derivatives/andy8052-ability-score` — Ability Score NFTs

## Credits

- forked from [@Anish-Agnihotri](https://github.com/Anish-Agnihotri/dhof-loot)
- [@ktasbas](https://github.com/ktasbas) for adding base64 encoded SVG retrieval support
