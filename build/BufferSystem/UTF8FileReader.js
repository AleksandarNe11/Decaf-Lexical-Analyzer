"use strict";
exports.__esModule = true;
exports.UTF8FileReader = void 0;
var fs = require("fs");
var string_decoder_1 = require("string_decoder");
var UTF8FileReader = (function () {
    function UTF8FileReader() {
        this.isOpen = false;
    }
    UTF8FileReader.prototype.open = function (filename, chunkSize) {
        if (chunkSize === void 0) { chunkSize = 16 * 1024; }
        this.chunkSize = chunkSize;
        try {
            this.fd = fs.openSync(filename, 'r');
        }
        catch (e) {
            throw new Error("opening " + filename + ", error:" + e.toString());
        }
        this.filename = filename;
        this.isOpen = true;
        this.readBuffer = Buffer.alloc(this.chunkSize);
        this.readFilePos = 0;
        this.utf8decoder = new string_decoder_1.StringDecoder('utf8');
    };
    UTF8FileReader.prototype.readChunk = function () {
        var decodedString = '';
        if (!this.isOpen) {
            return decodedString;
        }
        var readByteCount;
        try {
            readByteCount = fs.readSync(this.fd, this.readBuffer, 0, this.chunkSize, this.readFilePos);
        }
        catch (e) {
            throw new Error("reading " + this.filename + ", error:" + e.toString());
        }
        if (readByteCount) {
            this.readFilePos += readByteCount;
            var onlyReadBytesBuf = this.readBuffer.slice(0, readByteCount);
            decodedString = this.utf8decoder.write(onlyReadBytesBuf);
        }
        else {
            this.close();
        }
        return decodedString;
    };
    UTF8FileReader.prototype.close = function () {
        if (!this.isOpen) {
            return;
        }
        fs.closeSync(this.fd);
        this.isOpen = false;
        this.utf8decoder.end();
    };
    return UTF8FileReader;
}());
exports.UTF8FileReader = UTF8FileReader;
//# sourceMappingURL=UTF8FileReader.js.map