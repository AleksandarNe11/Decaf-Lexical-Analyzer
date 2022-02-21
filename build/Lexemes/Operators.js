"use strict";
exports.__esModule = true;
exports.Operators = void 0;
var TokenTypes_1 = require("../SymbolTable/TokenTypes");
var Operators = (function () {
    function Operators() {
    }
    Operators.getCode = function (c) {
        return this.operatorMap.get(c);
    };
    Operators.contains = function (c) {
        return this.operatorMap.has(c);
    };
    Operators.operatorMap = new Map([
        ["+", TokenTypes_1.TTypes.T_PLUS],
        ["-", TokenTypes_1.TTypes.T_MINUS],
        ["*", TokenTypes_1.TTypes.T_MULT],
        ["/", TokenTypes_1.TTypes.T_DIV],
        ["%", TokenTypes_1.TTypes.T_MOD],
        ["<", TokenTypes_1.TTypes.T_LT],
        ["<=", TokenTypes_1.TTypes.T_LEQ],
        [">", TokenTypes_1.TTypes.T_GEQ],
        [">=", TokenTypes_1.TTypes.T_GEQ],
        ["=", TokenTypes_1.TTypes.T_ASSIGN],
        ["==", TokenTypes_1.TTypes.T_EQ],
        ["!=", TokenTypes_1.TTypes.T_NEQ],
        ["&&", TokenTypes_1.TTypes.T_AND],
        ["||", TokenTypes_1.TTypes.T_OR],
        ["!", TokenTypes_1.TTypes.T_NOT]
    ]);
    return Operators;
}());
exports.Operators = Operators;
//# sourceMappingURL=Operators.js.map