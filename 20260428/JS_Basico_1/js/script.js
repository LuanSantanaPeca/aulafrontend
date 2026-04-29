console.log("carregado :p");

//title e url
let tit = document.title;
let url = document.URL;
console.log(`O título da página é ${tit}`);
console.log(`A URL da página é ${url}`);

//body e head
let corpo = document.body;
let cabeca = document.head;
console.log(corpo);
console.log(cabeca);

//imagens e links
let imgs = document.images;
console.log(`A página tem ${imgs.length} imagem(ns)`);
console.log(`O título da imagem é ${imgs[0].title}`);
console.log(`A largura da imagem é ${imgs[0].width}`);

let links = document.links;
console.log(`A página tem ${links.length} link(s)`);
for(let i=0; i<links.length; i++){
    console.log(`O texto do link ${i+1} é ${links[i].innerText}`);
    console.log(`O html do link ${i+1} é ${links[i].innerHTML}`);
}
console.log(links);

//formulario
let dataForms = document.forms["forms-contato"];
for(let i=0; i<dataForms.length; i++){
    console.log(`Nome do elemento ${dataForms.elements[i].name}
Placeholder do elemento ${dataForms.elements[i].placeholder}
Tipo do elemento ${dataForms.elements[i].type}`);
}