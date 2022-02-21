"use strict";
exports.__esModule = true;
exports.RegExpDefns = void 0;
var WhiteSpace_1 = require("../Lexemes/WhiteSpace");
var Punctuation_1 = require("../Lexemes/Punctuation");
var Operators_1 = require("../Lexemes/Operators");
var Keywords_1 = require("../Lexemes/Keywords");
var Delimiters_1 = require("../Lexemes/Delimiters");
var RegExpDefns = (function () {
    function RegExpDefns() {
        this.a = 0;
    }
    RegExpDefns.isLetter = function (c) {
        var letter = RegExp("[a-z]|[A-Z]");
        return letter.test(c);
    };
    RegExpDefns.isUnderscore = function (c) {
        return c === "_";
    };
    RegExpDefns.isDigit = function (c) {
        var digit = RegExp("[0-9]");
        return digit.test(c);
    };
    RegExpDefns.isExponentChar = function (c) {
        if (c === "e" || c === "E")
            return true;
        return false;
    };
    RegExpDefns.isLUD = function (c) {
        if (this.isDigit(c) || this.isLetter(c) || c === "_")
            return true;
        return false;
    };
    RegExpDefns.isDelim = function (c) {
        return Delimiters_1.Delimiters.contains(c);
    };
    RegExpDefns.isOperator = function (c) {
        return Operators_1.Operators.contains(c);
    };
    RegExpDefns.isKeyword = function (c) {
        return Keywords_1.Keywords.contains(c);
    };
    RegExpDefns.isPunctuation = function (c) {
        return Punctuation_1.Punctuation.contains(c);
    };
    RegExpDefns.isWhiteSpace = function (c) {
        return WhiteSpace_1.WhiteSpace.contains(c);
    };
    RegExpDefns.is1to9 = function (c) {
        var num = RegExp("[1-9]");
        return num.test(c);
    };
    RegExpDefns.isHexaDigit = function (c) {
        var digit = RegExp("[0-9]|[a-f]|[A-F]");
        return digit.test(c);
    };
    RegExpDefns.isInt = function (c) {
        var number = RegExp("[0-9]+");
        return number.test(c);
    };
    RegExpDefns.isDouble = function (c) {
        var number = RegExp("[0-9].[0-9]*(E(+|-)?([0-9]*))?");
        return number.test(c);
    };
    return RegExpDefns;
}());
exports.RegExpDefns = RegExpDefns;
//# sourceMappingURL=RegExpDefns.js.map