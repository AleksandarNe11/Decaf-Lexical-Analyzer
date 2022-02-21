"use strict";
exports.__esModule = true;
exports.Identifiers = void 0;
var Identifiers = (function () {
    function Identifiers() {
    }
    Identifiers.add = function (key) {
        this.map.set(key, this.counter.toString());
        this.counter++;
    };
    Identifiers.contains = function (key) {
        return this.map.has(key);
    };
    Identifiers.getCode = function (key) {
        return this.map.get(key);
    };
    Identifiers.counter = 1;
    Identifiers.map = new Map();
    return Identifiers;
}());
exports.Identifiers = Identifiers;
//# sourceMappingURL=Identifiers.js.map