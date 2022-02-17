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
           ",", 
           ".", 
           ".", 
           "[", 
           "]", 
           "(", 
           ")", 
           "{", 
           "}"
        ]
    );  

    static contains(c: string) { 
        return this.delimSet.has(c); 
    }
}