import fs from 'fs/promises';
const filePath = './data.json';

async function main() {
  try {
    const vacationList = await fs.readFile(filePath, 'utf-8');
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

      const existingUser = userMap.get(userName);
      const isDuplicate = existingUser.vacations.some((vacation) =>
        areVacationsEqual(vacation, modifiedVacation)
      );

      if (!isDuplicate) {
        existingUser.vacations.push(modifiedVacation);
      }
    }

    const userList = Array.from(userMap.values());
    const formattedJSON = JSON.stringify(userList, null, 2);
    console.log(formattedJSON);
  } catch (error) {
    console.error('Error reading or processing the file:', error);
  }
}

function areVacationsEqual(vacation1, vacation2) {
  return (
    vacation1.usedDays === vacation2.usedDays &&
    vacation1.endDate === vacation2.endDate &&
    vacation1.startDate === vacation2.startDate &&
    vacation1.status === vacation2.status
  );
}

main();
