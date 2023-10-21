#!/usr/bin/env node

import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import {
  sortAlph,
  sortNumToGreater,
  sortAscLetters,
  sortNumToSmaller,
  sortUniqVal,
  sortUniqWords,
} from "./sort.js";

// Stupid name ... for main var)
let answer;
const rl = readline.createInterface({ input, output });

const menuOptions = [
  { id: 1, text: "Sort words alphabetically" },
  { id: 2, text: "Show numbers from lesser to greater" },
  { id: 3, text: "Show numbers from bigger to smaller" },
  {
    id: 4,
    text: "Display words in ascending order by number of letters in the word",
  },
  { id: 5, text: "Show only unique words" },
  {
    id: 6,
    text: "Display only unique values from the set of words and numbers entered by the user",
  },
  {
    id: 7,
    text: "Exit program",
  },
];

async function displayMenu(options) {
  console.log("How would you like to sort your values:");
  options.forEach((option) => {
    console.log(`${option.id}. ${option.text}`);
  });
}
async function userInput() {
  do {
    const inputUser = await rl.question("Enter 10 words or numbers: ");
    answer = inputUser.split(" ").filter((empty) => empty !== "");

    if (answer.length !== 1) {
      console.log("Please enter exactly 10 values!");
    }
  } while (answer.length !== 1);

  return answer;
}

async function sortMenu(arr) {
  displayMenu(menuOptions);
  rl.on("line", (xyz) => {
    switch (xyz) {
      case "1":
        console.log("Sorted alphabetically: ");
        sortAlph(arr);
        break;
      case "2":
        console.log("Sorted: ");
        sortNumToGreater(arr);
        break;
      case "3":
        console.log("Sorted: ");
        sortNumToSmaller(arr);
        break;
      case "4":
        console.log("Sorted: ");
        sortAscLetters(arr);
        break;
      case "5":
        console.log("Sorted: ");
        sortUniqWords(arr);
        break;
      case "6":
        console.log("Sorted: ");
        sortUniqVal(arr);
        break;
      case "7":
        console.log("Goog buy!");
        process.exit();
        break;
      default:
        console.log('Please select a valid option or type "EXIT"');
        break;
    }
  });
}

async function main() {
  const userAnswer = await userInput();
  console.log(userAnswer);
  sortMenu();
}

main();
