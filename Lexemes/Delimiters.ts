export class Delimiters { 
    static delimSet: Set<string> = new Set(
        [
           "+", 
           "-", 
           "*", 
           "/", 
           "%", 
           "<", 
           "<=", 
           ">", 
           ">=", 
           "=", 
           "==", 
           "!=", 
           "&&", 
           "&", 
           "|", 
           "||",
           "!", 
           ";", 
           ",", 
           ".", 
           "[", 
           "]", 
           "(", 
           ")", 
           "{", 
           "}", 
           " ", 
           "\\n"
        ]
    );  

    static contains(c: string): boolean { 
        return this.delimSet.has(c); 
    }
}