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

    

    // it('CommentDFA', () => {
    //     const ib_comment = new InputBuffer("Tests/TestComment.decaf");
    //     console.log('comment using // with newline at the end');
    //     expect(c_dfa.evaluateDFA(ib_comment)).to.be.equal(true);
    //     const ib_comment2 = new InputBuffer("Tests/TestComment2.decaf");
    //     console.log('comment using // without newline and space at the end');
    //     expect(c_dfa.evaluateDFA(ib_comment2)).to.be.equal(true);
    //     const ib_comment3 = new InputBuffer("Tests/TestComment3.decaf");
    //     console.log('comment using // with ; at the end');
    //     expect(c_dfa.evaluateDFA(ib_comment3)).to.be.equal(true);
    //     const ib_comment4 = new InputBuffer("Tests/TestComment4.decaf");
    //     console.log('comment using /**/ with test in between and newline');
    //     expect(c_dfa.evaluateDFA(ib_comment4)).to.be.equal(true);
    //     const ib_comment5 = new InputBuffer("Tests/TestComment5.decaf");
    //     console.log('comment using just /**/');
    //     expect(c_dfa.evaluateDFA(ib_comment5)).to.be.equal(true);
    //     const ib_comment6 = new InputBuffer("Tests/TestComment6.decaf");
    //     console.log('comment using just /**/ with spaces in between');
    //     expect(c_dfa.evaluateDFA(ib_comment6)).to.be.equal(true);
    //     const ib_comment7 = new InputBuffer("Tests/TestComment7.decaf");
    //     console.log('comment using just /**/ with newline in between');
    //     expect(c_dfa.evaluateDFA(ib_comment7)).to.be.equal(true);
    // });
    
    // it('IdentifierDFA', () => {
    //     const ib_iden = new InputBuffer("Tests/TestIdentifier.decaf");
    //     console.log(i_dfa.evaluateDFA(ib_iden));
    //     const ib_iden2 = new InputBuffer("Tests/TestIdentifier2.decaf");
    //     console.log(i_dfa.evaluateDFA(ib_iden2));
    //     const ib_iden3 = new InputBuffer("Tests/TestIdentifier3.decaf");
    //     console.log(i_dfa.evaluateDFA(ib_iden3));
    //     const ib_iden4 = new InputBuffer("Tests/TestIdentifier4.decaf");
    //     console.log(i_dfa.evaluateDFA(ib_iden4));
    //     const ib_iden5 = new InputBuffer("Tests/TestIdentifier5.decaf");
    //     console.log(i_dfa.evaluateDFA(ib_iden5));
    //     const ib_iden6 = new InputBuffer("Tests/TestIdentifier6.decaf");
    //     console.log(i_dfa.evaluateDFA(ib_iden6));

    // });

    // it('NumberDFA', () => {
    //     const ib_num = new InputBuffer("Tests/TestNumber.decaf");
    //     expect(n_dfa.evaluateDFA(ib_num)).to.be.equal(true);
    //     const ib_num2 = new InputBuffer("Tests/TestNumber2.decaf");
    //     expect(n_dfa.evaluateDFA(ib_num2)).to.be.equal(true);
    //     const ib_num3 = new InputBuffer("Tests/TestNumber3.decaf");
    //     expect(n_dfa.evaluateDFA(ib_num3)).to.be.equal(true);
    //     const ib_num4 = new InputBuffer("Tests/TestNumber4.decaf");
    //     expect(n_dfa.evaluateDFA(ib_num4)).to.be.equal(true);
    //     const ib_num5 = new InputBuffer("Tests/TestNumber5.decaf");
    //     expect(n_dfa.evaluateDFA(ib_num5)).to.be.equal(true);
    //     const ib_num6 = new InputBuffer("Tests/TestNumber6.decaf");
    //     expect(n_dfa.evaluateDFA(ib_num6)).to.be.equal(true);
    //     const ib_num7 = new InputBuffer("Tests/TestNumber7.decaf");
    //     expect(n_dfa.evaluateDFA(ib_num7)).to.be.equal(true);
    //     const ib_num8 = new InputBuffer("Tests/TestNumber8.decaf");
    //     expect(n_dfa.evaluateDFA(ib_num8)).to.be.equal(true);
    //     const ib_num9 = new InputBuffer("Tests/TestNumber9.decaf");
    //     expect(n_dfa.evaluateDFA(ib_num9)).to.be.equal(true);
    //     const ib_num10 = new InputBuffer("Tests/TestNumber10.decaf");
    //     expect(n_dfa.evaluateDFA(ib_num10)).to.be.equal(true);
    // });

    // it('OperatorDFA', () => {
    //     const ib_op = new InputBuffer("Tests/TestFile.decaf", 8);
    //     expect(o_dfa.evaluateDFA(ib_op)).to.be.equal(true);
    // });

    // it('OperatorDFA2', () => {
    //     const ib_op2 = new InputBuffer("Tests/TestOperator.decaf");
    //     expect(o_dfa.evaluateDFA(ib_op2)).to.be.equal(true);
    // });

    // it('OperatorDFA3', () => {
    //     const ib_op3 = new InputBuffer("Tests/TestOperator2.decaf");
    //     expect(o_dfa.evaluateDFA(ib_op3)).to.be.equal(false);
    // });

    // it('OperatorDFA4', () => {
    //     const ib_op4 = new InputBuffer("Tests/TestOperator3.decaf");
    //     expect(o_dfa.evaluateDFA(ib_op4)).to.be.equal(true);
    // });

    // it('OperatorDFA5', () => {
    //     const ib_op5 = new InputBuffer("Tests/TestOperator4.decaf");
    //     expect(o_dfa.evaluateDFA(ib_op5)).to.be.equal(true);
    // });

    // it('OperatorDFA6', () => {
    //     const ib_op6 = new InputBuffer("Tests/TestOperator5.decaf");
    //     expect(o_dfa.evaluateDFA(ib_op6)).to.be.equal(true);
    // });

    // it('OperatorDFA7', () => {
    //     const ib_op7 = new InputBuffer("Tests/TestOperator6.decaf");
    //     expect(o_dfa.evaluateDFA(ib_op7)).to.be.equal(true);
    // });

    // it('OperatorDFA8', () => {
    //     const ib_op8 = new InputBuffer("Tests/TestOperator7.decaf");
    //     expect(o_dfa.evaluateDFA(ib_op8)).to.be.equal(true);
    // });

    // it('OperatorDFA9', () => {
    //     const ib_op9 = new InputBuffer("Tests/TestOperator8.decaf");
    //     expect(o_dfa.evaluateDFA(ib_op9)).to.be.equal(true);
    // });

    // it('OperatorDFA10', () => {
    //     const ib_op10 = new InputBuffer("Tests/TestOperator9.decaf");
    //     expect(o_dfa.evaluateDFA(ib_op10)).to.be.equal(true);
    // });

    // it('StringDFA', () => {
    //     const ib_str = new InputBuffer("Tests/TestString.decaf");
    //     expect(s_dfa.evaluateDFA(ib_str)).to.be.equal(true);
    //     const ib_str2 = new InputBuffer("Tests/TestString2.decaf");
    //     expect(s_dfa.evaluateDFA(ib_str2)).to.be.equal(true);
    //     const ib_str3 = new InputBuffer("Tests/TestString3.decaf");
    //     expect(s_dfa.evaluateDFA(ib_str3)).to.be.equal(true);
    // });
});