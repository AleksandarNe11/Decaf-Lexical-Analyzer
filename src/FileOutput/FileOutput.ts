import * as fs from 'fs';
import { ErrorHandling } from '../ErrorHandling/ErrorsHandling';
import { SymbolTable } from '../SymbolTable/SymbolTable';

export class FileOutput { 
    
    symbolTable: SymbolTable; 
    errorSystem: ErrorHandling; 
    

    constructor(symbolTable: SymbolTable, errorSystem: ErrorHandling) { 
        this.symbolTable = symbolTable; 
        this.errorSystem = errorSystem; 
    }
    
    createSymbolTableFile() { 
        let stream = fs.createWriteStream("OutputFiles/SymbolTable.txt"); 
        stream.once('open', () => {
            let tokens = this.symbolTable.getTokens(); 
            tokens.map((token) => { 
                let str = 
                "{ typeCode: " + token.typeDef + ", value: " + token.value + ", lineNumber: " + token.lineNumber + "} \n";
                stream.write(str);
            }) 
        });
    }

    createErrorSystem() { 
        let stream = fs.createWriteStream("OutputFiles/ErrorLog.txt"); 
        stream.once('open', () => {
            let tokens = this.errorSystem.getErrors(); 
            tokens.map((error) => { 
                stream.write(error);
            }) 
        });
    }
}