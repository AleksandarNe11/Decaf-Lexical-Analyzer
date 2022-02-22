import { Operators } from "../Lexemes/Operators";
import { Identifiers } from "../Lexemes/Identifiers";
import { Keywords } from "../Lexemes/Keywords";
import { InputBuffer } from "../BufferSystem/InputBuffer";

export class ErrorHandling { 
    private errors: String[] = [];

    /** 
     * spelling errors
     * check identifiers, operators, and keywords
     */
    handleIdentifier(ib: InputBuffer): void {
        this.errors.push("Identifier Error on line: " + ib.getLineNumber() + ": " + ib.digest() + " is not a valid identifier \n \n");
    }

    handleOperator(ib: InputBuffer): void {
        this.errors.push("Operator Error on line: " + ib.getLineNumber() + ": " + ib.digest() + " is not a valid operator \n \n");
    }

    handleNumber(ib: InputBuffer): void {
        this.errors.push("Number Error on line: " + ib.getLineNumber() + ": " + ib.digest() + " is not a valid number \n \n");
    }

    handleString(ib: InputBuffer, str: string): boolean {
        if (str[str.length - 1] !== "\"") {
            this.errors.push("String Error on line: " + ib.getLineNumber() + ": " + ib.digest() + " is not a valid String \n \n");
            return false; 
        }
        return true; 
    }

    getErrors(): String[] { 
        return this.errors; 
    }

}