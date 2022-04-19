/**
 * A simple Event Emitter implement
 */
export declare class EventEmitter {
    private handlers;
    constructor();
    /**
     * Add a event listener
     * @param name string Event name
     * @param handler function Callback functon
     */
    on(name: string, handler: Function): Function;
    /**
     * Remove a event listener
     * @param name Event name
     */
    remove(name: string, handler?: Function): void;
    /**
     * Remove all listeners
     */
    removeAll(): void;
    /**
     * Emit a event
     * @param name string Event name
     * @param data any The data of event
     */
    emit(name: string, data?: any): void;
}
declare const _default: EventEmitter;
export default _default;
