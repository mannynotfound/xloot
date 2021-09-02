// Imports
const fs = require("fs");
const ethers = require("ethers");
const { abi } = require("./abi");

// Setup contract
const xlootAddress = "0x8bf2f876E2dCD2CAe9C3d272f325776c82DA366d";
const rpc = new ethers.providers.JsonRpcProvider("http://localhost:8545");
const xLoot = new ethers.Contract(xlootAddress, abi, rpc);

const missing = [];
let existing = [];
try {
  const data = fs.readFileSync("./output/xloot.json");
  existing = JSON.parse(data);
} catch (e) {}

let lootMap = {};

for (let i = 8001; i <= 16000; i++) {
  const exists = existing.find((e) => {
    const tokenId = Object.keys(e)[0];
    return tokenId === String(i);
  });

  if (!exists) {
    missing.push(i);
  } else {
    lootMap[String(i)] = exists[String(i)];
  }
}

(async () => {
  const collect = async (i) => {
    console.log("Collecting: ", i);

    const handleError = (err) => {
      console.log(err);
    };

    const [chest, foot, hand, head, neck, ring, waist, weapon] =
      await Promise.all([
        xLoot.getChest(i).catch(handleError),
        xLoot.getFoot(i).catch(handleError),
        xLoot.getHand(i).catch(handleError),
        xLoot.getHead(i).catch(handleError),
        xLoot.getNeck(i).catch(handleError),
        xLoot.getRing(i).catch(handleError),
        xLoot.getWaist(i).catch(handleError),
        xLoot.getWeapon(i).catch(handleError),
      ]).catch();

    // Push parts to array
    return {
      chest,
      foot,
      hand,
      head,
      neck,
      ring,
      waist,
      weapon,
    };
  };

  // Collect all ids we need
  for (let i = 0; i <= missing.length - 1; i++) {
    const tokenId = missing[i];
    const tokenData = await collect(tokenId);
    lootMap[String(tokenId)] = tokenData;
  }

  // Write output
  const output = Object.keys(lootMap).map((tid) => {
    const newObj = {};
    newObj[tid] = { ...lootMap[tid] };
    return newObj;
  });

  fs.writeFileSync("./output/xloot.json", JSON.stringify(output));
})();
