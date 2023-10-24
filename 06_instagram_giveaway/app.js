import fs from "node:fs/promises";
import path from "path";

async function readFilesInDirectory(directory) {
  try {
    const files = await fs.readdir(directory);
    return files;
  } catch (error) {
    console.error("Error reading directory:", error);
    return [];
  }
}

async function readFile(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return content;
  } catch (error) {
    console.error("Error reading file:", error);
    return "";
  }
}

function getUniqueValues(arr) {
  return Array.from(new Set(arr));
}

async function findUsernamesInAllFiles(directory, files) {
  let usernamesInAllFiles = new Set();

  for (const file of files) {
    const filePath = path.join(directory, file);
    const content = await readFile(filePath);
    const lines = content.split("\n");
    const fileUsernames = new Set(lines.map((line) => line.trim()));

    if (usernamesInAllFiles.size === 0) {
      usernamesInAllFiles = fileUsernames;
    } else {
      for (const username of usernamesInAllFiles) {
        if (!fileUsernames.has(username)) {
          usernamesInAllFiles.delete(username);
        }
      }
    }
  }

  return usernamesInAllFiles;
}

async function findUsernamesInAtLeastTen(directory, files) {
  const usernameCount = new Map();

  for (const file of files) {
    const filePath = path.join(directory, file);
    const content = await readFile(filePath);
    const lines = content.split("\n");

    for (const line of lines) {
      const username = line.trim();

      if (username) {
        if (!usernameCount.has(username)) {
          usernameCount.set(username, 1);
        } else {
          usernameCount.set(username, usernameCount.get(username) + 1);
        }
      }
    }
  }

  return Array.from(usernameCount.entries()).filter(([username, count]) => count >= 10);
}

async function main() {
  const currentDirectory = path.dirname(new URL(import.meta.url).pathname);
  const folderName = "words/";
  const folderPath = path.join(currentDirectory, folderName);

  const startTime = performance.now();

  const files = await readFilesInDirectory(folderPath);
  if (files.length === 0) {
    console.log("No files found in the directory.");
    return;
  }

  const allFileContents = [];
  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const content = await readFile(filePath);
    allFileContents.push(...content.split("\n"));
  }

  console.log("Total values: " + allFileContents.length);
  
  const uniqueValues = getUniqueValues(allFileContents);
  console.log("Number of unique values: " + uniqueValues.length);

  const usernamesInAllFiles = await findUsernamesInAllFiles(folderPath, files);
  console.log("Number of usernames occurring in all files:", usernamesInAllFiles.size);

  const usernamesInAtLeastTen = await findUsernamesInAtLeastTen(folderPath, files);
  console.log("Number of usernames occurring in at least 10 files:", usernamesInAtLeastTen.length);

  const endTime = performance.now();
  const executionTime = endTime - startTime;
  console.log(`Execution time: ${executionTime} milliseconds`);
}

main();
