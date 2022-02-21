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

    

    it('CommentDFA: comment using // with newline at the end', () => {
        const ib_comment = new InputBuffer("Tests/TestComment.decaf");
        expect(c_dfa.evaluateDFA(ib_comment)).to.be.equal(true);
    });
    it('CommentDFA2: comment using // without newline and space at the end', () => {
        const ib_comment2 = new InputBuffer("Tests/TestComment2.decaf");
        expect(c_dfa.evaluateDFA(ib_comment2)).to.be.equal(true);
    });
    it('CommentDFA3: comment using // with ; at the end', () => {
        const ib_comment3 = new InputBuffer("Tests/TestComment3.decaf");
        expect(c_dfa.evaluateDFA(ib_comment3)).to.be.equal(true);
    });
    it('CommentDFA4: comment using /**/ with test in between and newline', () => {
        const ib_comment4 = new InputBuffer("Tests/TestComment4.decaf");
        expect(c_dfa.evaluateDFA(ib_comment4)).to.be.equal(true);
    });
    it('CommentDFA5: comment using just /**/', () => {
        const ib_comment5 = new InputBuffer("Tests/TestComment5.decaf");
        expect(c_dfa.evaluateDFA(ib_comment5)).to.be.equal(true);
    });
    it('CommentDFA6: comment using just /**/ with spaces in between', () => {
        const ib_comment6 = new InputBuffer("Tests/TestComment6.decaf");
        expect(c_dfa.evaluateDFA(ib_comment6)).to.be.equal(true);
    });
    it('CommentDFA7: comment using just /**/ with newline in between', () => {
        const ib_comment7 = new InputBuffer("Tests/TestComment7.decaf");
        expect(c_dfa.evaluateDFA(ib_comment7)).to.be.equal(true);
    });

    it('IdentifierDFA: num', () => {
        const ib_iden = new InputBuffer("Tests/TestIdentifier.decaf");
        expect(i_dfa.evaluateDFA(ib_iden)).to.be.equal(true);
    });
    it('IdentifierDFA2: var var = 0;', () => {
        const ib_iden2 = new InputBuffer("Tests/TestIdentifier2.decaf");
        expect(i_dfa.evaluateDFA(ib_iden2)).to.be.equal(true);
    });
    it('IdentifierDFA3: int while = 123456789;', () => {
        const ib_iden3 = new InputBuffer("Tests/TestIdentifier3.decaf");
        expect(i_dfa.evaluateDFA(ib_iden3)).to.be.equal(true);
    });
    it('IdentifierDFA4: int f = 0;', () => {
        const ib_iden4 = new InputBuffer("Tests/TestIdentifier4.decaf");
        expect(i_dfa.evaluateDFA(ib_iden4)).to.be.equal(true);
    });
    it('IdentifierDFA5: let break : string;', () => {
        const ib_iden5 = new InputBuffer("Tests/TestIdentifier5.decaf");
        expect(i_dfa.evaluateDFA(ib_iden5)).to.be.equal(true);
    });
    it('IdentifierDFA6: var boolean;', () => {
        const ib_iden6 = new InputBuffer("Tests/TestIdentifier6.decaf");
        expect(i_dfa.evaluateDFA(ib_iden6)).to.be.equal(true);
    });

    it('NumberDFA: 16 ', () => {
        const ib_num = new InputBuffer("Tests/TestNumber.decaf");
        expect(n_dfa.evaluateDFA(ib_num)).to.be.equal(true);
    });
    it('NumberDFA2: 1234567890--098765432 ', () => {
        const ib_num2 = new InputBuffer("Tests/TestNumber2.decaf");
        expect(n_dfa.evaluateDFA(ib_num2)).to.be.equal(true);
    });
    it('NumberDFA3: 23422479048765 ', () => {
        const ib_num3 = new InputBuffer("Tests/TestNumber3.decaf");
        expect(n_dfa.evaluateDFA(ib_num3)).to.be.equal(true);
    });
    it('NumberDFA4: 12345678.000 ', () => {
        const ib_num4 = new InputBuffer("Tests/TestNumber4.decaf");
        expect(n_dfa.evaluateDFA(ib_num4)).to.be.equal(true);
    });
    it('NumberDFA5: .09876543 ', () => {
        const ib_num5 = new InputBuffer("Tests/TestNumber5.decaf");
        expect(n_dfa.evaluateDFA(ib_num5)).to.be.equal(false);
    });
    it('NumberDFA6: 0.098765432 ', () => {
        const ib_num6 = new InputBuffer("Tests/TestNumber6.decaf");
        expect(n_dfa.evaluateDFA(ib_num6)).to.be.equal(true);
    });
    it('NumberDFA7: 13.56 ', () => {
        const ib_num7 = new InputBuffer("Tests/TestNumber7.decaf");
        expect(n_dfa.evaluateDFA(ib_num7)).to.be.equal(true);
    });
    it('NumberDFA8: -363.4567', () => {
        const ib_num8 = new InputBuffer("Tests/TestNumber8.decaf");
        expect(n_dfa.evaluateDFA(ib_num8)).to.be.equal(true);
    });
    it('NumberDFA9: 0xA2B3 ', () => {
        const ib_num9 = new InputBuffer("Tests/TestNumber9.decaf");
        expect(n_dfa.evaluateDFA(ib_num9)).to.be.equal(true);
    });
    it('NumberDFA10: 52B.38D4FDF3B64.5A1CAC083 ', () => {
        const ib_num10 = new InputBuffer("Tests/TestNumber10.decaf");
        expect(n_dfa.evaluateDFA(ib_num10)).to.be.equal(false);
    });

    it('OperatorDFA', () => {
        const ib_op = new InputBuffer("Tests/TestFile.decaf", 8);
        expect(o_dfa.evaluateDFA(ib_op)).to.be.equal(true);
    });
    it('OperatorDFA1: this is a;', () => {
        const ib_op1 = new InputBuffer("Tests/TestOperator1.decaf");
        expect(o_dfa.evaluateDFA(ib_op1)).to.be.equal(true);
    });
    it('OperatorDFA2: int i', () => {
        const ib_op2 = new InputBuffer("Tests/TestOperator2.decaf");
        expect(o_dfa.evaluateDFA(ib_op2)).to.be.equal(true);
    });
    it('OperatorDFA3: thisVar == thatVar', () => {
        const ib_op3 = new InputBuffer("Tests/TestOperator3.decaf");
        expect(o_dfa.evaluateDFA(ib_op3)).to.be.equal(true);
    });
    it('OperatorDFA4: thisVar != thatVar', () => {
        const ib_op4 = new InputBuffer("Tests/TestOperator4.decaf");
        expect(o_dfa.evaluateDFA(ib_op4)).to.be.equal(true);
    });
    it('OperatorDFA5: thisVar <= thatVar', () => {
        const ib_op5 = new InputBuffer("Tests/TestOperator5.decaf");
        expect(o_dfa.evaluateDFA(ib_op5)).to.be.equal(true);
    });
    it('OperatorDFA6: thisVar =<= thatVar', () => {
        const ib_op6 = new InputBuffer("Tests/TestOperator6.decaf");
        expect(o_dfa.evaluateDFA(ib_op6)).to.be.equal(true);
    });
    it('OperatorDFA7: thisVar <! thatVar', () => {
        const ib_op7 = new InputBuffer("Tests/TestOperator7.decaf");
        expect(o_dfa.evaluateDFA(ib_op7)).to.be.equal(true);
    });
    it('OperatorDFA8: thisVar < thatVar', () => {
        const ib_op8 = new InputBuffer("Tests/TestOperator8.decaf");
        expect(o_dfa.evaluateDFA(ib_op8)).to.be.equal(true);
    });
    it('OperatorDFA9: thisVar > thatVar', () => {
        const ib_op9 = new InputBuffer("Tests/TestOperator9.decaf");
        expect(o_dfa.evaluateDFA(ib_op9)).to.be.equal(true);
    });
    it('OperatorDFA10: checking.', () => {
        const ib_op10 = new InputBuffer("Tests/TestOperator9.decaf");
        expect(o_dfa.evaluateDFA(ib_op10)).to.be.equal(true);
    });

    it('StringDFA: string with " at the beginning and end', () => {
        const ib_str = new InputBuffer("Tests/TestString.decaf");
        expect(s_dfa.evaluateDFA(ib_str)).to.be.equal(true);
    });
    it('StringDFA2: string with " at the beginning', () => {
        const ib_str2 = new InputBuffer("Tests/TestString2.decaf");
        expect(s_dfa.evaluateDFA(ib_str2)).to.be.equal(true);
    });
    it('StringDFA3: string with " at the end', () => {
        const ib_str3 = new InputBuffer("Tests/TestString3.decaf");
        expect(s_dfa.evaluateDFA(ib_str3)).to.be.equal(false);
    });

});