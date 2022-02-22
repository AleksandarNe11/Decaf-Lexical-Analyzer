import { TTypes } from "../SymbolTable/TokenTypes";

export class Keywords { 
    static keywords: Map<string, number> = new Map<string, number>([
        ["abstract" , TTypes.T_BOOLTYPE],
        ["continue" , TTypes.T_CONTINUE],
        ["for" , TTypes.T_FOR],
        ["new" , TTypes.T_NEW],
        ["package" , TTypes.T_PACKAGE],
        ["bool" , TTypes.T_BOOLTYPE],
        ["if" , TTypes.T_IF],
        ["private" , TTypes.T_PRIVATE],
        ["this" , TTypes.T_THIS],
        ["break" , TTypes.T_BREAK],
        ["protected" , TTypes.T_PROTECTED],
        ["else" , TTypes.T_ELSE],
        ["import" , TTypes.T_IMPORT],
        ["public" , TTypes.T_PUBLIC],
        ["return" , TTypes.T_RETURN],
        ["int" , TTypes.T_INTTYPE],
        ["void" , TTypes.T_VOID],
        ["class" , TTypes.T_CLASS],
        ["while" , TTypes.T_WHILE], 
        ["false", TTypes.T_FALSE],
        ["true", TTypes.T_TRUE], 
        ["func", TTypes.T_FUNC], 
        ["null", TTypes.T_NULL], 
        ["package", TTypes.T_PACKAGE], 
        ["string", TTypes.T_STRINGTYPE], 
        ["double", TTypes.T_DOUBLE],
        ["interface", TTypes.T_INTERFACE], 
        ["extends", TTypes.T_EXTENDS], 
        ["implements", TTypes.T_IMPLEMENTS], 
        ["NewArray", TTypes.T_NEWARRAY], 
        ["Print", TTypes.T_PRINT], 
        ["ReadInteger", TTypes.T_READINTEGER], 
        ["ReadLine", TTypes.T_READLINE], 
        ["static", TTypes.T_STATIC]
    ]); 

    static getCode(c: string): number { 
        return this.keywords.get(c); 
    }

    static contains(keyword: string): boolean { 
        return this.keywords.has(keyword);
    }
}