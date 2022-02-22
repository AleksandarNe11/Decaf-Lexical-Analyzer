"use strict";
exports.__esModule = true;
exports.ErrorHandling = void 0;
var Operators_1 = require("../Lexemes/Operators");
var Identifiers_1 = require("../Lexemes/Identifiers");
var Keywords_1 = require("../Lexemes/Keywords");
var ErrorHandling = (function () {
    function ErrorHandling() {
        this.errors = [];
        this.numErrors = 0;
    }
    ErrorHandling.prototype.handleIdentifier = function (lexeme, line) {
        if (Keywords_1.Keywords.contains(lexeme)) {
            this.errors.push([line, lexeme]);
            console.log("Compiler error at line number " + line);
            console.log("\tERROR: " + lexeme + " is a reserved keyword and cannot be used as an identifier.");
            this.numErrors++;
            return false;
        }
        if (!Identifiers_1.Identifiers.contains(lexeme)) {
            this.errors.push([line, lexeme]);
            this.numErrors++;
            return false;
        }
        return true;
    };
    ErrorHandling.prototype.handleOperator = function (lexeme, line) {
        if (!Operators_1.Operators.contains(lexeme)) {
            this.errors.push([line, lexeme]);
            console.log("Compiler error at line number " + line);
            console.log("\tERROR: " + lexeme + " is not a valid operator");
            this.numErrors++;
            return false;
        }
        return true;
    };
    ErrorHandling.prototype.handleNumber = function (lexeme, line) {
        return false;
    };
    ErrorHandling.prototype.handleString = function (lexeme, line) {
        if (!(lexeme[0] === "'" && lexeme[lexeme.length - 1] === "'")) {
            this.errors.push([line, lexeme]);
            console.log("Compiler error at line number " + line);
            console.log("\tERROR: Unterminated string literal");
            this.numErrors++;
            return false;
        }
        return true;
    };
    ErrorHandling.prototype.getNumErrors = function () {
        return this.numErrors;
    };
    return ErrorHandling;
}());
exports.ErrorHandling = ErrorHandling;
//# sourceMappingURL=ErrorsHandling.js.map