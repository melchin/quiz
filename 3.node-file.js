const fs = require("fs");

function getSum(path = "./node-data.txt") {
  const lines = fs.readFileSync(path, "utf-8").split(/\r?\n/);
  const records = lines.map(line => line.split(","));
  return records.reduce((acc, record) => {
    acc += Number(record[2]);
    return acc;
  }, 0);
}

module.exports = getSum;
