import * as readline from 'readline';
let N = 10;
let SENTINEL = 'eof';
let buffer: Array<string> = [];
let seperators: Array<string> = [' ', ';'] //'*', '+', '-' etc.
var b = 0, index = 0, isEnd = false, bp = 0, fp = 0;

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter input: ', (answer : string) => {
    loadBuffer(buffer, b, answer);
    rl.close();
});

/*use buffer pair, so that once one side of the buffer is done the second is automatically 
filled and starts, and once the second is done, the first is filled and starts*/

//add a sentinel at the end of both the first and second buffer
//when forward pointing to the eof of first buffer the second pointer is filled

function loadBuffer(buff: string[], b: number, text: string){
  //this function is where the buffers will be populated
  for (let i = 0; i < N - 1; i++) {
    if (text[index] == null) {
        buffer[b] = SENTINEL;
        for (let j = i + 1; j < N - 1; j++) {
            b += 1;
            buffer[b] = '';
        }
        break;
    } else {
        buffer[b] = text[index];
        b += 1;
    }
    index += 1;
  }
  buffer[b] = SENTINEL;
  readBuffer(buffer, text);
}

function readBuffer(buffer: string[], text: string) {
  while (!isEnd) {
    //console.log(buffer);
    if (buffer[fp] == SENTINEL) {
      if (fp == N - 1) { //if forward is at the end of first half
        fp += 1;
        loadBuffer(buffer, fp, text);
      } else if (fp == (N * 2) - 1) { //if forward is at the end of second half
        fp = 0;
        loadBuffer(buffer, fp, text);
      } else { //end of the input
        //terminate
        console.log((buffer.slice(bp,fp)).join("")); //just checking the lexeme
        isEnd = true;
      }
    } else {
      if (seperators.indexOf(buffer[fp]) > -1) {
        console.log((buffer.slice(bp,fp)).join("")); //just checking the lexeme
        if (buffer[fp] == ' ') {
            bp = fp + 1;
        }
      }
    }
    fp += 1;
  }
}