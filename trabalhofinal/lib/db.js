const fs = require('fs');
const path = require('path');

const TMP_FILE = path.join('/tmp', 'bd-alunos.json');
const SOURCE_FILE = path.join(process.cwd(), 'json', 'bd.json');

function readDb() {
    if (fs.existsSync(TMP_FILE)) {
        return JSON.parse(fs.readFileSync(TMP_FILE, 'utf8'));
    }

    const data = JSON.parse(fs.readFileSync(SOURCE_FILE, 'utf8'));
    fs.writeFileSync(TMP_FILE, JSON.stringify(data));
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
