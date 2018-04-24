function Letter(character) {
    this.character = character;
    this.guessed = false;
    this.returnGuessed = function () {  
        if(this.guessed) return this.character + ' ';
        else return '_ ';
    }
    this.check = function (char) {  
        if(char === this.character) {
            this.guessed = true;
        }
    }
}

module.exports = Letter;