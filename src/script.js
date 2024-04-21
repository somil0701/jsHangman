// intialization of constants

const dataSet = ['PICKACHU', 'BULBASAUR', 'CHARMANDER', 'SQUIRTLE', 'WEEDLE', 'CATERPIE', 'SANDSHREW', 'DRATINI']
const randomWord = randomWordPicker(dataSet)
const passKey = generatePassKeys(randomWord)
const hiddenWord = LetterHider(randomWord, passKey)
const hiddenLetters = Object.values(passKey)
const keys = Object.keys(passKey)

// declaration of hangman states
var state = 0
const hangmanHead = document.querySelector('.hangman-head')
const hangmanSpine = document.querySelector('.hangman-spine')
const hangmanLeftHand = document.querySelector('.hangman-left-hand')
const hangmanRightHand = document.querySelector('.hangman-right-hand')
const hangmanBody = document.querySelector('.hangman-body')
const hangmanLeftLeg = document.querySelector('.hangman-left-leg')
const hangmanRightLeg = document.querySelector('.hangman-right-leg')

const hangmanParts = document.querySelectorAll('.part')

// defining functions here

function resetGameState(){
    for (let part of hangmanParts){
        part.classList.add('hidden')
    }
    location.reload()
}

function randomNumberGenerator(dataLength) {
    // generates a random number
    return Math.floor(Math.random() * dataLength)
}

function randomWordPicker(dataSet) {
    // picks a random word from our fetched data set
    const dataLength = dataSet.length
    return dataSet[randomNumberGenerator(dataLength)]
}

function LetterHider(randomWord, passKey) {
    // hides 3 random letters from the random word
    var modifiedWord = '';
    const keys = Object.keys(passKey);
    let counter = 0; // Added "let" to properly declare the counter variable

    for (let i = 0; i < randomWord.length; i++) {
        if (keys.includes(counter.toString())) {
            modifiedWord += '_';
        } else {
            modifiedWord += randomWord[i];
        }
        counter++;
    }

    return modifiedWord
}

function generatePassKeys(randomWord) {
    // generates the letters to hide from the randomWord
    const wordLength = randomWord.length
    var passKey = {}
    var skipKey = false
    while (Object.keys(passKey).length !== 3) {
        var randomIndex = randomNumberGenerator(wordLength)
        var keys = Object.keys(passKey)
        for (let key of keys) {
            if (randomIndex === key) {
                skipKey = true
                break
            }
        }
        if (!skipKey) {
            passKey[randomIndex] = randomWord[randomIndex]
        }
    }
    return passKey
}

function handleKeyPresses(event) {
    if (keys.length !== 0) {
        targetLetter = passKey[keys[0]]
        keys.splice(0, 1)
    }
    const pressedKey = String.fromCharCode(event.keyCode).toUpperCase()
    console.log(pressedKey)
    if (pressedKey === targetLetter) {
        replaceLetterInWord(targetLetter)
        if (word.innerText === randomWord){
            alert("YOU WON!!!")
            setTimeout(resetGameState(), 3000)
        }
    }
    else {
        state += 1;
        switch (state) {
            case 1:
                hangmanHead.classList.remove('hidden')
                break;
            case 2:
                hangmanSpine.classList.remove('hidden')
                break;
            case 3:
                hangmanLeftHand.classList.remove('hidden')
                break;
            case 4:
                hangmanRightHand.classList.remove('hidden')
                break;
            case 5:
                hangmanBody.classList.remove('hidden')
                break;
            case 6:
                hangmanLeftLeg.classList.remove('hidden')
                break;
            case 7:
                hangmanRightLeg.classList.remove('hidden')
                alert("GAME OVER!!!")
                setTimeout(resetGameState(), 3000)
                break;
        }
    }
}

function replaceLetterInWord(targetLetter) {
    const index = () => {
        for (const key in passKey) {
            if (passKey[key] === targetLetter) {
                return key;
            }
        }
        return -1; // Return -1 if the targetLetter is not found in passKey
    }

    const foundIndex = index(); // Call the index function to get the actual index value
    if (foundIndex !== -1) {
        const text = word.innerText.split(''); // Convert text to an array of characters
        text.splice(foundIndex, 1, targetLetter); // Replace the letter at 'foundIndex' with 'targetLetter'
        word.innerText = text.join(''); // Join the array back into a string and update the element's text content
    }

    delete passKey.index
}
// ------- main function starts here --------- //

var word = document.querySelector('.word');
word.innerText = hiddenWord;

document.addEventListener('keydown', handleKeyPresses)