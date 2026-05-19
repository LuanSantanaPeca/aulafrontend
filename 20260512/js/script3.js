function verificaMaior(){
  const value1 = document.getElementById('value1').valueAsNumber;
  const value2 = document.getElementById('value2').valueAsNumber;
  const value3 = document.getElementById('value3').valueAsNumber;
  let maior;

  if(value1 > value2) maior = value1;
  else maior = value2;

  if(value3 > maior) maior = value3;

  document.getElementById('resultadoMaior').innerText = maior;
}
