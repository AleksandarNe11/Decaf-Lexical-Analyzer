"use strict";
exports.__esModule = true;
exports.ErrorHandling = void 0;
var ErrorHandling = (function () {
    function ErrorHandling() {
        this.errors = [];
    }
    ErrorHandling.prototype.handleIdentifier = function (ib) {
        this.errors.push("Identifier Error on line: " + ib.getLineNumber() + ": " + ib.digest() + " is not a valid identifier \n \n");
    };
    ErrorHandling.prototype.handleOperator = function (ib) {
        this.errors.push("Operator Error on line: " + ib.getLineNumber() + ": " + ib.digest() + " is not a valid operator \n \n");
    };
    ErrorHandling.prototype.handleNumber = function (ib) {
        this.errors.push("Number Error on line: " + ib.getLineNumber() + ": " + ib.digest() + " is not a valid number \n \n");
    };
    ErrorHandling.prototype.handleString = function (ib, str) {
        if (str[str.length - 1] !== "\"") {
            this.errors.push("String Error on line: " + ib.getLineNumber() + ": " + ib.digest() + " is not a valid String \n \n");
            return false;
        }
        return true;
    };
    ErrorHandling.prototype.getErrors = function () {
        return this.errors;
    };
    return ErrorHandling;
}());
exports.ErrorHandling = ErrorHandling;
//# sourceMappingURL=ErrorsHandling.js.map