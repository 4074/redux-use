"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StatusDetector {
    constructor(state) {
        this.setState = (s) => {
            this.state = s;
        };
        this.isLoading = () => {
            return this.state.status === 'loading';
        };
        this.isFinished = () => {
            return this.state.status === 'finished';
        };
        this.isError = () => {
            return this.state.status === 'error';
        };
        this.shouldInitialLoad = () => {
            return this.state.status === 'none' || this.state.status === 'error';
        };
        this.attach = (fn) => {
            const attached = fn;
            attached.isLoading = this.isLoading;
            attached.isFinished = this.isFinished;
            attached.isError = this.isError;
            attached.shouldInitialLoad = this.shouldInitialLoad;
            return attached;
        };
        this.state = state;
    }
}
exports.default = StatusDetector;
//# sourceMappingURL=statusDetector.js.map