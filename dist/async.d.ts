import { Draft, ActionReducerMapBuilder, SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit';
import { Combinator } from './combinator';
import StatusDetector from './statusDetector';
export interface AsyncState<Params = any, Data = any> {
    status: 'none' | 'loading' | 'finished' | 'error';
    params?: Params;
    data?: Data;
    error?: Error;
    processingKeys?: Record<string | number, boolean>;
}
export interface AsyncStateWithHelpers<Params = any, Data = any> extends AsyncState<Params, Data> {
    isLoading: () => boolean;
    isFinished: () => boolean;
    isError: () => boolean;
    shouldInitialLoad: () => boolean;
}
export declare type HookReturn<Params extends any[], Data> = [
    AsyncState<Params, Data>,
    (...args: Params) => void,
    StatusDetector
];
declare type ProcessingKeyGetter<Params extends any[]> = (...params: Params) => string | number | undefined;
declare const _default: <Params extends any[], Data, Reducers extends SliceCaseReducers<AsyncState<Params, Data>>>(producer: (...args: Params) => Promise<Data>, { name, initialState, reducers, extraReducers, getProcessingKey, combinator }?: {
    name?: string;
    initialState?: AsyncState<Params, Data>;
    reducers?: ValidateSliceCaseReducers<AsyncState<Params, Data>, Reducers>;
    extraReducers?: (builder: ActionReducerMapBuilder<AsyncState<Params, Data>>) => void;
    getProcessingKey?: ProcessingKeyGetter<Params>;
    combinator?: InstanceType<typeof Combinator>;
}) => {
    name: string;
    actions: import("@reduxjs/toolkit").CaseReducerActions<{}>;
    thunk: import("@reduxjs/toolkit").AsyncThunk<Draft<Data>, Draft<Params>, {}>;
    hook: {
        (): [AsyncState<Params, Data>, (...args: Params) => Promise<void>, StatusDetector];
        __producer: (...args: Params) => Promise<Data>;
    };
};
export default _default;
