export function getAlunoMedia(aluno) {
    return (Number(aluno.nota_1) + Number(aluno.nota_2)) / 2;
}

export function getAlunoSituacao(aluno) {
    const media = getAlunoMedia(aluno);
    return media >= 6 ? 'Aprovado' : media >= 3 ? 'Recuperação' : 'Reprovado';
}

function getSemestreNumber(aluno) {
    return Number(String(aluno.semestre).replace('°', '')) || 0;
}

const SORT_FIELDS = {
    nome: {
        type: 'alpha',
        getValue: (aluno) => aluno.nome
    },
    curso: {
        type: 'alpha',
        getValue: (aluno, dataCursoRelation) => dataCursoRelation[aluno.curso] || aluno.curso
    },
    semestre: {
        type: 'number',
        getValue: (aluno) => getSemestreNumber(aluno)
    },
    media: {
        type: 'number',
        getValue: (aluno) => getAlunoMedia(aluno)
    },
    situacao: {
        type: 'alpha',
        getValue: (aluno) => getAlunoSituacao(aluno)
    }
};

export function sortAlunos(alunos, field, direction = 'asc', dataCursoRelation = {}) {
    if (!field || !SORT_FIELDS[field]) {
        return [...alunos];
    }

    const { type, getValue } = SORT_FIELDS[field];
    const multiplier = direction === 'desc' ? -1 : 1;

    return [...alunos].sort((a, b) => {
        const valueA = getValue(a, dataCursoRelation);
        const valueB = getValue(b, dataCursoRelation);

        if (type === 'number') {
            return (valueA - valueB) * multiplier;
        }

        return String(valueA).localeCompare(String(valueB), 'pt-BR', { sensitivity: 'base' }) * multiplier;
    });
}

export function buildTableHeaderRow(actionsLabel = 'Ações') {
    const headers = [
        { field: 'nome', label: 'Nome' },
        { field: 'curso', label: 'Curso' },
        { field: 'semestre', label: 'Semestre' },
        { field: 'media', label: 'Média' },
        { field: 'situacao', label: 'Situação' }
    ].map(({ field, label }) => `<th class="sortable" data-sort="${field}">${label}</th>`).join('');

    return `<tr class="table-header">${headers}<th>${actionsLabel}</th></tr>`;
}

export function setupTableSort(container, onSortChange) {
    const state = { field: null, direction: 'asc' };

    container.addEventListener('click', (event) => {
        const header = event.target.closest('th[data-sort]');
        if (!header) return;

        const field = header.dataset.sort;

        if (state.field === field) {
            state.direction = state.direction === 'asc' ? 'desc' : 'asc';
        } else {
            state.field = field;
            state.direction = 'asc';
        }

        onSortChange();
    });

    return {
        sortList(alunos, dataCursoRelation = {}) {
            return sortAlunos(alunos, state.field, state.direction, dataCursoRelation);
        },
        updateHeaderIndicators(table) {
            table.querySelectorAll('th[data-sort]').forEach((header) => {
                header.classList.remove('sort-asc', 'sort-desc');

                if (header.dataset.sort === state.field) {
                    header.classList.add(state.direction === 'asc' ? 'sort-asc' : 'sort-desc');
                }
            });
        }
    };
}
