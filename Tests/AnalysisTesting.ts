import { InputBuffer } from './../src/BufferSystem/InputBuffer';
import { SymbolTable } from './../src/SymbolTable/SymbolTable';
import { AnalysisController } from './../src/AnalysisController/AnalysisController';
import {expect} from 'chai';

describe('AnalysisController Tests', () => { // the tests container

    const st: SymbolTable = new SymbolTable();
    let at: AnalysisController = new AnalysisController(st);

    it('Test Analyze file on Basic File', () => { // the single test
        

        // at.analyzeFile("Tests/TestFile.decaf"); 

        expect(st.getLength).to.be.equal(5); 
    });

    const ib1: InputBuffer = new InputBuffer("Tests/TestFile.decaf");

    it('Test DecideDFA for Identifier', () => { 
        expect(at.decideDFA(ib1.getChar(), ib1)).to.be.equal(1);
    })

    it('Test DecideDFA for Whitespace', () => { 
        ib1.setPointerValues(1, 3);
        console.log(ib1.getForwardP());
        expect(at.decideDFA(ib1.getChar(), ib1)).to.be.equal(5);
    })
});