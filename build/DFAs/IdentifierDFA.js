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
exports.IdentifierDFA = void 0;
var RegExpDefns_1 = require("./RegExpDefns");
var DFA_1 = require("./DFA");
var IdentifierDFA = (function (_super) {
    __extends(IdentifierDFA, _super);
    function IdentifierDFA() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = 0;
        _this.exitState = 3;
        return _this;
    }
    IdentifierDFA.prototype.start = function (c) {
        if (RegExpDefns_1.RegExpDefns.isLetter(c))
            this.state = 2;
        else if (RegExpDefns_1.RegExpDefns.isUnderscore(c))
            this.state = 1;
        else
            this.state = -1;
    };
    IdentifierDFA.prototype.state1 = function (c) {
        if (RegExpDefns_1.RegExpDefns.isLUD(c))
            this.state = 2;
        else
            this.state = -1;
    };
    IdentifierDFA.prototype.state2 = function (c) {
        if (RegExpDefns_1.RegExpDefns.isLUD(c))
            this.state = 2;
        else if (RegExpDefns_1.RegExpDefns.isDelim(c)) {
            this.state = 3;
        }
        else
            this.state = -1;
    };
    IdentifierDFA.prototype.stateBehaviour = function (ch) {
        switch (this.state) {
            case 0:
                this.start(ch);
                break;
            case 1:
                this.state1(ch);
                break;
            case 2:
                this.state2(ch);
                break;
        }
    };
    return IdentifierDFA;
}(DFA_1.DFA));
exports.IdentifierDFA = IdentifierDFA;
//# sourceMappingURL=IdentifierDFA.js.map