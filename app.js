const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const numbers = ["0","1","2","3","4","5","6","7","8","9"];
const symbols = ["!","@","#", "$","%","^","&","*"];
const minAlphabet = [];
let generatedPassword = [];


alphabet.forEach(letter => {
    minAlphabet.push(letter.toLowerCase());
})


const passwordHolder = document.querySelector('.passHolder');
const formSubmit = document.querySelector('.formSubmit');
const passRange = document.querySelector(".passLength");
let passLength = passRange.value;
let passLengthValue = document.querySelector(".characterLength");
let strengthNote = document.querySelector(".passStrengthNote");
const btnSubmit = document.querySelector("button");
const copyImg = document.querySelector('.passHolderContainer img');

const dots = document.querySelectorAll('.dot');

//CHECKBOXES 
const checkOptionsInput = document.querySelectorAll('.checkOption');
const includeUpperCaseLetters = document.getElementById("uppercaseLetters");
const includeLowercaseLetters = document.getElementById("lowercaseLetters");
const includeNumbers = document.getElementById("includeNumbers");
const includeSymbols = document.getElementById("includeSymbols");

passLengthValue.innerText = passLength;

checkStrength();
checkIfOptionsExist();


passRange.addEventListener("input", updateCharLength);

checkOptionsInput.forEach(option => {
    option.addEventListener("click", checkIfOptionsExist);
})


function updateCharLength() {
    passLength = passRange.value;
    passLengthValue = document.querySelector(".characterLength");
    passLengthValue.innerText = passLength;

    checkStrength();
    checkIfOptionsExist();
}

function checkStrength() {
    dots.forEach(dot => {
        dot.classList.remove("light");
    })
    strengthNote.innerText = "";
    if(passLength < 5) {
        strengthNote.innerText = "Très faible";
    } 
    if(passLength >= 5) {
        dots[0].classList.add("light");
        strengthNote.innerText = "Faible";
    } 
    if(passLength >= 8) {
        dots[1].classList.add("light");
        strengthNote.innerText = "Moyenne";
    }
    if(passLength >= 12) {
        dots[2].classList.add("light");
        strengthNote.innerText = "Difficile";
    }
    if(passLength >= 18) {
        dots[3].classList.add("light");
        strengthNote.innerText = "Impossible";
    }
}


formSubmit.addEventListener("submit", (e) => {
    e.preventDefault();

    createPassword();
    shuffle(generatedPassword);
    passwordHolder.value = generatedPassword.join("");

    
})

function checkIfOptionsExist() {
    let checkedOptions = 0;
    // if()
    checkOptionsInput.forEach(option => {
        if(option.checked) {
            checkedOptions ++;
        }
    })

    if(checkedOptions === 0) {
        btnSubmit.disabled = true;
        btnSubmit.style.pointerEvents = "none";
        btnSubmit.innerText = "Cochez au moins 1 option";
        return;
    }
    btnSubmit.disabled = false;
    btnSubmit.style.pointerEvents = "all";
    btnSubmit.innerText = "Generer mot de passe";
    return;
}

function createPassword() {


    let upperCaseSelected = false, lowerCaseSelected = false, numbersSelected = false, symbolsSelected = false, randomNb;
    generatedPassword = [];

    if(includeUpperCaseLetters.checked) {
        upperCaseSelected = true;
    }
    if(includeLowercaseLetters.checked) {
        lowerCaseSelected = true;
    }
    if(includeNumbers.checked) {
        numbersSelected = true;
    }
    if(includeSymbols.checked) {
        symbolsSelected = true;
    }

    for(let i = 0; i < passLength; i++) {

        if(upperCaseSelected && generatedPassword.length < passLength) {
            randomNb = getRandomArbitrary(0, alphabet.length - 1);
            randomNb = Math.round(randomNb);
            generatedPassword.push(alphabet[randomNb]);
        }
        if(lowerCaseSelected && generatedPassword.length < passLength) {
            randomNb = getRandomArbitrary(0, minAlphabet.length - 1);
            randomNb = Math.round(randomNb);
            generatedPassword.push(minAlphabet[randomNb]);
        }
        if(numbersSelected && generatedPassword.length < passLength) {
            randomNb = getRandomArbitrary(0, numbers.length - 1);
            randomNb = Math.round(randomNb);
            generatedPassword.push(numbers[randomNb]);
        }
        if(symbolsSelected && generatedPassword.length < passLength) {
            randomNb = getRandomArbitrary(0, symbols.length - 1);
            randomNb = Math.round(randomNb);
            generatedPassword.push(symbols[randomNb]);
        }
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }


copyImg.addEventListener("click", () => {
    passwordHolder.select();
    document.execCommand('copy');
    // alert(window.getSelection().toString());
})
