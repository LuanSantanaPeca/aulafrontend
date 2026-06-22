const { readDb, writeDb } = require('../lib/db');

module.exports = (req, res) => {
    const id = Number(req.query.id);
    const db = readDb();
    const index = db.alunos.findIndex((aluno) => aluno.id === id);

    if (req.method === 'GET') {
        if (index === -1) {
            return res.status(404).json({ error: 'Aluno not found' });
        }

        return res.status(200).json(db.alunos[index]);
    }

    if (req.method === 'PUT') {
        if (index === -1) {
            return res.status(404).json({ error: 'Aluno not found' });
        }

        db.alunos[index] = { ...req.body, id };
        writeDb(db);

        return res.status(200).json(db.alunos[index]);
    }

    if (req.method === 'DELETE') {
        if (index === -1) {
            return res.status(404).json({ error: 'Aluno not found' });
        }

        const removed = db.alunos.splice(index, 1)[0];
        writeDb(db);

        return res.status(200).json(removed);
    }

    return res.status(405).json({ error: 'Method not allowed' });
};
