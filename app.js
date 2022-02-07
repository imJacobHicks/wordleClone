document.addEventListener("DOMContentLoaded", () => {
    createSquares();

    let guessedWords = [[]];
    let availableSpace = 1;

    // Pre determine that the word is "Money"
    let word = "money";
    let guessedWordCount = 0;

    const keys = document.querySelectorAll('.keyboardRow button')

    // Using JS to create squares for board game
    function createSquares() {
        const gameBoard = document.getElementById("board")
    // Setting squares to start 0 and be less than 30 (0 - 29 is thirty elements)
        for (let index = 0; index < 30; index++) {
            // create a div element in HTML doc
            let square = document.createElement("div");
            // add a class to the new div
            square.classList.add("square");
            // give and id of index plus one (index 0 would be square 1)
            square.setAttribute("id", index + 1);
            // append gameBoard by one
            gameBoard.appendChild(square);
        }
    }    

    function getCurrentWordArray() {
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords - 1];
    }

    function updateGuessedWords(letter) {
        const currentWordArray = getCurrentWordArray();

        if (currentWordArray && currentWordArray.length < 5) {
            currentWordArray.push(letter);

            const availableSpaceElement = document.getElementById(String(availableSpace));

            availableSpace = availableSpace + 1;
            availableSpaceElement.textContent = letter;
        }

    }

    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter);

        if (!isCorrectLetter) {
            return "#F0FFFF";
        }

        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = letter === letterInThatPosition;

        if (isCorrectPosition) {
            return "#8FBC8F";
        }

        return "#FF6347";
    }

    function handleSubmitWord() {
        // alert user their word is not 5 letters in length
        const currentWordArray = getCurrentWordArray();
        if (currentWordArray.length !==5) {
            window.alert("Word must be 5 letters");
        }

        const currentWord = currentWordArray.join('');

        const firstLetterId = guessedWordCount * 5 + 1;
        const interval = 200;
        currentWordArray.forEach((letter, index) => {
            setTimeout(() => {
                const tileColor = getTileColor(letter, index);

                const letterId = firstLetterId + index;
                const letterElement = document.getElementById(letterId);
                letterElement.classList.add("animate__flipInX");
                letterElement.style = `background-color:${tileColor};border-color:${tileColor}`;
            }, interval * index);
        });

        guessedWordCount += 1;

       // alert user they are correct
        if (currentWord === word) {
            window.alert("Congratulations, you guessed it correctly!");
        }

        if (guessedWords.length === 6) {
            window.alert(`Sorry, you have no more guesses. The word is ${word}.`)
        }

        // Push new array to start on next row of guesses
        guessedWords.push([]);
    }

    for (let i=0; i < keys.length; i++) {
        // Specify what key does when clicked
        keys[i].onclick = ({ target }) => {
            // clicked key gets its value from specified key data in HTML
            const letter = target.getAttribute("data-key");

            if (letter === 'enter') {
                handleSubmitWord()
                return;
            }

            updateGuessedWords(letter);
        }
    }

}) 
