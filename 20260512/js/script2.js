const input = document.getElementById('avg');
const resultado2 = document.getElementById('resultado2');

function calcularMedia(){
    let nums = input.value.split("/");
    let avg = 0;
    
    for(let i=0; i<nums.length; i++){
        avg+=Number(nums[i]);
    }

    avg = avg/nums.length;

    resultado2.innerText = avg;
}

function calcularMaior(){

}