import { TTypes } from "../SymbolTable/TokenTypes";

export class Operators { 
    static operatorMap: Map<String, number> = new Map( 
        [
            ["+", TTypes.T_PLUS], 
            ["-", TTypes.T_MINUS], 
            ["*", TTypes.T_MULT], 
            ["/", TTypes.T_DIV],
            ["%", TTypes.T_MOD], 
            ["<", TTypes.T_LT], 
            ["<=", TTypes.T_LEQ], 
            [">", TTypes.T_GEQ], 
            [">=", TTypes.T_GEQ], 
            ["=", TTypes.T_ASSIGN], 
            ["==", TTypes.T_EQ], 
            ["!=", TTypes.T_NEQ], 
            ["&&", TTypes.T_AND], 
            ["||", TTypes.T_OR], 
            ["!", TTypes.T_NOT]
        ]
    ); 

    static getCode(c: string): number { 
        return this.operatorMap.get(c); 
    }

    static contains(c: string) { 
        return this.operatorMap.has(c); 
    }
}