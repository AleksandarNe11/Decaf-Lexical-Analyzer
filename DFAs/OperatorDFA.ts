import { DFA } from "./DFA";

class OperatorDFA extends DFA {
    protected state: number;
    protected exitState: number;
    protected start(c: string): void {
        throw new Error("Method not implemented.");
    }
    
    protected stateBehaviour(C: string): void {
        
    } 
    
}