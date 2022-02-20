import { InputBuffer } from "../src/BufferSystem/InputBuffer"; 
import {expect} from 'chai';

describe('Input Buffer Tests', () => { // the tests container
    const ib1 = new InputBuffer("Tests/TestFile.decaf");

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
});