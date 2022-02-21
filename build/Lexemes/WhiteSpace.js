"use strict";
exports.__esModule = true;
exports.WhiteSpace = void 0;
var WhiteSpace = (function () {
    function WhiteSpace() {
    }
    WhiteSpace.contains = function (c) {
        if (c === " " || c === "\\n")
            return true;
    };
    return WhiteSpace;
}());
exports.WhiteSpace = WhiteSpace;
//# sourceMappingURL=WhiteSpace.js.map