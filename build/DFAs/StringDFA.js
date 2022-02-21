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
exports.StringDFA = void 0;
var DFA_1 = require("./DFA");
var StringDFA = (function (_super) {
    __extends(StringDFA, _super);
    function StringDFA() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = 0;
        _this.exitState = 3;
        return _this;
    }
    StringDFA.prototype.start = function (c) {
        if (c === "\"")
            this.state = 1;
        else
            this.state = -1;
    };
    StringDFA.prototype.state1 = function (c) {
        if (c === "\"")
            this.state = 2;
        else
            this.state = 1;
    };
    StringDFA.prototype.state2 = function (c) {
        this.state = 3;
    };
    StringDFA.prototype.stateBehaviour = function (ch) {
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
    return StringDFA;
}(DFA_1.DFA));
exports.StringDFA = StringDFA;
//# sourceMappingURL=StringDFA.js.map