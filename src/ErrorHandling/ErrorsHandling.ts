import { Operators } from "../Lexemes/Operators";
import { Identifiers } from "../Lexemes/Identifiers";
import { Keywords } from "../Lexemes/Keywords";

export class ErrorHandling { 
    private errors: Array<any> = [];
    private numErrors: number = 0;

    /** 
     * spelling errors
     * check identifiers, operators, and keywords
     */
    handleIdentifier(lexeme: string, line: number): boolean {
        if (!Identifiers.contains(lexeme)) {
            this.errors.push([line, lexeme]);
            this.numErrors++;
            return false;
        }
        return true;
    }

    handleOperator(lexeme: string, line: number): boolean {
        if (!Operators.contains(lexeme)) {
            this.errors.push([line, lexeme]);
            console.log("Compiler error at line number " + line);
            console.log("\tERROR: " + lexeme + " is not a valid operator");
            this.numErrors++;
            return false;
        }
        return true;
    }

    handleNumber(lexeme: string, line: number): boolean {
        
        return false;
    }

    handleString(lexeme: string, line: number): boolean {
        //unterminated strings should be considered an error
        if (!(lexeme[0] === "'" && lexeme[lexeme.length - 1] === "'")) {
            this.errors.push([line, lexeme]);
            console.log("Compiler error at line number " + line);
            console.log("\tERROR: Unterminated string literal");
            this.numErrors++;
            return false;
        }
        return true;
    }

    //total number of errors
    getNumErrors(): number {
        return this.numErrors;
    }

}