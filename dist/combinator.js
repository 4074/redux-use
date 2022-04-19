"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Combinator = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
class Combinator {
    constructor() {
        this.combined = {};
        this.use = (name, slice) => {
            this.combined[name] = slice.reducer;
        };
        this.mapState = (state) => this.prefix ? state[this.prefix] : state;
        this.combine = (prefix) => {
            this.prefix = prefix;
            return toolkit_1.combineReducers(this.combined);
        };
    }
}
exports.Combinator = Combinator;
exports.default = new Combinator();
//# sourceMappingURL=combinator.js.map