import { updateListAlunos } from './data.js';
import { dataCursoRelation } from './dataCursoRelation.js';
import { getAlunoMedia, getAlunoSituacao } from './sort.js';

function formatMedia(media) {
    return Number(media.toFixed(2));
}

function calcEstatisticaGeral(alunos) {
    return {
        total: alunos.length,
        aprovados: alunos.filter((aluno) => getAlunoSituacao(aluno) === 'Aprovado').length,
        recuperacao: alunos.filter((aluno) => getAlunoSituacao(aluno) === 'Recuperação').length,
        reprovados: alunos.filter((aluno) => getAlunoSituacao(aluno) === 'Reprovado').length
    };
}

function calcRelatorioCurso(alunos) {
    const porCurso = Object.entries(dataCursoRelation).map(([cursoId, cursoNome]) => ({
        cursoId,
        cursoNome,
        quantidade: alunos.filter((aluno) => aluno.curso === cursoId).length
    }));

    return {
        total: alunos.length,
        porCurso
    };
}

function calcDesempenhoAcademico(alunos) {
    if (alunos.length === 0) {
        return {
            maiorMedia: 0,
            menorMedia: 0,
            mediaGeral: 0,
            qtdeMaiorMedia: 0,
            qtdeAcimaMediaGeral: 0,
            qtdeAbaixoMediaGeral: 0
        };
    }

    const medias = alunos.map((aluno) => getAlunoMedia(aluno));
    const maiorMedia = Math.max(...medias);
    const menorMedia = Math.min(...medias);
    const mediaGeral = medias.reduce((soma, media) => soma + media, 0) / medias.length;

    return {
        maiorMedia: formatMedia(maiorMedia),
        menorMedia: formatMedia(menorMedia),
        mediaGeral: formatMedia(mediaGeral),
        qtdeMaiorMedia: medias.filter((media) => media === maiorMedia).length,
        qtdeAcimaMediaGeral: medias.filter((media) => media > mediaGeral).length,
        qtdeAbaixoMediaGeral: medias.filter((media) => media < mediaGeral).length
    };
}

function calcTop5(alunos) {
    return [...alunos]
        .sort((a, b) => getAlunoMedia(b) - getAlunoMedia(a))
        .slice(0, 5);
}

function renderListItem(label, value) {
    return `<li><span class="relatorio-label">${label}</span><span class="relatorio-value">${value}</span></li>`;
}

function renderEstatisticaGeral(alunos) {
    const stats = calcEstatisticaGeral(alunos);

    document.getElementById('estatistica-geral').innerHTML = [
        renderListItem('Total de Alunos', stats.total),
        renderListItem('Número de Alunos Aprovados', stats.aprovados),
        renderListItem('Número de Alunos em Recuperação', stats.recuperacao),
        renderListItem('Número de Alunos Reprovados', stats.reprovados)
    ].join('');
}

function renderRelatorioCurso(alunos) {
    const relatorio = calcRelatorioCurso(alunos);

    const itensCurso = relatorio.porCurso.map(
        (curso) => renderListItem(`Número de Alunos em ${curso.cursoNome}`, curso.quantidade)
    ).join('');

    document.getElementById('relatorio-curso').innerHTML = [
        renderListItem('Total de Alunos', relatorio.total),
        itensCurso
    ].join('');
}

function renderDesempenhoAcademico(alunos) {
    const desempenho = calcDesempenhoAcademico(alunos);

    document.getElementById('desempenho-academico').innerHTML = [
        renderListItem('Maior Média', desempenho.maiorMedia),
        renderListItem('Menor Média', desempenho.menorMedia),
        renderListItem('Média Geral', desempenho.mediaGeral),
        renderListItem('Qtde de Alunos com a Maior Média', desempenho.qtdeMaiorMedia),
        renderListItem('Qtde de Alunos Acima da Média Geral', desempenho.qtdeAcimaMediaGeral),
        renderListItem('Qtde de Alunos Abaixo da Média Geral', desempenho.qtdeAbaixoMediaGeral)
    ].join('');
}

function renderTop5(alunos) {
    const top5 = calcTop5(alunos);
    const container = document.getElementById('top-5');

    if (top5.length === 0) {
        container.innerHTML = '<p class="relatorio-empty">Nenhum aluno cadastrado.</p>';
        return;
    }

    container.innerHTML = `
        <table class="relatorio-top5-table">
            <tr class="table-header">
                <th>Posição</th>
                <th>Nome</th>
                <th>Curso</th>
                <th>Média</th>
            </tr>
            ${top5.map((aluno, index) => `
                <tr class="table-row">
                    <td>${index + 1}º</td>
                    <td>${aluno.nome}</td>
                    <td>${dataCursoRelation[aluno.curso] || aluno.curso}</td>
                    <td>${formatMedia(getAlunoMedia(aluno))}</td>
                </tr>
            `).join('')}
        </table>
    `;
}

function initDropdowns() {
    document.querySelectorAll('.relatorio-dropdown').forEach((dropdown) => {
        const header = dropdown.querySelector('.relatorio-dropdown-header');

        header.addEventListener('click', () => {
            dropdown.classList.toggle('open');
        });
    });
}

async function loadRelatorios() {
    const alunos = await updateListAlunos();

    renderEstatisticaGeral(alunos);
    renderRelatorioCurso(alunos);
    renderDesempenhoAcademico(alunos);
    renderTop5(alunos);
}

initDropdowns();
loadRelatorios();
