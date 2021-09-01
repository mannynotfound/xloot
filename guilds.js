// Imports
const fs = require("fs");

(async () => {
  // Load characters data
  const data = await fs.readFileSync("./output/characters.json");
  const characters = JSON.parse(data);

  const guilds = [
    "House Osraige",
    "House Laois",
    "House Muma",
    "House Larmuman",
    "Desmumu",
    "Traders Guild",
    "Hunters of Fiana ",
    "Tuadmumu",
    "Hy Many",
    "Guild of Gadai",
    "Fir Bolg",
    "Church of Khaanesh",
    "Church of Nurne",
    "Church of Tzorne",
    "Cabal of Pain",
    "Church of Enlightenment",
    "Cult of Rebirth",
    "Devine Strength",
  ];

  const traits = [
    "strength",
    "dexterity",
    "intelligence",
    "vitality",
    "luck",
    "faith",
  ];

  const guildMap = {};

  const parseStat = (s) => {
    return parseInt(s.replace(/\D/g, ""), 10);
  };

  characters.forEach((char) => {
    const tokenId = Object.keys(char)[0];
    const { profession } = char[tokenId];
    guilds.forEach((guild) => {
      if (!profession.includes(guild)) {
        return;
      }
      if (guildMap[guild]) {
        guildMap[guild].members.push(tokenId);
        guildMap[guild].totalMembers += 1;
        traits.forEach((trait) => {
          guildMap[guild][trait] += parseStat(char[tokenId][trait]);
        });
      } else {
        guildMap[guild] = {
          strength: 0,
          dexterity: 0,
          intelligence: 0,
          vitality: 0,
          luck: 0,
          faith: 0,
          totalMembers: 0,
          members: [],
        };
      }
    });
  });

  // stats
  let memberCount = 0;
  let biggestGuild = null;
  Object.keys(guildMap).forEach((guild) => {
    if (guildMap[guild].totalMembers > memberCount) {
      memberCount = guildMap[guild].totalMembers;
      biggestGuild = guild;
    }
  });
  console.log(`Biggest guild is ${biggestGuild} with ${memberCount}`);
  let scoreMap = {};
  Object.keys(guildMap).forEach((guild) => {
    traits.forEach((trait) => {
      if (!scoreMap[trait]) {
        scoreMap[trait] = {};
      }
      scoreMap[trait][guild] = guildMap[guild][trait];
    });
  });

  traits.forEach((trait) => {
    const guilds = scoreMap[trait];
    let highestTrait = 0;
    let highestGuild = null;
    Object.keys(guilds).forEach((guild) => {
      if (scoreMap[trait][guild] > highestTrait) {
        highestTrait = scoreMap[trait][guild];
        highestGuild = guild;
      }
    });
    console.log(`Guild with most ${trait}: ${highestGuild}`);
  });

  await fs.writeFileSync("./output/guilds.json", JSON.stringify(guildMap));
})();
