const { readDb, writeDb, getAlunos } = require('../_lib/db');

module.exports = (req, res) => {
    if (req.method === 'GET') {
        return res.status(200).json(getAlunos());
    }

    if (req.method === 'POST') {
        const db = readDb();
        const nextId = db.alunos.reduce((maxId, aluno) => Math.max(maxId, aluno.id), 0) + 1;
        const newAluno = { ...req.body, id: nextId };

        db.alunos.push(newAluno);
        writeDb(db);

        return res.status(201).json(newAluno);
    }

    return res.status(405).json({ error: 'Method not allowed' });
};
