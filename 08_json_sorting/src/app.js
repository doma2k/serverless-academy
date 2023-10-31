const reqtimes = 3;
let countFalse = 0;
let countTrue = 0;
let resp;
const apiListx = [
  "https://jsonbase.com/sls-team/json-793",
  "https://jsonbase.com/sls-team/json-955",
  "https://jsonbase.com/sls-team/json-231",
  "https://jsonbase.com/sls-team/json-931",
  "https://jsonbase.com/sls-team/json-93",
  "https://jsonbase.com/sls-team/json-342",
  "https://jsonbase.com/sls-team/json-770",
  "https://jsonbase.com/sls-team/json-491",
  "https://jsonbase.com/sls-team/json-281",
  "https://jsonbase.com/sls-team/json-718",
  "https://jsonbase.com/sls-team/json-310",
  "https://jsonbase.com/sls-team/json-806",
  "https://jsonbase.com/sls-team/json-469",
  "https://jsonbase.com/sls-team/json-258",
  "https://jsonbase.com/sls-team/json-516",
  "https://jsonbase.com/sls-team/json-79",
  "https://jsonbase.com/sls-team/json-706",
  "https://jsonbase.com/sls-team/json-521",
  "https://jsonbase.com/sls-team/json-350",
  "https://jsonbase.com/sls-team/json-64",
];

const apiList = [
  "http://localhost:3000/sls-team/json-793",
  "http://localhost:3000/sls-team/json-955",
  "http://localhost:3000/sls-team/json-231",
  "http://localhost:3000/sls-team/json-931",
  "http://localhost:3000/sls-team/json-93",
  "http://localhost:3000/sls-team/json-342",
  "http://localhost:3000/sls-team/json-770",
  "http://localhost:3000/sls-team/json-491",
  "http://localhost:3000/sls-team/json-281",
  "http://localhost:3000/sls-team/json-718",
  "http://localhost:3000/sls-team/json-310",
  "http://localhost:3000/sls-team/json-806",
  "http://localhost:3000/sls-team/json-469",
  "http://localhost:3000/sls-team/json-258",
  "http://localhost:3000/sls-team/json-516",
  "http://localhost:3000/sls-team/json-79",
  "http://localhost:3000/sls-team/json-706",
  "http://localhost:3000/sls-team/json-521",
  "http://localhost:3000/sls-team/json-350",
  "http://localhost:3000/sls-team/json-64",
];

async function parceJson(api, requests) {
  let response;
  let data;
  
  for (let i = 0; i < requests; i++) {
    response = await fetch(api);
    if (response && response.ok) {
      data = await response.json();
      break;
    }
  }

  if (!response || !response.ok) {
    return { result: `[FAILED]`, data: null };
  } else {
    const resp = findIsDone(data);
    return { result: `[SUCCESS]`, data: resp };
  }
}

function findIsDone(obj) {
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      const result = findIsDone(obj[key]);
      if (result !== null) {
        return result;
      }
    } else if (key === 'isDone' && typeof obj[key] === 'boolean') {
      return obj;
    }
  }
  return null; 
}

async function processAPIs() {
  for (let i = 0; i < apiList.length; i++) {
    const { result, data } = await parceJson(apiList[i], reqtimes);
    if (data) {
      console.log(`${result} ${apiList[i]}: isDone - ${data.isDone}`);
      if (data.isDone === true) {
        countTrue++;
      } else {
        countFalse++;
      }
    } else {
      console.log(`${result} ${apiList[i]}: isDone not found.`);
    }
  }
  
  console.log(`Count of 'isDone' true: ${countTrue}`);
  console.log(`Count of 'isDone' false: ${countFalse}`);
}

processAPIs();