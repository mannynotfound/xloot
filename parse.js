// Imports
const fs = require("fs");

(async () => {
  // Load characters data
  const data = await fs.readFileSync("./output/characters.json");
  const characters = JSON.parse(data);

  // Calculate attribute rarities
  let rarityIndex = {};
  for (let i = 0; i < characters.length; i++) {
    const attributes = characters[i][(i + 1).toString()];

    // Add up number of occurences of attributes
    for (const attribute of Object.values(attributes)) {
      rarityIndex[attribute] = rarityIndex[attribute]
        ? rarityIndex[attribute] + 1
        : 1;
    }
  }

  // Output occurences
  await fs.writeFileSync(
    "./output/occurences.json",
    JSON.stringify(rarityIndex)
  );

  // Calculate occurence scores
  let scores = [];
  for (let i = 0; i < characters.length; i++) {
    let score = 0;
    const attributes = characters[i][(i + 1).toString()];

    for (const attribute of Object.values(attributes)) {
      score += rarityIndex[attribute];
    }
    scores.push({ characterId: i + 1, score });
  }

  // Sort by score
  scores = scores.sort((a, b) => a.score - b.score);
  // Sort by index of score
  scores = scores.map((character, i) => ({
    ...character,
    rarest: i + 1,
  }));

  // Print character rarity
  await fs.writeFileSync("./output/rare.json", JSON.stringify(scores));
})();
