const path = require("path");
const input = require("fs");

const file = input
  .readFileSync(path.join(__dirname, "input2.txt"), "utf8")
  .trim();

const stringOfDo = file.matchAll(/do[^n't]/g);
const stringOfDont = file.matchAll(/don't/g);

const doIndexes = [];
for (const match of stringOfDo) {
  doIndexes.push(match.index);
}

const dontIndexes = [];
for (const match of stringOfDont) {
  dontIndexes.push(match.index);
}

const stringOfMuls = file.matchAll(/mul\([0-9]+,[0-9]+\)/gi);

let sum = 0;
let shouldMul = true;
for (const match of stringOfMuls) {
  const indexOfNumber = match.index;

  const currentDontIndex = dontIndexes.findIndex((a) => a < indexOfNumber);
  if (currentDontIndex !== -1) {
    shouldMul = false;
    dontIndexes.shift();
  }

  const currentDoIndex = doIndexes.findIndex((a) => a < indexOfNumber);

  if (currentDoIndex !== -1) {
    shouldMul = true;
    doIndexes.shift();
  }

  if (!shouldMul) {
    continue;
  }

  const numbersString = match[0].matchAll(/[0-9]+/gi);
  const array = [...numbersString];
  const mul = array[0][0] * array[1][0];

  sum += mul;
}

console.log(sum);
