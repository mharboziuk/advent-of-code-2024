const path = require('path');
const input = require('fs');

const file = input.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim();

const string = file.split('\n');
const MIN = 1;
const MAX = 3;

// With ChatGPT help
function isSafeReport(numbers) {
  const isIncreasing = numbers.every((num, i, arr) => i === 0 || num > arr[i - 1]);
  const isDecreasing = numbers.every((num, i, arr) => i === 0 || num < arr[i - 1]);

  const validDifference = numbers.every((num, i, arr) =>
      i === 0 || (Math.abs(num - arr[i - 1]) >= MIN && Math.abs(num - arr[i - 1]) <= MAX)
  );

  return validDifference && (isIncreasing || isDecreasing);
}

const res = {};
string.forEach((row, rowIndex) => {
  const numbers = row.split(' ').map(Number);

  if (isSafeReport(numbers)) {
    res[rowIndex] = 'safe';
    return;
  }

  let isSafeWithDampener = false;
  for (let i = 0; i < numbers.length; i++) {
    const modifiedReport = numbers.slice(0, i).concat(numbers.slice(i + 1));

    if (isSafeReport(modifiedReport)) {
      isSafeWithDampener = true;
      break;
    }
  }

  res[rowIndex] = isSafeWithDampener ? 'safe' : 'unsafe';
});

console.log(res);
console.log(Object.values(res).filter((s) => s === 'safe').length);
