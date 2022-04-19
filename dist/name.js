"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setFunctionName = exports.createName = void 0;
const names = new Set();
const createName = (origin) => {
    let name = origin;
    if (!origin || names.has(origin)) {
        name = `${origin}_${Math.random().toString().slice(-8)}`;
        // eslint-disable-next-line no-console
        if (origin)
            console === null || console === void 0 ? void 0 : console.warn(`Can not use duplicate name '${origin}' as a slice name.`, `\nReplace it to ${name} already.`);
    }
    names.add(name);
    return name;
};
exports.createName = createName;
const setFunctionName = (name, fn) => {
    Object.defineProperty(fn, 'name', { value: name });
    return fn;
};
exports.setFunctionName = setFunctionName;
//# sourceMappingURL=name.js.map