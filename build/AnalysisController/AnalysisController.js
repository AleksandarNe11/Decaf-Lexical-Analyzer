"use strict";
exports.__esModule = true;
exports.AnalysisController = void 0;
var TokenTypes_1 = require("./../SymbolTable/TokenTypes");
var InputBuffer_1 = require("./../BufferSystem/InputBuffer");
var IdentifierDFA_1 = require("../DFAs/IdentifierDFA");
var CommentDFA_1 = require("../DFAs/CommentDFA");
var NumberDFA_1 = require("../DFAs/NumberDFA");
var OperatorDFA_1 = require("../DFAs/OperatorDFA");
var StringDFA_1 = require("../DFAs/StringDFA");
var RegExpDefns_1 = require("../DFAs/RegExpDefns");
var Identifiers_1 = require("./../Lexemes/Identifiers");
var Operators_1 = require("../Lexemes/Operators");
var Keywords_1 = require("../Lexemes/Keywords");
var Punctuation_1 = require("../Lexemes/Punctuation");
var ErrorsHandling_1 = require("../ErrorHandling/ErrorsHandling");
var FileOutput_1 = require("../FileOutput/FileOutput");
var AnalysisController = (function () {
    function AnalysisController(symbolTable) {
        this.commentDFA = new CommentDFA_1.CommentDFA();
        this.identifierDFA = new IdentifierDFA_1.IdentifierDFA();
        this.numberDFA = new NumberDFA_1.NumberDFA();
        this.operatorDFA = new OperatorDFA_1.OperatorDFA();
        this.stringDFA = new StringDFA_1.StringDFA();
        this.errorHandler = new ErrorsHandling_1.ErrorHandling();
        this.symbolTable = symbolTable;
    }
    AnalysisController.prototype.analyzeFile = function (fileName) {
        var ib = new InputBuffer_1.InputBuffer(fileName);
        while (!ib.isAtEndOfFile()) {
            this.lastDFA = this.decideDFA(ib.getChar(), ib);
            if (this.invokeDFA(ib)) {
                this.addToken(ib);
            }
            else {
                ib.digest();
            }
        }
        this.lastDFA = this.decideDFA(ib.getChar(), ib);
        if (this.invokeDFA(ib)) {
            this.addToken(ib);
        }
        else {
            ib.digest();
        }
        console.log(this.symbolTable.getTokens());
        var fileOutput = new FileOutput_1.FileOutput(this.symbolTable, this.errorHandler);
        fileOutput.createSymbolTableFile();
    };
    AnalysisController.prototype.decideDFA = function (c, ib) {
        if (c === "}") {
            console.log(" ");
        }
        var toInvoke = DFA.WHITESPACE;
        if (RegExpDefns_1.RegExpDefns.isDigit(c))
            toInvoke = DFA.NUMBER;
        else if (RegExpDefns_1.RegExpDefns.isLetter(c)) {
            toInvoke = DFA.IDENTIFIER;
        }
        else if (c === " ") {
            toInvoke = DFA.WHITESPACE;
        }
        else if (c === "\n") {
            toInvoke = DFA.NEWLINE;
        }
        else if (c === "\r") {
            ib.increment();
            toInvoke = DFA.WHITESPACE;
        }
        else if (RegExpDefns_1.RegExpDefns.isDelim(c)) {
            if (c === "/") {
                ib.increment();
                var peekAhead = ib.getChar();
                ib.decrement();
                if (peekAhead === "*" || peekAhead === "/")
                    toInvoke = DFA.COMMENT;
                else
                    toInvoke = DFA.OPERATOR;
            }
            else {
                toInvoke = DFA.OPERATOR;
            }
        }
        else if (c === "\"") {
            toInvoke = DFA.STRING;
        }
        else {
            ib.increment();
            toInvoke = DFA.WHITESPACE;
        }
        console.log("decideDFA: ");
        console.log(toInvoke);
        console.log(ib.getForwardP());
        return toInvoke;
    };
    AnalysisController.prototype.invokeDFA = function (ib) {
        var valid = false;
        switch (this.lastDFA) {
            case (DFA.COMMENT):
                valid = this.commentDFA.evaluateDFA(ib);
                break;
            case (DFA.IDENTIFIER):
                valid = this.identifierDFA.evaluateDFA(ib);
                if (!valid)
                    this.errorHandler.handleIdentifier(ib);
                break;
            case (DFA.NUMBER):
                valid = this.numberDFA.evaluateDFA(ib);
                if (!valid)
                    this.errorHandler.handleNumber(ib);
                break;
            case (DFA.OPERATOR):
                valid = this.operatorDFA.evaluateDFA(ib);
                if (!valid)
                    this.errorHandler.handleOperator(ib);
                break;
            case (DFA.STRING):
                valid = this.stringDFA.evaluateDFA(ib);
                break;
            case (DFA.WHITESPACE):
                this.incrementToNextToken(ib);
                break;
            case (DFA.NEWLINE):
                ib.increment();
                break;
        }
        console.log("invokeDFA: ");
        console.log("DFAInvoked: " + this.DFAInvoked());
        console.log("Next: " + ib.getForwardP());
        console.log(" ");
        return valid;
    };
    AnalysisController.prototype.DFAInvoked = function () {
        var toReturn = "";
        switch (this.lastDFA) {
            case (DFA.COMMENT):
                toReturn = "CommentDFA";
                break;
            case (DFA.IDENTIFIER):
                toReturn = "IdentifierDFA";
                break;
            case (DFA.NUMBER):
                toReturn = "NumberDFA";
                break;
            case (DFA.OPERATOR):
                toReturn = "OperatorDFA";
                break;
            case (DFA.WHITESPACE):
                toReturn = "WhitespaceDFA";
                break;
            case (DFA.NEWLINE):
                toReturn = "NewlineDFA";
                break;
        }
        return toReturn;
    };
    AnalysisController.prototype.addToken = function (ib) {
        var lexeme = ib.digest();
        var typeDef;
        var value;
        switch (this.lastDFA) {
            case (DFA.IDENTIFIER):
                if (RegExpDefns_1.RegExpDefns.isKeyword(lexeme)) {
                    typeDef = Keywords_1.Keywords.getCode(lexeme);
                    value = lexeme;
                }
                else if (Identifiers_1.Identifiers.contains(lexeme)) {
                    typeDef = TokenTypes_1.TTypes.T_ID;
                    value = Identifiers_1.Identifiers.getCode(lexeme);
                }
                else {
                    Identifiers_1.Identifiers.add(lexeme);
                    typeDef = TokenTypes_1.TTypes.T_ID;
                    value = Identifiers_1.Identifiers.getCode(lexeme);
                }
                break;
            case (DFA.NUMBER):
                if (RegExpDefns_1.RegExpDefns.isInt) {
                    typeDef = TokenTypes_1.TTypes.T_INTCONSTANT;
                    value = lexeme;
                }
                else {
                    typeDef = TokenTypes_1.TTypes.T_DOUBLE;
                    value = lexeme;
                }
                break;
            case (DFA.OPERATOR):
                if (RegExpDefns_1.RegExpDefns.isOperator(lexeme)) {
                    typeDef = Operators_1.Operators.getCode(lexeme);
                    value = lexeme;
                }
                else if (RegExpDefns_1.RegExpDefns.isPunctuation(lexeme)) {
                    typeDef = Punctuation_1.Punctuation.getCode(lexeme);
                    value = lexeme;
                }
                break;
            case (DFA.STRING):
                typeDef = TokenTypes_1.TTypes.T_STRINGCONSTANT;
                value = lexeme;
                break;
        }
        if (value)
            this.symbolTable.addToken(typeDef, value, ib);
    };
    AnalysisController.prototype.incrementToNextToken = function (ib) {
        while (ib.getChar() == " ") {
            ib.increment();
        }
    };
    return AnalysisController;
}());
exports.AnalysisController = AnalysisController;
var DFA;
(function (DFA) {
    DFA[DFA["COMMENT"] = 0] = "COMMENT";
    DFA[DFA["IDENTIFIER"] = 1] = "IDENTIFIER";
    DFA[DFA["NUMBER"] = 2] = "NUMBER";
    DFA[DFA["OPERATOR"] = 3] = "OPERATOR";
    DFA[DFA["STRING"] = 4] = "STRING";
    DFA[DFA["WHITESPACE"] = 5] = "WHITESPACE";
    DFA[DFA["NEWLINE"] = 6] = "NEWLINE";
})(DFA || (DFA = {}));
//# sourceMappingURL=AnalysisController.js.map