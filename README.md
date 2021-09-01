# characters for loot

Launch tweet for [Characters](https://twitter.com/LootCharacters/status/1432857732512681984).

<img src="https://pbs.twimg.com/media/E-KuA8XWQAAnKKW?format=png&name=900x900" width="300">

## Distribution

- tokenIds `1` to `8000` claimable by loot owners.
- tokenIds `8001` to `12000` claimable by anyone.
- Each token has attributes: `race`, `profession`, `strength`, `dexterity`, `intelligence`, `vitality`, `luck`, `faith`.

## Output

- `output/characters.json` contains all tokenIds and their attributes.
- `output/occurences.json` contains the number of occurences by attribute.
- `output/rare.json` contains a mapping of `characterId` to `score` (which is the sum of number of occcrences of each child attribute for a `characterId`), sorted ascending by `score`. It also includes `rarest` which is how rare the character's attributes are (`1` == `rarest`, `12000` == `least rare`).
- `output/images.json` contains the base64 encoded SVG of each tokenId

## Run locally

```bash
# Install dependencies
npm install

# Collect all characters
npm run collect

# Parse statistics
npm run parse

# Collect base64 encoded images
npm run images
```

## Credits

- forked from [@Anish-Agnihotri](https://github.com/Anish-Agnihotri/dhof-loot)
- [@ktasbas](https://github.com/ktasbas) for adding base64 encoded SVG retrieval support
