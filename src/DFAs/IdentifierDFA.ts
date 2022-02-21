import { InputBuffer } from "../BufferSystem/InputBuffer";
import { RegExpDefns } from "./RegExpDefns";
import { DFA } from './DFA';


export class IdentifierDFA extends DFA{
    
    state: number = 0;

    exitState: number = 3; 

    /**
     * start state 
     * - if input is a letter transitions to state 2 
     * - if input is an underscore transitions to state 1
     * - otherwise transitions into rejection state 
     * @param c input character
     */
    start(c: string): void { 
        if (RegExpDefns.isLetter(c)) 
            this.state = 2;
        else if (RegExpDefns.isUnderscore(c))
            this.state = 1; 
        else
            this.state = -1;

        console.log("start");
    }

    private state1(c: string): void { 
        if (RegExpDefns.isLUD(c))
            this.state=2; 
        else 
            this.state=-1; 

        console.log("state1");
    }

    private state2(c: string): void {
        console.log("state2"); 
        if(RegExpDefns.isLUD(c))
            this.state=2; 
        else if(RegExpDefns.isDelim(c)) {
            this.state=3; 
            console.log("state3"); 
        }
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