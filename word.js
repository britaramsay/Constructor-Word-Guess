var Letter = require('./letter.js');
// Accepts and array of Letter objects
function Word (wordArray) {  
    this.word = wordArray;
    // For each letter in the word, return an underscore or the char if it has been guessed
    this.returnString = function(wordWithGuesses) {
        wordWithGuesses = '';
        this.word.forEach(element => {
            wordWithGuesses += element.returnGuessed();
        });
        return wordWithGuesses;
    }
    this.guessLetter = function (guess) {  
        // For each letter in the word, check if it matches the letter that was guessed
        this.word.forEach(element => {
            element.check(guess); 
        });
    }
}
// Export the word constructor
module.exports = Word;