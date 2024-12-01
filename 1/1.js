const path = require('path');
const input = require('fs')

const file = input.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim();


const string = file.split(' ')

const lefts = []
const rights = []
let flag = false

string.forEach((line) => {

  const row  = line.split('\n')

  row.forEach(r => {
    if (r && !isNaN(+r)) {
      if (!flag) {
        lefts.push(+r)
        flag = true
      } else {
        rights.push(+r)
        flag = false
      }
    }
  })
})

lefts.sort((a, b) => a - b)
rights.sort((a, b) => a - b)
if (lefts.length !== rights.length) {
  throw new Error('Wrong length')
}

let total = 0;
for (let i = 0; i < rights.length ; i++) {
    const left = lefts[i];
    const right = rights[i];
    const diff = Math.abs(right - left)

  total += diff
}

console.log(total);
