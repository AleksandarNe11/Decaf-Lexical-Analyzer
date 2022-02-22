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
exports.NumberDFA = void 0;
var RegExpDefns_1 = require("./RegExpDefns");
var DFA_1 = require("./DFA");
var NumberDFA = (function (_super) {
    __extends(NumberDFA, _super);
    function NumberDFA() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.exitState = 9;
        _this.state = 0;
        return _this;
    }
    NumberDFA.prototype.start = function (c) {
        if (c === "0") {
            this.state = 1;
        }
        else if (RegExpDefns_1.RegExpDefns.is1to9(c)) {
            this.state = 2;
        }
        else {
            this.state = -1;
        }
    };
    NumberDFA.prototype.state1 = function (c) {
        if (c === "x" || c === "X") {
            this.state = 3;
        }
        else if (c === ".") {
            this.state = 5;
        }
        else if (RegExpDefns_1.RegExpDefns.isDelim(c)) {
            this.state = 9;
        }
        else {
            this.state = -1;
        }
    };
    NumberDFA.prototype.state2 = function (c) {
        if (RegExpDefns_1.RegExpDefns.isDigit(c)) {
            this.state = 2;
        }
        else if (c === ".") {
            this.state = 5;
        }
        else if (RegExpDefns_1.RegExpDefns.isDelim(c)) {
            this.state = 9;
        }
        else {
            this.state = -1;
        }
    };
    NumberDFA.prototype.state3 = function (c) {
        if (RegExpDefns_1.RegExpDefns.isHexaDigit(c)) {
            this.state = 4;
        }
        else {
            this.state = -1;
        }
    };
    NumberDFA.prototype.state4 = function (c) {
        if (RegExpDefns_1.RegExpDefns.isHexaDigit(c)) {
            this.state = 4;
        }
        else if (RegExpDefns_1.RegExpDefns.isDelim(c)) {
            this.state = 9;
        }
        else {
            this.state = -1;
        }
    };
    NumberDFA.prototype.state5 = function (c) {
        if (RegExpDefns_1.RegExpDefns.isDigit(c)) {
            this.state = 5;
        }
        else if (RegExpDefns_1.RegExpDefns.isExponentChar(c)) {
            this.state = 6;
        }
        else if (RegExpDefns_1.RegExpDefns.isDelim(c)) {
            this.state = 9;
        }
        else {
            this.state = -1;
        }
    };
    NumberDFA.prototype.state6 = function (c) {
        if (c === "+" || c === "-") {
            this.state = 7;
        }
        else if (RegExpDefns_1.RegExpDefns.isDigit(c)) {
            this.state = 8;
        }
        else {
            this.state = -1;
        }
    };
    NumberDFA.prototype.state7 = function (c) {
        if (RegExpDefns_1.RegExpDefns.isDigit(c)) {
            this.state = 8;
        }
        else {
            this.state = -1;
        }
    };
    NumberDFA.prototype.state8 = function (c) {
        if (RegExpDefns_1.RegExpDefns.isDelim(c)) {
            this.state = 9;
        }
        else {
            this.state = -1;
        }
    };
    NumberDFA.prototype.stateBehaviour = function (c) {
        switch (this.state) {
            case 0:
                this.start(c);
                break;
            case 1:
                this.state1(c);
                break;
            case 2:
                this.state2(c);
                break;
            case 3:
                this.state3(c);
                break;
            case 4:
                this.state4(c);
                break;
            case 5:
                this.state5(c);
                break;
            case 6:
                this.state6(c);
                break;
            case 7:
                this.state7(c);
                break;
            case 8:
                this.state8(c);
                break;
        }
    };
    return NumberDFA;
}(DFA_1.DFA));
exports.NumberDFA = NumberDFA;
//# sourceMappingURL=NumberDFA.js.map