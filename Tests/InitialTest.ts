import { InputBuffer } from "../BufferSystem/InputBuffer"; 
import {expect} from 'chai';

describe('Input Buffer Tests', () => { // the tests container
    it('checking default options', () => { // the single test
        const ib = new InputBuffer('TestFile1.decaf'); 

                
        expect(ib.getChar() === "i").to.be.true; 
        ib.increment();
        ib.increment();
        expect(ib.getChar() === "t").to.be.true; 

        ib.increment();
        expect(ib.digest() === "int").to.be.true;

        // examples of other property tests
        // expect(ib).to.be.empty; 
        // expect(ib).to.be.an("object").to.have.property("value").to.equal("#fff"); 
    });
});