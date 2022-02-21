"use strict";
exports.__esModule = true;
exports.Punctuation = void 0;
var TokenTypes_1 = require("../SymbolTable/TokenTypes");
var Punctuation = (function () {
    function Punctuation() {
    }
    Punctuation.getCode = function (c) {
        return this.puncMap.get(c);
    };
    Punctuation.contains = function (c) {
        return this.puncMap.has(c);
    };
    Punctuation.puncMap = new Map([
        [";", TokenTypes_1.TTypes.T_SEMICOLON],
        [",", TokenTypes_1.TTypes.T_COMMA],
        [".", TokenTypes_1.TTypes.T_DOT],
        ["[", TokenTypes_1.TTypes.T_LSB],
        ["]", TokenTypes_1.TTypes.T_RSB],
        ["(", TokenTypes_1.TTypes.T_LPAREN],
        [")", TokenTypes_1.TTypes.T_RPAREN],
        ["{", TokenTypes_1.TTypes.T_LCB],
        ["}", TokenTypes_1.TTypes.T_RCB],
    ]);
    return Punctuation;
}());
exports.Punctuation = Punctuation;
//# sourceMappingURL=Punctuation.js.map