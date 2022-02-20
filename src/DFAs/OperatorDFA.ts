import { DFA } from "./DFA";
import { RegExpDefns } from "./RegExpDefns";

class OperatorDFA extends DFA {
    protected state: number = 0;
    protected exitState: number = 1;

    private testString: string = ""; 
    private lexeme: string = ""; 

    protected start(c: string): void {
        throw new Error("Method not implemented.");
    }

    protected stateBehaviour(C: string): void {

        if (RegExpDefns.isWhiteSpace(C)) { 
            this.state = 1;
        }

        /*
            1) Checks if current character is possible operator addition
            2) Concatenates string to see if compound lexeme is within 
        */
        if (RegExpDefns.isDelim(C)) { 
            // if the character is part of the delimiters, appends it to testString
            this.testString = this.lexeme.concat(C); 
            // if the current test string is valid, assigns it to the lexeme
            if (this.isValidDelim(this.testString)) { 
                this.lexeme = this.testString;
            } else { 
                this.state = 1;
            }
        } 
    }

    private isValidDelim(lexeme: string): boolean { 
        if (RegExpDefns.isDelim(lexeme))
            return true; 
        return false;
    }

}