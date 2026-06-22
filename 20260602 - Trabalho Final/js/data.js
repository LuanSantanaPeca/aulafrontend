const API_URL = '/alunos';


export async function getAlunosData() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        console.log('Não foi possível carregar os dados dos alunos.');
        return [];
    }

    return response.json();
}


export async function setAlunosData(alunoData) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(alunoData)
    });

    if (!response.ok) {
        console.log('Não foi possível salvar os dados dos alunos.');
        return;
    }

    console.log('Dados dos alunos salvos com sucesso.');
    return response.json();
}


export async function updateListAlunos() {
    return await getAlunosData();
}


export async function deleteAluno(alunoId) {
    const response = await fetch(`${API_URL}/${alunoId}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        console.log('Não foi possível excluir o aluno.');
        return await getAlunosData();
    }

    return await getAlunosData();
}


export async function editAluno(alunoId, alunoData) {
    const response = await fetch(`${API_URL}/${alunoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(alunoData)
    });
}


export async function getAluno(alunoId) {
    const response = await fetch(`${API_URL}/${alunoId}`);
    return response.json();
}