
export class Identifiers extends Map<string, number> { 
    private counter = 1; 

    add(key:string): void { 
        this.set(key, this.counter); 
        this.counter++; 
    }
}

