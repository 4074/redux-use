"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
/**
 * A simple Event Emitter implement
 */
class EventEmitter {
    constructor() {
        this.handlers = new Map();
    }
    /**
     * Add a event listener
     * @param name string Event name
     * @param handler function Callback functon
     */
    on(name, handler) {
        var _a;
        if (!this.handlers.has(name))
            this.handlers.set(name, new Map());
        const key = Symbol(name);
        (_a = this.handlers.get(name)) === null || _a === void 0 ? void 0 : _a.set(key, handler);
        return () => {
            var _a;
            (_a = this.handlers.get(name)) === null || _a === void 0 ? void 0 : _a.delete(key);
        };
    }
    /**
     * Remove a event listener
     * @param name Event name
     */
    remove(name, handler) {
        var _a;
        if (handler) {
            if (this.handlers.has(name)) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                for (const [k, h] of this.handlers.get(name).entries()) {
                    if (h === handler)
                        (_a = this.handlers.get(name)) === null || _a === void 0 ? void 0 : _a.delete(k);
                }
            }
        }
        else {
            this.handlers.delete(name);
        }
    }
    /**
     * Remove all listeners
     */
    removeAll() {
        this.handlers = new Map();
    }
    /**
     * Emit a event
     * @param name string Event name
     * @param data any The data of event
     */
    emit(name, data) {
        const currentHandlers = this.handlers.get(name);
        if (!currentHandlers)
            return;
        for (const handler of currentHandlers.values()) {
            handler(data);
        }
    }
}
exports.EventEmitter = EventEmitter;
exports.default = new EventEmitter();
//# sourceMappingURL=emitter.js.map