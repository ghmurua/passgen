const form = document.querySelector('.form');
const seeResult = document.querySelector('.seeResult');
const gettypes = document.querySelector('.gettypes');
const getlong = document.querySelector('.getlong');
const seeLong = document.querySelector('.seeLong');

const lowerCases = 'abcdefghijklmnopqrstuvwxyz';
const upperCases = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '¡!@#$&/=_.-+¿?';

let lowBool = true;
let uppBool = true;
let numBool = true;
let symBool = true;

let long = 10;

const alert = (msg,time) =>{
    document.querySelector('.alert').innerHTML = msg;
    setTimeout(()=>{
        document.querySelector('.alert').innerHTML = '';
    },time)
}

const obtainLong = e => {
    e.preventDefault();
    if (e.target.classList.contains('sub5') && long>12) long = long - 5;
    if (e.target.classList.contains('sub1') && long>8) long = long - 1;
    if (e.target.classList.contains('add1') && long<50) long = long + 1;
    if (e.target.classList.contains('add5') && long<46) long = long + 5;
    seeLong.innerHTML = long;
}

const included = e => {
    e.preventDefault();
    e.target.classList.toggle('check');

    if (e.target.classList.contains('low')) lowBool = !lowBool;
    if (e.target.classList.contains('upp')) uppBool = !uppBool;
    if (e.target.classList.contains('num')) numBool = !numBool;
    if (e.target.classList.contains('sym')) symBool = !symBool;
    // console.log(lowBool,uppBool,numBool,symBool);
}

const generate = e => {
    e.preventDefault();

    let item = '';
    let result = '';

    for ( let i=0; i<long; i++ ) {
        if (uppBool==false && lowBool==false && 
            numBool==false && symBool==false)
            {
                seeResult.innerHTML = '****';
                navigator.clipboard.writeText('');
                alert('ningun caracter seleccionado',2000);
                break
            }

        let randomType = Math.floor(Math.random()*4);

        if (randomType == 0 && lowBool == true) {
            let randomLow = Math.floor(Math.random()*26);
            item = lowerCases.slice(randomLow,randomLow+1);
        }
        if (randomType == 1 && uppBool == true) {
            let randomUpp = Math.floor(Math.random()*26);
            item = upperCases.slice(randomUpp,randomUpp+1);
        }
        if (randomType == 2 && numBool == true) {
            let randomNum = Math.floor(Math.random()*9);
            item = numbers.slice(randomNum,randomNum+1);
        }
        if (randomType == 3 && symBool == true) {
            let randomSym = Math.floor(Math.random()*15);
            item = symbols.slice(randomSym,randomSym+1);
        }

            // se evita repetir el ultimo o anteultimo
            let rep = result.slice(result.length-2).includes(item);

            !rep
            ? result = result.concat('',item)
            : i = i-1

        navigator.clipboard.writeText(result);
        seeResult.innerHTML = result;
        alert('copiado!',1000);
    }
}

getlong.addEventListener('mousedown',obtainLong);
gettypes.addEventListener('mousedown',included);
form.addEventListener('submit',generate);