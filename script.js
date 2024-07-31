const words = ['javascript', 'html', 'css', 'programming', 'hangman'];
let selectedWord = '';
let guessedLetters = [];
let incorrectGuesses = 0;
const maxIncorrectGuesses = 6;

const wordElement = document.getElementById('word');
const messageElement = document.getElementById('message');
const lettersElement = document.getElementById('letters');
const hangmanParts = document.querySelectorAll('.man div');

function initializeGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = Array(selectedWord.length).fill('_');
    incorrectGuesses = 0;
    updateWordDisplay();
    createLetterButtons();
    updateHangmanDisplay();
    messageElement.textContent = '';
}

function updateWordDisplay() {
    wordElement.textContent = guessedLetters.join(' ');
}

function createLetterButtons() {
    lettersElement.innerHTML = '';
    for (let i = 0; i < 26; i++) {
        const letter = String.fromCharCode(97 + i);
        const letterButton = document.createElement('div');
        letterButton.classList.add('letter');
        letterButton.textContent = letter;
        letterButton.addEventListener('click', () => handleLetterClick(letter));
        lettersElement.appendChild(letterButton);
    }
}

function handleLetterClick(letter) {
    if (selectedWord.includes(letter)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                guessedLetters[i] = letter;
            }
        }
        updateWordDisplay();
        checkWin();
    } else {
        incorrectGuesses++;
        updateHangmanDisplay();
        checkLose();
    }
    document.querySelector(`.letter:contains('${letter}')`).style.display = 'none';
}

function updateHangmanDisplay() {
    hangmanParts.forEach((part, index) => {
        part.style.display = index < incorrectGuesses ? 'block' : 'none';
    });
}

function checkWin() {
    if (!guessedLetters.includes('_')) {
        messageElement.textContent = 'Você venceu!';
        disableLetterButtons();
    }
}

function checkLose() {
    if (incorrectGuesses >= maxIncorrectGuesses) {
        messageElement.textContent = `Você perdeu! A palavra era ${selectedWord}.`;
        disableLetterButtons();
    }
}

function disableLetterButtons() {
    document.querySelectorAll('.letter').forEach(button => {
        button.style.pointerEvents = 'none';
    });
}

function resetGame() {
    initializeGame();
    document.querySelectorAll('.letter').forEach(button => {
        button.style.pointerEvents = 'auto';
        button.style.display = 'block';
    });
}

initializeGame();
