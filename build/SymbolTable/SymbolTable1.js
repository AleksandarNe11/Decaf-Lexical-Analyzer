var SymbolTable1 = (function () {
    function SymbolTable1() {
        this.toString = function () {
            return;
        };
        this.table = new Array(100);
        this.tableSize = 0;
    }
    SymbolTable1.prototype.insert = function (key, value) {
        if (!this.contains(key)) {
            var i = this.hash(key);
            if (this.table[i])
                this.table[i].push([key, value]);
            else
                this.table[i] = [[key, value]];
            this.tableSize++;
        }
    };
    SymbolTable1.prototype.get = function (key) {
        var i = this.hash(key);
        if (this.table[i]) {
            for (var j = 0; j < this.table[i].length; j++) {
                if (this.table[i][j][0] === key)
                    return this.table[i][j];
            }
        }
        return undefined;
    };
    SymbolTable1.prototype.contains = function (key) {
        if (this.get(key) !== undefined)
            return true;
        else
            return false;
    };
    SymbolTable1.prototype.remove = function (key) {
        if (this.contains(key)) {
            var i = this.hash(key);
            if (this.table[i]) {
                for (var j = 0; j < this.table[i].length; j++) {
                    if (this.table[i][j][0] === key) {
                        this.table[i].splice(j, 1);
                        this.tableSize--;
                        break;
                    }
                }
            }
        }
    };
    SymbolTable1.prototype.hash = function (str) {
        var hashVal = 0;
        for (var i = 0; i < str.length; i++) {
            hashVal = (hashVal << 1) + str.charCodeAt(i);
        }
        return hashVal % this.table.length;
    };
    SymbolTable1.prototype.displayTable = function () {
    };
    return SymbolTable1;
}());
//# sourceMappingURL=SymbolTable1.js.map