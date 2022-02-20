export class SymbolTable { 
    //symbol table implemented using hash function for efficiency
    //key = symbol name & value = type

    public tableSize: number;
    private table: Array<any>;

    //intialize a table
    constructor() {
        this.table = new Array(100);
        this.tableSize = 0;
    }

    //add key and value to the symbol table
    insert(key: string, value: any) {
        if (!this.contains(key)) {
            var i = this.hash(key);
            if (this.table[i]) this.table[i].push([key, value]); //some data already exists at the index
            else this.table[i] = [[key, value]]; //no data exists there
            this.tableSize++;
        }
    }

    //get key and value from the symbol table
    get(key: string): any {
        var i = this.hash(key);
        if (this.table[i]) { //data exists at the index
            for (let j = 0; j < this.table[i].length; j++) {
                if (this.table[i][j][0] === key) return this.table[i][j];
            }
        }
        return undefined;
    }

    //check whether the key already exists in the table
    contains(key: string): boolean {
        if (this.get(key) !== undefined) return true;
        else return false;
    }

    //remove key and value from symbol table
    remove(key: string) {
        if (this.contains(key)) {
            var i = this.hash(key);
            if (this.table[i]) {
                for (let j = 0; j < this.table[i].length; j++) {
                    if (this.table[i][j][0] === key) {
                        this.table[i].splice(j, 1);
                        this.tableSize--;
                        break;
                    }
                }
            }
        }
    }

    /*//increment and track table size
    incrementTableSize(){
        this.tableSize += 1;
    }

    //increment and track table size
    decrementTableSize(){
        this.tableSize -= 1;
    }*/

    /* NOT SURE IF WE WILL NEED TO CHECK THIS BUT JUST IN CASE
    //check if table is empty
    isEmpty() : boolean {

        return false;
    }*/

    hash(str: string): number { //using shifted sum for even distribution (based on research)
        var hashVal : number = 0;
        for (let i = 0; i < str.length; i++) {
            hashVal = (hashVal << 1) + str.charCodeAt(i);
        }
        return hashVal % this.table.length;
    }

    /**
     * display function to display symbol table in a file
     * 
     */
    displayTable() {

    }

    public toString = () : string => { 
        return 
    }
}

/**
 * (symbolName, type, attribute), e.g. static int user_id --> (user_id, int, static)
 * stored using hash function
 * insert() function is used after tokens are identified and names are stored in table
 * find() function is used to search the table for a symbol name
 * for lexical analysis it creates entries in the table, e.g. entries for each token
 */