"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.curry = function (fn) {
    if (fn.length === 0) {
        return fn;
    }
    var recursion = function (accum) { return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var temp = accum.concat(args);
        if (fn.length <= temp.length) {
            return fn.apply(void 0, temp);
        }
        return recursion(temp);
    }; };
    return recursion([]);
};
exports.sleep = function (ms) {
    if (ms === void 0) { ms = 500; }
    return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, new Promise(function (resolve) {
                    setTimeout(function () { return resolve(); }, ms);
                })];
        });
    });
};
exports.reduceSlideWindow = function (fn, init, kernel, stride, arrayData) {
    var recursion = function (accum, start) {
        if (arrayData.length < start + kernel) {
            return accum;
        }
        var curr = arrayData.slice(start, start + kernel);
        return recursion(fn(accum, curr), start + stride);
    };
    return recursion(init, 0);
};
exports.reduceChunk = exports.curry(function (fn, init, chunkSize, data) {
    return exports.reduceSlideWindow(fn, init, chunkSize, 1, data);
});
exports.reduceSplit = exports.curry(function (fn, init, kernel, data) {
    return exports.reduceSlideWindow(fn, init, kernel, kernel, data);
});
exports.reduceAsync = exports.curry(function (fn, init, data) { return __awaiter(_this, void 0, void 0, function () {
    var recursion;
    var _this = this;
    return __generator(this, function (_a) {
        recursion = function (accum, rest) { return __awaiter(_this, void 0, void 0, function () {
            var head, tail, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (data.length === 0) {
                            return [2, accum];
                        }
                        head = rest[0], tail = rest.slice(1);
                        return [4, fn(accum, head)];
                    case 1:
                        result = _a.sent();
                        return [2, recursion(result, tail)];
                }
            });
        }); };
        return [2, recursion(init, data)];
    });
}); });
exports.reduceObject = function (fn, initialValue, obj) {
    var keys = Object.keys(obj);
    return keys.reduce(function (accum, key) { return fn(accum, [key, obj[key]]); }, initialValue);
};
//# sourceMappingURL=index.js.map