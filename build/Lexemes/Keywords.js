"use strict";
exports.__esModule = true;
exports.Keywords = void 0;
var TokenTypes_1 = require("../SymbolTable/TokenTypes");
var Keywords = (function () {
    function Keywords() {
    }
    Keywords.getCode = function (c) {
        return this.keywords.get(c);
    };
    Keywords.contains = function (keyword) {
        return this.keywords.has(keyword);
    };
    Keywords.keywords = new Map([
        ["abstract", TokenTypes_1.TTypes.T_BOOLTYPE],
        ["continue", TokenTypes_1.TTypes.T_CONTINUE],
        ["for", TokenTypes_1.TTypes.T_FOR],
        ["new", TokenTypes_1.TTypes.T_NEW],
        ["package", TokenTypes_1.TTypes.T_PACKAGE],
        ["bool", TokenTypes_1.TTypes.T_BOOLTYPE],
        ["if", TokenTypes_1.TTypes.T_IF],
        ["private", TokenTypes_1.TTypes.T_PRIVATE],
        ["this", TokenTypes_1.TTypes.T_THIS],
        ["break", TokenTypes_1.TTypes.T_BREAK],
        ["protected", TokenTypes_1.TTypes.T_PROTECTED],
        ["else", TokenTypes_1.TTypes.T_ELSE],
        ["import", TokenTypes_1.TTypes.T_IMPORT],
        ["public", TokenTypes_1.TTypes.T_PUBLIC],
        ["return", TokenTypes_1.TTypes.T_RETURN],
        ["int", TokenTypes_1.TTypes.T_INTTYPE],
        ["void", TokenTypes_1.TTypes.T_VOID],
        ["class", TokenTypes_1.TTypes.T_CLASS],
        ["while", TokenTypes_1.TTypes.T_WHILE],
        ["false", TokenTypes_1.TTypes.T_FALSE],
        ["true", TokenTypes_1.TTypes.T_TRUE],
        ["func", TokenTypes_1.TTypes.T_FUNC],
        ["null", TokenTypes_1.TTypes.T_NULL],
        ["package", TokenTypes_1.TTypes.T_PACKAGE],
        ["string", TokenTypes_1.TTypes.T_STRINGTYPE],
        ["double", TokenTypes_1.TTypes.T_DOUBLE],
        ["interface", TokenTypes_1.TTypes.T_INTERFACE],
        ["extends", TokenTypes_1.TTypes.T_EXTENDS],
        ["implements", TokenTypes_1.TTypes.T_IMPLEMENTS],
        ["NewArray", TokenTypes_1.TTypes.T_NEWARRAY],
        ["Print", TokenTypes_1.TTypes.T_PRINT],
        ["ReadInteger", TokenTypes_1.TTypes.T_READINTEGER],
        ["ReadLine", TokenTypes_1.TTypes.T_READLINE],
        ["static", TokenTypes_1.TTypes.T_STATIC]
    ]);
    return Keywords;
}());
exports.Keywords = Keywords;
//# sourceMappingURL=Keywords.js.map