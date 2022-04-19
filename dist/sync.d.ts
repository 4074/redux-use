import { ActionReducerMapBuilder, SliceCaseReducers, ValidateSliceCaseReducers, CaseReducerActions } from '@reduxjs/toolkit';
declare type ActionDispatchers<Actions extends CaseReducerActions<Reducers>, Reducers extends SliceCaseReducers<any>> = {
    [Type in keyof Actions]: Actions[Type] extends (...params: infer Params) => any ? (...params: Params) => void : never;
};
declare const _default: <State, Reducers extends SliceCaseReducers<State>>({ name, initialState, reducers, extraReducers }: {
    name: string;
    initialState: State;
    reducers?: ValidateSliceCaseReducers<State, Reducers>;
    extraReducers?: (builder: ActionReducerMapBuilder<State>) => void;
}) => {
    name: string;
    actions: CaseReducerActions<Reducers>;
    hook: () => [State, ActionDispatchers<CaseReducerActions<Reducers>, Reducers>];
};
export default _default;
