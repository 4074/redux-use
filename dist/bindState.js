"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
const react_1 = require("react");
const statusDetector_1 = __importDefault(require("./statusDetector"));
const use = (producer) => {
    const [state, setState] = react_1.useState({ status: 'none', data: null, params: [], error: null });
    const detectorRef = react_1.useRef(new statusDetector_1.default(state));
    detectorRef.current.setState(state);
    return [
        state,
        (...args) => {
            setState(Object.assign(Object.assign({}, state), { params: [...args], status: 'loading' }));
            producer(...args).then((res) => {
                setState(Object.assign(Object.assign({}, state), { data: res, status: 'finished' }));
            }, (error) => {
                setState(Object.assign(Object.assign({}, state), { error, status: 'error' }));
            });
        },
        detectorRef.current
    ];
};
exports.use = use;
exports.default = (hook) => {
    const h = hook;
    if (!h.__producer)
        return hook();
    return exports.use(h.__producer);
};
//# sourceMappingURL=bindState.js.map