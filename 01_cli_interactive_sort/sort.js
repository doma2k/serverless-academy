// Sort words alphabetically
export async function sortAlph(arr) {
  const words = /^[A-Za-z]+$/;
  const filtered = arr.filter((value) => words.test(value));
  const sorted = filtered.sort((a, b) => a.localeCompare(b));

  console.log(sorted);
}

// Show numbers from lesser to greater
export async function sortNumToGreater(arr) {
  const numericValues = arr.filter((value) => !isNaN(value));
  const sorted = numericValues.sort((a, b) => parseFloat(a) - parseFloat(b));

  console.log(sorted);
}

// Show numbers from bigger to smaller
export async function sortNumToSmaller(arr) {
  const numericValues = arr.filter((value) => !isNaN(value));
  const sorted = numericValues.sort((a, b) => parseFloat(b) - parseFloat(a));

  console.log(sorted);
}

// Display words in ascending order by number of letters in the word
export async function sortAscLetters(arr) {
  const words = /^[A-Za-z]+$/;
  const filtered = arr.filter((value) => words.test(value));
  let arrLetLength = [];
  for (let i = 0; i < filtered.length; i++) {
    arrLetLength.push(filtered[i].length);
  }
  const sorted = arrLetLength.sort((a, b) => a - b);
  console.log(sorted);
}

// Show only unique words
export async function sortUniqWords(arr) {
  const words = /^[A-Za-z]+$/;
  const filtered = arr.filter((value) => words.test(value));
  const uniqueValues = [...new Set(filtered)];
  console.log(uniqueValues);
}

// Display only unique values from the set of words and numbers entered by the user
export async function sortUniqVal(arr) {
  const words = /^[A-Za-z]+$/;
  const alphanumericValues = arr.filter((value) => !words.test(value));
  const numericValues = alphanumericValues.filter((value) => isNaN(value));

  const uniqueValues = [...new Set(numericValues)];
  console.log(uniqueValues);
}
