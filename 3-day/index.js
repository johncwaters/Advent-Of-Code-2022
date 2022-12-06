//* Import
import fs from "fs";

const input = fs.readFileSync(
  "D:\\\\Projects\\\\Advent-Of-Code-2022\\\\3-day\\\\input.txt",
  "utf8",
  (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    return data;
  }
);

// Import data
// Split each line in half and place in an object
// Determine common characters and save to an array in that object
// Determine common characters priority points
// Add up all priority points for answer

const cells = input.split("\r\n");

function convertLetterToNumber(str) {
  //Yoink https://www.folkstalk.com/2022/09/javascript-alphabet-to-number-with-code-examples.html
  if (/^[a-z]+$/.test(str)) {
    str = str.toUpperCase();
    let out = 0,
      len = str.length;
    for (let pos = 0; pos < len; pos++) {
      out += (str.charCodeAt(pos) - 64) * Math.pow(26, len - pos - 1);
    }
    return out;
  }
  if (/^[A-Z]+$/.test(str)) {
    str = str.toUpperCase();
    let out = 0,
      len = str.length;
    for (let pos = 0; pos < len; pos++) {
      out += (str.charCodeAt(pos) - 64) * Math.pow(26, len - pos - 1) + 26;
    }
    return out;
  }

  return undefined;
}

function findMatch(firstHalf, secondHalf) {
  let match = [];
  //Definitely a lazy way of doing this but here it goes:
  for (let i = 0; i < firstHalf.length; i++) {
    for (let s = 0; s < secondHalf.length; s++) {
      if (firstHalf.charAt(i) === secondHalf.charAt(s)) {
        match.push(firstHalf.charAt(i));
        return match;
      }
    }
  }
}

let ourResults = 0;
for (let i = 0; i < cells.length; i++) {
  let halfLength = cells[i].length / 2;
  let firstHalf = cells[i].substring(0, halfLength);
  let secondHalf = cells[i].substring(halfLength, cells.length);

  let match = findMatch(firstHalf, secondHalf);

  ourResults += convertLetterToNumber(match[0]);
}

// ! Part 1
console.log(ourResults);

// ! Part 2
// Group them together in 3s
let groups = [];
let group = [];
for (let i = 0; i < cells.length; i++) {
  if (i % 3 !== 2) {
    group.push(cells[i]);
  } else {
    group.push(cells[i] + 1);
    groups.push(group);
    group = [];
  }
}

function findMatchP2(firstHalf, secondHalf, thirdHalf) {
  let match = [];
  //I am not proud of this, but I am tired, and I know it'll work for this
  for (let i = 0; i < firstHalf.length; i++) {
    for (let s = 0; s < secondHalf.length; s++) {
      if (firstHalf.charAt(i) === secondHalf.charAt(s)) {
        for (let t = 0; t < thirdHalf.length; t++) {
          if (secondHalf.charAt(s) === thirdHalf.charAt(t)) {
            match.push(firstHalf.charAt(i));
            return match;
          }
        }
      }
    }
  }
}

let ourResultsP2 = 0;
for (let i = 0; i < groups.length; i++) {
  let firstHalf = groups[i][0];
  let secondHalf = groups[i][1];
  let thirdHalf = groups[i][2];

  let match = findMatchP2(firstHalf, secondHalf, thirdHalf);

  //no changes to this tho!
  ourResultsP2 += convertLetterToNumber(match[0]);
}

console.log(ourResultsP2);
