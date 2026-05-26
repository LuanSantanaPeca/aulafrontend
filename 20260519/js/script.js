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

    if(btn02.innerText == 'Troca Estilo'){
        paragrafo02.style.color = 'blue';
        paragrafo02.style.background = 'yellow';
        paragrafo02.style.fontSize = '30px';
        btn02.innerText = 'Retorna Estilo';
    }else{
        paragrafo02.style.color = '';
        paragrafo02.style.background = '';
        paragrafo02.style.fontSize = '';
        btn02.innerText = 'Troca Estilo';
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
    novoParagrafo.innerText = `Parágrafo ${quantidadeParagrafos04}`;
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
function toggleImagem(acao){
    const imagem = document.getElementById('imagem-05');
    if(acao == 'mostra') imagem.style.display = 'block';
    if(acao == 'esconde') imagem.style.display = 'none';
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
    div07.style.width = "600px";
    div07.style.height = "300px";
    div07.style.background = "green";
}
function saiuDaArea(){
    div07.style.width = "400px";
    div07.style.height = "200px";
    div07.style.background = "purple";
}

//EXE 08
function mostraTxt(status){
    let p08 = document.getElementById('p08');
    if(status){
        p08.innerHTML = "<b>Tecnologias FrontEnd Fundamentais</b>";
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