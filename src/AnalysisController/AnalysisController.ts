import { InputBuffer } from './../BufferSystem/InputBuffer';

import { IdentifierDFA } from '../DFAs/IdentifierDFA';
import { CommentDFA } from '../DFAs/CommentDFA';
import { NumberDFA } from '../DFAs/NumberDFA';
import { OperatorDFA } from '../DFAs/OperatorDFA';
import { StringDFA } from '../DFAs/StringDFA';

export class AnalysisController { 

    // instantiates input buffer on input file begins lexical analysis
    analyzeFile(fileName: string): void { 
        let ib = new InputBuffer(fileName);
    }
}