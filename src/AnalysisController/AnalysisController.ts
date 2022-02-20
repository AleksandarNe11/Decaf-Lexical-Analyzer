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
import { create } from 'domain';

export class AnalysisController { 

    lastDFA: number; 

    commentDFA: CommentDFA = new CommentDFA(); 
    identifierDFA: IdentifierDFA = new IdentifierDFA();
    numberDFA: NumberDFA = new NumberDFA(); 
    operatorDFA: OperatorDFA = new OperatorDFA(); 
    stringDFA: StringDFA = new StringDFA(); 

    symbolTable: SymbolTable; 

    constructor(symbolTable: SymbolTable) { 
        this.symbolTable = symbolTable; 
    }

    // instantiates input buffer on input file begins lexical analysis
    analyzeFile(fileName: string): void { 
        let ib: InputBuffer = new InputBuffer(fileName);
        let validString: boolean = false; 
        
        while(!ib.isAtEndOfFile()) { 
            this.lastDFA = this.decideDFA(ib.getChar(), ib);
            if (this.invokeDFA(ib)) { 
                this.symbolTable.addToken(); 
            }
        }
    }

    /**
     * takes ib.getChar() as input to decide which DFA to invoke
     * @param c 
     */
    decideDFA(c: string, ib: InputBuffer): number { 
        //assign invalid in case of invalid character
        let toInvoke: number = DFA.WHITESPACE; 
        if (RegExpDefns.isDigit(c)) 
            toInvoke =  DFA.NUMBER; 

        else if (RegExpDefns.isLetter) 
            toInvoke = DFA.IDENTIFIER;

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
        } else if (c === "\\") { 
            ib.increment(); 
            let peekAhead: string = ib.getChar(); 
            ib.decrement(); 

            if (peekAhead === "n") { 
                ib.incrementLineNumber(); 
                ib.increment();
            }
        }

        return toInvoke; 
    }

    invokeDFA(ib: InputBuffer): boolean { 
        let valid: boolean = false;
        switch(this.lastDFA) { 
            case (DFA.COMMENT): 
                valid = this.commentDFA.evaluateDFA(ib); 
                break; 
            case (DFA.IDENTIFIER): 
                valid = this.identifierDFA.evaluateDFA(ib); 
                break; 
            case (DFA.NUMBER): 
                valid = this.numberDFA.evaluateDFA(ib); 
                break; 
            case (DFA.OPERATOR): 
                valid = this.operatorDFA.evaluateDFA(ib); 
                break;
            case (DFA.OPERATOR): 
                valid = this.operatorDFA.evaluateDFA(ib); 
                break;
            case (DFA.WHITESPACE): 
                while (ib.getChar() === " ") {
                    ib.increment(); 
                } 
                break;
        }

        return valid; 
    }


}

enum DFA { 
    COMMENT, IDENTIFIER, NUMBER, OPERATOR, STRING, WHITESPACE
}