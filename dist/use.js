"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindState = void 0;
const react_1 = require("react");
const statusDetector_1 = __importDefault(require("./statusDetector"));
const useUnmountRef_1 = __importDefault(require("./useUnmountRef"));
const use = (producer) => {
    const [state, setState] = react_1.useState({ status: 'none', data: null, params: [], error: null });
    const unmountRef = useUnmountRef_1.default();
    const detectorRef = react_1.useRef(new statusDetector_1.default(state));
    detectorRef.current.setState(state);
    const emitter = producer.__emitter;
    const cache = producer.__cache;
    // Emit store state change
    const setStateWithStore = react_1.useCallback((nextState) => {
        setState(nextState);
        emitter === null || emitter === void 0 ? void 0 : emitter.emit('set', nextState);
    }, []);
    // Listen store state change
    react_1.useEffect(() => {
        emitter === null || emitter === void 0 ? void 0 : emitter.on('set', setState);
        return () => emitter === null || emitter === void 0 ? void 0 : emitter.remove('set', setState);
    }, []);
    const producerWrapped = react_1.useCallback(async (...args) => {
        // Use cache if exists
        if (cache === null || cache === void 0 ? void 0 : cache.get(args)) {
            setStateWithStore(Object.assign(Object.assign({}, state), { params: [...args], data: cache === null || cache === void 0 ? void 0 : cache.get(args), status: 'finished' }));
            return;
        }
        else {
            setStateWithStore(Object.assign(Object.assign({}, state), { params: [...args], status: 'loading' }));
        }
        try {
            const data = await producer(...args);
            if (unmountRef.current)
                return;
            // Set cache
            cache === null || cache === void 0 ? void 0 : cache.set(args, data);
            setStateWithStore(Object.assign(Object.assign({}, state), { data, status: 'finished' }));
        }
        catch (error) {
            if (unmountRef.current)
                return;
            setStateWithStore(Object.assign(Object.assign({}, state), { error, status: 'error' }));
        }
    }, []);
    return [state, producerWrapped, detectorRef.current];
};
const bindState = (hook) => {
    const h = hook;
    if (!h.__producer)
        return hook();
    return use(h.__producer);
};
exports.bindState = bindState;
exports.default = use;
//# sourceMappingURL=use.js.map