
export class Identifiers { 
    private static counter = 1; 
    private static map: Map<string, string> = new Map(); 

    static add(key:string): void { 
        this.map.set(key, this.counter.toString()); 
        this.counter++; 
    }

    static contains(key: string): boolean { 
        return this.map.has(key);
    }

    static getCode(key: string): string { 
        return this.map.get(key);
    }
}

