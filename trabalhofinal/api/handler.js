const { readDb, writeDb, getAlunos } = require('../lib/db');

function parseBody(req) {
    if (!req.body) {
        return {};
    }

    return typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
}

module.exports = async (req, res) => {
    try {
        const id = req.query.id ? Number(req.query.id) : null;

        if (id === null) {
            if (req.method === 'GET') {
                return res.status(200).json(await getAlunos());
            }

            if (req.method === 'POST') {
                const db = await readDb();
                const nextId = db.alunos.reduce((maxId, aluno) => Math.max(maxId, aluno.id), 0) + 1;
                const newAluno = { ...parseBody(req), id: nextId };

                db.alunos.push(newAluno);
                await writeDb(db);

                return res.status(201).json(newAluno);
            }

            return res.status(405).json({ error: 'Method not allowed' });
        }

        const db = await readDb();
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

            db.alunos[index] = { ...parseBody(req), id };
            await writeDb(db);

            return res.status(200).json(db.alunos[index]);
        }

        if (req.method === 'DELETE') {
            if (index === -1) {
                return res.status(404).json({ error: 'Aluno not found' });
            }

            const removed = db.alunos.splice(index, 1)[0];
            await writeDb(db);

            return res.status(200).json(removed);
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
