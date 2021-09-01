// Imports
const fs = require("fs");
const ethers = require("ethers");
const { abi } = require("./abi");

// Setup contract
const charactersAddress = "0x7403AC30DE7309a0bF019cdA8EeC034a5507cbB3";
const rpc = new ethers.providers.JsonRpcProvider("http://localhost:8545");
const characters = new ethers.Contract(charactersAddress, abi, rpc);

const missing = [];
let existing = [];
try {
  const data = fs.readFileSync("./output/characters.json");
  existing = JSON.parse(data);
} catch (e) {}

let characterMap = {};

for (let i = 1; i <= 12000; i++) {
  const exists = existing.find((e) => {
    const tokenId = Object.keys(e)[0];
    return tokenId === String(i);
  });

  if (!exists) {
    missing.push(i);
  } else {
    characterMap[String(i)] = exists[String(i)];
  }
}

(async () => {
  const collect = async (i) => {
    console.log("Collecting: ", i);

    const handleError = (err) => {
      console.log(err);
    };

    const [
      race,
      profession,
      strength,
      dexterity,
      intelligence,
      vitality,
      luck,
      faith,
    ] = await Promise.all([
      characters.getRace(i).catch(handleError),
      characters.getProfession(i).catch(handleError),
      characters.getStrength(i).catch(handleError),
      characters.getDexterity(i).catch(handleError),
      characters.getIntelligence(i).catch(handleError),
      characters.getVitality(i).catch(handleError),
      characters.getLuck(i).catch(handleError),
      characters.getFaith(i).catch(handleError),
    ]).catch();

    // Push parts to array
    return {
      race,
      profession,
      strength,
      dexterity,
      intelligence,
      vitality,
      luck,
      faith,
    };
  };

  // Collect all ids we need
  for (let i = 0; i <= missing.length - 1; i++) {
    const tokenId = missing[i];
    const tokenData = await collect(tokenId);
    characterMap[String(tokenId)] = tokenData;
  }

  // Write output
  const output = Object.keys(characterMap).map((tid) => {
    const newObj = {};
    newObj[tid] = { ...characterMap[tid] };
    return newObj;
  });

  fs.writeFileSync("./output/characters.json", JSON.stringify(output));
})();
