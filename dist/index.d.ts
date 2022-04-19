export type { PayloadAction } from '@reduxjs/toolkit';
export type { AsyncState } from './async';
export { setFunctionName } from './name';
export { Combinator } from './combinator';
declare const _default: {
    sync: <State, Reducers extends import("@reduxjs/toolkit").SliceCaseReducers<State>>({ name, initialState, reducers, extraReducers }: {
        name: string;
        initialState: State;
        reducers?: import("@reduxjs/toolkit").ValidateSliceCaseReducers<State, Reducers>;
        extraReducers?: (builder: import("@reduxjs/toolkit").ActionReducerMapBuilder<State>) => void;
    }) => {
        name: string;
        actions: import("@reduxjs/toolkit").CaseReducerActions<Reducers>;
        hook: () => [State, { [Type in keyof import("@reduxjs/toolkit").CaseReducerActions<Reducers>]: import("@reduxjs/toolkit").CaseReducerActions<Reducers>[Type] extends (...params: infer Params) => any ? (...params: Params) => void : never; }];
    };
    async: <Params_1 extends any[], Data, Reducers_1 extends import("@reduxjs/toolkit").SliceCaseReducers<import("./async").AsyncState<Params_1, Data>>>(producer: (...args: Params_1) => Promise<Data>, { name, initialState, reducers, extraReducers, getProcessingKey, combinator }?: {
        name?: string;
        initialState?: import("./async").AsyncState<Params_1, Data>;
        reducers?: import("@reduxjs/toolkit").ValidateSliceCaseReducers<import("./async").AsyncState<Params_1, Data>, Reducers_1>;
        extraReducers?: (builder: import("@reduxjs/toolkit").ActionReducerMapBuilder<import("./async").AsyncState<Params_1, Data>>) => void;
        getProcessingKey?: (...params: Params_1) => string | number;
        combinator?: import("./combinator").Combinator;
    }) => {
        name: string;
        actions: import("@reduxjs/toolkit").CaseReducerActions<{}>;
        thunk: import("@reduxjs/toolkit").AsyncThunk<import("@reduxjs/toolkit").Draft<Data>, import("@reduxjs/toolkit").Draft<Params_1>, {}>;
        hook: {
            (): [import("./async").AsyncState<Params_1, Data>, (...args: Params_1) => Promise<void>, import("./statusDetector").default];
            __producer: (...args: Params_1) => Promise<Data>;
        };
    };
    use: <Params_2 extends any[], Data_1>(producer: (...args: Params_2) => Promise<Data_1>) => import("./async").HookReturn<Params_2, Data_1>;
    bindState: <T>(hook: () => T) => T;
    reducer: (prefix?: string) => import("redux").Reducer<import("redux").CombinedState<{
        [x: string]: any;
    }>, import("redux").AnyAction>;
};
export default _default;
