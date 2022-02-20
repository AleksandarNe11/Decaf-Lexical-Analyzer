import { InputBuffer } from "../src/BufferSystem/InputBuffer"; 
import {expect} from 'chai';

describe('Input Buffer Tests', () => { // the tests container
    const ib1 = new InputBuffer("Tests/TestFile.decaf");
    const ib2 = new InputBuffer("Tests/TestFile.decaf", 8); 

    it('Checking getChar()', () => { 
                
        expect(ib1.getChar() === "i").to.be.true; 

        // examples of other property tests
        // expect(ib).to.be.empty; 
        // expect(ib).to.be.an("object").to.have.property("value").to.equal("#fff"); 
    });

    it('Checking increment()', () => { 
        ib1.increment(); 
        ib1.increment(); 
        expect(ib1.getChar() === "t").to.be.true;
    });

    it('Checking decrement()', () => {
        ib1.decrement(); 
        expect(ib1.getChar() === "n").to.be.true;
    });

    it('Checking bufferFull() with known full buffer', () => {
        expect(ib1.bufferFull(1)).to.be.true; 
    });

    it('Checking bufferFull() with known empty buffer', () => {
        expect(ib1.bufferFull(2)).to.be.false; 
    });

    it('Checking buffer values with two known buffers', () => {
        expect(ib2.bufferToString(1) === "int num "); 
        expect(ib2.bufferToString(2) === "= 16;");
    });

    it('Checking bufferFull() with two known full buffers', () => {
        expect(ib2.bufferFull(1)).to.be.true;  
        expect(ib2.bufferFull(2)).to.be.true; 
    });

    it('Checking digest of first word', () => {
        ib2.increment(); 
        ib2.increment(); 
        ib2.increment();
        expect(ib2.digest()).to.be.equal("int");  
    });

    it('Checking digest of second word', () => {
        ib2.increment(); 
        expect(ib2.digest()).to.be.equal(" "); 
        ib2.increment();  
        ib2.increment();  
        ib2.increment();  
        expect(ib2.digest()).to.be.equal("num"); 
    });

    it('Checking increment over to second buffer', () => {
        ib2.increment(); 
        ib2.increment(); 
        ib2.increment(); 
        console.log(ib2.digest()); 
    });
});