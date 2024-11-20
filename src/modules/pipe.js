class Pipe {
    #namesWithCallbacks;

    init(names) {
        this.#namesWithCallbacks = names;
    }

    registerNewCallback(name, callback) {
        this.#namesWithCallbacks[name].callback = callback;
    }

    executeCallback(name) {
        this.#namesWithCallbacks[name].callback();
    }
}

export const pipe = new Pipe();
