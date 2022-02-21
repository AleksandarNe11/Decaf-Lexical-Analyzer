import { InputBuffer } from "../BufferSystem/InputBuffer";

export abstract class DFA { 

    protected abstract state: number;

    protected abstract exitState: number; 
    
    protected abstract start(c: string): void;

    /**
     * Invokes DFA evaluation on input buffer
     * @param ib 
     * @returns true if the DFA reaches exit state, false otherwise  
     */
    public evaluateDFA(ib: InputBuffer): boolean { 
        let inputChar: string = ib.getChar();
        this.stateBehaviour(inputChar);
        while (this.state != -1) { 
            if (this.state === this.exitState) { 
                this.resetDFA();
                return true;
            }
            ib.increment();
            inputChar = ib.getChar();
            if (inputChar === "") this.state = this.exitState;
            else this.stateBehaviour(inputChar);
        }
        this.resetDFA();
        return false; 
    };

    protected abstract stateBehaviour(C: string): void; 

    public resetDFA() { 
        this.state = 0; 
    }
}