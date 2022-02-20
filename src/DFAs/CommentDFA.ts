import { InputBuffer } from "../BufferSystem/InputBuffer";
import { RegExpDefns } from "./RegExpDefns";
import { DFA } from "./DFA";

export class CommentDFA extends DFA {
    protected state: number = 0;
    protected exitState: number = 6;
    
    /**
     * State Behaviour 
     * 1) Reads / - enter comment definition state searching for / or * 
     * @param c 
     */
    start(c: string): void { 
        if (c === "/") 
            this.state = 1;
        else
            this.state = -1;
    }

    /**
     * State Behaviour 
     * 1) Reads / - head into single-line comment state
     * 2) Reads * - head into multi line comment state 
     * @param c 
     */
    private state1(c: string): void { 
        if (c === "/") 
            this.state = 2;
        else if (c === "*")
            this.state = 4;
        else
            this.state = -1;
    }

    /**
     * State Behaviour 
     * 1) Reads \ -> search for n 
     * @param c 
     */
    private state2(c: string): void { 
        if(c === "\\")
            this.state=3; 
    }

    /**
     * State Behaviour 
     * 1) Reads n -> transition to exit state 
     * 2) Reads anything else -> transition back to 2
     * @param c 
     */
     private state3(c: string): void { 
        if(c === "n")
            this.state = 3; 
        else 
            this.state = 6; 
    }

    /**
     * State Behaviour 
     * 1) If reads * - enter comment ending state  
     * 2) Reads anything else -> stay in state 4 
     * @param c 
     */
     private state4(c: string): void { 
        if(c === "*")
            this.state = 5;  
    }

    /**
     * State Behaviour 
     * 1) Reads / -> transition to exit state 
     * 2) Reads anything else -> transition back to 4
     * @param c 
     */
     private state5(c: string): void { 
        if(c === "/")
            this.state = 6; 
        else 
            this.state = 4; 
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
            case 3: 
                this.state3(ch);
                break; 
            case 4: 
                this.state4(ch);
                break; 
            case 5: 
                this.state5(ch);
                break;  

        }
    }
    
}