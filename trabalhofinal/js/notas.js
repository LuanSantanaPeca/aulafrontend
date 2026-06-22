import { updateListAlunos } from './data.js';
import { dataCursoRelation } from './dataCursoRelation.js';
import { buildTableHeaderRow, getAlunoMedia, getAlunoSituacao, setupTableSort } from './sort.js';

const tableNotas = document.getElementById('table-notas');

const tableSort = setupTableSort(tableNotas, () => loadTableNotas());

tableNotas.addEventListener('click', async (event) => {
    const notasButton = event.target.closest('.notas-button');
    if (!notasButton) return;

    window.location.href = `lanca_notas.html?id=${notasButton.dataset.id}`;
});

//------------------------------------------------------------------------//
//Carregar alunos na tabela
async function loadTableNotas() {
    let alunosList = await updateListAlunos();
    alunosList = tableSort.sortList(alunosList, dataCursoRelation);

    if (!alunosList || alunosList.length === 0) {
        tableNotas.innerHTML = '<p>Nenhum aluno cadastrado.</p>';
        return;
    }

    const tableContent = document.createElement('table');
    tableContent.classList.add('notas-table');
    tableContent.innerHTML = `
        ${buildTableHeaderRow()}
        ${alunosList.map(aluno => {
            const media = getAlunoMedia(aluno);
            const situacao = getAlunoSituacao(aluno);

            return `
                <tr class="table-row">
                    <td>${aluno.nome}</td>
                    <td>${dataCursoRelation[aluno.curso]}</td>
                    <td>${aluno.semestre.includes('°') ? aluno.semestre : `${aluno.semestre}°`}</td>
                    <td>${media}</td>
                    <td class="${situacao === 'Aprovado' ? 'aprovado' : situacao === 'Recuperação' ? 'recuperacao' : 'reprovado'}">${situacao}</td>
                    <td>
                        <button
                            class="notas-button"
                            data-id="${aluno.id}"
                        >Notas</button>
                    </td>
                </tr>
            `;
        }).join('')}
    `;

    tableNotas.innerHTML = '';
    tableNotas.appendChild(tableContent);
    tableSort.updateHeaderIndicators(tableContent);
}

loadTableNotas();
