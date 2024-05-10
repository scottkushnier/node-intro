const fs = require("fs");
const axios = require("axios");

async function writeFile(path, data) {
  // console.log("write to: ", path);
  // console.log("data: ", data);
  fs.writeFile(path, data, "utf8", function (err, res) {
    if (err) {
      console.log("Error: ", err);
      process.exit(1);
    } else {
      console.log("Done.");
    }
  });
}

async function cat(path, outfile) {
  //   console.log("path: ", path);
  fs.readFile(path, "utf8", async function (err, data) {
    if (err) {
      console.log("Error: ", err);
      process.exit(1);
    } else {
      if (outfile) {
        await writeFile(outfile, data);
      } else {
        console.log(data);
      }
    }
  });
}

async function webCat(path, outfile) {
  //   console.log("path: ", path);
  try {
    const res = await axios.get(path);
    if (outfile) {
      await writeFile(outfile, res.data);
    } else {
      console.log(res.data);
    }
  } catch {
    console.log("error finding URL: ", path);
  }
}

async function catThing(thing, outfile) {
  if (thing.indexOf("http") == 0) {
    webCat(thing, outfile);
  } else {
    cat(thing, outfile);
  }
}

async function main() {
  if (process.argv[2] == "--out") {
    await catThing(process.argv[4], (outfile = process.argv[3]));
  } else {
    await catThing(process.argv[2]);
  }
}

main();
