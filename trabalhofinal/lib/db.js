const fs = require('fs');
const path = require('path');
const os = require('os');

const TMP_FILE = path.join(os.tmpdir(), 'bd-alunos.json');
const SOURCE_FILE = path.join(__dirname, '..', 'json', 'bd.json');
const seedData = require('../json/bd.json');

function loadSeedData() {
    if (fs.existsSync(SOURCE_FILE)) {
        return JSON.parse(fs.readFileSync(SOURCE_FILE, 'utf8'));
    }

    return JSON.parse(JSON.stringify(seedData));
}

function readDb() {
    if (fs.existsSync(TMP_FILE)) {
        return JSON.parse(fs.readFileSync(TMP_FILE, 'utf8'));
    }

    const data = loadSeedData();
    writeDb(data);
    return data;
}

function writeDb(data) {
    fs.writeFileSync(TMP_FILE, JSON.stringify(data, null, 2));
}

function getAlunos() {
    return readDb().alunos;
}

module.exports = {
    readDb,
    writeDb,
    getAlunos
};
