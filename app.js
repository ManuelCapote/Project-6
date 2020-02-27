const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;
const startScreen = document.getElementById('overlay');
const startGameBt = document.querySelectorAll('a')[0];
const phrases = [ 
                    'rend' , 
                    'extra', 
                    'large', 
                    'agreeable', 
                    'resell', 
                    'aboriginal', 
                    'second', 
                    'forbid', 
                    'driving', 
                    'puffy'
                ];


const ul = phrase.getElementsByTagName('ul');

startGameBt.addEventListener('click', (e) => {
    if(e.target.textContent == 'Reset Game') {
        location.reload();
    } else {
        startScreen.style.display = 'none';
    }    
})

function getRandomPhraseAsArray (array) {
    var randomPhrase = array[Math.floor(Math.random()*array.length)];
    var patt = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/)
    var res = patt.test(randomPhrase);
    if (res) {
        alert('invalid character');
    } else {
        var randomPhraseAsArray = randomPhrase.split('');
        return randomPhraseAsArray;
    }
}

function addPhraseToDisplay (arr) {
    for(let i = 0; i < arr.length; i++) {
        let character = arr[i];
        let li = document.createElement('li');
        var str = / /.test(character);
        if (str) {
            alert('invalid character');
        } else {
            li.className = 'letter';
            li.textContent = character;
            phrase.appendChild(li);
        }
    }
}

var counterLetter = 0;
function checkLetter (btnClicked) {
    const letters = document.querySelectorAll('.letter');
    var letterFounded = '';
    for (let i = 0; i < letters.length; i++) {
        if(btnClicked == letters[i].textContent) {
            letters[i].className = 'letter show';
            counterLetter = counterLetter+1;
            letterFounded = letters[i].textContent;
        } else {}
    }
    if (letterFounded != '') {
        return letterFounded;
    } else {
        letterFounded = null;
        return letterFounded;   
    }
}

function checkWin (counterLetter, phraseArray, missed) {
    if (counterLetter == phraseArray.length ) {
        startGameBt.style.display = 'none';
        startScreen.className = 'win';
        startScreen.firstElementChild.textContent = 'You have won';
        startScreen.style.display = '';
        startGameBt.textContent = 'Reset Game';
    } else if (missed == 5) {
        startScreen.firstElementChild.textContent = 'You have Lost';
        startScreen.className = 'lose';
        startScreen.style.display = '';
        startGameBt.textContent = 'Reset Game';
    }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray); 

window.addEventListener( 'keypress', (e) => {
    const keys = document.querySelectorAll('.keyrow');
    const keyPressed = e.key;
    for (let i = 0; i < keys.length; i++) {
        for (let z = 0; z < keys[i].children.length; z++) {
            if (keyPressed == keys[i].children[z].textContent) {
                const btPressed = keys[i].children[z];
                const letterFound = checkLetter(btPressed.textContent);
                btPressed.className = 'chosen';
                btPressed.disable = 'true';

                if (letterFound == null) {
                    const tries = document.querySelectorAll('.tries')[0];
                    const ol = tries.parentNode;
                    ol.removeChild(tries);
                    missed = missed+1;
                    checkWin(counterLetter, phraseArray, missed);
                } else {
                    checkWin(counterLetter, phraseArray, missed);
                }
            }
        }
    }
            
})