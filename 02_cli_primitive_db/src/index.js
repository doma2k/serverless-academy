import { input, confirm } from '@inquirer/prompts';
import select from '@inquirer/select';
import fs from 'node:fs/promises';

const usersFile = './src/data/users.txt';

async function isName() {
    const name = await input({ message: 'Enter your name (or press Enter to stop adding users):' });
    return name.trim();
}

async function isAge() {
    let age;
    while (true) {
        age = await input({ message: 'Enter your age: ' });
        if (age === '' || !isNaN(age)) {
            break;
        }
        console.log('Enter valid age, or leave empty!')
    }
    return age.trim();
}

async function appendUserToFile(user) {
    try {
        const existingData = await fs.readFile(usersFile, 'utf8');
        const users = JSON.parse(existingData);
        users.push(user);
        const updatedData = JSON.stringify(users);
        await fs.writeFile(usersFile, updatedData, 'utf8');
    } catch (err) {
        console.error('Error appending user to file:', err);
    }
}

async function userSearch(jsonData) {
    const nameToSearch = await input({ message: 'Enter user name you want to find in DB: ' });
    for (const name in jsonData) {
        if (jsonData[name].name === nameToSearch) {
            console.log(`User ${nameToSearch} found in the database.`);
            return jsonData[name];
        }
    }
    console.log(`${nameToSearch} not found in the database.`);
}


async function main() {
    try {
        while (true) {
            const name = await isName();
            if (name === '') {
                const contenue = await confirm({ message: 'Would you like to search users in the database?' });
                if (contenue) {
                    try {
                        const fileR = await fs.readFile(usersFile, 'utf8');
                        const jsonData = JSON.parse(fileR);
                        console.log(jsonData);
                        const found = await userSearch(jsonData)
                        console.log(found);
                    } catch (err) {
                        console.error('Error reading or parsing the file:', err);
                    }
                    break;
                }
                console.log('Goodbye! See you later!');
                break;
            }

            const age = await isAge();

            const gender = await select({
                message: 'Select your gender',
                choices: [
                    {
                        name: 'male',
                        value: 'male',
                    },
                    {
                        name: 'female',
                        value: 'female',
                    },
                ],
            });

            const user = { name, gender, age };
            await appendUserToFile(user);
        }
        process.exit(0);
    } catch(err) {
        console.log('Programm terminated...')
    }
}

main();
