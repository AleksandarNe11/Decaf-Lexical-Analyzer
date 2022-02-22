import { TTypes } from './../SymbolTable/TokenTypes';
import { SymbolTable } from '../SymbolTable/SymbolTable';
// from BufferSystem
import { InputBuffer } from './../BufferSystem/InputBuffer';
// from DFAs
import { IdentifierDFA } from '../DFAs/IdentifierDFA';
import { CommentDFA } from '../DFAs/CommentDFA';
import { NumberDFA } from '../DFAs/NumberDFA';
import { OperatorDFA } from '../DFAs/OperatorDFA';
import { StringDFA } from '../DFAs/StringDFA';
import { RegExpDefns } from '../DFAs/RegExpDefns';
// from Lexemes
import { Identifiers } from './../Lexemes/Identifiers';
import { Operators } from '../Lexemes/Operators';
import { Keywords } from '../Lexemes/Keywords';
import { Punctuation } from '../Lexemes/Punctuation';
// from ErrorHandling
import { ErrorHandling } from '../ErrorHandling/ErrorsHandling';
import { FileOutput } from '../FileOutput/FileOutput';

export class AnalysisController { 

    lastDFA: number; 

    commentDFA: CommentDFA = new CommentDFA(); 
    identifierDFA: IdentifierDFA = new IdentifierDFA();
    numberDFA: NumberDFA = new NumberDFA(); 
    operatorDFA: OperatorDFA = new OperatorDFA(); 
    stringDFA: StringDFA = new StringDFA(); 

    symbolTable: SymbolTable; 

    errorHandler = new ErrorHandling();

    constructor(symbolTable: SymbolTable) { 
        this.symbolTable = symbolTable; 
    }

    // instantiates input buffer on input file begins lexical analysis
    analyzeFile(fileName: string): void { 
        let ib: InputBuffer = new InputBuffer(fileName); 
        
        // for (let i = 0; i < 16; i++) {
        while(!ib.isAtEndOfFile()) { 
            this.lastDFA = this.decideDFA(ib.getChar(), ib);
            if (this.invokeDFA(ib)) { 
                this.addToken(ib); 
            } else { 
                ib.digest(); 
            }
        }

        this.lastDFA = this.decideDFA(ib.getChar(), ib);
        if (this.invokeDFA(ib)) { 
            this.addToken(ib); 
        } else { 
            ib.digest(); 
        }

        console.log(this.symbolTable.getTokens());

        const fileOutput: FileOutput = new FileOutput(this.symbolTable, this.errorHandler); 
        fileOutput.createSymbolTableFile();
    }

    /**
     * takes ib.getChar() as input to decide which DFA to invoke
     * @param c 
     */
    decideDFA(c: string, ib: InputBuffer): number { 
        if (c === "}") { 
            console.log(" ");
        }
        //assign invalid in case of invalid character
        let toInvoke: number = DFA.WHITESPACE; 
        if (RegExpDefns.isDigit(c)) 
            toInvoke =  DFA.NUMBER; 

        else if (RegExpDefns.isLetter(c)) {
            toInvoke = DFA.IDENTIFIER;
        }

        else if (c === " ") { 
            toInvoke = DFA.WHITESPACE;
        }

        else if (c === "\n") { 
            toInvoke = DFA.NEWLINE;
        } 

        else if (c === "\r") { 
            ib.increment(); 
            toInvoke = DFA.WHITESPACE;
        }

        else if (RegExpDefns.isDelim(c)) { 
            if (c === "/") { 
                ib.increment(); 
                let peekAhead: string = ib.getChar(); 
                ib.decrement(); 

                if (peekAhead === "*" || peekAhead === "/")
                    toInvoke = DFA.COMMENT;
                else 
                    toInvoke = DFA.OPERATOR; 
            } else { 
                toInvoke = DFA.OPERATOR; 
            }
        } else if (c === "\"") { 
            toInvoke = DFA.STRING; 
        } else {
            ib.increment();
            toInvoke = DFA.WHITESPACE;  
        }

        console.log("decideDFA: "); 
        console.log(toInvoke); 
        console.log(ib.getForwardP()); 

        return toInvoke; 
    }

