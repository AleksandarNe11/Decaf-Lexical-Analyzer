import { UTF8FileReader } from './UTF8FileReader';

export class InputBuffer { 

    private fileReader: UTF8FileReader;
    private buffer1: string; 
    private buffer2: string; 

    private beginp: number[] = [1, 0];
    private forwardp: number[] = [1, 0];


    // may need to be incremented by the calling DFA but needs to exist and increment when \n is encountered
    private lineNumber: number = 1; 

    constructor(fileName: string) { 
        this.fileReader = new UTF8FileReader(); 
        this.fileReader.open(fileName);
    }

    /**
     * returns the current character that the second pointer is referencing
     * checks which buffer the forward pointer in pointing at
     * @returns 
     */
    getChar(): string { 
        if (this.forwardp[0] === 1) return this.buffer1[this.forwardp[1]];
        else return this.buffer2[this.forwardp[1]];
    }

    /**
     * increments second pointer up one index
     */
    increment(): void {
        this.forwardp[1] += 1;
    }

    /**
     * increments second pointer back one index
     */
    decrement(): void {
        this.forwardp[1] -= 1;
    }

    /**
     * "Digests" and outputs lexeme in buffers contained between the pair of pointers 
     * (right-pointer not inclusive). Then moves left-most pointer up to meet right pointer 
     * @returns string contained between the two pointers 
     */
    digest(): string {
        var lexeme : string;
        if (this.beginp[0] === this.forwardp[0]) { //both the pointer are in the same buffer
            if (this.beginp[0] === 1) lexeme = this.buffer1.substring(this.beginp[1], this.forwardp[1]);
            else lexeme = this.buffer2.substring(this.beginp[1], this.forwardp[1]);
        } else lexeme = this.edgeReset(); //the pointers are at different buffers
        this.beginp = this.forwardp;
        return lexeme;
    }

    /**
     * Passed number of buffer to populate and sets buffer to new value
     * @param num 
     */
    getBuffer(num: number): void { 
        if (num === 1) this.buffer1 = this.fileReader.readChunk();
        else this.buffer2 = this.fileReader.readChunk();
    }

    /**
     * 1) take substrings of beginp to end of one buffer, and beginning of other buffer 
     * 
     */
    edgeReset(): string {
        var lexeme: string;
        if (this.beginp[0] !== this.forwardp[0]) { //check both pointers are at different buffers
            if (this.beginp[0] === 1) {
                lexeme = this.buffer1.substring(this.beginp[1], this.buffer1.length - 1) + this.buffer2.substring(0, this.forwardp[1]);
                this.getBuffer(1);
            } else {
                lexeme = this.buffer2.substring(this.beginp[1], this.buffer2.length - 1) + this.buffer1.substring(0, this.forwardp[1]);
                this.getBuffer(2);
            }
        }
        return lexeme;
    }

    getLineNumber(): number { 
        return this.lineNumber; 
    }
}
