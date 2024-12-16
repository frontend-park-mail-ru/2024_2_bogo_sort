import { PipeNames } from "@constants/sharedTypes.ts";

class Pipe {
    #namesWithCallbacks: PipeNames | undefined;

    init(names: PipeNames) {
        this.#namesWithCallbacks = names;
    }

    registerNewCallback(name: string, callback: (() => void)) {
        if(this.#namesWithCallbacks?.[name]){
            this.#namesWithCallbacks[name].callback = callback;
        }
    }

    executeCallback(name: string) {
        if(this.#namesWithCallbacks?.[name]){
            if(this.#namesWithCallbacks[name].callback) {
                this.#namesWithCallbacks[name].callback();
            };
        }
    }
}

export const pipe = new Pipe();
