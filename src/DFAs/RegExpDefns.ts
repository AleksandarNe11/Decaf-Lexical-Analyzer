import { WhiteSpace } from '../Lexemes/WhiteSpace';
import { Punctuation } from '../Lexemes/Punctuation';
import { Operators } from '../Lexemes/Operators';
import { Keywords } from '../Lexemes/Keywords';
import { Identifiers } from '../Lexemes/Identifiers';
import { Delimiters } from '../Lexemes/Delimiters';

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
     * returns true if input character is a digit 0 through 9 
     * @param c 
     * @returns 
     */
    static isDigit(c: string): boolean { 
        let digit: RegExp = RegExp("[0-9"); 
        return digit.test(c);
    }

    /**
     * returns true if character is e or E 
     * @param c 
     * @returns 
     */
    static isExponentChar(c: string): boolean { 
        if (c === "e" || c === "E") return true; 
        return false; 
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

    /**
     * returns true if input string is a Delimiter
     * @param c 
     * @returns 
     */
    static isDelim(c:string): boolean { 
        return Delimiters.contains(c); 
    }

    static isOperator(c: string): boolean { 
        return Operators.contains(c); 
    }

    static isKeyword(c: string): boolean { 
        return Keywords.contains(c);
    }

    static isPunctuation(c: string) { 
        return Punctuation.contains(c);
    }

    static isWhiteSpace(c: string) { 
        return WhiteSpace.contains(c);
    }

    static is1to9(c: string): boolean { 
        let num: RegExp = RegExp("[1-9]");
        return num.test(c);
    }

    static isHexaDigit(c: string) { 
        let digit: RegExp = RegExp("[0-9]|[a-f]|[A-F]"); 
        return digit.test(c); 
    }
}