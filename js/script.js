const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
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
    wordProgress.innerText = placeholderLetters.join("");
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
    }
};