import { AnalysisController } from "./AnalysisController/AnalysisController";
import { SymbolTable } from "./SymbolTable/SymbolTable";

const st: SymbolTable = new SymbolTable();
const ac: AnalysisController = new AnalysisController(st); 

ac.analyzeFile("Decaf-Lexical-Analyzer\Tests\TestFile1.decaf");