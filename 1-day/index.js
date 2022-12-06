//import input.txt to json
//add up each 'elf' object for a total
//determine the elf with the largest total

//* Import
import fs from "fs";

const input = fs.readFileSync(
  "D:\\\\Projects\\\\Advent-Of-Code-2022\\\\1-day\\\\input.txt",
  "utf8",
  (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    return data;
  }
);

const cells = input.split("\r\n");

let newArray = [];
let tempArray = [];
for (let i = 0; i < cells.length; i++) {
  const element = cells[i];

  if (element !== "") {
    tempArray.push(Number(element));
  } else {
    newArray.push(tempArray);
    tempArray = [];
  }
}

//* Add Up
let addedArray = [];
let currentNumber = 0;

for (let i = 0; i < newArray.length; i++) {
  newArray[i].forEach((element) => {
    currentNumber = currentNumber + element;
  });

  addedArray.push(currentNumber);
  currentNumber = 0;
}

//part 1
console.log(Math.max(...addedArray));
//part 2
addedArray.sort((a, b) => b - a).splice(3, addedArray.length);
console.log(addedArray.reduce((a, b) => a + b));
