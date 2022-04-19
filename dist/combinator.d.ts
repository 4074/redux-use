import { Slice } from '@reduxjs/toolkit';
import { Reducer } from 'redux';
export declare class Combinator {
    private prefix;
    private combined;
    use: (name: string, slice: Slice) => void;
    mapState: (state: any) => any;
    combine: (prefix?: string) => Reducer<import("redux").CombinedState<{
        [x: string]: any;
    }>, import("redux").AnyAction>;
}
declare const _default: Combinator;
export default _default;
