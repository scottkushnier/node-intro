const fs = require("fs");
const axios = require("axios");

function cat(path) {
  //   console.log("path: ", path);
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log("Error: ", err);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}

async function webCat(path) {
  //   console.log("path: ", path);
  try {
    res = await axios.get(path);
    console.log(res);
  } catch {
    console.log("error finding URL: ", path);
  }
}

async function catThing(thing) {
  if (thing.indexOf("http") == 0) {
    webCat(thing);
  } else {
    cat(thing);
  }
}

async function main() {
  catThing(process.argv[2]);
}

main();
