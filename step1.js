const fs = require("fs");

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

async function main() {
  cat(process.argv[2]);
}

main();
