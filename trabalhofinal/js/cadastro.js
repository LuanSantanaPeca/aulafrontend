import { setAlunosData } from './data.js';

const cadastrarAluno = document.getElementById('cadastrar-aluno');
cadastrarAluno.addEventListener('click', async (e) => {
    e.preventDefault();

    const nomeAluno = document.getElementById('nome-aluno').value;
    const cursos = document.getElementById('cursos').value;
    const semestre = document.getElementById('semestre').value;
    const nascimento = document.getElementById('nascimento').value;

    const alunoData = {
        nome: nomeAluno,
        curso: cursos,
        semestre: semestre,
        data_nascimento: nascimento,
    }
    await setAlunosData(alunoData);
    window.location.href = 'index.html';
});