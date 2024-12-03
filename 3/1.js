const path = require("path");
const input = require("fs");

const file = input
  .readFileSync(path.join(__dirname, "input1.txt"), "utf8")
  .trim();

const string = file.matchAll(/mul\([0-9]+,[0-9]+\)/gi);

let sum = 0;
[...string].forEach(([mulString]) => {
  const numbersString = mulString.matchAll(/[0-9]+/gi);
  const array = [...numbersString];
  const mul = array[0][0] * array[1][0];

  sum += mul;
});

console.log(sum);
