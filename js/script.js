const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const guessesRemainingElement = document.querySelector(".remaining");
const numOfRemain = document.querySelector(".remaining span")
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";

let guessedLetters = [];

let remainingGuesses = 8;

const getWord = async function(){
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await res.text();
    // console.log(data);
    const wordArray = data.split("\n");
    // console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
    
};

getWord();

const placeholder = function(word){
    const placeholderLetters = [];
      for (const letter of word){
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

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
        updateGuessesRemaining(guess);
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

const updateGuessesRemaining = function(guess){
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)){
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Yes, the ${guess} is in the word!`;
    }

    if (remainingGuesses === 0){
        message.innerHTML = `Game Over! The word was <span class="highlight">${word}</span>.`;
    } else if ( remainingGuesses === 1){
        numOfRemain.innerText = `${remainingGuesses} guess`;
    } else {
        numOfRemain.innerText = `${remainingGuesses} guesses`;
    }
};

const checkIfWon = function(){
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    
        startOver();
    }
};

const startOver = function(){
    guessButton.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    guessesRemainingElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function() {
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    numOfRemain.innerHTML = `${remainingGuesses} guesses`;
    guessedLettersElement.innerHTML = "";
    message.innerText = "";

    getWord();

    guessButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    guessesRemainingElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
});