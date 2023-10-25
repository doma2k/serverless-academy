import fs from "node:fs/promises";

const filePath = "./data.json";
const vacationList = await fs.readFile(filePath, "utf-8");
const vacationListJson = JSON.parse(vacationList);
const userMap = new Map();
for (const item of vacationListJson) {
  const userName = item.user.name;

  if (!userMap.has(userName)) {
    userMap.set(userName, {
      userId: item.user._id,
      userName,
      vacations: [],
    });
  }
  const modifiedVacation = {
    usedDays: item.usedDays,
    endDate: item.endDate,
    startDate: item.startDate,
    status: item.status,
  };
  userMap.get(userName).vacations.push(modifiedVacation);
}
const userList = Array.from(userMap.values());
const formattedJSON = JSON.stringify(userList, null, 2);
console.log(formattedJSON);
