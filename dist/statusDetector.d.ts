import { AsyncState } from "./async";
export interface StatusDetectorAttached<T extends (...args: any[]) => any> {
    isLoading: () => boolean;
    isFinished: () => boolean;
    isError: () => boolean;
    shouldInitialLoad: () => boolean;
    (...params: Parameters<T>): ReturnType<T>;
}
export default class StatusDetector {
    private state;
    constructor(state: AsyncState);
    setState: (s: AsyncState) => void;
    isLoading: () => boolean;
    isFinished: () => boolean;
    isError: () => boolean;
    shouldInitialLoad: () => boolean;
    attach: <T extends (...args: any[]) => any>(fn: T) => StatusDetectorAttached<T>;
}
