console.log("JS externo OK!");

//EXE 01
function paragrafoBoasVindas(){
    const nome = document.getElementById('nome-01').value;
    const mensagem = document.getElementById('mensagem-01');
    if(nome == ""){
        mensagem.innerHTML = `<span style="color:red">Digite seu nome!!</span>`;
        return;
    }
    mensagem.innerText = `Olá, ${nome}, seja bem vinda(o)!`;
}

//EXE 02
function trocaEstilo(){
    const paragrafo02 = document.getElementById('texto-02');
    const btn02 = document.getElementById('btn-02');

    if(btn02.innerText == 'Alterar Estilo'){
        paragrafo02.style.color = 'lavender';
        paragrafo02.style.background = 'green';
        paragrafo02.style.fontSize = '30px';
        btn02.innerText = 'Retornar Estilo';
    }else{
        paragrafo02.style.color = '';
        paragrafo02.style.background = '';
        paragrafo02.style.fontSize = '';
        btn02.innerText = 'Alterar Estilo';
    }
}

//EXE 03
function trocaCor(cor){
    document.body.style.background = cor;
}

//EXE 04
let quantidadeParagrafos04 = 0;
const divParagrafos = document.getElementById('conteudo-04');
function criarParagrafo(){
    quantidadeParagrafos04++;
    novoParagrafo = document.createElement("p");
    novoParagrafo.innerText = prompt("Digite o texto do parágrafo");
    divParagrafos.appendChild(novoParagrafo);
}
function apagarParagrafo(){
    quantidadeParagrafos04--;
    let ultimoParagrafo = divParagrafos.lastElementChild;
    if(ultimoParagrafo){
        divParagrafos.removeChild(ultimoParagrafo);
    }else{
        alert("Não há parágrafos para serem removidos");
    }
}

//EXE 05
let img05Visivel = false;
function toggleImagem(acao){
    const imagem = document.getElementById('imagem-05');
    if(img05Visivel){
        imagem.style.display = 'block';
        img05Visivel = false;
    }
    else {
        imagem.style.display = 'none';
        img05Visivel = true;
    }
}

//EXE 06
const select06 = document.getElementById('select-06');
select06.addEventListener('change', () => {
    let imgs = document.getElementById('imgs-select');
    switch(select06.value){
        case "dragao":
            imgs.src = "./imgs/dragao.jpg";
            break;
        case "shrek":
            imgs.src = "./imgs/shrek.jpg";
            break;
        case "gato":
            imgs.src = "./imgs/gato.webp";
            break;
    }
});

//EXE 07
const div07 = document.getElementById('div07');
function entrouNaArea(){
    div07.style.width = "400px";
    div07.style.height = "400px";
    div07.style.background = "green";
    div07.style.borderRadius = "50%";
}
function saiuDaArea(){
    div07.style.width = "400px";
    div07.style.height = "400px";
    div07.style.background = "purple";
    div07.style.borderRadius = "0%";
}

//EXE 08
function mostraTxt(status){
    let p08 = document.getElementById('p08');
    if(status){
        p08.innerHTML = "<b>Você é do rock?</b>";
        p08.style.opacity = "1";
    }else{
        p08.style.opacity = "0";
        p08.innerHTML = "";
    }
}

//EXE 09
const input09 = document.getElementById('input09');
const lista09 = document.getElementById('lista09');
function criarLista(){
    let numberItems = input09.value;
    let txtItem;
    if(numberItems != ""){
        numberItems = Number(numberItems);
        for(let i=0; i<numberItems; i++){
            txtItem = prompt(`Digite o texto do ${i+1} item`)
            let item = document.createElement('li');
            item.innerText = txtItem;
            lista09.appendChild(item);
        }
    }else{
        alert("Digite o número de itens que deseja inserir!");
    }
}

//EXE 10 + 11
const prod10 = document.getElementById('prod10');
const listaProd10 = document.getElementById('listaProd10');
const valorCompra10 = document.getElementById('valorCompra10');
let notebookItem, celularItem, tabletItem;
let notebookVal=0, celularVal=0, tabletVal=0;
let valorTotal=0;
function gerenciarCompras(produto){
    produto = document.getElementById(produto);
    let preco, quant;

    if(produto.classList.contains('selected')){
        produto.classList.remove('selected');
        switch(produto.dataset.descr){
            case "Notebook": listaProd10.removeChild(notebookItem); valorTotal -= notebookVal;
            case "Celular": listaProd10.removeChild(celularItem); valorTotal -= celularVal;
            case "Tablet": listaProd10.removeChild(tabletItem); valorTotal -= tabletVal;
        }
        valorCompra10.innerText = `R$ ${valorTotal}`;
    }else{
        quant = prompt("Informe a quantidade desejada");
        produto.classList.add('selected');
        quant = quant.replace(/\D+/g, "");
        if(quant == ""){
            alert("A quantidade deve ser um número");
        }else{
            preco = Number(quant) * Number(produto.dataset.preco);
        }
        valorTotal += preco;

        let novoItem = document.createElement('li');
        novoItem.innerText = `${produto.dataset.descr}X${quant} - R$ ${preco}`;
        listaProd10.appendChild(novoItem);

        switch(produto.dataset.descr){
            case "Notebook": notebookItem = novoItem; notebookVal += preco;
            case "Celular": celularItem = novoItem; celularVal += preco;
            case "Tablet": tabletItem = novoItem; tabletVal += preco;
        }
        valorCompra10.innerText = `R$ ${valorTotal}`;
    }
}