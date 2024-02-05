const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display")
const guessText = document.querySelector(".guesses-text b")
const hangmanImage = document.querySelector(".hangman-box img")
const gameModal = document.querySelector(".game-modal")
const playAgainBtn = document.querySelector(".play-again")

let correctLetters, wrongGuessCount;
const maxGuess = 6;
let currentWord;

const resetGame = () =>{
    correctLetters = [];
    wrongGuessCount = 0;
    wordDisplay.innerHTML = currentWord.split("").map(()=>`<li class="letter"></li>`).join("");
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`
    guessText.innerText = `${wrongGuessCount} / ${maxGuess}`
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false)
    gameModal.classList.remove("show");
}


const randomWord = () =>{
    const {word , hint} = wordList[Math.floor(Math.random()* wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
} 


const gameOver = (isVictory) =>{
 setTimeout(()=>{

const modalText = isVictory ? `You found the word:` : `The correct word was:`;
gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
gameModal.classList.add("show")
 }, 300)
}




const initGame = (button, clickedLetter) =>{
    // Checking if clickedLetter is exsist on the currentword
    if(currentWord.includes(clickedLetter)){
        // Showing all correct letter in the word.
        [...currentWord].forEach((letter, index) =>{
            if(letter === clickedLetter){
                correctLetters.push(letter)
                console.log(currentWord.length)
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    } else {
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`
    }

    button.disabled = true;
    guessText.innerText = `${wrongGuessCount} / ${maxGuess}`

  if(wrongGuessCount === maxGuess) return gameOver(false);
 
  if(correctLetters.length === currentWord.length) return gameOver(true)

}



// Create keyboard buttons

for(let i = 97 ; i <= 122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button)
    button.addEventListener("click", e =>{
        initGame(e.target, String.fromCharCode(i));
    })
}

randomWord();
playAgainBtn.addEventListener("click", randomWord)