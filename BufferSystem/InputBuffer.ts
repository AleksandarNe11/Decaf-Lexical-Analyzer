import { UTF8FileReader } from './UTF8FileReader';

export class InputBuffer { 

    private fileReader: UTF8FileReader;
    private buffer1: string; 
    private buffer2: string; 
    private beginp: number = 0;
    private forwardp: number = 0;
    SENTINEL = 'eof';
    seperators: Array<string> = [' ', ';']; //'*', '+', '-' etc.



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
    getChar(buffer: string): string { 
        return buffer[this.forwardp];
    }

    /**
     * increments second pointer up one index
     */
    increment(): void {
        this.forwardp += 1;
    }

    /**
     * increments second pointer back one index
     */
    decrement(): void {
        this.forwardp -= 1;
    }

    /**
     * "Digests" and outputs lexeme in buffers contained between the pair of pointers 
     * (right-pointer not inclusive). Then moves left-most pointer up to meet right pointer 
     * @returns string contained between the two pointers 
     */
    digest(): string {
        let sentinel = this.SENTINEL;
        var isEnd = false;
        this.buffer1 = this.fileReader.readChunk();
        var isBuffer1 = true;
        var lexeme: String;
        while (!isEnd) {
            if (isBuffer1) {
                if (this.getChar(this.buffer1) == sentinel) {
                    if (this.forwardp == this.buffer1.length - 1) { //found eof at the end of buffer1
                        this.buffer2 = this.fileReader.readChunk(); //load the second buffer
                        this.forwardp = -1;
                    } else { //found eof before the end of first buffer
                        isEnd = true;
                    }
                } else if (this.seperators.indexOf(this.getChar(this.buffer1)) > -1){ //forward pointer is pointing to a separator
                    //get string (lexeme)
                    if (this.forwardp < this.beginp) {
                        lexeme = this.getString(this.buffer2, this.buffer1);
                    } else {
                        lexeme = this.getString(this.buffer1, null);
                    }
                    this.beginp = this.forwardp + 1; //move the pointers to the next index
                }
            } else {
                if (this.getChar(this.buffer2) == sentinel) {
                    if (this.forwardp == this.buffer2.length - 1) { //found eof at the end of buffer2
                        this.buffer1 = this.fileReader.readChunk(); //load the first buffer
                        this.forwardp = -1;
                    } else { //found eof before the end of second buffer
                        isEnd = true
                    }
                } else if (this.seperators.indexOf(this.getChar(this.buffer2)) > -1){ //forward pointer is pointing to a separator
                    //get string (lexeme)
                    if (this.forwardp < this.beginp) {
                        lexeme = this.getString(this.buffer1, this.buffer2);
                    } else {
                        lexeme = this.getString(this.buffer2, null);
                    }
                    this.beginp = this.forwardp + 1; //move the pointers to the next index
                }
            }
            this.increment(); //increment foward pointer
        }
        
        return "";
    }
    
    /**
     * 
     * @returns 
     */
    getString(b1: string, b2: string): String {
        var lexeme: string;
        if (this.forwardp < this.beginp) {
            //using b1.length - 1 to remove the "eof" from the lexeme string
            lexeme = b1.substring(this.beginp, b1.length - 1) + b2.substring(0, this.forwardp);
        } else {
            lexeme = b1.substring(this.beginp, this.forwardp);
        }
        return lexeme;
    }

    getLineNumber(): number { 
        return this.lineNumber; 
    }
}
