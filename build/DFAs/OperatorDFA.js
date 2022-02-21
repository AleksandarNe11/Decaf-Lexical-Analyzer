"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.OperatorDFA = void 0;
var DFA_1 = require("./DFA");
var RegExpDefns_1 = require("./RegExpDefns");
var OperatorDFA = (function (_super) {
    __extends(OperatorDFA, _super);
    function OperatorDFA() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = 0;
        _this.exitState = 1;
        _this.testString = "";
        _this.lexeme = "";
        return _this;
    }
    OperatorDFA.prototype.start = function (c) {
        throw new Error("Method not implemented.");
    };
    OperatorDFA.prototype.stateBehaviour = function (C) {
        if (RegExpDefns_1.RegExpDefns.isWhiteSpace(C)) {
            this.state = 1;
        }
        if (RegExpDefns_1.RegExpDefns.isDelim(C)) {
            this.testString = this.lexeme.concat(C);
            if (this.isValidDelim(this.testString)) {
                this.lexeme = this.testString;
            }
            else {
                this.state = 1;
            }
        }
    };
    OperatorDFA.prototype.isValidDelim = function (lexeme) {
        if (RegExpDefns_1.RegExpDefns.isDelim(lexeme))
            return true;
        return false;
    };
    OperatorDFA.prototype.resetDFA = function () {
        this.state = 0;
        this.testString = "";
        this.lexeme = "";
    };
    return OperatorDFA;
}(DFA_1.DFA));
exports.OperatorDFA = OperatorDFA;
//# sourceMappingURL=OperatorDFA.js.map