export class InputBuffer { 

    /**
     * returns the current character that the second pointer is referencing 
     * @returns 
     */
    getChar(): string { 

        return "";
    }

    num: number = 0x5;

    /**
     * increments second pointer up one index
     */
    increment(): void { 

    }

    /**
     * increments second pointer back one index
     */
    decrement(): void { 

    }
    
    /**
     * 
     * @returns 
     */
    getString(): String { 

        return "";
    }
}

// function parseFile(file, callback) {
//     var fileSize   = file.size;
//     var chunkSize  = 64 * 1024; // bytes
//     var offset     = 0;
//     var self       = this; // we need a reference to the current object
//     var chunkReaderBlock = null;

//     var readEventHandler = function(evt) {
//         if (evt.target.error == null) {
//             offset += evt.target.result.length;
//             callback(evt.target.result); // callback for handling read chunk
//         } else {
//             console.log("Read error: " + evt.target.error);
//             return;
//         }
//         if (offset >= fileSize) {
//             console.log("Done reading file");
//             return;
//         }

//         // of to the next chunk
//         chunkReaderBlock(offset, chunkSize, file);
//     }

//     chunkReaderBlock = function(_offset, length, _file) {
//         var r = new FileReader();
//         var blob = _file.slice(_offset, length + _offset);
//         r.onload = readEventHandler;
//         r.readAsText(blob);
//     }