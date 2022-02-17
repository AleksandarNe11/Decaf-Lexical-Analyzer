import { RegExpDefns } from './../RegExpDefns';
import { InputBuffer } from "../BufferSystem/InputBuffer";
import { DFA } from "./DFA";

class NumberDFA extends DFA {
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
    
    private state2(c: string): void { 
        if (c === ".") { 
            this.state = 5; 
        } else if (RegExpDefns.isDelim(c)) { 
            this.state = 9; 
        } else { 
            this.state = -1; 
        }
    }

    private state3(c: string): void { 
        if (RegExpDefns.isHexaDigit(c)) { 
            this.state = 4; 
        } else { 
            this.state = -1; 
        }
    }

    private state4(c: string): void { 
        // if c isHexaDigit, stay in state 4
        if (!RegExpDefns.isHexaDigit(c)) { 
            if (RegExpDefns.isDelim(c)) { 
                this.state = 9; 
            } else { 
                this.state = -1;
            }
        }
    }

    private state5(c: string): void { 
        // if c is digit, stay in state 5
        if (!RegExpDefns.isDigit) { 
            if (RegExpDefns.isExponentChar(c)) { 
                this.state = 6; 
            } else if (RegExpDefns.isDelim(c)) { 
                this.state = 9; 
            } else { 
                this.state = -1; 
            }
        }
    }

    private state6(c: string): void { 
        if (c === "+" || c === "-") { 
            this.state = 7; 
        } else if (RegExpDefns.isDigit(c)) { 
            this.state = 8; 
        } else { 
            this.state = -1; 
        }
    }

    private state7(c: string): void { 
        if (RegExpDefns.isDigit(c)) { 
            this.state = 8; 
        } else { 
            this.state = -1; 
        }
    }
    
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