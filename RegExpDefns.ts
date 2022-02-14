export class RegExpDefns {
    
    a: number = 0;

    /**
     * returns true if the input character is a lower case or 
     * upper case english letter
     * 
     * @param c input character
     * @returns boolean
     */
    static isLetter(c: string): boolean { 
        let letter: RegExp = RegExp("[a-z]|[A-Z]");
        return letter.test(c);
    }

    /**
     * returns true if the input character is an underscore
     * @param c 
     * @returns boolean
     */
    static isUnderscore(c: string): boolean { 
        return c === "_";
    }

    /**
     * returns true if input character is an english letter, 
     * underscore or digit
     * @param c input character
     * @returns boolean
     */
    static isLUD(c: string): boolean { 
        let LUD: RegExp = RegExp("[a-z]|[A-Z]|_|[0-9]"); 
        return LUD.test(c);
    }

    static isDelim(c:string): boolean { 
        return true; 
    }
}