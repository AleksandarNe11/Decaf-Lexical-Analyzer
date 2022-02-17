import { InputBuffer } from "../BufferSystem/InputBuffer";
import { RegExpDefns } from "../RegExpDefns";
import { DFA } from "./DFA";

class StringDFA extends DFA {
    protected state: number = 0;
    protected exitState: number = 3;
    
    /**
     * State Behaviour 
     * 1) Reads " - opens string to transition to state 1 
     * @param c 
     */
    start(c: string): void { 
        if (c === "\"") 
            this.state = 1;
        else
            this.state = -1;
    }

    /**
     * State Behaviour 
     * 1) Reads " - head into state 2  
     * 2) Reads anything else - stay in state 1
     * @param c 
     */
    private state1(c: string): void { 
        if (c === "\"") 
            this.state = 2;
        else
            this.state = 1;
    }

    /**
     * 
     * @param c 
     */
    private state2(c: string): void { 
        if(RegExpDefns.isLUD(c))
            this.state=2; 
        else if(RegExpDefns.isDelim(c)) 
            this.state=3; 
        else; 
            this.state=-1; 
    }

    protected stateBehaviour(ch: string): void { 
        switch(this.state){
            case 0: 
                this.start(ch);
                break; 
            case 1: 
                this.state1(ch);
                break; 
            case 2: 
                this.state2(ch);
                break; 
        }
    }
    
}