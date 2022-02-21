import { UTF8FileReader } from "../src/BufferSystem/UTF8FileReader"; 
import {expect} from 'chai';
import { InputBuffer } from "../src/BufferSystem/InputBuffer";
import { CommentDFA } from "../src/DFAs/CommentDFA";
import { IdentifierDFA } from "../src/DFAs/IdentifierDFA";
import { NumberDFA } from "../src/DFAs/NumberDFA";
import { OperatorDFA } from "../src/DFAs/OperatorDFA";
import { StringDFA } from "../src/DFAs/StringDFA";


describe('DFA testing', () => {
    const fr = new UTF8FileReader();
    const c_dfa = new CommentDFA();
    const i_dfa = new IdentifierDFA();
    const n_dfa = new NumberDFA();
    const o_dfa = new OperatorDFA();
    const s_dfa = new StringDFA();
    fr.open("Tests/TestFile.decaf"); 
    /*it('fr.open and fr.readChunk', () => { // the single test
        expect(fr.readChunk() === "int num = 16;").to.be.true;
        //examples of other property tests
        expect(ib).to.be.empty; 
        expect(ib).to.be.an("object").to.have.property("value").to.equal("#fff"); 
    });*/

    const ib_op = new InputBuffer("Tests/TestFile.decaf", 8);
    const ib_num = new InputBuffer("Tests/TestNumberFile.decaf");
    const ib_comment = new InputBuffer("Tests/TestComment.decaf");
    const ib_str = new InputBuffer("Tests/TestString.decaf");
    const ib_iden = new InputBuffer("Tests/TestIdentifier.decaf");

    it('CommentDFA', () => {
        console.log(c_dfa.evaluateDFA(ib_comment));
        //expect(c_dfa.evaluateDFA(ib_comment)).to.be.equal(true);
    });
    
    /*it('IdentifierDFA', () => {
        console.log(i_dfa.evaluateDFA(ib_iden));
    });

    it('NumberDFA', () => {
       expect(n_dfa.evaluateDFA(ib_num)).to.be.equal(true);
    });

    it('OperatorDFA', () => {
        expect(o_dfa.evaluateDFA(ib_op)).to.be.equal(true);
    });

    it('StringDFA', () => {
        console.log(s_dfa.evaluateDFA(ib_str));
    });*/
});