const path = require('path');
const input = require('fs')

const file = input.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim();


const string = file.split('\n')
const MIN = 1;
const MAX = 3;

const res = {}
string.forEach((row, rowIndex) => {
  const numbers = row.split(' ');
  let isAdjacent = true;
  let change = []

  for (let i = 0; i < numbers.length ; i++) {
    const next = numbers[i+1]

    if (next) {
      const diff = (next  - numbers[i])
      change.push(diff)

      if (MIN <= Math.abs(diff) && Math.abs(diff) <= MAX) {
        isAdjacent = true
      } else {
        isAdjacent = false;
        break;
      }

    }


  }
  const isAllDecreasing = change.every((n) => n > 0)
  const isAllIncreasing = change.every((n) => n < 0)
  const safe = isAdjacent && (isAllIncreasing || isAllDecreasing)


  res[rowIndex] = safe ? 'safe' : 'unsafe'


})

console.log(res);
console.log(Object.values(res).filter((s) => s === 'safe').length);