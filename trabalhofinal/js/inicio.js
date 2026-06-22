import { updateListAlunos, deleteAluno } from './data.js';
import { dataCursoRelation } from './dataCursoRelation.js';
import { buildTableHeaderRow, getAlunoMedia, getAlunoSituacao, setupTableSort } from './sort.js';

const tableInicio = document.getElementById('table-inicio');

const tableSort = setupTableSort(tableInicio, () => loadTableInicio());

tableInicio.addEventListener('click', async (event) => {
    const deleteButton = event.target.closest('.delete-button');
    const editButton = event.target.closest('.edit-button');
    if (!deleteButton && !editButton) return;

    if (deleteButton) {
        await deleteAluno(deleteButton.dataset.id);
    }
    if (editButton) {
        window.location.href = `editar.html?id=${editButton.dataset.id}`;
    }
    loadTableInicio();
});

//------------------------------------------------------------------------//
//Carregar alunos na tabela
async function loadTableInicio() {
    let alunosList = await updateListAlunos();
    alunosList = tableSort.sortList(alunosList, dataCursoRelation);

    if (!alunosList || alunosList.length === 0) {
        tableInicio.innerHTML = '<p>Nenhum aluno cadastrado.</p>';
        return;
    }

    const tableContent = document.createElement('table');
    tableContent.classList.add('alunos-cadastrados');
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
                            class="edit-button"
                            data-id="${aluno.id}"
                        >Editar</button>
                        <button
                            class="delete-button"
                            data-id="${aluno.id}"
                        >Excluir</button>
                    </td>
                </tr>
            `;
        }).join('')}
    `;

    tableInicio.innerHTML = '';
    tableInicio.appendChild(tableContent);
    tableSort.updateHeaderIndicators(tableContent);
}

loadTableInicio();
