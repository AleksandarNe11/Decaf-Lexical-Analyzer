import { RegExpDefns } from "./RegExpDefns";
import { InputBuffer } from "../BufferSystem/InputBuffer";
import { DFA } from "./DFA";

export class NumberDFA extends DFA {
    
    protected exitState: number = 9;
    
    protected state: number = 0;
    
    /**
     * Start state - accepting behaviour split between 0 and 1-9 read 
     * @param c input character
     */
    protected start(c: string): void {
        if (c === "0") { 
            this.state = 1; 
        } else if (RegExpDefns.is1to9(c)) { 
            this.state = 2; 
        } else { 
            this.state = -1;
        }
    }

    /**
     * State behaviour 
     * 1) Hexadecimal start state - must read "x" to be accepting
     * 2) 0.[Digit]* state - must read "." to be accepting 
     * 3) 0 state - must read delimiter to be accepting
     * @param c 
     */
    private state1(c: string): void { 
        if (c === "x") { 
            this.state = 3; 
        } else if (c === ".") { 
            this.state = 5; 
        } else if (RegExpDefns.isDelim(c)) { 
            this.state = 9; 
        } else { 
            this.state = -1; 
        }
    }
    
    /**
     * State behaviour 
     * 1) Integer State - Reads sucessive digits and stays in same state
     * 2) 0.[Digit]* state - must read "." to transition
     * 3) Exit state - must read delimiter to transition out of fxn
     * @param c 
     */
    private state2(c: string): void { 
        if (RegExpDefns.isDigit(c)) {
            this.state = 2;
        } else if (c === ".") { 
            this.state = 5; 
        } else if (RegExpDefns.isDelim(c)) { 
            this.state = 9; 
        } else { 
            this.state = -1; 
        }
    }

    /**
     * State Behaviour
     * 1) Must read a hexadigit in order to transition 
     * @param c 
     */
    private state3(c: string): void { 
        if (RegExpDefns.isHexaDigit(c)) { 
            this.state = 4; 
        } else { 
            this.state = -1; 
        }
    }

    /**
     * State behaviour 
     * 1) Hexadigit read to stay in same state - building Hexadecimal integer
     * @param c 
     */
    private state4(c: string): void { 
        // if c isHexaDigit, stay in state 4
        if (!RegExpDefns.isHexaDigit(c)) { 
            this.state = 4; 
        } else if (RegExpDefns.isDelim(c)) { 
            this.state = 9; 
        } else { 
            this.state = -1;
        }
    }

    /**
     * State behaviour 
     * 1) building <1 portion of decimal - If digit read stay in same state 
     * 2) building exponent - if E/e read transition to exponent building state 
     * 3) Exit state - must read delimiter to transition out of DFA
     * @param c 
     */
    private state5(c: string): void { 
        // if c is digit, stay in state 5
        if (RegExpDefns.isDigit(c)) {
            this.state = 5; 
        } else if (RegExpDefns.isExponentChar(c)) { 
            this.state = 6; 
        } else if (RegExpDefns.isDelim(c)) { 
            this.state = 9; 
        } else { 
            this.state = -1; 
        }
    }

    /**
     * State behaviour 
     * 1) Sign Assignment - Optional assignment of sign digit to exponent (+/-) read  
     * 2) Digit Read - Reads digit to transition into acccepting exponent bulding state 
     * @param c 
     */
    private state6(c: string): void { 
        if (c === "+" || c === "-") { 
            this.state = 7; 
        } else if (RegExpDefns.isDigit(c)) { 
            this.state = 8; 
        } else { 
            this.state = -1; 
        }
    }

    /**
     * State behaviour 
     * 1) Digit Read - Reads digit to transition into acccepting exponent bulding state 
     * @param c 
     */
    private state7(c: string): void { 
        if (RegExpDefns.isDigit(c)) { 
            this.state = 8; 
        } else { 
            this.state = -1; 
        }
    }
    
    /**
     * State behaviour 
     * 1) Digit Read - Reads digit to maintain current state 
     * 2) Delimiter read - transition into exit state 
     * @param c 
     */
    private state8(c: string): void { 
        if (RegExpDefns.isDelim(c)) { 
            this.state = 9; 
        } else { 
            this.state = -1; 
        }
    }

    
    protected stateBehaviour(c: string): void {
        switch (this.state) { 
            case 0: 
                this.start(c);
                break; 
            case 1: 
                this.state1(c);
                break; 
            case 2: 
                this.state2(c);
                break; 
            case 3: 
                this.state3(c); 
                break; 
            case 4: 
                this.state4(c); 
                break; 
            case 5: 
                this.state5(c); 
                break; 
            case 6: 
                this.state6(c); 
                break; 
            case 7: 
                this.state7(c); 
                break; 
            case 8: 
                this.state8(c); 
                break; 
        }
    }
    
}