import { getAluno, editAluno } from './data.js';
//------------------------------------------------------------------------//
//Carregar aluno para edição
const idAluno = new URLSearchParams(window.location.search).get('id');
let aluno;

if (idAluno) {
    aluno = await getAluno(idAluno);
    console.log(aluno);
    document.getElementById('nome-aluno').value = aluno.nome;
    document.getElementById('cursos').value = aluno.curso;
    document.getElementById('semestre').value = aluno.semestre;
    document.getElementById('nascimento').value = aluno.data_nascimento;
}


const atualizarAluno = document.getElementById('atualizar-aluno');
atualizarAluno.addEventListener('click', async (e) => {
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
        nota_1: aluno?.nota_1 || '',
        nota_2: aluno?.nota_2 || ''
    }
    await editAluno(idAluno, alunoData);
    window.location.href = 'index.html';
});