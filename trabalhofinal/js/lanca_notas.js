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
    document.getElementById('nota1').value = aluno.nota_1;
    document.getElementById('nota2').value = aluno.nota_2;
}


const lancarNotas = document.getElementById('lancar-notas');
lancarNotas.addEventListener('click', async (e) => {
    e.preventDefault();

    const nomeAluno = document.getElementById('nome-aluno').value;
    const cursos = document.getElementById('cursos').value;
    const nota1 = document.getElementById('nota1').value;
    const nota2 = document.getElementById('nota2').value;

    const alunoData = {
        nome: nomeAluno,
        curso: cursos,
        semestre: aluno.semestre,
        data_nascimento: aluno.data_nascimento,
        nota_1: nota1,
        nota_2: nota2
    }
    await editAluno(idAluno, alunoData);
    window.location.href = 'notas.html';
});