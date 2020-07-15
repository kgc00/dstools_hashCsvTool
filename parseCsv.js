const csvParser = require("csv-parser");
const { createReadStream } = require("fs");

const parseCsv = async (filename) =>
  new Promise((resolve, rej) => {
    const csv = [];
    createReadStream(filename)
      .pipe(csvParser())
      .on("data", (data) => csv.push(data))
      .on("end", () => resolve(csv))
      .on("error", (err) => rej(err));
  });

exports.parseCsv = parseCsv;
