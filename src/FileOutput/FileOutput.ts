import { once } from 'events';
import * as fs from 'fs';
import { StringDecoder } from "string_decoder";
import { SymbolTable } from '../SymbolTable/SymbolTable';

export class FileOutput { 
    
    symbolTable: SymbolTable; 
    errorSystem: string; 
    

    constructor(symbolTable: SymbolTable, errorSystem: string) { 
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
        })
    }
}