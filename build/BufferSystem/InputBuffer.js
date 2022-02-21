"use strict";
exports.__esModule = true;
exports.InputBuffer = void 0;
var UTF8FileReader_1 = require("./UTF8FileReader");
var InputBuffer = (function () {
    function InputBuffer(fileName, bufferLength) {
        if (bufferLength === void 0) { bufferLength = undefined; }
        this.beginp = [1, 0];
        this.forwardp = [1, 0];
        this.endOfFile = false;
        this.lineNumber = 1;
        this.fileReader = new UTF8FileReader_1.UTF8FileReader();
        if (bufferLength)
            this.fileReader.open(fileName, bufferLength);
        else
            this.fileReader.open(fileName);
        this.buffer1 = this.fileReader.readChunk();
        this.buffer2 = "";
    }
    InputBuffer.prototype.getChar = function () {
        var value;
        if (this.forwardp[0] === 1)
            value = this.returnCharIfBuffer1NotEmpty();
        else
            value = this.returnCharIfBuffer2NotEmpty();
        if (value === "\n")
            this.incrementLineNumber();
        return value;
    };
    InputBuffer.prototype.returnCharIfBuffer1NotEmpty = function () {
        if (this.buffer1 == "") {
            this.endOfFile = true;
            return "";
        }
        else
            return this.buffer1[this.forwardp[1]];
    };
    InputBuffer.prototype.returnCharIfBuffer2NotEmpty = function () {
        if (this.buffer2 == "") {
            this.endOfFile = true;
            return "";
        }
        else
            return this.buffer2[this.forwardp[1]];
    };
    InputBuffer.prototype.increment = function () {
        if (this.forwardp[0] === 1 && this.forwardp[1] >= this.buffer1.length - 1) {
            this.populateBuffer2();
            this.forwardp = [2, 0];
        }
        else if (this.forwardp[0] === 2 && this.forwardp[1] >= this.buffer2.length - 1) {
            this.populateBuffer1();
            this.forwardp = [1, 0];
        }
        else
            this.forwardp[1]++;
    };
    InputBuffer.prototype.populateBuffer1 = function () {
        this.buffer1 = this.fileReader.readChunk();
        if (this.buffer1 === "")
            this.endOfFile = true;
    };
    InputBuffer.prototype.populateBuffer2 = function () {
        this.buffer2 = this.fileReader.readChunk();
        if (this.buffer2 === "")
            this.endOfFile = true;
    };
    InputBuffer.prototype.decrement = function () {
        if (this.forwardp[0] === 1 && this.forwardp[1] < 0)
            this.forwardp = [2, this.buffer1.length - 1];
        else if (this.forwardp[0] === 2 && this.forwardp[1] < 0)
            this.forwardp = [1, this.buffer2.length - 1];
        else
            this.forwardp[1]--;
    };
    InputBuffer.prototype.digest = function () {
        var lexeme;
        if (this.beginp[0] === this.forwardp[0]) {
            if (this.beginp[0] === 1)
                lexeme = this.buffer1.substring(this.beginp[1], this.forwardp[1]);
            else
                lexeme = this.buffer2.substring(this.beginp[1], this.forwardp[1]);
        }
        else
            lexeme = this.edgeReset();
        this.beginp[0] = this.forwardp[0];
        this.beginp[1] = this.forwardp[1];
        return lexeme;
    };
    InputBuffer.prototype.getBuffer = function (num) {
        if (num === 1)
            this.buffer1 = this.fileReader.readChunk();
        else
            this.buffer2 = this.fileReader.readChunk();
    };
    InputBuffer.prototype.edgeReset = function () {
        var lexeme;
        if (this.beginp[0] !== this.forwardp[0]) {
            if (this.beginp[0] === 1) {
                lexeme = this.buffer1.substring(this.beginp[1], this.buffer1.length) + this.buffer2.substring(0, this.forwardp[1] - 1);
            }
            else {
                lexeme = this.buffer2.substring(this.beginp[1], this.buffer2.length) + this.buffer1.substring(0, this.forwardp[1] - 1);
            }
        }
        return lexeme;
    };
    InputBuffer.prototype.getLineNumber = function () {
        return this.lineNumber;
    };
    InputBuffer.prototype.bufferFull = function (num) {
        if (num === 1)
            return this.buffer1 !== "";
        else
            return this.buffer2 !== "";
    };
    InputBuffer.prototype.bufferToString = function (num) {
        if (num === 1)
            return this.buffer1;
        else
            return this.buffer2;
    };
    InputBuffer.prototype.beginBackToForward = function () {
        this.forwardp[0] = this.beginp[0];
        this.forwardp[1] = this.beginp[1];
    };
    InputBuffer.prototype.getForwardP = function () {
        var forward = this.forwardp.toString();
        return forward.concat(": ", this.getChar());
    };
    InputBuffer.prototype.setPointerValues = function (buffer, index) {
        this.forwardp = [buffer, index];
        this.beginp = [buffer, index];
    };
    InputBuffer.prototype.isAtEndOfFile = function () {
        return this.endOfFile;
    };
    InputBuffer.prototype.incrementLineNumber = function () {
        this.incrementLineNumber;
    };
    InputBuffer.prototype.incrementBP = function () {
        this.beginp[1]++;
    };
    return InputBuffer;
}());
exports.InputBuffer = InputBuffer;
//# sourceMappingURL=InputBuffer.js.map