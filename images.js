// Imports
const fs = require("fs");
const ethers = require("ethers");
const { abi } = require("./abi");

// Setup contract
const charactersAddress = "0x7403AC30DE7309a0bF019cdA8EeC034a5507cbB3";
const rpc = new ethers.providers.JsonRpcProvider("http://localhost:8545");
const characters = new ethers.Contract(charactersAddress, abi, rpc);

(async () => {
  // List to hold images
  let images = [];

  for (let i = 1; i <= 12000; i++) {
    console.log("Collecting: ", i);

    try {
      // Get base64 encoded URI
      let uri = await characters.tokenURI(i);
      uri = uri.split(",")[1];

      // Decode into a JSON string
      // {
      //   "name": "Bag #{#}",
      //   "description": "{GENERIC_STRING}",
      //   "image": "data:image/svg+xml;base64,{BASE64_DATA}"
      // }
      const json_uri = Buffer.from(uri, "base64").toString("utf-8");
      const image = JSON.parse(json_uri)["image"];

      images.push({
        [i]: {
          image,
        },
      });

      if (i % 1000 === 0) {
        // Save to file every 1000 so we don't lose everything on a crash
        console.log("Saving...");
        fs.writeFileSync("./output/images.json", JSON.stringify(images));
      }
    } catch (e) {
      console.error(e);
    }
  }

  // Write output
  fs.writeFileSync("./output/images.json", JSON.stringify(images));
})();
