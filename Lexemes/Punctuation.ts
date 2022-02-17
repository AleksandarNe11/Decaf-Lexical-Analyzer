import { TTypes } from "../SymbolTable/TokenTypes";

export class Punctuation { 
    static puncMap: Map<string, number> = new Map(
        [
            [";", TTypes.T_SEMICOLON],
            [",", TTypes.T_COMMA],
            [".", TTypes.T_DOT], 
            ["[", TTypes.T_LSB], 
            ["]", TTypes.T_RSB], 
            ["(", TTypes.T_LPAREN], 
            [")", TTypes.T_RPAREN], 
            ["{", TTypes.T_LCB], 
            ["}", TTypes.T_RCB], 
        ]
    );

    static contains(c: string): boolean { 
        return this.puncMap.has(c); 
    }
}