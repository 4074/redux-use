"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const react_redux_1 = require("react-redux");
const combinator_1 = __importDefault(require("./combinator"));
const name_1 = require("./name");
const statusDetector_1 = __importDefault(require("./statusDetector"));
const addProcessingKey = (params, state, getter) => {
    const key = getter(...params);
    if (key !== undefined) {
        if (!state.processingKeys)
            state.processingKeys = {};
        state.processingKeys[key] = true;
    }
};
const removeProcessingKey = (params, state, getter) => {
    const key = getter(...params);
    if (key !== undefined && state.processingKeys && state.processingKeys[key])
        delete state.processingKeys[key];
};
exports.default = (producer, { name, initialState, reducers, extraReducers, getProcessingKey = (...params) => { var _a; return (_a = params[0]) === null || _a === void 0 ? void 0 : _a['id']; }, combinator = combinator_1.default } = {}) => {
    const realInitialState = initialState || { status: 'none' };
    // Use producer func name or name of options
    let sliceName = name_1.createName(name || producer.name);
    const thunk = toolkit_1.createAsyncThunk(sliceName, (async (params) => {
        const result = await producer(...params);
        return result;
    }));
    const slice = toolkit_1.createSlice({
        name: sliceName,
        initialState: realInitialState,
        reducers: reducers || {},
        extraReducers: (builder) => {
            builder.addCase(thunk.pending, (state, { meta }) => {
                state.status = 'loading';
                state.params = meta.arg;
                addProcessingKey(state.params, state, getProcessingKey);
            }).addCase(thunk.fulfilled, (state, { payload, meta }) => {
                state.status = 'finished';
                state.params = meta.arg;
                state.data = payload;
                removeProcessingKey(state.params, state, getProcessingKey);
            }).addCase(thunk.rejected, (state, action) => {
                state.status = 'error';
                state.params = action.meta.arg;
                state.error = action.error;
                removeProcessingKey(state.params, state, getProcessingKey);
            });
            extraReducers === null || extraReducers === void 0 ? void 0 : extraReducers(builder);
        }
    });
    const hook = () => {
        const data = react_redux_1.useSelector(state => combinator.mapState(state)[sliceName]);
        const dispatch = react_redux_1.useDispatch();
        const detector = new statusDetector_1.default(data);
        const load = async (...params) => {
            dispatch(thunk(params));
        };
        // const attached = status.attach(load)
        return [data, load, detector];
    };
    // TODO:
    hook.__producer = producer;
    combinator.use(sliceName, slice);
    return {
        name: sliceName,
        actions: slice.actions,
        thunk,
        hook
    };
};
//# sourceMappingURL=async.js.map