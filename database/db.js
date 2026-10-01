const fs = require('fs/promises');
const path = require('path');

const pathToFile = path.join(__dirname, "../db.json");

async function readFile() {
    let data = await fs.readFile(pathToFile, 'utf8');

    return JSON.parse(data);
}

module.exports = {
    readFile
};