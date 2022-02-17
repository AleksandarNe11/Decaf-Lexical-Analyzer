import { UTF8FileReader } from './UTF8FileReader';

export class InputBuffer { 

    private fileReader: UTF8FileReader;
    private buffer1: string; 
    private buffer2: string; 

    // may need to be incremented by the calling DFA but needs to exist and increment when \n is encountered
    private lineNumber: number = 1; 

    constructor(fileName: string) { 
        this.fileReader = new UTF8FileReader(); 
        this.fileReader.open(fileName);
    }

    /**
     * returns the current character that the second pointer is referencing 
     * @returns 
     */
    getChar(): string { 

        return "";
    }

    /**
     * increments second pointer up one index
     */
    increment(): void { 

    }

    /**
     * increments second pointer back one index
     */
    decrement(): void { 

    }

    /**
     * "Digests" and outputs lexeme in buffers contained between the pair of pointers 
     * (right-pointer not inclusive). Then moves left-most pointer up to meet right pointer 
     * @returns string contained between the two pointers 
     */
    digest(): string { 

        return "";
    }
    
    /**
     * 
     * @returns 
     */
    getString(): String { 

        return "";
    }

    getLineNumber(): number { 
        return this.lineNumber; 
    }
}
