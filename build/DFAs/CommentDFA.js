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
exports.CommentDFA = void 0;
var DFA_1 = require("./DFA");
var CommentDFA = (function (_super) {
    __extends(CommentDFA, _super);
    function CommentDFA() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = 0;
        _this.exitState = 6;
        return _this;
    }
    CommentDFA.prototype.start = function (c) {
        if (c === "/")
            this.state = 1;
        else
            this.state = -1;
    };
    CommentDFA.prototype.state1 = function (c) {
        if (c === "/")
            this.state = 2;
        else if (c === "*")
            this.state = 3;
        else
            this.state = -1;
    };
    CommentDFA.prototype.state2 = function (c) {
        if (c === "\n")
            this.state = 6;
    };
    CommentDFA.prototype.state3 = function (c) {
        if (c === "*")
            this.state = 4;
        else
            this.state = 3;
    };
    CommentDFA.prototype.state4 = function (c) {
        if (c === "/")
            this.state = 5;
        else
            this.state = 3;
    };
    CommentDFA.prototype.state5 = function (c) {
        this.state = 6;
    };
    CommentDFA.prototype.stateBehaviour = function (ch) {
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
            case 3:
                this.state3(ch);
                break;
            case 4:
                this.state4(ch);
                break;
            case 5:
                this.state5(ch);
                break;
        }
    };
    return CommentDFA;
}(DFA_1.DFA));
exports.CommentDFA = CommentDFA;
//# sourceMappingURL=CommentDFA.js.map