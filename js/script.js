const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const guessesRemain = document.querySelector(".remaining");
const numOfRemain = document.querySelector(".remaining span")
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

const guessedLetters = [];

const placeholder = function(word){
    const placeholderLetters = [];
      for (const letter of word){
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function(e){
    e.preventDefault();
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";

    message.innerText = "";
    
    const goodGuess = validateInput(guess);

    if (goodGuess){
        makeGuess(guess);
    }
});

const validateInput = function(input){
    const acceptedLetter = /[a-zA-Z]/
    if (input.length === 0){
        message.innerText = "You need to pick a letter."; 
    } else if (input.length > 1) {
        message.innerText = "Pick enter a single letter.";
    } else  if (!input.match(acceptedLetter)){
        message.innerText = "Pick a letter between A to Z.";
    } else {
        return input;
    }
};

const makeGuess = function(guess){
    guess = guess.toUpperCase ();

    if (guessedLetters.includes(guess)){
        message.innerText = "You already guessed that letter, silly. Try Again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function() {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters){
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);

    }
};

const updateWordInProgress = function(guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
        revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    // console.log(revealWord);
    wordInProgress.innerText = revealWord.join("");   
    checkIfWon();
};

const checkIfWon = function(){
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};