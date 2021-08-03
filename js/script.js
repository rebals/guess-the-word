const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const guessesRemain = document.querySelector(".remaining");
const numOfRemain = document.querySelector(".remaining span")
const guessedMessage = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

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
});

const checkPlayer = function(){
    const acceptedLetter = /[a-zA-Z]/
    
}