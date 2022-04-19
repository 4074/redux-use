"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Combinator = exports.setFunctionName = void 0;
const async_1 = __importDefault(require("./async"));
const sync_1 = __importDefault(require("./sync"));
const combinator_1 = __importDefault(require("./combinator"));
const bindState_1 = __importStar(require("./bindState"));
var name_1 = require("./name");
Object.defineProperty(exports, "setFunctionName", { enumerable: true, get: function () { return name_1.setFunctionName; } });
var combinator_2 = require("./combinator");
Object.defineProperty(exports, "Combinator", { enumerable: true, get: function () { return combinator_2.Combinator; } });
exports.default = {
    sync: sync_1.default,
    async: async_1.default,
    use: bindState_1.use,
    bindState: bindState_1.default,
    reducer: combinator_1.default.combine
};
//# sourceMappingURL=index.js.map