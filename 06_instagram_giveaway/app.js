import fs from "node:fs/promises";
import path from "path";

const currentDirectory = path.dirname(new URL(import.meta.url).pathname);
const folderName = "words/";
const folderPath = path.join(currentDirectory, folderName);
const files = await fs.readdir(folderPath);
let content;

for (const file of files) {
  const filePath = path.join(folderPath, file);
  content = await fs.readFile(filePath, "utf-8");
}
  

// uniqueValues(); // returns 1234
// existInAllFiles(); // returns 42
// existInAtleastTen(); // returns 50
