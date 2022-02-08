import { InputBuffer } from "../InputBuffer";

export abstract class DFA { 

    protected abstract state: number;
    
    protected abstract start(c: string): void;

    public abstract evaluateDFA(ib: InputBuffer);
}