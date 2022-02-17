import { DFA } from "./DFA";
import { RegExpDefns } from "./RegExpDefns";

class OperatorDFA extends DFA {
    protected state: number;
    protected exitState: number;

    private testString: string = ""; 
    private lexeme: string = ""; 

    protected start(c: string): void {
        throw new Error("Method not implemented.");
    }

    protected stateBehaviour(C: string): void {

        /*
        TODO => Consider behaviour for when Errors should be thrown vs Token created and added to list  
        */
        if (RegExpDefns.isDelim(C)) { 
            this.testString = this.lexeme.concat(C); 
        }
        if (!RegExpDefns.isDelim(C)) { 
            // Create Operator token within this DFA and append to list? 
        }
    }

    
}