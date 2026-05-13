const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');
const resultado = document.getElementById('resultado');

function calcularSoma(){
    resultado.innerText = num1.valueAsNumber + num2.valueAsNumber;
}
function calcularSubtracao(){
    resultado.innerText = num1.valueAsNumber - num2.valueAsNumber;
}
function calcularMultiplicacao(){
    resultado.innerText = num1.valueAsNumber * num2.valueAsNumber;
}
function calcularDivisao(){
    resultado.innerText = num1.valueAsNumber / num2.valueAsNumber;
}