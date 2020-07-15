const { readdirSync } = require("fs");
const { parseCsv } = require("./parseCsv");
const { appendHash } = require("./appendHash");
const { writeCsv } = require("./writeCsv");
const { validatePath } = require("./validatePath");

validatePath("./input");

readdirSync("./input").forEach(async (f) => {
  const parsedCsv = await parseCsv(`./input/${f}`);
  const hashedCsv = parsedCsv.map((x) => {
    x.Text = appendHash(x.Text);
    return x;
  });

  validatePath("./output");
  writeCsv(hashedCsv, `./output/${f}`);

  console.log(`The CSV file ${f} was written successfully`);
});
