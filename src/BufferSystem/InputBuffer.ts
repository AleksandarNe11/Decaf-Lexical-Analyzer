import { UTF8FileReader } from './UTF8FileReader';

export class InputBuffer { 

    private fileReader: UTF8FileReader;
    private buffer1: string; 
    private buffer2: string; 

    // dual pointers 
    private beginp: number[] = [1, 0];
    private forwardp: number[] = [1, 0];

    //Need to have some sort of attribute to define movement along 


    // may need to be incremented by the calling DFA but needs to exist and increment when \n is encountered
    private lineNumber: number = 1; 

    constructor(fileName: string, bufferLength: number = undefined) { 
        // create file reader and open passed file name
        this.fileReader = new UTF8FileReader(); 
        if (bufferLength) this.fileReader.open(fileName, bufferLength); 
        else this.fileReader.open(fileName);
        // populate buffers 
        this.buffer1 = this.fileReader.readChunk(); 
        this.buffer2 = this.fileReader.readChunk(); 
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
     * if forward pointer is greater than the length of either of the buffers
     * move it to the beginning of the other buffer
     */
    increment(): void {
        if (this.forwardp[0] === 1 && this.forwardp[1] >= this.buffer1.length) this.forwardp = [2, 0];
        else if (this.forwardp[0] === 2 && this.forwardp[1] >= this.buffer2.length) this.forwardp = [1, 0];
        else this.forwardp[1]++;
    }

    /**
     * decrements second pointer back one index
     * if forward pointer is less than the length of either of the buffers
     * move it to the end of the other buffer
     */
    decrement(): void {
        if (this.forwardp[0] === 1 && this.forwardp[1] < 0) this.forwardp = [2, this.buffer1.length - 1];
        else if (this.forwardp[0] === 2 && this.forwardp[1] < 0) this.forwardp = [1, this.buffer2.length - 1];
        else this.forwardp[1]--;
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
        this.beginp[0] = this.forwardp[0];
        this.beginp[1] = this.forwardp[1]; 
        return lexeme;
    }

    /**
     * Passed number of buffer to populate and sets buffer to new value
     * @param num 
     */
    private getBuffer(num: number): void { 
        if (num === 1) this.buffer1 = this.fileReader.readChunk();
        else this.buffer2 = this.fileReader.readChunk();
    }

    /**
     * takes string chunk from end of one buffer and string chunk from end of other buffer 
     * @returns concatenated string
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

    /**
     * returns true if buffer1 is full 
     * @param num buffer number
     * @returns 
     */
    bufferFull(num: number): boolean { 
        if (num === 1) return this.buffer1 !== ""; 
        else return this.buffer2 !== ""; 
    }

    /**
     * returns buffer1 or buffer2 value depending on input num
     * @param num buffer number
     * @returns 
     */
    bufferToString(num: number): string { 
        if (num === 1) return this.buffer1; 
        else return this.buffer2; 
    }

    /**
     * Returns the forward pointer back to the position of the begin pointer
     */
    beginBackToForward(): void { 
        this.forwardp[0] = this.beginp[0];
        this.forwardp[1] = this.beginp[1]; 
    }
}
