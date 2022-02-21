"use strict";
exports.__esModule = true;
exports.DFA = void 0;
var DFA = (function () {
    function DFA() {
    }
    DFA.prototype.evaluateDFA = function (ib) {
        var inputChar = ib.getChar();
        this.stateBehaviour(inputChar);
        while (this.state != -1) {
            if (this.state === this.exitState) {
                this.resetDFA();
                return true;
            }
            ib.increment();
            inputChar = ib.getChar();
            if (inputChar === "")
                this.state = this.exitState;
            else
                this.stateBehaviour(inputChar);
        }
        this.resetDFA();
        return false;
    };
    ;
    DFA.prototype.resetDFA = function () {
        this.state = 0;
    };
    return DFA;
}());
exports.DFA = DFA;
//# sourceMappingURL=DFA.js.map