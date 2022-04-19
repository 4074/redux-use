"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const react_redux_1 = require("react-redux");
const combinator_1 = __importDefault(require("./combinator"));
const name_1 = require("./name");
exports.default = ({ name, initialState, reducers, extraReducers }) => {
    const slice = toolkit_1.createSlice({
        name: name_1.createName(name),
        initialState,
        reducers: (reducers || {}),
        extraReducers: extraReducers || (() => { })
    });
    const hook = () => {
        const data = react_redux_1.useSelector(state => combinator_1.default.mapState(state)[name]);
        const dispatch = react_redux_1.useDispatch();
        const dispatcher = {};
        for (const key of Object.keys(slice.actions)) {
            dispatcher[key] = (...params) => {
                dispatch(slice.actions[key](...params));
            };
        }
        return [data, dispatcher];
    };
    combinator_1.default.use(name, slice);
    return {
        name,
        actions: slice.actions,
        hook
    };
};
//# sourceMappingURL=sync.js.map