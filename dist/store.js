"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindStore = void 0;
const emitter_1 = require("./emitter");
const getCacheKeys = (key, params) => {
    if (typeof key === 'string')
        return key;
    return key(params);
};
const store = (producer, options) => {
    const emitter = new emitter_1.EventEmitter();
    const map = new Map();
    const cache = {
        get: (params) => {
            const key = getCacheKeys(options.cacheKey, params);
            return key !== undefined && map.get(key);
        },
        set: (params, data) => {
            const key = getCacheKeys(options.cacheKey, params);
            if (key !== undefined)
                map.set(key, data);
        },
    };
    producer.__emitter = emitter;
    producer.__cache = cache;
    return producer;
};
const bindStore = (hook) => {
    const h = hook;
    if (h.__producer) {
        return store(h.__producer);
    }
    else {
        throw Error('bindStore params should be the hook of reduxu.async');
    }
};
exports.bindStore = bindStore;
exports.default = store;
//# sourceMappingURL=store.js.map