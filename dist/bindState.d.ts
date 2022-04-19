import { HookReturn } from './async';
export declare const use: <Params extends any[], Data>(producer: (...args: Params) => Promise<Data>) => HookReturn<Params, Data>;
declare const _default: <T>(hook: () => T) => T;
export default _default;
