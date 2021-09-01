// Imports
const { base58 } = require("ethers/lib/utils");
const fs = require("fs");

(async () => {
  // Load characters data
  const data = await fs.readFileSync("./output/characters.json");
  const characters = JSON.parse(data);

  const traits = [
    "strength",
    "dexterity",
    "intelligence",
    "vitality",
    "luck",
    "faith",
  ];

  const parseStat = (s) => {
    return parseInt(s.replace(/\D/g, ""), 10);
  };

  const calcScore = (scores) => {
    return (scores.reduce((a, b) => a + b, 0) / 6).toFixed(2);
  };

  let charScores = [];
  characters.forEach((char) => {
    const tokenId = Object.keys(char)[0];
    const allTraits = traits.map((trait) => {
      return parseStat(char[tokenId][trait]);
    });

    charScores.push({
      tokenId,
      score: calcScore(allTraits),
    });
  });

  const ranks = charScores.sort((a, b) => b.score - a.score);

  await fs.writeFileSync("./output/ranks.json", JSON.stringify(ranks));
})();
