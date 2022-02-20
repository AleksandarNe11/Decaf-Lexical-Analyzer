import { SymbolTable } from './../SymbolTable/SymbolTable';
// from BufferSystem
import { InputBuffer } from './../BufferSystem/InputBuffer';
// from DFAs
import { IdentifierDFA } from '../DFAs/IdentifierDFA';
import { CommentDFA } from '../DFAs/CommentDFA';
import { NumberDFA } from '../DFAs/NumberDFA';
import { OperatorDFA } from '../DFAs/OperatorDFA';
import { StringDFA } from '../DFAs/StringDFA';
import { RegExpDefns } from '../DFAs/RegExpDefns';
import { isBigInt64Array } from 'util/types';

export class AnalysisController { 

    lastDFA: number; 

    commentDFA: CommentDFA = new CommentDFA(); 
    identifierDFA: IdentifierDFA = new IdentifierDFA();
    numberDFA: NumberDFA = new NumberDFA(); 
    operatorDFA: OperatorDFA = new OperatorDFA(); 
    stringDFA: StringDFA = new StringDFA(); 

    // instantiates input buffer on input file begins lexical analysis
    analyzeFile(fileName: string): void { 
        let ib = new InputBuffer(fileName);

        while(!ib.isAtEndOfFile) { 

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
            }
        }

        return toInvoke; 
    }
}

enum DFA { 
    COMMENT, IDENTIFIER, NUMBER, OPERATOR, STRING, WHITESPACE
}