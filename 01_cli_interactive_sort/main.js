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

let answer;
const rl = readline.createInterface({ input, output });

const menuOptions = [
  { id: 1, text: "Sort words alphabetically" },
  { id: 2, text: "Show numbers from lesser to greater" },
  { id: 3, text: "Show numbers from bigger to smaller" },
  {
    id: 4,
    text: "Display words in ascending order by the number of letters in the word",
  },
  { id: 5, text: "Show only unique words" },
  {
    id: 6,
    text: "Display only unique values from the set of words and numbers entered by the user",
  },
];

async function displayMenu(options) {
  console.log("How would you like to sort your values:\n");
  options.forEach((option) => {
    console.log(`${option.id}. ${option.text}`);
  });
  console.log("\nSelect (1 - 7) and press ENTER");
}

async function userInput() {
  do {
    const inputUser = await rl.question("\nEnter 10 words or numbers: ");
    answer = inputUser.split(" ").filter((empty) => empty !== "");

    if (answer.length !== 10) {
      console.log("Please enter exactly 10 values!");
    }
  } while (answer.length !== 10);

  return answer;
}

async function sortMenu() {
  while (true) {
    const userAnswer = await userInput();
    displayMenu(menuOptions);
    const userChoice = await rl.question("Enter your choice: ");
    switch (userChoice) {
      case "1":
        console.log("Sorted: alphabetically");
        sortAlph(userAnswer);
        break;
      case "2":
        console.log("Sorted: lesser to greater");
        sortNumToGreater(userAnswer);
        break;
      case "3":
        console.log("Sorted: bigger to smaller");
        sortNumToSmaller(userAnswer);
        break;
      case "4":
        console.log("Sorted: by the number of letters in the word");
        sortAscLetters(userAnswer);
        break;
      case "5":
        console.log("Sorted: only unique words");
        sortUniqWords(userAnswer);
        break;
      case "6":
        console.log("Sorted: unique values");
        sortUniqVal(userAnswer);
        break;
      case "exit":
        console.log("Goodbye!");
        process.exit();
        break;
      default:
        console.log('Please select a valid option or type "exit" to exit.');
    }
  }
}

async function main() {
  sortMenu();
}

main();
