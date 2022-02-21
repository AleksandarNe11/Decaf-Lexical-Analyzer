import { InputBuffer } from './../BufferSystem/InputBuffer';
import { Token } from "./Token";

export class SymbolTable { 
    symbols: Token[] = []; 
    
    addToken(typeDef: number, value: string, ib: InputBuffer): void {
        this.symbols.push(this.generateToken(typeDef, value, ib)); 
    }

    generateToken(type: number, value: string, ib: InputBuffer): Token { 
        return {typeDef: type, value: value, lineNumber: ib.getLineNumber()}
    }

    getLength(): number { 
        return this.symbols.length;
    }

    getTokens(): Token[] { 
        return this.symbols; 
    }
}