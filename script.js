'use strict';

// Definovani a assignovani promennych
let secretNumber = Math.trunc(Math.random() * 10) + 1;
console.log(secretNumber);

let score = 3;
let highScore = 0;

const scoreDisplay = document.querySelector('.score');
scoreDisplay.textContent = 3;

const highScoreDisplay = document.querySelector('.highscore');
const secretNumberDisplay = document.querySelector('.number');
const message = document.querySelector('.message');
const guessDisplay = document.querySelector('.guess');

const lost = document.querySelector('.lost')
lost.style.display = 'none';

const win = document.querySelector('.win')
win.style.display = 'none';

const again = document.querySelector('.again');

// Funkce zobrazujici zpravu pro hrace
const displayMessage = function(mess) {
  message.textContent = mess;
}

// Funkce spoustejici nove hadani
const newGuess = function() {
  
  const guess = Number(document.querySelector('.guess').value);

  // Kdyz hrac nezada zadne cislo
  if (!guess) {
    displayMessage('Zadej číslo! ⛔ ');
  } 
  
  // Kdyz hrac zada spravne cislo
  else if (guess === secretNumber) {
    secretNumberDisplay.textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#fe0865';
    secretNumberDisplay.style.width = '25rem';    
    displayMessage('Jóóó, vyhrál jsi! 👍🎉😁');    
    // win.style.display = 'flex';
    // setTimeout(newGame, 3000); 
    
    // Kdyz je aktualni skore vyssi nez nejvyssi skore
    if (score > highScore) {
      highScore = score;
      highScoreDisplay.textContent = highScore;
      localStorage.setItem('highScore', 'highScore');
    }
  } 
  
  // Kdyz hrac zada spatne cislo mezi 1 a 10
  else if (guess >= 1 && guess <=10 && guess !== secretNumber) {
    score--;
    scoreDisplay.textContent = score;
    
    // Kdyz dosahne skore 0, tak prohrava
    if (score === 0) {
      lost.style.display = 'flex';
      lost.textContent = 'Prohrál jsi! 🤪💩💀';
      setTimeout(newGame, 3000);
    } 
    
    // Informace, jestli zadal moc male/velke cislo
    else {
      displayMessage(guess < secretNumber ? 'To je málo, přidej! 😝' : 'To je hodně, uber! 😝');
    }
  }
  // } 
  
  // Kdyz zada cislo mensi nez 1 nebo vetsi nez 10
  else {
    displayMessage('Zadej číslo mezi 1 a 10! 🤪');
  }
}

// Zadani cisla pres klik
document.querySelector('.check').addEventListener('click', newGuess);

// Zadani cisla pres Enter
document.addEventListener('keypress', function(event) {
  if (event.keyCode === 13 || event.which === 13) {
    newGuess();
  }
})

// Funkce nova hra, spustena po zmacknuti tlacitka Again nebo automaticky, kdyz hrac prohraje
function newGame() {
  lost.style.display = 'none';
  win.style.display = 'none';
  secretNumber = Math.trunc(Math.random() * 10) + 1;
  console.log(secretNumber);
  score = 3;
  scoreDisplay.textContent = 3;
  secretNumberDisplay.style.width = '15rem'; 
  secretNumberDisplay.textContent = '?';
  message.style.color = '#00d819';
  displayMessage('Začni hádat, máš 3 pokusy...');
  document.querySelector('body').style.backgroundColor = '#171717';
  guessDisplay.value = '';
}

// Kliknuti na tlacitko Again
again.addEventListener('click', newGame);


