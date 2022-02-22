"use strict";
exports.__esModule = true;
var AnalysisController_1 = require("./AnalysisController/AnalysisController");
var SymbolTable_1 = require("./SymbolTable/SymbolTable");
var st = new SymbolTable_1.SymbolTable();
var ac = new AnalysisController_1.AnalysisController(st);
ac.analyzeFile("C:\\Users\\Aleks\\Documents\\GitHub\\Decaf-Lexical-Analyzer\\Tests\\TestFile2.decaf");
//# sourceMappingURL=app.js.map