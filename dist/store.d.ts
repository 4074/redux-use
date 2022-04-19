import { HookReturn } from './async';
export interface StoreOptions<T> {
    cacheKey?: string | ((params: T) => string);
}
export interface StoreCache<P, D> {
    get: (params: P) => D | undefined;
    set: (params: P, data: D) => void;
}
declare const store: <Params extends any[], Data>(producer: (...args: Params) => Promise<Data>, options?: StoreOptions<Params>) => (...args: Params) => Promise<Data>;
export declare const bindStore: <Params extends any[], Data>(hook: () => HookReturn<Params, Data>) => (...args: Params) => Promise<Data>;
export default store;