    invokeDFA(ib: InputBuffer): boolean { 
        let valid: boolean = false;
        switch(this.lastDFA) { 
            case (DFA.COMMENT): 
                valid = this.commentDFA.evaluateDFA(ib); 
                break; 
            case (DFA.IDENTIFIER): 
                // console.log("evaluate identifier");
                // console.log("starting char:" + ib.getForwardP()); 
                // console.log(" "); 
                valid = this.identifierDFA.evaluateDFA(ib);
                if (!valid) this.errorHandler.handleIdentifier(ib); 
                break; 
            case (DFA.NUMBER): 
                valid = this.numberDFA.evaluateDFA(ib);
                if (!valid) this.errorHandler.handleNumber(ib);
                break; 
            case (DFA.OPERATOR): 
                valid = this.operatorDFA.evaluateDFA(ib); 
                if (!valid) this.errorHandler.handleOperator(ib);
                break; 
            case (DFA.STRING): 
                valid = this.stringDFA.evaluateDFA(ib); 
                break;
            case (DFA.WHITESPACE): 
                this.incrementToNextToken(ib); 
                break;
            case (DFA.NEWLINE): 
                ib.increment(); 
                break;
        }

        console.log("invokeDFA: "); 
        console.log("DFAInvoked: " + this.DFAInvoked()); 
        console.log("Next: " + ib.getForwardP()); 
        console.log(" ");

        return valid; 
    }

    private DFAInvoked(): string {
        let toReturn: string = "" 
        switch(this.lastDFA) { 
            case (DFA.COMMENT): 
                toReturn = "CommentDFA"; 
                break; 
            case (DFA.IDENTIFIER): 
                toReturn = "IdentifierDFA"; 
                break; 
            case (DFA.NUMBER): 
                toReturn = "NumberDFA"; 
                break; 
            case (DFA.OPERATOR): 
                toReturn = "OperatorDFA"; 
                break;
            case (DFA.WHITESPACE): 
                toReturn = "WhitespaceDFA"; 
                break;
            case (DFA.NEWLINE): 
                toReturn = "NewlineDFA"; 
                break;
        }

        return toReturn; 
    }

    addToken(ib: InputBuffer) { 
        let lexeme: string = ib.digest(); 
        
        let typeDef: number; 
        let value: string; 

        // console.log("addToken: "); 
        // console.log(this.lastDFA); 
        // console.log(ib.getForwardP()); 

        switch(this.lastDFA) { 
            case (DFA.IDENTIFIER): 
                if (RegExpDefns.isKeyword(lexeme)) { 
                    typeDef = Keywords.getCode(lexeme);
                    value = lexeme;  
                } else if (Identifiers.contains(lexeme)) { 
                    // TODO add existing lexeme value to Symbol Table
                    typeDef = TTypes.T_ID; 
                    value = Identifiers.getCode(lexeme);
                } else { 
                    // Create new identifier in identifier and add lexeme to symbol table
                    Identifiers.add(lexeme);
                    typeDef = TTypes.T_ID; 
                    value = Identifiers.getCode(lexeme);
                }
                break; 
            case (DFA.NUMBER): 
                if (RegExpDefns.isInt) { 
                    typeDef = TTypes.T_INTCONSTANT; 
                    value = lexeme;
                } else { 
                    typeDef = TTypes.T_DOUBLE; 
                    value = lexeme; 
                }
                break; 
            case (DFA.OPERATOR): 
                if (RegExpDefns.isOperator(lexeme)) { 
                    typeDef = Operators.getCode(lexeme); 
                    value = lexeme; 
                } else if (RegExpDefns.isPunctuation(lexeme)) { 
                    typeDef = Punctuation.getCode(lexeme); 
                    value = lexeme; 
                }  
                break;
            case (DFA.STRING):
                typeDef = TTypes.T_STRINGCONSTANT; 
                value = lexeme; 
                break; 
        }

        if (value) this.symbolTable.addToken(typeDef, value, ib);
    }

    incrementToNextToken(ib: InputBuffer) { 
        while(ib.getChar() == " ") {
            ib.increment(); 
        }
    }

}

enum DFA { 
    COMMENT, IDENTIFIER, NUMBER, OPERATOR, STRING, WHITESPACE, NEWLINE
}