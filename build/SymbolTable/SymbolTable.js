"use strict";
exports.__esModule = true;
exports.SymbolTable = void 0;
var SymbolTable = (function () {
    function SymbolTable() {
        this.symbols = [];
    }
    SymbolTable.prototype.addToken = function (typeDef, value, ib) {
        this.symbols.push(this.generateToken(typeDef, value, ib));
    };
    SymbolTable.prototype.generateToken = function (type, value, ib) {
        return { typeDef: type, value: value, lineNumber: ib.getLineNumber() };
    };
    SymbolTable.prototype.getLength = function () {
        return this.symbols.length;
    };
    SymbolTable.prototype.getTokens = function () {
        return this.symbols;
    };
    return SymbolTable;
}());
exports.SymbolTable = SymbolTable;
//# sourceMappingURL=SymbolTable.js.map