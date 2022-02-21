"use strict";
exports.__esModule = true;
exports.Delimiters = void 0;
var Delimiters = (function () {
    function Delimiters() {
    }
    Delimiters.contains = function (c) {
        return this.delimSet.has(c);
    };
    Delimiters.delimSet = new Set([
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
        "\n"
    ]);
    return Delimiters;
}());
exports.Delimiters = Delimiters;
//# sourceMappingURL=Delimiters.js.map