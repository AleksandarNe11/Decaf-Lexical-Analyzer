import { UTF8FileReader } from "../src/BufferSystem/UTF8FileReader"; 
import {expect} from 'chai';

describe('File Reader Tests', () => { // the tests container
    it('fr.open and fr.readChunk', () => { // the single test
        const fr = new UTF8FileReader(); 

        fr.open("Tests/TestFile.decaf");
                
        expect(fr.readChunk() === "int num = 16;").to.be.true; 

        // examples of other property tests
        // expect(ib).to.be.empty; 
        // expect(ib).to.be.an("object").to.have.property("value").to.equal("#fff"); 
    });
});