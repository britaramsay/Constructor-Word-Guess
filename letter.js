function Letter(character) {
    this.character = character;
    // Set guessed to false, when it is created
    this.guessed = false;
    this.returnGuessed = function () {  
        // If the letter has been guessed, return the character
        if(this.guessed) return this.character + ' ';
        // Otherwise, return an underscore
        else return '_ ';
    }
    // If they guessed this letter
    this.check = function (char) {  
        if(char === this.character) {
            // Set guessed to true
            this.guessed = true;
        }
    }
}
// Export the Letter constructor
module.exports = Letter;