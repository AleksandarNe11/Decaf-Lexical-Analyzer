"use strict";
exports.__esModule = true;
exports.FileOutput = void 0;
var fs = require("fs");
var FileOutput = (function () {
    function FileOutput(symbolTable, errorSystem) {
        this.symbolTable = symbolTable;
        this.errorSystem = errorSystem;
    }
    FileOutput.prototype.createSymbolTableFile = function () {
        var _this = this;
        var stream = fs.createWriteStream("OutputFiles/SymbolTable.txt");
        stream.once('open', function () {
            var tokens = _this.symbolTable.getTokens();
            tokens.map(function (token) {
                var str = "{ typeCode: " + token.typeDef + ", value: " + token.value + ", lineNumber: " + token.lineNumber + "} \n";
                stream.write(str);
            });
        });
    };
    FileOutput.prototype.createErrorSystem = function () {
        var _this = this;
        var stream = fs.createWriteStream("OutputFiles/ErrorLog.txt");
        stream.once('open', function () {
            var tokens = _this.errorSystem.getErrors();
            tokens.map(function (error) {
                stream.write(error);
            });
        });
    };
    return FileOutput;
}());
exports.FileOutput = FileOutput;
//# sourceMappingURL=FileOutput.js.map