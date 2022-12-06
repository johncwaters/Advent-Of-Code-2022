// Import input
// Transform input to value number
// Calculate win or lose
// Add up totals

/* Format:
{
    "games": [{
        "P1": "1",
        "P2": "3",
        "R": "3"
    }, {
      "P1": "1",
        "P2": "3",
        "R": "3"
    }
]
}
*/

//* Import
import fs from "fs";

const input = fs.readFileSync(
  "D:\\\\Projects\\\\Advent-Of-Code-2022\\\\2-day\\\\input.txt",
  "utf8",
  (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    return data;
  }
);

const regX = new RegExp("X", "g");
const regY = new RegExp("Y", "g");
const regZ = new RegExp("Z", "g");

const cells = input
  .replace(regX, "A")
  .replace(regY, "B")
  .replace(regZ, "C")
  .split("\r\n");

function readLetter(letter) {
  if (letter === "A") {
    return 1;
  }
  if (letter === "B") {
    return 2;
  }
  if (letter === "C") {
    return 3;
  }

  //ELSE
  return -10000;
}

/*
1 / A / X - Rock
2 / B / Y - Paper
3 / C / Z - Scissors

3 - Draw
6 - Win
*/

function getResult(pair) {
  //DRAW
  if (pair[0] === pair[1]) {
    return 3;
  }

  //WINS
  if (pair[0] === "C" && pair[1] === "A") {
    return 6;
  }

  if (pair[0] === "A" && pair[1] === "B") {
    return 6;
  }

  if (pair[0] === "B" && pair[1] === "C") {
    return 6;
  }

  //LOSE
  if (pair[0] === "A" && pair[1] === "C") {
    return 0;
  }

  if (pair[0] === "B" && pair[1] === "A") {
    return 0;
  }

  if (pair[0] === "C" && pair[1] === "B") {
    return 0;
  }

  //ELSE
  return -10000;
}

//* Transform
const ourResults = [];

for (let i = 0; i < cells.length; i++) {
  const element = cells[i];

  let pair = element.split(" ");

  let p1 = readLetter(pair[0]);
  let p2 = readLetter(pair[1]);
  let r = getResult(pair);

  let thisResult = {
    P1: p1,
    P2: p2,
    R: r,
  };

  ourResults.push(thisResult);
}

let totalResult = 0;
//* Tally Results
for (let i = 0; i < ourResults.length; i++) {
  totalResult += ourResults[i].P2 + ourResults[i].R;
}

console.log("🚀 ~ file: index.js:128 ~ totalResult", totalResult);

//! Part 2

/*
Column 1
1 / A / X - Rock
2 / B / Y - Paper
3 / C / Z - Scissors

Column 2
A / X - Lose
B / Y - Draw
C / Z -Win

Result
3 - Draw
6 - Win
*/

function getChoice(pair) {
  //Result Needed: Draw
  if (pair[1] === "B") {
    if (pair[0] === "A") {
      return 1;
    }
    if (pair[0] === "B") {
      return 2;
    }
    if (pair[0] === "C") {
      return 3;
    }
  }

  //Result Needed: Win
  if (pair[1] === "C") {
    if (pair[0] === "A") {
      return 2;
    }
    if (pair[0] === "B") {
      return 3;
    }
    if (pair[0] === "C") {
      return 1;
    }
  }

  //Result Needed: Lose
  if (pair[1] === "A") {
    if (pair[0] === "A") {
      return 3;
    }
    if (pair[0] === "B") {
      return 1;
    }
    if (pair[0] === "C") {
      return 2;
    }
  }
  //ELSE
  return -10000;
}

function getResultPart2(pair) {
  //DRAW
  if (pair[0] === pair[1]) {
    return 3;
  }

  //WINS
  if (pair[0] === 3 && pair[1] === 1) {
    return 6;
  }

  if (pair[0] === 1 && pair[1] === 2) {
    return 6;
  }

  if (pair[0] === 2 && pair[1] === 3) {
    return 6;
  }

  //LOSE
  if (pair[0] === 1 && pair[1] === 3) {
    return 0;
  }

  if (pair[0] === 2 && pair[1] === 1) {
    return 0;
  }

  if (pair[0] === 3 && pair[1] === 2) {
    return 0;
  }

  //ELSE
  return -10000;
}

//* Transform
const ourResultsPart2 = [];

for (let i = 0; i < cells.length; i++) {
  const element = cells[i];

  let pair = element.split(" ");

  let p1 = readLetter(pair[0]);
  let p2 = getChoice(pair);
  let r = getResultPart2([p1, p2]);

  let thisResult = {
    P1: p1,
    P2: p2,
    R: r,
  };

  ourResultsPart2.push(thisResult);
}

console.log("🚀 ~ file: index.js:148 ~ ourResultsPart2", ourResultsPart2);

let totalResultPart2 = 0;
//* Tally Results
for (let i = 0; i < ourResultsPart2.length; i++) {
  totalResultPart2 += ourResultsPart2[i].P2 + ourResultsPart2[i].R;
}

console.log("🚀 ~ file: index.js:175 ~ totalResult", totalResultPart2);
