const fs = require('fs');
const path = require('path');
const os = require('os');
const { put, list } = require('@vercel/blob');

const TMP_FILE = path.join(os.tmpdir(), 'bd-alunos.json');
const SOURCE_FILE = path.join(__dirname, '..', 'json', 'bd.json');
const BLOB_PATHNAME = 'bd-alunos.json';
const seedData = require('../json/bd.json');

const useBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

function loadSeedData() {
    if (fs.existsSync(SOURCE_FILE)) {
        return JSON.parse(fs.readFileSync(SOURCE_FILE, 'utf8'));
    }

    return JSON.parse(JSON.stringify(seedData));
}

async function readDbFromBlob() {
    const { blobs } = await list({ prefix: BLOB_PATHNAME, limit: 1 });

    if (blobs.length > 0) {
        const response = await fetch(blobs[0].url);

        if (!response.ok) {
            throw new Error('Failed to read database from blob storage');
        }

        return response.json();
    }

    const data = loadSeedData();
    await writeDbToBlob(data);
    return data;
}

async function writeDbToBlob(data) {
    await put(BLOB_PATHNAME, JSON.stringify(data, null, 2), {
        access: 'public',
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/json'
    });
}

function readDbFromFs() {
    if (fs.existsSync(TMP_FILE)) {
        return JSON.parse(fs.readFileSync(TMP_FILE, 'utf8'));
    }

    const data = loadSeedData();
    writeDbToFs(data);
    return data;
}

function writeDbToFs(data) {
    fs.writeFileSync(TMP_FILE, JSON.stringify(data, null, 2));
}

async function readDb() {
    if (useBlob) {
        return readDbFromBlob();
    }

    return readDbFromFs();
}

async function writeDb(data) {
    if (useBlob) {
        return writeDbToBlob(data);
    }

    writeDbToFs(data);
}

async function getAlunos() {
    const db = await readDb();
    return db.alunos;
}

module.exports = {
    readDb,
    writeDb,
    getAlunos
};
