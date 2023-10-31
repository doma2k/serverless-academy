const reqtimes = 3;
const apiList = [
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
    return `[FAILED]`;
  } else {
    return `[SUCCESS]`;
  }
}

for (let i = 0; i < apiList.length; i++) {
  const response = await parceJson(apiList[i]);
  console.log(response + " " + apiList[i]);
}

