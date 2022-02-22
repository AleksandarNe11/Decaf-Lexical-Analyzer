import { AnalysisController } from "./AnalysisController/AnalysisController";
import { SymbolTable } from "./SymbolTable/SymbolTable";

const st: SymbolTable = new SymbolTable();
const ac: AnalysisController = new AnalysisController(st); 

ac.analyzeFile("C:/Users/Aleks/Documents/GitHub/Decaf-Lexical-Analyzer/Tests/TestFile3.decaf");