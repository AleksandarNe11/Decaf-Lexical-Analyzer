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
        while (this.state != -1) { 
            if (this.state === this.exitState) { 
                return true;
            }
            this.stateBehaviour(ib.getChar());
            ib.increment();
        }
        return false; 
    };

    protected abstract stateBehaviour(C: string): void; 
}