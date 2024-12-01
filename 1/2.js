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
        lefts.push(r)
        flag = true
      } else {
        rights.push(r)
        flag = false
      }
    }
  })
})

if (lefts.length !== rights.length) {
  throw new Error('Wrong length')
}

const appears = {}
for (let i = 0; i < rights.length ; i++) {
  const right = rights[i];

  const appear = appears[right];
  if (!appear) {
    appears[`${right}`] = 1
  } else {
    appears[`${right}`] = +appear + 1
  }
}

let total = 0;
for (let i = 0; i < lefts.length ; i++) {
    const left = lefts[i];
    const appear = appears[left];

   total += left * (appear || 0)
}

console.log(total);
