"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useUnmountRef = () => {
    const ref = react_1.useRef(false);
    react_1.useEffect(() => () => {
        ref.current = true;
    }, []);
    return ref;
};
exports.default = useUnmountRef;
//# sourceMappingURL=useUnmountRef.js.map