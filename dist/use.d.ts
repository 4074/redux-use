import { HookReturn } from './async';
declare const use: <Params extends any[], Data>(producer: (...args: Params) => Promise<Data>) => HookReturn<Params, Data>;
export declare const bindState: <Params extends any[], Data>(hook: () => HookReturn<Params, Data>) => HookReturn<Params, Data>;
export default use;
