function verificaMaior(){
  const nums = document.getElementById('maior');
  let numsList = nums.value.split('/');
  let maior;

  for(let i=0; i<numsList.length-1; i++){
    if(numsList[i+1] > numsList[i]){
      maior = numsList[i+1];
    }else{
      maior = numsList[i];
    }
  }

  document.getElementById('resultadoMaior').innerText = maior;
}
