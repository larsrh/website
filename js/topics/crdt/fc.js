(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.fc = {}));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
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
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    var PreconditionFailure = (function (_super) {
        __extends(PreconditionFailure, _super);
        function PreconditionFailure(interruptExecution) {
            if (interruptExecution === void 0) { interruptExecution = false; }
            var _this = _super.call(this) || this;
            _this.interruptExecution = interruptExecution;
            _this.footprint = PreconditionFailure.SharedFootPrint;
            return _this;
        }
        PreconditionFailure.isFailure = function (err) {
            return err != null && err.footprint === PreconditionFailure.SharedFootPrint;
        };
        PreconditionFailure.SharedFootPrint = Symbol["for"]('fast-check/PreconditionFailure');
        return PreconditionFailure;
    }(Error));

    var pre = function (expectTruthy) {
        if (!expectTruthy) {
            throw new PreconditionFailure();
        }
    };

    var Nil = (function () {
        function Nil() {
        }
        Nil.prototype[Symbol.iterator] = function () {
            return this;
        };
        Nil.prototype.next = function (value) {
            return { value: value, done: true };
        };
        Nil.nil = new Nil();
        return Nil;
    }());
    function nilHelper() {
        return Nil.nil;
    }
    function mapHelper(g, f) {
        var g_1, g_1_1, v, e_1_1;
        var e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 7]);
                    g_1 = __values(g), g_1_1 = g_1.next();
                    _b.label = 1;
                case 1:
                    if (!!g_1_1.done) return [3, 4];
                    v = g_1_1.value;
                    return [4, f(v)];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    g_1_1 = g_1.next();
                    return [3, 1];
                case 4: return [3, 7];
                case 5:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 7];
                case 6:
                    try {
                        if (g_1_1 && !g_1_1.done && (_a = g_1["return"])) _a.call(g_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7];
                case 7: return [2];
            }
        });
    }
    function flatMapHelper(g, f) {
        var g_2, g_2_1, v, e_2_1;
        var e_2, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 7]);
                    g_2 = __values(g), g_2_1 = g_2.next();
                    _b.label = 1;
                case 1:
                    if (!!g_2_1.done) return [3, 4];
                    v = g_2_1.value;
                    return [5, __values(f(v))];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    g_2_1 = g_2.next();
                    return [3, 1];
                case 4: return [3, 7];
                case 5:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 7];
                case 6:
                    try {
                        if (g_2_1 && !g_2_1.done && (_a = g_2["return"])) _a.call(g_2);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7];
                case 7: return [2];
            }
        });
    }
    function filterHelper(g, f) {
        var g_3, g_3_1, v, e_3_1;
        var e_3, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 7]);
                    g_3 = __values(g), g_3_1 = g_3.next();
                    _b.label = 1;
                case 1:
                    if (!!g_3_1.done) return [3, 4];
                    v = g_3_1.value;
                    if (!f(v)) return [3, 3];
                    return [4, v];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    g_3_1 = g_3.next();
                    return [3, 1];
                case 4: return [3, 7];
                case 5:
                    e_3_1 = _b.sent();
                    e_3 = { error: e_3_1 };
                    return [3, 7];
                case 6:
                    try {
                        if (g_3_1 && !g_3_1.done && (_a = g_3["return"])) _a.call(g_3);
                    }
                    finally { if (e_3) throw e_3.error; }
                    return [7];
                case 7: return [2];
            }
        });
    }
    function takeWhileHelper(g, f) {
        var cur;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cur = g.next();
                    _a.label = 1;
                case 1:
                    if (!(!cur.done && f(cur.value))) return [3, 3];
                    return [4, cur.value];
                case 2:
                    _a.sent();
                    cur = g.next();
                    return [3, 1];
                case 3: return [2];
            }
        });
    }
    function joinHelper(g, others) {
        var cur, others_1, others_1_1, s, cur, e_4_1;
        var e_4, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    cur = g.next();
                    _b.label = 1;
                case 1:
                    if (!!cur.done) return [3, 4];
                    return [4, cur.value];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    cur = g.next();
                    return [3, 1];
                case 4:
                    _b.trys.push([4, 11, 12, 13]);
                    others_1 = __values(others), others_1_1 = others_1.next();
                    _b.label = 5;
                case 5:
                    if (!!others_1_1.done) return [3, 10];
                    s = others_1_1.value;
                    cur = s.next();
                    _b.label = 6;
                case 6:
                    if (!!cur.done) return [3, 9];
                    return [4, cur.value];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8:
                    cur = s.next();
                    return [3, 6];
                case 9:
                    others_1_1 = others_1.next();
                    return [3, 5];
                case 10: return [3, 13];
                case 11:
                    e_4_1 = _b.sent();
                    e_4 = { error: e_4_1 };
                    return [3, 13];
                case 12:
                    try {
                        if (others_1_1 && !others_1_1.done && (_a = others_1["return"])) _a.call(others_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                    return [7];
                case 13: return [2];
            }
        });
    }

    var Stream = (function () {
        function Stream(g) {
            this.g = g;
        }
        Stream.nil = function () {
            return new Stream(nilHelper());
        };
        Stream.prototype.next = function () {
            return this.g.next();
        };
        Stream.prototype[Symbol.iterator] = function () {
            return this.g;
        };
        Stream.prototype.map = function (f) {
            return new Stream(mapHelper(this.g, f));
        };
        Stream.prototype.flatMap = function (f) {
            return new Stream(flatMapHelper(this.g, f));
        };
        Stream.prototype.dropWhile = function (f) {
            var foundEligible = false;
            function helper(v) {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(foundEligible || !f(v))) return [3, 2];
                            foundEligible = true;
                            return [4, v];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2];
                    }
                });
            }
            return this.flatMap(helper);
        };
        Stream.prototype.drop = function (n) {
            var idx = 0;
            function helper() {
                return idx++ < n;
            }
            return this.dropWhile(helper);
        };
        Stream.prototype.takeWhile = function (f) {
            return new Stream(takeWhileHelper(this.g, f));
        };
        Stream.prototype.take = function (n) {
            var idx = 0;
            function helper() {
                return idx++ < n;
            }
            return this.takeWhile(helper);
        };
        Stream.prototype.filter = function (f) {
            return new Stream(filterHelper(this.g, f));
        };
        Stream.prototype.every = function (f) {
            var e_1, _a;
            try {
                for (var _b = __values(this.g), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var v = _c.value;
                    if (!f(v)) {
                        return false;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return true;
        };
        Stream.prototype.has = function (f) {
            var e_2, _a;
            try {
                for (var _b = __values(this.g), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var v = _c.value;
                    if (f(v)) {
                        return [true, v];
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return [false, null];
        };
        Stream.prototype.join = function () {
            var others = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                others[_i] = arguments[_i];
            }
            return new Stream(joinHelper(this.g, others));
        };
        Stream.prototype.getNthOrLast = function (nth) {
            var e_3, _a;
            var remaining = nth;
            var last = null;
            try {
                for (var _b = __values(this.g), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var v = _c.value;
                    if (remaining-- === 0)
                        return v;
                    last = v;
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return last;
        };
        return Stream;
    }());
    function stream(g) {
        return new Stream(g);
    }

    var cloneMethod = Symbol["for"]('fast-check/cloneMethod');
    var hasCloneMethod = function (instance) {
        return instance instanceof Object && typeof instance[cloneMethod] === 'function';
    };

    var Shrinkable = (function () {
        function Shrinkable(value_, shrink) {
            if (shrink === void 0) { shrink = function () { return Stream.nil(); }; }
            this.value_ = value_;
            this.shrink = shrink;
            this.hasToBeCloned = hasCloneMethod(value_);
            this.readOnce = false;
            Object.defineProperty(this, 'value', { get: this.getValue });
        }
        Shrinkable.prototype.getValue = function () {
            if (this.hasToBeCloned) {
                if (!this.readOnce) {
                    this.readOnce = true;
                    return this.value_;
                }
                return this.value_[cloneMethod]();
            }
            return this.value_;
        };
        Shrinkable.prototype.applyMapper = function (mapper) {
            var _this = this;
            if (this.hasToBeCloned) {
                var out = mapper(this.value);
                if (out instanceof Object) {
                    out[cloneMethod] = function () { return mapper(_this.value); };
                }
                return out;
            }
            return mapper(this.value);
        };
        Shrinkable.prototype.map = function (mapper) {
            var _this = this;
            return new Shrinkable(this.applyMapper(mapper), function () { return _this.shrink().map(function (v) { return v.map(mapper); }); });
        };
        Shrinkable.prototype.filter = function (refinement) {
            var _this = this;
            var refinementOnShrinkable = function (s) {
                return refinement(s.value);
            };
            return new Shrinkable(this.value, function () {
                return _this.shrink()
                    .filter(refinementOnShrinkable)
                    .map(function (v) { return v.filter(refinement); });
            });
        };
        return Shrinkable;
    }());

    var Arbitrary = (function () {
        function Arbitrary() {
        }
        Arbitrary.prototype.filter = function (refinement) {
            var arb = this;
            var refinementOnShrinkable = function (s) {
                return refinement(s.value);
            };
            return new ((function (_super) {
                __extends(class_1, _super);
                function class_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                class_1.prototype.generate = function (mrng) {
                    var g = arb.generate(mrng);
                    while (!refinementOnShrinkable(g)) {
                        g = arb.generate(mrng);
                    }
                    return g.filter(refinement);
                };
                class_1.prototype.withBias = function (freq) {
                    return arb.withBias(freq).filter(refinement);
                };
                return class_1;
            }(Arbitrary)))();
        };
        Arbitrary.prototype.map = function (mapper) {
            var arb = this;
            return new ((function (_super) {
                __extends(class_2, _super);
                function class_2() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                class_2.prototype.generate = function (mrng) {
                    return arb.generate(mrng).map(mapper);
                };
                class_2.prototype.withBias = function (freq) {
                    return arb.withBias(freq).map(mapper);
                };
                return class_2;
            }(Arbitrary)))();
        };
        Arbitrary.shrinkChain = function (mrng, src, dst, fmapper) {
            return new Shrinkable(dst.value, function () {
                return src
                    .shrink()
                    .map(function (v) {
                    return Arbitrary.shrinkChain(mrng.clone(), v, fmapper(v.value).generate(mrng.clone()), fmapper);
                })
                    .join(dst.shrink());
            });
        };
        Arbitrary.prototype.chain = function (fmapper) {
            var arb = this;
            return new ((function (_super) {
                __extends(class_3, _super);
                function class_3() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                class_3.prototype.generate = function (mrng) {
                    var clonedMrng = mrng.clone();
                    var src = arb.generate(mrng);
                    var dst = fmapper(src.value).generate(mrng);
                    return Arbitrary.shrinkChain(clonedMrng, src, dst, fmapper);
                };
                class_3.prototype.withBias = function (freq) {
                    return arb.withBias(freq).chain(function (t) { return fmapper(t).withBias(freq); });
                };
                return class_3;
            }(Arbitrary)))();
        };
        Arbitrary.prototype.noShrink = function () {
            var arb = this;
            return new ((function (_super) {
                __extends(class_4, _super);
                function class_4() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                class_4.prototype.generate = function (mrng) {
                    return new Shrinkable(arb.generate(mrng).value);
                };
                class_4.prototype.withBias = function (freq) {
                    return arb.withBias(freq).noShrink();
                };
                return class_4;
            }(Arbitrary)))();
        };
        Arbitrary.prototype.withBias = function (_freq) {
            return this;
        };
        Arbitrary.prototype.noBias = function () {
            var arb = this;
            return new ((function (_super) {
                __extends(class_5, _super);
                function class_5() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                class_5.prototype.generate = function (mrng) {
                    return arb.generate(mrng);
                };
                return class_5;
            }(Arbitrary)))();
        };
        return Arbitrary;
    }());

    var GenericTupleArbitrary = (function (_super) {
        __extends(GenericTupleArbitrary, _super);
        function GenericTupleArbitrary(arbs) {
            var _this = _super.call(this) || this;
            _this.arbs = arbs;
            for (var idx = 0; idx !== arbs.length; ++idx) {
                var arb = arbs[idx];
                if (arb == null || arb.generate == null)
                    throw new Error("Invalid parameter encountered at index " + idx + ": expecting an Arbitrary");
            }
            return _this;
        }
        GenericTupleArbitrary.makeItCloneable = function (vs, shrinkables) {
            vs[cloneMethod] = function () {
                var cloned = [];
                for (var idx = 0; idx !== shrinkables.length; ++idx) {
                    cloned.push(shrinkables[idx].value);
                }
                GenericTupleArbitrary.makeItCloneable(cloned, shrinkables);
                return cloned;
            };
            return vs;
        };
        GenericTupleArbitrary.wrapper = function (shrinkables) {
            var cloneable = false;
            var vs = [];
            for (var idx = 0; idx !== shrinkables.length; ++idx) {
                var s = shrinkables[idx];
                cloneable = cloneable || s.hasToBeCloned;
                vs.push(s.value);
            }
            if (cloneable) {
                GenericTupleArbitrary.makeItCloneable(vs, shrinkables);
            }
            return new Shrinkable(vs, function () { return GenericTupleArbitrary.shrinkImpl(shrinkables).map(GenericTupleArbitrary.wrapper); });
        };
        GenericTupleArbitrary.prototype.generate = function (mrng) {
            return GenericTupleArbitrary.wrapper(this.arbs.map(function (a) { return a.generate(mrng); }));
        };
        GenericTupleArbitrary.shrinkImpl = function (value) {
            var s = Stream.nil();
            var _loop_1 = function (idx) {
                s = s.join(value[idx].shrink().map(function (v) {
                    return value
                        .slice(0, idx)
                        .concat([v])
                        .concat(value.slice(idx + 1));
                }));
            };
            for (var idx = 0; idx !== value.length; ++idx) {
                _loop_1(idx);
            }
            return s;
        };
        GenericTupleArbitrary.prototype.withBias = function (freq) {
            return new GenericTupleArbitrary(this.arbs.map(function (a) { return a.withBias(freq); }));
        };
        return GenericTupleArbitrary;
    }(Arbitrary));
    function genericTuple(arbs) {
        return new GenericTupleArbitrary(arbs);
    }

    function tuple() {
        var arbs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arbs[_i] = arguments[_i];
        }
        return new GenericTupleArbitrary(arbs);
    }

    var runIdToFrequency = function (runId) { return 2 + Math.floor(Math.log(runId + 1) / Math.log(10)); };

    var AsyncProperty = (function () {
        function AsyncProperty(arb, predicate) {
            this.arb = arb;
            this.predicate = predicate;
            this.beforeEachHook = AsyncProperty.dummyHook;
            this.afterEachHook = AsyncProperty.dummyHook;
            this.isAsync = function () { return true; };
        }
        AsyncProperty.prototype.generate = function (mrng, runId) {
            return runId != null ? this.arb.withBias(runIdToFrequency(runId)).generate(mrng) : this.arb.generate(mrng);
        };
        AsyncProperty.prototype.run = function (v) {
            return __awaiter(this, void 0, void 0, function () {
                var output, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.beforeEachHook()];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, 5, 7]);
                            return [4, this.predicate(v)];
                        case 3:
                            output = _a.sent();
                            return [2, output == null || output === true ? null : 'Property failed by returning false'];
                        case 4:
                            err_1 = _a.sent();
                            if (PreconditionFailure.isFailure(err_1))
                                return [2, err_1];
                            if (err_1 instanceof Error && err_1.stack)
                                return [2, err_1 + "\n\nStack trace: " + err_1.stack];
                            return [2, "" + err_1];
                        case 5: return [4, this.afterEachHook()];
                        case 6:
                            _a.sent();
                            return [7];
                        case 7: return [2];
                    }
                });
            });
        };
        AsyncProperty.prototype.beforeEach = function (hookFunction) {
            this.beforeEachHook = hookFunction;
            return this;
        };
        AsyncProperty.prototype.afterEach = function (hookFunction) {
            this.afterEachHook = hookFunction;
            return this;
        };
        AsyncProperty.dummyHook = function () { };
        return AsyncProperty;
    }());

    function asyncProperty() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length < 2)
            throw new Error('asyncProperty expects at least two parameters');
        var arbs = args.slice(0, args.length - 1);
        var p = args[args.length - 1];
        return new AsyncProperty(genericTuple(arbs), function (t) { return p.apply(void 0, __spread(t)); });
    }

    var Property = (function () {
        function Property(arb, predicate) {
            this.arb = arb;
            this.predicate = predicate;
            this.beforeEachHook = Property.dummyHook;
            this.afterEachHook = Property.dummyHook;
            this.isAsync = function () { return false; };
        }
        Property.prototype.generate = function (mrng, runId) {
            return runId != null ? this.arb.withBias(runIdToFrequency(runId)).generate(mrng) : this.arb.generate(mrng);
        };
        Property.prototype.run = function (v) {
            this.beforeEachHook();
            try {
                var output = this.predicate(v);
                return output == null || output === true ? null : 'Property failed by returning false';
            }
            catch (err) {
                if (PreconditionFailure.isFailure(err))
                    return err;
                if (err instanceof Error && err.stack)
                    return err + "\n\nStack trace: " + err.stack;
                return "" + err;
            }
            finally {
                this.afterEachHook();
            }
        };
        Property.prototype.beforeEach = function (hookFunction) {
            this.beforeEachHook = hookFunction;
            return this;
        };
        Property.prototype.afterEach = function (hookFunction) {
            this.afterEachHook = hookFunction;
            return this;
        };
        Property.dummyHook = function () { };
        return Property;
    }());

    function property() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length < 2)
            throw new Error('property expects at least two parameters');
        var arbs = args.slice(0, args.length - 1);
        var p = args[args.length - 1];
        return new Property(genericTuple(arbs), function (t) { return p.apply(void 0, __spread(t)); });
    }

    var internalGlobalThis = (function (global) {
        return global.globalThis ? global.globalThis : global;
    })(typeof undefined === 'object' ? undefined : Function('return this')());
    var getGlobal = function () { return internalGlobalThis; };

    var globalParametersSymbol = Symbol["for"]('fast-check/GlobalParameters');
    var configureGlobal = function (parameters) {
        getGlobal()[globalParametersSymbol] = parameters;
    };
    var readConfigureGlobal = function () {
        return getGlobal()[globalParametersSymbol];
    };
    var resetConfigureGlobal = function () {
        delete getGlobal()[globalParametersSymbol];
    };

    function generateN(rng, num) {
        var cur = rng;
        var out = [];
        for (var idx = 0; idx != num; ++idx) {
            var nextOut = cur.next();
            out.push(nextOut[0]);
            cur = nextOut[1];
        }
        return [out, cur];
    }
    function skipN(rng, num) {
        return generateN(rng, num)[1];
    }

    var MULTIPLIER = 0x000343fd;
    var INCREMENT = 0x00269ec3;
    var MASK = 0xffffffff;
    var MASK_2 = (1 << 31) - 1;
    var computeNextSeed = function (seed) {
        return (seed * MULTIPLIER + INCREMENT) & MASK;
    };
    var computeValueFromNextSeed = function (nextseed) {
        return (nextseed & MASK_2) >> 16;
    };
    var LinearCongruential = (function () {
        function LinearCongruential(seed) {
            this.seed = seed;
        }
        LinearCongruential.prototype.min = function () {
            return LinearCongruential.min;
        };
        LinearCongruential.prototype.max = function () {
            return LinearCongruential.max;
        };
        LinearCongruential.prototype.next = function () {
            var nextseed = computeNextSeed(this.seed);
            return [computeValueFromNextSeed(nextseed), new LinearCongruential(nextseed)];
        };
        LinearCongruential.min = 0;
        LinearCongruential.max = Math.pow(2, 15) - 1;
        return LinearCongruential;
    }());
    var LinearCongruential32 = (function () {
        function LinearCongruential32(seed) {
            this.seed = seed;
        }
        LinearCongruential32.prototype.min = function () {
            return LinearCongruential32.min;
        };
        LinearCongruential32.prototype.max = function () {
            return LinearCongruential32.max;
        };
        LinearCongruential32.prototype.next = function () {
            var s1 = computeNextSeed(this.seed);
            var v1 = computeValueFromNextSeed(s1);
            var s2 = computeNextSeed(s1);
            var v2 = computeValueFromNextSeed(s2);
            var s3 = computeNextSeed(s2);
            var v3 = computeValueFromNextSeed(s3);
            var vnext = v3 + ((v2 + (v1 << 15)) << 15);
            return [((vnext + 0x80000000) | 0) + 0x80000000, new LinearCongruential32(s3)];
        };
        LinearCongruential32.min = 0;
        LinearCongruential32.max = 0xffffffff;
        return LinearCongruential32;
    }());
    var congruential = function (seed) {
        return new LinearCongruential(seed);
    };
    var congruential32 = function (seed) {
        return new LinearCongruential32(seed);
    };

    function toUint32(num) {
        return (num | 0) >= 0 ? num | 0 : (num | 0) + 4294967296;
    }
    function product32bits(a, b) {
        var alo = a & 0xffff;
        var ahi = (a >>> 16) & 0xffff;
        var blo = b & 0xffff;
        var bhi = (b >>> 16) & 0xffff;
        return alo * blo + ((alo * bhi + ahi * blo) << 16);
    }
    var MersenneTwister = (function () {
        function MersenneTwister(states, index) {
            if (index >= MersenneTwister.N) {
                this.states = MersenneTwister.twist(states);
                this.index = 0;
            }
            else {
                this.states = states;
                this.index = index;
            }
        }
        MersenneTwister.twist = function (prev) {
            var mt = prev.slice();
            for (var idx = 0; idx !== MersenneTwister.N - MersenneTwister.M; ++idx) {
                var y_1 = (mt[idx] & MersenneTwister.MASK_UPPER) + (mt[idx + 1] & MersenneTwister.MASK_LOWER);
                mt[idx] = mt[idx + MersenneTwister.M] ^ (y_1 >>> 1) ^ (-(y_1 & 1) & MersenneTwister.A);
            }
            for (var idx = MersenneTwister.N - MersenneTwister.M; idx !== MersenneTwister.N - 1; ++idx) {
                var y_2 = (mt[idx] & MersenneTwister.MASK_UPPER) + (mt[idx + 1] & MersenneTwister.MASK_LOWER);
                mt[idx] = mt[idx + MersenneTwister.M - MersenneTwister.N] ^ (y_2 >>> 1) ^ (-(y_2 & 1) & MersenneTwister.A);
            }
            var y = (mt[MersenneTwister.N - 1] & MersenneTwister.MASK_UPPER) + (mt[0] & MersenneTwister.MASK_LOWER);
            mt[MersenneTwister.N - 1] = mt[MersenneTwister.M - 1] ^ (y >>> 1) ^ (-(y & 1) & MersenneTwister.A);
            return mt;
        };
        MersenneTwister.seeded = function (seed) {
            var out = Array(MersenneTwister.N);
            out[0] = seed;
            for (var idx = 1; idx !== MersenneTwister.N; ++idx) {
                var xored = out[idx - 1] ^ (out[idx - 1] >>> 30);
                out[idx] = (product32bits(MersenneTwister.F, xored) + idx) | 0;
            }
            return out;
        };
        MersenneTwister.from = function (seed) {
            return new MersenneTwister(MersenneTwister.seeded(seed), MersenneTwister.N);
        };
        MersenneTwister.prototype.min = function () {
            return MersenneTwister.min;
        };
        MersenneTwister.prototype.max = function () {
            return MersenneTwister.max;
        };
        MersenneTwister.prototype.next = function () {
            var y = this.states[this.index];
            y ^= this.states[this.index] >>> MersenneTwister.U;
            y ^= (y << MersenneTwister.S) & MersenneTwister.B;
            y ^= (y << MersenneTwister.T) & MersenneTwister.C;
            y ^= y >>> MersenneTwister.L;
            return [toUint32(y), new MersenneTwister(this.states, this.index + 1)];
        };
        MersenneTwister.min = 0;
        MersenneTwister.max = 0xffffffff;
        MersenneTwister.N = 624;
        MersenneTwister.M = 397;
        MersenneTwister.R = 31;
        MersenneTwister.A = 0x9908b0df;
        MersenneTwister.F = 1812433253;
        MersenneTwister.U = 11;
        MersenneTwister.S = 7;
        MersenneTwister.B = 0x9d2c5680;
        MersenneTwister.T = 15;
        MersenneTwister.C = 0xefc60000;
        MersenneTwister.L = 18;
        MersenneTwister.MASK_LOWER = Math.pow(2, MersenneTwister.R) - 1;
        MersenneTwister.MASK_UPPER = Math.pow(2, MersenneTwister.R);
        return MersenneTwister;
    }());
    function MersenneTwister$1 (seed) {
        return MersenneTwister.from(seed);
    }

    var XorShift128Plus = (function () {
        function XorShift128Plus(s01, s00, s11, s10) {
            this.s01 = s01;
            this.s00 = s00;
            this.s11 = s11;
            this.s10 = s10;
        }
        XorShift128Plus.prototype.min = function () {
            return -0x80000000;
        };
        XorShift128Plus.prototype.max = function () {
            return 0x7fffffff;
        };
        XorShift128Plus.prototype.next = function () {
            var a0 = this.s00 ^ (this.s00 << 23);
            var a1 = this.s01 ^ ((this.s01 << 23) | (this.s00 >>> 9));
            var b0 = a0 ^ this.s10 ^ ((a0 >>> 18) | (a1 << 14)) ^ ((this.s10 >>> 5) | (this.s11 << 27));
            var b1 = a1 ^ this.s11 ^ (a1 >>> 18) ^ (this.s11 >>> 5);
            return [(this.s00 + this.s10) | 0, new XorShift128Plus(this.s11, this.s10, b1, b0)];
        };
        XorShift128Plus.prototype.jump = function () {
            var rngRunner = this;
            var ns01 = 0;
            var ns00 = 0;
            var ns11 = 0;
            var ns10 = 0;
            var jump = [0x635d2dff, 0x8a5cd789, 0x5c472f96, 0x121fd215];
            for (var i = 0; i !== 4; ++i) {
                for (var mask = 1; mask; mask <<= 1) {
                    if (jump[i] & mask) {
                        ns01 ^= rngRunner.s01;
                        ns00 ^= rngRunner.s00;
                        ns11 ^= rngRunner.s11;
                        ns10 ^= rngRunner.s10;
                    }
                    rngRunner = rngRunner.next()[1];
                }
            }
            return new XorShift128Plus(ns01, ns00, ns11, ns10);
        };
        return XorShift128Plus;
    }());
    var xorshift128plus = function (seed) {
        return new XorShift128Plus(-1, ~seed, seed | 0, 0);
    };

    var XoroShiro128Plus = (function () {
        function XoroShiro128Plus(s01, s00, s11, s10) {
            this.s01 = s01;
            this.s00 = s00;
            this.s11 = s11;
            this.s10 = s10;
        }
        XoroShiro128Plus.prototype.min = function () {
            return -0x80000000;
        };
        XoroShiro128Plus.prototype.max = function () {
            return 0x7fffffff;
        };
        XoroShiro128Plus.prototype.next = function () {
            var a0 = this.s10 ^ this.s00;
            var a1 = this.s11 ^ this.s01;
            var ns00 = (this.s00 << 24) ^ (this.s01 >>> 8) ^ a0 ^ (a0 << 16);
            var ns01 = (this.s01 << 24) ^ (this.s00 >>> 8) ^ a1 ^ ((a1 << 16) | (a0 >>> 16));
            var ns10 = (a1 << 5) ^ (a0 >>> 27);
            var ns11 = (a0 << 5) ^ (a1 >>> 27);
            return [(this.s00 + this.s10) | 0, new XoroShiro128Plus(ns01, ns00, ns11, ns10)];
        };
        XoroShiro128Plus.prototype.jump = function () {
            var rngRunner = this;
            var ns01 = 0;
            var ns00 = 0;
            var ns11 = 0;
            var ns10 = 0;
            var jump = [0xd8f554a5, 0xdf900294, 0x4b3201fc, 0x170865df];
            for (var i = 0; i !== 4; ++i) {
                for (var mask = 1; mask; mask <<= 1) {
                    if (jump[i] & mask) {
                        ns01 ^= rngRunner.s01;
                        ns00 ^= rngRunner.s00;
                        ns11 ^= rngRunner.s11;
                        ns10 ^= rngRunner.s10;
                    }
                    rngRunner = rngRunner.next()[1];
                }
            }
            return new XoroShiro128Plus(ns01, ns00, ns11, ns10);
        };
        return XoroShiro128Plus;
    }());
    var xoroshiro128plus = function (seed) {
        return new XoroShiro128Plus(-1, ~seed, seed | 0, 0);
    };

    function uniformBigIntInternal(from, diff, rng) {
        var MinRng = BigInt(rng.min());
        var NumValues = BigInt(rng.max() - rng.min() + 1);
        var FinalNumValues = NumValues;
        var NumIterations = BigInt(1);
        while (FinalNumValues < diff) {
            FinalNumValues *= NumValues;
            ++NumIterations;
        }
        var MaxAcceptedRandom = FinalNumValues - (FinalNumValues % diff);
        var nrng = rng;
        while (true) {
            var value = BigInt(0);
            for (var num = BigInt(0); num !== NumIterations; ++num) {
                var out = nrng.next();
                value = NumValues * value + (BigInt(out[0]) - MinRng);
                nrng = out[1];
            }
            if (value < MaxAcceptedRandom) {
                var inDiff = value - diff * (value / diff);
                return [inDiff + from, nrng];
            }
        }
    }
    function uniformBigIntDistribution(from, to, rng) {
        var diff = to - from + BigInt(1);
        if (rng != null) {
            return uniformBigIntInternal(from, diff, rng);
        }
        return function (rng) {
            return uniformBigIntInternal(from, diff, rng);
        };
    }

    function uniformIntInternal(from, diff, rng) {
        var MinRng = rng.min();
        var NumValues = rng.max() - rng.min() + 1;
        if (diff <= NumValues) {
            var nrng_1 = rng;
            var MaxAllowed = NumValues - (NumValues % diff);
            while (true) {
                var out = nrng_1.next();
                var deltaV = out[0] - MinRng;
                nrng_1 = out[1];
                if (deltaV < MaxAllowed) {
                    return [(deltaV % diff) + from, nrng_1];
                }
            }
        }
        var FinalNumValues = 1;
        var NumIterations = 0;
        while (FinalNumValues < diff) {
            FinalNumValues *= NumValues;
            ++NumIterations;
        }
        var MaxAcceptedRandom = diff * Math.floor((1 * FinalNumValues) / diff);
        var nrng = rng;
        while (true) {
            var value = 0;
            for (var num = 0; num !== NumIterations; ++num) {
                var out = nrng.next();
                value = NumValues * value + (out[0] - MinRng);
                nrng = out[1];
            }
            if (value < MaxAcceptedRandom) {
                var inDiff = value - diff * Math.floor((1 * value) / diff);
                return [inDiff + from, nrng];
            }
        }
    }
    function uniformIntDistribution(from, to, rng) {
        var diff = to - from + 1;
        if (rng != null) {
            return uniformIntInternal(from, diff, rng);
        }
        return function (rng) {
            return uniformIntInternal(from, diff, rng);
        };
    }

    var prand = /*#__PURE__*/Object.freeze({
        __proto__: null,
        generateN: generateN,
        skipN: skipN,
        congruential: congruential,
        congruential32: congruential32,
        mersenne: MersenneTwister$1,
        xorshift128plus: xorshift128plus,
        xoroshiro128plus: xoroshiro128plus,
        uniformBigIntDistribution: uniformBigIntDistribution,
        uniformIntDistribution: uniformIntDistribution
    });

    (function (VerbosityLevel) {
        VerbosityLevel[VerbosityLevel["None"] = 0] = "None";
        VerbosityLevel[VerbosityLevel["Verbose"] = 1] = "Verbose";
        VerbosityLevel[VerbosityLevel["VeryVerbose"] = 2] = "VeryVerbose";
    })(exports.VerbosityLevel || (exports.VerbosityLevel = {}));

    var QualifiedParameters = (function () {
        function QualifiedParameters(op) {
            var p = op || {};
            this.seed = QualifiedParameters.readSeed(p);
            this.randomType = QualifiedParameters.readRandomType(p);
            this.numRuns = QualifiedParameters.readNumRuns(p);
            this.verbose = QualifiedParameters.readVerbose(p);
            this.maxSkipsPerRun = QualifiedParameters.readOrDefault(p, 'maxSkipsPerRun', 100);
            this.timeout = QualifiedParameters.readOrDefault(p, 'timeout', null);
            this.skipAllAfterTimeLimit = QualifiedParameters.readOrDefault(p, 'skipAllAfterTimeLimit', null);
            this.interruptAfterTimeLimit = QualifiedParameters.readOrDefault(p, 'interruptAfterTimeLimit', null);
            this.markInterruptAsFailure = QualifiedParameters.readBoolean(p, 'markInterruptAsFailure');
            this.logger = QualifiedParameters.readOrDefault(p, 'logger', function (v) {
                console.log(v);
            });
            this.path = QualifiedParameters.readOrDefault(p, 'path', '');
            this.unbiased = QualifiedParameters.readBoolean(p, 'unbiased');
            this.examples = QualifiedParameters.readOrDefault(p, 'examples', []);
            this.endOnFailure = QualifiedParameters.readBoolean(p, 'endOnFailure');
        }
        QualifiedParameters.read = function (op) {
            return new QualifiedParameters(op);
        };
        QualifiedParameters.readSeed = function (p) {
            if (p.seed == null)
                return Date.now() ^ (Math.random() * 0x100000000);
            var seed32 = p.seed | 0;
            if (p.seed === seed32)
                return seed32;
            var gap = p.seed - seed32;
            return seed32 ^ (gap * 0x100000000);
        };
        QualifiedParameters.readRandomType = function (p) {
            if (p.randomType == null)
                return prand.xorshift128plus;
            if (typeof p.randomType === 'string') {
                switch (p.randomType) {
                    case 'mersenne':
                        return prand.mersenne;
                    case 'congruential':
                        return prand.congruential;
                    case 'congruential32':
                        return prand.congruential32;
                    case 'xorshift128plus':
                        return prand.xorshift128plus;
                    case 'xoroshiro128plus':
                        return prand.xoroshiro128plus;
                    default:
                        throw new Error("Invalid random specified: '" + p.randomType + "'");
                }
            }
            return p.randomType;
        };
        QualifiedParameters.readNumRuns = function (p) {
            var defaultValue = 100;
            if (p.numRuns != null)
                return p.numRuns;
            if (p.num_runs != null)
                return p.num_runs;
            return defaultValue;
        };
        QualifiedParameters.readVerbose = function (p) {
            if (p.verbose == null)
                return exports.VerbosityLevel.None;
            if (typeof p.verbose === 'boolean') {
                return p.verbose === true ? exports.VerbosityLevel.Verbose : exports.VerbosityLevel.None;
            }
            if (p.verbose <= exports.VerbosityLevel.None) {
                return exports.VerbosityLevel.None;
            }
            if (p.verbose >= exports.VerbosityLevel.VeryVerbose) {
                return exports.VerbosityLevel.VeryVerbose;
            }
            return p.verbose | 0;
        };
        QualifiedParameters.readBoolean = function (p, key) { return p[key] === true; };
        QualifiedParameters.readOrDefault = function (p, key, defaultValue) { return (p[key] != null ? p[key] : defaultValue); };
        return QualifiedParameters;
    }());

    var SkipAfterProperty = (function () {
        function SkipAfterProperty(property, getTime, timeLimit, interruptExecution) {
            var _this = this;
            this.property = property;
            this.getTime = getTime;
            this.interruptExecution = interruptExecution;
            this.isAsync = function () { return _this.property.isAsync(); };
            this.generate = function (mrng, runId) { return _this.property.generate(mrng, runId); };
            this.run = function (v) {
                if (_this.getTime() >= _this.skipAfterTime) {
                    var preconditionFailure = new PreconditionFailure(_this.interruptExecution);
                    if (_this.isAsync()) {
                        return Promise.resolve(preconditionFailure);
                    }
                    else {
                        return preconditionFailure;
                    }
                }
                return _this.property.run(v);
            };
            this.skipAfterTime = this.getTime() + timeLimit;
        }
        return SkipAfterProperty;
    }());

    var timeoutAfter = function (timeMs) {
        var timeoutHandle = null;
        var promise = new Promise(function (resolve) {
            timeoutHandle = setTimeout(function () {
                resolve("Property timeout: exceeded limit of " + timeMs + " milliseconds");
            }, timeMs);
        });
        return {
            clear: function () { return clearTimeout(timeoutHandle); },
            promise: promise
        };
    };
    var TimeoutProperty = (function () {
        function TimeoutProperty(property, timeMs) {
            this.property = property;
            this.timeMs = timeMs;
            this.isAsync = function () { return true; };
        }
        TimeoutProperty.prototype.generate = function (mrng, runId) {
            return this.property.generate(mrng, runId);
        };
        TimeoutProperty.prototype.run = function (v) {
            return __awaiter(this, void 0, void 0, function () {
                var t, propRun;
                return __generator(this, function (_a) {
                    t = timeoutAfter(this.timeMs);
                    propRun = Promise.race([this.property.run(v), t.promise]);
                    propRun.then(t.clear, t.clear);
                    return [2, propRun];
                });
            });
        };
        return TimeoutProperty;
    }());

    var UnbiasedProperty = (function () {
        function UnbiasedProperty(property) {
            var _this = this;
            this.property = property;
            this.isAsync = function () { return _this.property.isAsync(); };
            this.generate = function (mrng, _runId) { return _this.property.generate(mrng); };
            this.run = function (v) { return _this.property.run(v); };
        }
        return UnbiasedProperty;
    }());

    function decorateProperty(rawProperty, qParams) {
        var prop = rawProperty;
        if (rawProperty.isAsync() && qParams.timeout != null)
            prop = new TimeoutProperty(prop, qParams.timeout);
        if (qParams.unbiased === true)
            prop = new UnbiasedProperty(prop);
        if (qParams.skipAllAfterTimeLimit != null)
            prop = new SkipAfterProperty(prop, Date.now, qParams.skipAllAfterTimeLimit, false);
        if (qParams.interruptAfterTimeLimit != null)
            prop = new SkipAfterProperty(prop, Date.now, qParams.interruptAfterTimeLimit, true);
        return prop;
    }

    (function (ExecutionStatus) {
        ExecutionStatus[ExecutionStatus["Success"] = 0] = "Success";
        ExecutionStatus[ExecutionStatus["Skipped"] = -1] = "Skipped";
        ExecutionStatus[ExecutionStatus["Failure"] = 1] = "Failure";
    })(exports.ExecutionStatus || (exports.ExecutionStatus = {}));

    var RunExecution = (function () {
        function RunExecution(verbosity, interruptedAsFailure) {
            var _this = this;
            this.verbosity = verbosity;
            this.interruptedAsFailure = interruptedAsFailure;
            this.isSuccess = function () { return _this.pathToFailure == null; };
            this.firstFailure = function () { return (_this.pathToFailure ? +_this.pathToFailure.split(':')[0] : -1); };
            this.numShrinks = function () { return (_this.pathToFailure ? _this.pathToFailure.split(':').length - 1 : 0); };
            this.rootExecutionTrees = [];
            this.currentLevelExecutionTrees = this.rootExecutionTrees;
            this.failure = null;
            this.numSkips = 0;
            this.numSuccesses = 0;
            this.interrupted = false;
        }
        RunExecution.prototype.appendExecutionTree = function (status, value) {
            var currentTree = { status: status, value: value, children: [] };
            this.currentLevelExecutionTrees.push(currentTree);
            return currentTree;
        };
        RunExecution.prototype.fail = function (value, id, message) {
            if (this.verbosity >= exports.VerbosityLevel.Verbose) {
                var currentTree = this.appendExecutionTree(exports.ExecutionStatus.Failure, value);
                this.currentLevelExecutionTrees = currentTree.children;
            }
            if (this.pathToFailure == null)
                this.pathToFailure = "" + id;
            else
                this.pathToFailure += ":" + id;
            this.value = value;
            this.failure = message;
        };
        RunExecution.prototype.skip = function (value) {
            if (this.verbosity >= exports.VerbosityLevel.VeryVerbose) {
                this.appendExecutionTree(exports.ExecutionStatus.Skipped, value);
            }
            if (this.pathToFailure == null) {
                ++this.numSkips;
            }
        };
        RunExecution.prototype.success = function (value) {
            if (this.verbosity >= exports.VerbosityLevel.VeryVerbose) {
                this.appendExecutionTree(exports.ExecutionStatus.Success, value);
            }
            if (this.pathToFailure == null) {
                ++this.numSuccesses;
            }
        };
        RunExecution.prototype.interrupt = function () {
            this.interrupted = true;
        };
        RunExecution.prototype.extractFailures = function () {
            if (this.isSuccess()) {
                return [];
            }
            var failures = [];
            var cursor = this.rootExecutionTrees;
            while (cursor.length > 0 && cursor[cursor.length - 1].status === exports.ExecutionStatus.Failure) {
                var failureTree = cursor[cursor.length - 1];
                failures.push(failureTree.value);
                cursor = failureTree.children;
            }
            return failures;
        };
        RunExecution.prototype.toRunDetails = function (seed, basePath, numRuns, maxSkips) {
            if (!this.isSuccess()) {
                return {
                    failed: true,
                    interrupted: this.interrupted,
                    numRuns: this.firstFailure() + 1 - this.numSkips,
                    numSkips: this.numSkips,
                    numShrinks: this.numShrinks(),
                    seed: seed,
                    counterexample: this.value,
                    counterexamplePath: RunExecution.mergePaths(basePath, this.pathToFailure),
                    error: this.failure,
                    failures: this.extractFailures(),
                    executionSummary: this.rootExecutionTrees,
                    verbose: this.verbosity
                };
            }
            if (this.numSkips > maxSkips) {
                return {
                    failed: true,
                    interrupted: this.interrupted,
                    numRuns: this.numSuccesses,
                    numSkips: this.numSkips,
                    numShrinks: 0,
                    seed: seed,
                    counterexample: null,
                    counterexamplePath: null,
                    error: null,
                    failures: [],
                    executionSummary: this.rootExecutionTrees,
                    verbose: this.verbosity
                };
            }
            return {
                failed: this.interrupted ? this.interruptedAsFailure : false,
                interrupted: this.interrupted,
                numRuns: this.numSuccesses,
                numSkips: this.numSkips,
                numShrinks: 0,
                seed: seed,
                counterexample: null,
                counterexamplePath: null,
                error: null,
                failures: [],
                executionSummary: this.rootExecutionTrees,
                verbose: this.verbosity
            };
        };
        RunExecution.mergePaths = function (offsetPath, path) {
            if (offsetPath.length === 0)
                return path;
            var offsetItems = offsetPath.split(':');
            var remainingItems = path.split(':');
            var middle = +offsetItems[offsetItems.length - 1] + +remainingItems[0];
            return __spread(offsetItems.slice(0, offsetItems.length - 1), ["" + middle], remainingItems.slice(1)).join(':');
        };
        return RunExecution;
    }());

    var RunnerIterator = (function () {
        function RunnerIterator(sourceValues, verbose, interruptedAsFailure) {
            this.sourceValues = sourceValues;
            this.runExecution = new RunExecution(verbose, interruptedAsFailure);
            this.currentIdx = -1;
            this.nextValues = sourceValues;
        }
        RunnerIterator.prototype[Symbol.iterator] = function () {
            return this;
        };
        RunnerIterator.prototype.next = function (value) {
            var nextValue = this.nextValues.next();
            if (nextValue.done || this.runExecution.interrupted) {
                return { done: true, value: value };
            }
            this.currentShrinkable = nextValue.value;
            ++this.currentIdx;
            return { done: false, value: nextValue.value.value_ };
        };
        RunnerIterator.prototype.handleResult = function (result) {
            if (result != null && typeof result === 'string') {
                this.runExecution.fail(this.currentShrinkable.value_, this.currentIdx, result);
                this.currentIdx = -1;
                this.nextValues = this.currentShrinkable.shrink();
            }
            else if (result != null) {
                if (!result.interruptExecution) {
                    this.runExecution.skip(this.currentShrinkable.value_);
                    this.sourceValues.skippedOne();
                }
                else {
                    this.runExecution.interrupt();
                }
            }
            else {
                this.runExecution.success(this.currentShrinkable.value_);
            }
        };
        return RunnerIterator;
    }());

    var SourceValuesIterator = (function () {
        function SourceValuesIterator(initialValues, maxInitialIterations, remainingSkips) {
            this.initialValues = initialValues;
            this.maxInitialIterations = maxInitialIterations;
            this.remainingSkips = remainingSkips;
        }
        SourceValuesIterator.prototype[Symbol.iterator] = function () {
            return this;
        };
        SourceValuesIterator.prototype.next = function (value) {
            if (--this.maxInitialIterations !== -1 && this.remainingSkips >= 0) {
                var n = this.initialValues.next();
                if (!n.done)
                    return { value: n.value(), done: false };
            }
            return { value: value, done: true };
        };
        SourceValuesIterator.prototype.skippedOne = function () {
            --this.remainingSkips;
            ++this.maxInitialIterations;
        };
        return SourceValuesIterator;
    }());

    var Random = (function () {
        function Random(internalRng) {
            this.internalRng = internalRng;
        }
        Random.prototype.clone = function () {
            return new Random(this.internalRng);
        };
        Random.prototype.uniformIn = function (rangeMin, rangeMax) {
            var g = uniformIntDistribution(rangeMin, rangeMax, this.internalRng);
            this.internalRng = g[1];
            return g[0];
        };
        Random.prototype.next = function (bits) {
            return this.uniformIn(0, (1 << bits) - 1);
        };
        Random.prototype.nextBoolean = function () {
            return this.uniformIn(0, 1) === 1;
        };
        Random.prototype.nextInt = function (min, max) {
            return this.uniformIn(min == null ? Random.MIN_INT : min, max == null ? Random.MAX_INT : max);
        };
        Random.prototype.nextBigInt = function (min, max) {
            var g = uniformBigIntDistribution(min, max, this.internalRng);
            this.internalRng = g[1];
            return g[0];
        };
        Random.prototype.nextDouble = function () {
            var a = this.next(26);
            var b = this.next(27);
            return (a * Random.DBL_FACTOR + b) * Random.DBL_DIVISOR;
        };
        Random.MIN_INT = 0x80000000 | 0;
        Random.MAX_INT = 0x7fffffff | 0;
        Random.DBL_FACTOR = Math.pow(2, 27);
        Random.DBL_DIVISOR = Math.pow(2, -53);
        return Random;
    }());

    function lazyGenerate(generator, rng, idx) {
        return function () { return generator.generate(new Random(rng), idx); };
    }
    function toss(generator, seed, random, examples) {
        var idx, rng;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [5, __values(examples.map(function (e) { return function () { return new Shrinkable(e); }; }))];
                case 1:
                    _a.sent();
                    idx = 0;
                    rng = random(seed);
                    _a.label = 2;
                case 2:
                    rng = rng.jump ? rng.jump() : skipN(rng, 42);
                    return [4, lazyGenerate(generator, rng, idx++)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3, 2];
                case 5: return [2];
            }
        });
    }

    function pathWalk(path, initialValues) {
        var e_1, _a;
        var values = stream(initialValues);
        var segments = path.split(':').map(function (text) { return +text; });
        if (segments.length === 0)
            return values;
        if (!segments.every(function (v) { return !Number.isNaN(v); })) {
            throw new Error("Unable to replay, got invalid path=" + path);
        }
        values = values.drop(segments[0]);
        try {
            for (var _b = __values(segments.slice(1)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var s = _c.value;
                var valueToShrink = values.getNthOrLast(0);
                if (valueToShrink == null) {
                    throw new Error("Unable to replay, got wrong path=" + path);
                }
                values = valueToShrink.shrink().drop(s);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return values;
    }

    var findSymbolNameRegex = /^Symbol\((.*)\)$/;
    function getSymbolDescription(s) {
        if (s.description !== undefined)
            return s.description;
        var m = findSymbolNameRegex.exec(String(s));
        return m && m[1].length ? m[1] : null;
    }
    function stringifyNumber(numValue) {
        switch (numValue) {
            case 0:
                return 1 / numValue === Number.NEGATIVE_INFINITY ? '-0' : '0';
            case Number.NEGATIVE_INFINITY:
                return 'Number.NEGATIVE_INFINITY';
            case Number.POSITIVE_INFINITY:
                return 'Number.POSITIVE_INFINITY';
            default:
                return numValue === numValue ? String(numValue) : 'Number.NaN';
        }
    }
    function stringifyInternal(value, previousValues) {
        var currentValues = previousValues.concat([value]);
        if (typeof value === 'object') {
            if (previousValues.indexOf(value) !== -1)
                return '[cyclic]';
        }
        switch (Object.prototype.toString.call(value)) {
            case '[object Array]':
                return "[" + value.map(function (v) { return stringifyInternal(v, currentValues); }).join(',') + "]";
            case '[object BigInt]':
                return value + "n";
            case '[object Boolean]':
                return typeof value === 'boolean' ? JSON.stringify(value) : "new Boolean(" + JSON.stringify(value) + ")";
            case '[object Date]': {
                var d = value;
                return Number.isNaN(d.getTime()) ? "new Date(NaN)" : "new Date(" + JSON.stringify(d.toISOString()) + ")";
            }
            case '[object Map]':
                return "new Map(" + stringifyInternal(Array.from(value), currentValues) + ")";
            case '[object Null]':
                return "null";
            case '[object Number]':
                return typeof value === 'number' ? stringifyNumber(value) : "new Number(" + stringifyNumber(Number(value)) + ")";
            case '[object Object]': {
                try {
                    var toStringAccessor = value.toString;
                    if (typeof toStringAccessor === 'function' && toStringAccessor !== Object.prototype.toString) {
                        return value.toString();
                    }
                }
                catch (err) {
                    return '[object Object]';
                }
                var rawRepr = '{' +
                    Object.keys(value)
                        .map(function (k) {
                        return (k === '__proto__' ? '["__proto__"]' : JSON.stringify(k)) + ":" + stringifyInternal(value[k], currentValues);
                    })
                        .join(',') +
                    '}';
                if (Object.getPrototypeOf(value) === null) {
                    return rawRepr === '{}' ? 'Object.create(null)' : "Object.assign(Object.create(null)," + rawRepr + ")";
                }
                return rawRepr;
            }
            case '[object Set]':
                return "new Set(" + stringifyInternal(Array.from(value), currentValues) + ")";
            case '[object String]':
                return typeof value === 'string' ? JSON.stringify(value) : "new String(" + JSON.stringify(value) + ")";
            case '[object Symbol]': {
                var s = value;
                if (Symbol.keyFor(s) !== undefined) {
                    return "Symbol.for(" + JSON.stringify(Symbol.keyFor(s)) + ")";
                }
                var desc = getSymbolDescription(s);
                return desc !== null ? "Symbol(" + JSON.stringify(desc) + ")" : "Symbol()";
            }
            case '[object Undefined]':
                return "undefined";
            default:
                try {
                    return value.toString();
                }
                catch (_a) {
                    return Object.prototype.toString.call(value);
                }
        }
    }
    function stringify(value) {
        return stringifyInternal(value, []);
    }

    function formatHints(hints) {
        if (hints.length === 1) {
            return "Hint: " + hints[0];
        }
        return hints.map(function (h, idx) { return "Hint (" + (idx + 1) + "): " + h; }).join('\n');
    }
    function formatFailures(failures) {
        return "Encountered failures were:\n- " + failures.map(stringify).join('\n- ');
    }
    function formatExecutionSummary(executionTrees) {
        var e_1, _a, e_2, _b;
        var summaryLines = [];
        var remainingTreesAndDepth = [];
        try {
            for (var _c = __values(executionTrees.reverse()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var tree = _d.value;
                remainingTreesAndDepth.push({ depth: 1, tree: tree });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        while (remainingTreesAndDepth.length !== 0) {
            var currentTreeAndDepth = remainingTreesAndDepth.pop();
            var currentTree = currentTreeAndDepth.tree;
            var currentDepth = currentTreeAndDepth.depth;
            var statusIcon = currentTree.status === exports.ExecutionStatus.Success
                ? '\x1b[32m\u221A\x1b[0m'
                : currentTree.status === exports.ExecutionStatus.Failure
                    ? '\x1b[31m\xD7\x1b[0m'
                    : '\x1b[33m!\x1b[0m';
            var leftPadding = Array(currentDepth).join('. ');
            summaryLines.push("" + leftPadding + statusIcon + " " + stringify(currentTree.value));
            try {
                for (var _e = (e_2 = void 0, __values(currentTree.children.reverse())), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var tree = _f.value;
                    remainingTreesAndDepth.push({ depth: currentDepth + 1, tree: tree });
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e["return"])) _b.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        return "Execution summary:\n" + summaryLines.join('\n');
    }
    function preFormatTooManySkipped(out) {
        var message = "Failed to run property, too many pre-condition failures encountered\n{ seed: " + out.seed + " }\n\nRan " + out.numRuns + " time(s)\nSkipped " + out.numSkips + " time(s)";
        var details = null;
        var hints = [
            'Try to reduce the number of rejected values by combining map, flatMap and built-in arbitraries',
            'Increase failure tolerance by setting maxSkipsPerRun to an higher value'
        ];
        if (out.verbose >= exports.VerbosityLevel.VeryVerbose) {
            details = formatExecutionSummary(out.executionSummary);
        }
        else {
            hints.push('Enable verbose mode at level VeryVerbose in order to check all generated values and their associated status');
        }
        return { message: message, details: details, hints: hints };
    }
    function preFormatFailure(out) {
        var message = "Property failed after " + out.numRuns + " tests\n{ seed: " + out.seed + ", path: \"" + out.counterexamplePath + "\", endOnFailure: true }\nCounterexample: " + stringify(out.counterexample) + "\nShrunk " + out.numShrinks + " time(s)\nGot error: " + out.error;
        var details = null;
        var hints = [];
        if (out.verbose >= exports.VerbosityLevel.VeryVerbose) {
            details = formatExecutionSummary(out.executionSummary);
        }
        else if (out.verbose === exports.VerbosityLevel.Verbose) {
            details = formatFailures(out.failures);
        }
        else {
            hints.push('Enable verbose mode in order to have the list of all failing values encountered during the run');
        }
        return { message: message, details: details, hints: hints };
    }
    function preFormatEarlyInterrupted(out) {
        var message = "Property interrupted after " + out.numRuns + " tests\n{ seed: " + out.seed + " }";
        var details = null;
        var hints = [];
        if (out.verbose >= exports.VerbosityLevel.VeryVerbose) {
            details = formatExecutionSummary(out.executionSummary);
        }
        else {
            hints.push('Enable verbose mode at level VeryVerbose in order to check all generated values and their associated status');
        }
        return { message: message, details: details, hints: hints };
    }
    function throwIfFailed(out) {
        if (!out.failed)
            return;
        var _a = out.counterexample == null
            ? out.interrupted
                ? preFormatEarlyInterrupted(out)
                : preFormatTooManySkipped(out)
            : preFormatFailure(out), message = _a.message, details = _a.details, hints = _a.hints;
        var errorMessage = message;
        if (details != null)
            errorMessage += "\n\n" + details;
        if (hints.length > 0)
            errorMessage += "\n\n" + formatHints(hints);
        throw new Error(errorMessage);
    }

    function runIt(property, sourceValues, verbose, interruptedAsFailure) {
        var e_1, _a;
        var runner = new RunnerIterator(sourceValues, verbose, interruptedAsFailure);
        try {
            for (var runner_1 = __values(runner), runner_1_1 = runner_1.next(); !runner_1_1.done; runner_1_1 = runner_1.next()) {
                var v = runner_1_1.value;
                var out = property.run(v);
                runner.handleResult(out);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (runner_1_1 && !runner_1_1.done && (_a = runner_1["return"])) _a.call(runner_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return runner.runExecution;
    }
    function asyncRunIt(property, sourceValues, verbose, interruptedAsFailure) {
        return __awaiter(this, void 0, void 0, function () {
            var runner, runner_2, runner_2_1, v, out, e_2_1;
            var e_2, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        runner = new RunnerIterator(sourceValues, verbose, interruptedAsFailure);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        runner_2 = __values(runner), runner_2_1 = runner_2.next();
                        _b.label = 2;
                    case 2:
                        if (!!runner_2_1.done) return [3, 5];
                        v = runner_2_1.value;
                        return [4, property.run(v)];
                    case 3:
                        out = _b.sent();
                        runner.handleResult(out);
                        _b.label = 4;
                    case 4:
                        runner_2_1 = runner_2.next();
                        return [3, 2];
                    case 5: return [3, 8];
                    case 6:
                        e_2_1 = _b.sent();
                        e_2 = { error: e_2_1 };
                        return [3, 8];
                    case 7:
                        try {
                            if (runner_2_1 && !runner_2_1.done && (_a = runner_2["return"])) _a.call(runner_2);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7];
                    case 8: return [2, runner.runExecution];
                }
            });
        });
    }
    function runnerPathWalker(valueProducers, path) {
        var pathPoints = path.split(':');
        var pathStream = stream(valueProducers)
            .drop(pathPoints.length > 0 ? +pathPoints[0] : 0)
            .map(function (producer) { return producer(); });
        var adaptedPath = __spread(['0'], pathPoints.slice(1)).join(':');
        return stream(pathWalk(adaptedPath, pathStream)).map(function (v) { return function () { return v; }; });
    }
    function buildInitialValues(valueProducers, qParams) {
        var rawValues = qParams.path.length === 0 ? stream(valueProducers) : runnerPathWalker(valueProducers, qParams.path);
        if (!qParams.endOnFailure)
            return rawValues;
        return rawValues.map(function (shrinkableGen) {
            return function () {
                var s = shrinkableGen();
                return new Shrinkable(s.value_);
            };
        });
    }
    function check(rawProperty, params) {
        if (rawProperty == null || rawProperty.generate == null)
            throw new Error('Invalid property encountered, please use a valid property');
        if (rawProperty.run == null)
            throw new Error('Invalid property encountered, please use a valid property not an arbitrary');
        var qParams = QualifiedParameters.read(__assign(__assign({}, readConfigureGlobal()), params));
        var property = decorateProperty(rawProperty, qParams);
        var generator = toss(property, qParams.seed, qParams.randomType, qParams.examples);
        var maxInitialIterations = qParams.path.indexOf(':') === -1 ? qParams.numRuns : -1;
        var maxSkips = qParams.numRuns * qParams.maxSkipsPerRun;
        var initialValues = buildInitialValues(generator, qParams);
        var sourceValues = new SourceValuesIterator(initialValues, maxInitialIterations, maxSkips);
        return property.isAsync()
            ? asyncRunIt(property, sourceValues, qParams.verbose, qParams.markInterruptAsFailure).then(function (e) {
                return e.toRunDetails(qParams.seed, qParams.path, qParams.numRuns, maxSkips);
            })
            : runIt(property, sourceValues, qParams.verbose, qParams.markInterruptAsFailure).toRunDetails(qParams.seed, qParams.path, qParams.numRuns, maxSkips);
    }
    function assert(property, params) {
        var out = check(property, params);
        if (property.isAsync())
            return out.then(throwIfFailed);
        else
            throwIfFailed(out);
    }

    var ObjectEntriesImpl = function (obj) {
        var ownProps = Object.keys(obj);
        var i = ownProps.length;
        var resArray = new Array(i);
        while (i--)
            resArray[i] = [ownProps[i], obj[ownProps[i]]];
        return resArray;
    };
    var ObjectEntries = Object.entries ? Object.entries : ObjectEntriesImpl;
    var repeatUpToLength = function (src, targetLength) {
        for (; targetLength > src.length; src += src)
            ;
        return src;
    };
    var StringPadEndImpl = function (src, targetLength, padString) {
        targetLength = targetLength >> 0;
        if (padString === '' || src.length > targetLength)
            return String(src);
        targetLength = targetLength - src.length;
        padString = repeatUpToLength(typeof padString !== 'undefined' ? String(padString) : ' ', targetLength);
        return String(src) + padString.slice(0, targetLength);
    };
    var StringPadStartImpl = function (src, targetLength, padString) {
        targetLength = targetLength >> 0;
        if (padString === '' || src.length > targetLength)
            return String(src);
        targetLength = targetLength - src.length;
        padString = repeatUpToLength(typeof padString !== 'undefined' ? String(padString) : ' ', targetLength);
        return padString.slice(0, targetLength) + String(src);
    };
    var wrapStringPad = function (method) {
        return (method &&
            (function (src, targetLength, padString) { return method.call(src, targetLength, padString); }));
    };
    var StringPadEnd = wrapStringPad(String.prototype.padEnd) || StringPadEndImpl;
    var StringPadStart = wrapStringPad(String.prototype.padStart) || StringPadStartImpl;
    var StringFromCodePointLimitedImpl = function (codePoint) {
        if (codePoint < 0x10000)
            return String.fromCharCode(codePoint);
        codePoint -= 0x10000;
        return String.fromCharCode((codePoint >> 10) + 0xd800) + String.fromCharCode((codePoint % 0x400) + 0xdc00);
    };
    var StringFromCodePointLimited = String.fromCodePoint ? String.fromCodePoint : StringFromCodePointLimitedImpl;

    function toProperty(generator, qParams) {
        var prop = !Object.prototype.hasOwnProperty.call(generator, 'isAsync')
            ? new Property(generator, function () { return true; })
            : generator;
        return qParams.unbiased === true ? new UnbiasedProperty(prop) : prop;
    }
    function streamSample(generator, params) {
        var extendedParams = typeof params === 'number'
            ? __assign(__assign({}, readConfigureGlobal()), { numRuns: params }) : __assign(__assign({}, readConfigureGlobal()), params);
        var qParams = QualifiedParameters.read(extendedParams);
        var tossedValues = stream(toss(toProperty(generator, qParams), qParams.seed, qParams.randomType, qParams.examples));
        if (qParams.path.length === 0) {
            return tossedValues.take(qParams.numRuns).map(function (s) { return s().value_; });
        }
        return stream(pathWalk(qParams.path, tossedValues.map(function (s) { return s(); })))
            .take(qParams.numRuns)
            .map(function (s) { return s.value_; });
    }
    function sample(generator, params) {
        return __spread(streamSample(generator, params));
    }
    function statistics(generator, classify, params) {
        var e_1, _a, e_2, _b, e_3, _c;
        var extendedParams = typeof params === 'number'
            ? __assign(__assign({}, readConfigureGlobal()), { numRuns: params }) : __assign(__assign({}, readConfigureGlobal()), params);
        var qParams = QualifiedParameters.read(extendedParams);
        var recorded = {};
        try {
            for (var _d = __values(streamSample(generator, params)), _e = _d.next(); !_e.done; _e = _d.next()) {
                var g = _e.value;
                var out = classify(g);
                var categories = Array.isArray(out) ? out : [out];
                try {
                    for (var categories_1 = (e_2 = void 0, __values(categories)), categories_1_1 = categories_1.next(); !categories_1_1.done; categories_1_1 = categories_1.next()) {
                        var c = categories_1_1.value;
                        recorded[c] = (recorded[c] || 0) + 1;
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (categories_1_1 && !categories_1_1.done && (_b = categories_1["return"])) _b.call(categories_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d["return"])) _a.call(_d);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var data = ObjectEntries(recorded)
            .sort(function (a, b) { return b[1] - a[1]; })
            .map(function (i) { return [i[0], ((i[1] * 100.0) / qParams.numRuns).toFixed(2) + "%"]; });
        var longestName = data.map(function (i) { return i[0].length; }).reduce(function (p, c) { return Math.max(p, c); }, 0);
        var longestPercent = data.map(function (i) { return i[1].length; }).reduce(function (p, c) { return Math.max(p, c); }, 0);
        try {
            for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                var item = data_1_1.value;
                qParams.logger(StringPadEnd(item[0], longestName, '.') + ".." + StringPadStart(item[1], longestPercent, '.'));
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (data_1_1 && !data_1_1.done && (_c = data_1["return"])) _c.call(data_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
    }

    var BiasedArbitraryWrapper = (function (_super) {
        __extends(BiasedArbitraryWrapper, _super);
        function BiasedArbitraryWrapper(freq, arb, biasedArbBuilder) {
            var _this = _super.call(this) || this;
            _this.freq = freq;
            _this.arb = arb;
            _this.biasedArbBuilder = biasedArbBuilder;
            return _this;
        }
        BiasedArbitraryWrapper.prototype.generate = function (mrng) {
            return mrng.nextInt(1, this.freq) === 1 ? this.biasedArbBuilder(this.arb).generate(mrng) : this.arb.generate(mrng);
        };
        return BiasedArbitraryWrapper;
    }(Arbitrary));
    function biasWrapper(freq, arb, biasedArbBuilder) {
        return new BiasedArbitraryWrapper(freq, arb, biasedArbBuilder);
    }

    var ArbitraryWithShrink = (function (_super) {
        __extends(ArbitraryWithShrink, _super);
        function ArbitraryWithShrink() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ArbitraryWithShrink.prototype.shrinkableFor = function (value, shrunkOnce) {
            var _this = this;
            return new Shrinkable(value, function () { return _this.shrink(value, shrunkOnce === true).map(function (v) { return _this.shrinkableFor(v, true); }); });
        };
        return ArbitraryWithShrink;
    }(Arbitrary));

    function biasNumeric(min, max, Ctor, logLike) {
        if (min === max) {
            return new Ctor(min, max);
        }
        if (min < 0) {
            return max > 0
                ? new Ctor(-logLike(-min), logLike(max))
                : new Ctor((max - logLike((max - min))), max);
        }
        return new Ctor(min, min + logLike((max - min)));
    }

    function shrinkNumericInternal(current, target, shrunkOnce, halvePos, halveNeg) {
        var realGap = (current - target);
        function shrinkDecr() {
            var gap, toremove;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        gap = shrunkOnce ? halvePos(realGap) : realGap;
                        toremove = gap;
                        _a.label = 1;
                    case 1:
                        if (!(toremove > 0)) return [3, 4];
                        return [4, (current - toremove)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        toremove = halvePos(toremove);
                        return [3, 1];
                    case 4: return [2];
                }
            });
        }
        function shrinkIncr() {
            var gap, toremove;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        gap = shrunkOnce ? halveNeg(realGap) : realGap;
                        toremove = gap;
                        _a.label = 1;
                    case 1:
                        if (!(toremove < 0)) return [3, 4];
                        return [4, (current - toremove)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        toremove = halveNeg(toremove);
                        return [3, 1];
                    case 4: return [2];
                }
            });
        }
        return realGap > 0 ? stream(shrinkDecr()) : stream(shrinkIncr());
    }
    function halveBigInt(n) {
        return n / BigInt(2);
    }
    function halvePosNumber(n) {
        return Math.floor(n / 2);
    }
    function halveNegNumber(n) {
        return Math.ceil(n / 2);
    }
    function shrinkNumeric(zero, min, max, current, shrunkOnce, halvePos, halveNeg) {
        if (min <= zero && max >= zero) {
            return shrinkNumericInternal(current, zero, shrunkOnce, halvePos, halveNeg);
        }
        return current < zero
            ? shrinkNumericInternal(current, max, shrunkOnce, halvePos, halveNeg)
            : shrinkNumericInternal(current, min, shrunkOnce, halvePos, halveNeg);
    }
    function shrinkNumber(min, max, current, shrunkOnce) {
        return shrinkNumeric(0, min, max, current, shrunkOnce, halvePosNumber, halveNegNumber);
    }
    function shrinkBigInt(min, max, current, shrunkOnce) {
        return shrinkNumeric(BigInt(0), min, max, current, shrunkOnce, halveBigInt, halveBigInt);
    }

    var IntegerArbitrary = (function (_super) {
        __extends(IntegerArbitrary, _super);
        function IntegerArbitrary(min, max) {
            var _this = _super.call(this) || this;
            _this.biasedIntegerArbitrary = null;
            _this.min = min === undefined ? IntegerArbitrary.MIN_INT : min;
            _this.max = max === undefined ? IntegerArbitrary.MAX_INT : max;
            return _this;
        }
        IntegerArbitrary.prototype.wrapper = function (value, shrunkOnce) {
            var _this = this;
            return new Shrinkable(value, function () { return _this.shrink(value, shrunkOnce).map(function (v) { return _this.wrapper(v, true); }); });
        };
        IntegerArbitrary.prototype.generate = function (mrng) {
            return this.wrapper(mrng.nextInt(this.min, this.max), false);
        };
        IntegerArbitrary.prototype.shrink = function (value, shrunkOnce) {
            return shrinkNumber(this.min, this.max, value, shrunkOnce === true);
        };
        IntegerArbitrary.prototype.pureBiasedArbitrary = function () {
            if (this.biasedIntegerArbitrary != null) {
                return this.biasedIntegerArbitrary;
            }
            var log2 = function (v) { return Math.floor(Math.log(v) / Math.log(2)); };
            this.biasedIntegerArbitrary = biasNumeric(this.min, this.max, IntegerArbitrary, log2);
            return this.biasedIntegerArbitrary;
        };
        IntegerArbitrary.prototype.withBias = function (freq) {
            return biasWrapper(freq, this, function (originalArbitrary) { return originalArbitrary.pureBiasedArbitrary(); });
        };
        IntegerArbitrary.MIN_INT = 0x80000000 | 0;
        IntegerArbitrary.MAX_INT = 0x7fffffff | 0;
        return IntegerArbitrary;
    }(ArbitraryWithShrink));
    function integer(a, b) {
        if (a !== undefined && b !== undefined && a > b)
            throw new Error('fc.integer maximum value should be equal or greater than the minimum one');
        return b === undefined ? new IntegerArbitrary(undefined, a) : new IntegerArbitrary(a, b);
    }
    function maxSafeInteger() {
        return integer(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    }
    function nat(a) {
        if (a !== undefined && a < 0)
            throw new Error('fc.nat value should be greater than or equal to 0');
        return new IntegerArbitrary(0, a);
    }
    function maxSafeNat() {
        return nat(Number.MAX_SAFE_INTEGER);
    }

    var LazyIterableIterator = (function () {
        function LazyIterableIterator(producer) {
            this.producer = producer;
        }
        LazyIterableIterator.prototype[Symbol.iterator] = function () {
            if (this.it === undefined) {
                this.it = this.producer();
            }
            return this.it;
        };
        LazyIterableIterator.prototype.next = function () {
            if (this.it === undefined) {
                this.it = this.producer();
            }
            return this.it.next();
        };
        return LazyIterableIterator;
    }());
    function makeLazy(producer) {
        return new LazyIterableIterator(producer);
    }

    var ArrayArbitrary = (function (_super) {
        __extends(ArrayArbitrary, _super);
        function ArrayArbitrary(arb, minLength, maxLength, preFilter) {
            if (preFilter === void 0) { preFilter = function (tab) { return tab; }; }
            var _this = _super.call(this) || this;
            _this.arb = arb;
            _this.minLength = minLength;
            _this.maxLength = maxLength;
            _this.preFilter = preFilter;
            _this.lengthArb = integer(minLength, maxLength);
            return _this;
        }
        ArrayArbitrary.makeItCloneable = function (vs, shrinkables) {
            var _this = this;
            vs[cloneMethod] = function () {
                var cloned = [];
                for (var idx = 0; idx !== shrinkables.length; ++idx) {
                    cloned.push(shrinkables[idx].value);
                }
                _this.makeItCloneable(cloned, shrinkables);
                return cloned;
            };
            return vs;
        };
        ArrayArbitrary.prototype.wrapper = function (itemsRaw, shrunkOnce) {
            var _this = this;
            var items = this.preFilter(itemsRaw);
            var cloneable = false;
            var vs = [];
            for (var idx = 0; idx !== items.length; ++idx) {
                var s = items[idx];
                cloneable = cloneable || s.hasToBeCloned;
                vs.push(s.value);
            }
            if (cloneable) {
                ArrayArbitrary.makeItCloneable(vs, items);
            }
            return new Shrinkable(vs, function () { return _this.shrinkImpl(items, shrunkOnce).map(function (v) { return _this.wrapper(v, true); }); });
        };
        ArrayArbitrary.prototype.generate = function (mrng) {
            var size = this.lengthArb.generate(mrng);
            var items = [];
            for (var idx = 0; idx !== size.value; ++idx) {
                items.push(this.arb.generate(mrng));
            }
            return this.wrapper(items, false);
        };
        ArrayArbitrary.prototype.shrinkImpl = function (items, shrunkOnce) {
            var _this = this;
            if (items.length === 0) {
                return Stream.nil();
            }
            var size = this.lengthArb.shrinkableFor(items.length, shrunkOnce);
            return size
                .shrink()
                .map(function (l) { return items.slice(items.length - l.value); })
                .join(items[0].shrink().map(function (v) { return [v].concat(items.slice(1)); }))
                .join(items.length > this.minLength
                ? makeLazy(function () {
                    return _this.shrinkImpl(items.slice(1), false)
                        .filter(function (vs) { return _this.minLength <= vs.length + 1; })
                        .map(function (vs) { return [items[0]].concat(vs); });
                })
                : Stream.nil());
        };
        ArrayArbitrary.prototype.withBias = function (freq) {
            return biasWrapper(freq, this, function (originalArbitrary) {
                var lowBiased = new ArrayArbitrary(originalArbitrary.arb.withBias(freq), originalArbitrary.minLength, originalArbitrary.maxLength, originalArbitrary.preFilter);
                var highBiasedArbBuilder = function () {
                    return originalArbitrary.minLength !== originalArbitrary.maxLength
                        ? new ArrayArbitrary(originalArbitrary.arb.withBias(freq), originalArbitrary.minLength, originalArbitrary.minLength +
                            Math.floor(Math.log(originalArbitrary.maxLength - originalArbitrary.minLength) / Math.log(2)), originalArbitrary.preFilter)
                        : new ArrayArbitrary(originalArbitrary.arb.withBias(freq), originalArbitrary.minLength, originalArbitrary.maxLength, originalArbitrary.preFilter);
                };
                return biasWrapper(freq, lowBiased, highBiasedArbBuilder);
            });
        };
        return ArrayArbitrary;
    }(Arbitrary));
    function array(arb, aLength, bLength) {
        if (bLength == null)
            return new ArrayArbitrary(arb, 0, aLength == null ? 10 : aLength);
        return new ArrayArbitrary(arb, aLength || 0, bLength);
    }

    var BigIntArbitrary = (function (_super) {
        __extends(BigIntArbitrary, _super);
        function BigIntArbitrary(min, max) {
            var _this = _super.call(this) || this;
            _this.min = min;
            _this.max = max;
            _this.biasedBigIntArbitrary = null;
            return _this;
        }
        BigIntArbitrary.prototype.wrapper = function (value, shrunkOnce) {
            var _this = this;
            return new Shrinkable(value, function () { return _this.shrink(value, shrunkOnce).map(function (v) { return _this.wrapper(v, true); }); });
        };
        BigIntArbitrary.prototype.generate = function (mrng) {
            return this.wrapper(mrng.nextBigInt(this.min, this.max), false);
        };
        BigIntArbitrary.prototype.shrink = function (value, shrunkOnce) {
            return shrinkBigInt(this.min, this.max, value, shrunkOnce === true);
        };
        BigIntArbitrary.prototype.pureBiasedArbitrary = function () {
            if (this.biasedBigIntArbitrary != null) {
                return this.biasedBigIntArbitrary;
            }
            var logLike = function (v) {
                if (v === BigInt(0))
                    return BigInt(0);
                return BigInt(v.toString().length);
            };
            this.biasedBigIntArbitrary = biasNumeric(this.min, this.max, BigIntArbitrary, logLike);
            return this.biasedBigIntArbitrary;
        };
        BigIntArbitrary.prototype.withBias = function (freq) {
            return biasWrapper(freq, this, function (originalArbitrary) { return originalArbitrary.pureBiasedArbitrary(); });
        };
        return BigIntArbitrary;
    }(ArbitraryWithShrink));
    function bigIntN(n) {
        return new BigIntArbitrary(BigInt(-1) << BigInt(n - 1), (BigInt(1) << BigInt(n - 1)) - BigInt(1));
    }
    function bigUintN(n) {
        return new BigIntArbitrary(BigInt(0), (BigInt(1) << BigInt(n)) - BigInt(1));
    }
    function bigInt(min, max) {
        return max === undefined ? bigIntN(256) : new BigIntArbitrary(min, max);
    }
    function bigUint(max) {
        return max === undefined ? bigUintN(256) : new BigIntArbitrary(BigInt(0), max);
    }

    function boolean() {
        return integer(0, 1)
            .map(function (v) { return v === 1; })
            .noBias();
    }

    function CharacterArbitrary(min, max, mapToCode) {
        return integer(min, max).map(function (n) { return StringFromCodePointLimited(mapToCode(n)); });
    }
    var preferPrintableMapper = function (v) {
        if (v < 95)
            return v + 0x20;
        if (v <= 0x7e)
            return v - 95;
        return v;
    };
    function char() {
        return CharacterArbitrary(0x20, 0x7e, function (v) { return v; });
    }
    function hexa() {
        function mapper(v) {
            return v < 10
                ? v + 48
                : v + 97 - 10;
        }
        return CharacterArbitrary(0, 15, mapper);
    }
    function base64() {
        function mapper(v) {
            if (v < 26)
                return v + 65;
            if (v < 52)
                return v + 97 - 26;
            if (v < 62)
                return v + 48 - 52;
            return v === 62 ? 43 : 47;
        }
        return CharacterArbitrary(0, 63, mapper);
    }
    function ascii() {
        return CharacterArbitrary(0x00, 0x7f, preferPrintableMapper);
    }
    function char16bits() {
        return CharacterArbitrary(0x0000, 0xffff, preferPrintableMapper);
    }
    function unicode() {
        var gapSize = 0xdfff + 1 - 0xd800;
        function mapping(v) {
            if (v < 0xd800)
                return preferPrintableMapper(v);
            return v + gapSize;
        }
        return CharacterArbitrary(0x0000, 0xffff - gapSize, mapping);
    }
    function fullUnicode() {
        var gapSize = 0xdfff + 1 - 0xd800;
        function mapping(v) {
            if (v < 0xd800)
                return preferPrintableMapper(v);
            return v + gapSize;
        }
        return CharacterArbitrary(0x0000, 0x10ffff - gapSize, mapping);
    }

    var ConstantArbitrary = (function (_super) {
        __extends(ConstantArbitrary, _super);
        function ConstantArbitrary(values) {
            var _this = _super.call(this) || this;
            _this.values = values;
            return _this;
        }
        ConstantArbitrary.prototype.generate = function (mrng) {
            var _this = this;
            if (this.values.length === 1)
                return new Shrinkable(this.values[0]);
            var id = mrng.nextInt(0, this.values.length - 1);
            if (id === 0)
                return new Shrinkable(this.values[0]);
            function g(v) {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, new Shrinkable(v)];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            }
            return new Shrinkable(this.values[id], function () { return stream(g(_this.values[0])); });
        };
        return ConstantArbitrary;
    }(Arbitrary));
    function constant(value) {
        if (hasCloneMethod(value)) {
            throw new Error('fc.constant does not accept cloneable values, use fc.clonedConstant instead');
        }
        return new ConstantArbitrary([value]);
    }
    function clonedConstant(value) {
        if (hasCloneMethod(value)) {
            var producer = function () { return value[cloneMethod](); };
            return new ConstantArbitrary([producer]).map(function (c) { return c(); });
        }
        return new ConstantArbitrary([value]);
    }
    function constantFrom() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        if (values.length === 0) {
            throw new Error('fc.constantFrom expects at least one parameter');
        }
        if (values.find(function (v) { return hasCloneMethod(v); }) != null) {
            throw new Error('fc.constantFrom does not accept cloneable values, not supported for the moment');
        }
        return new ConstantArbitrary(__spread(values));
    }

    var ContextImplem = (function () {
        function ContextImplem() {
            this.receivedLogs = [];
        }
        ContextImplem.prototype.log = function (data) {
            this.receivedLogs.push(data);
        };
        ContextImplem.prototype.size = function () {
            return this.receivedLogs.length;
        };
        ContextImplem.prototype.toString = function () {
            return JSON.stringify({ logs: this.receivedLogs });
        };
        ContextImplem.prototype[cloneMethod] = function () {
            return new ContextImplem();
        };
        return ContextImplem;
    }());
    var context = function () { return clonedConstant(new ContextImplem()); };

    function date(constraints) {
        var intMin = constraints && constraints.min ? constraints.min.getTime() : -8640000000000000;
        var intMax = constraints && constraints.max ? constraints.max.getTime() : 8640000000000000;
        if (Number.isNaN(intMin))
            throw new Error('fc.date min must be valid instance of Date');
        if (Number.isNaN(intMin))
            throw new Error('fc.date max must be valid instance of Date');
        if (intMin > intMax)
            throw new Error('fc.date max must be greater or equal to min');
        return integer(intMin, intMax).map(function (a) { return new Date(a); });
    }

    var DedupArbitrary = (function (_super) {
        __extends(DedupArbitrary, _super);
        function DedupArbitrary(arb, numValues) {
            var _this = _super.call(this) || this;
            _this.arb = arb;
            _this.numValues = numValues;
            return _this;
        }
        DedupArbitrary.prototype.generate = function (mrng) {
            var items = [];
            if (this.numValues <= 0) {
                return this.wrapper(items);
            }
            for (var idx = 0; idx !== this.numValues - 1; ++idx) {
                items.push(this.arb.generate(mrng.clone()));
            }
            items.push(this.arb.generate(mrng));
            return this.wrapper(items);
        };
        DedupArbitrary.makeItCloneable = function (vs, shrinkables) {
            var _this = this;
            vs[cloneMethod] = function () {
                var cloned = [];
                for (var idx = 0; idx !== shrinkables.length; ++idx) {
                    cloned.push(shrinkables[idx].value);
                }
                _this.makeItCloneable(cloned, shrinkables);
                return cloned;
            };
            return vs;
        };
        DedupArbitrary.prototype.wrapper = function (items) {
            var _this = this;
            var cloneable = false;
            var vs = [];
            for (var idx = 0; idx !== items.length; ++idx) {
                var s = items[idx];
                cloneable = cloneable || s.hasToBeCloned;
                vs.push(s.value);
            }
            if (cloneable) {
                DedupArbitrary.makeItCloneable(vs, items);
            }
            return new Shrinkable(vs, function () { return stream(_this.shrinkImpl(items)).map(function (v) { return _this.wrapper(v); }); });
        };
        DedupArbitrary.prototype.shrinkImpl = function (items) {
            var its, cur;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (items.length === 0) {
                            return [2];
                        }
                        its = items.map(function (s) { return s.shrink()[Symbol.iterator](); });
                        cur = its.map(function (it) { return it.next(); });
                        _a.label = 1;
                    case 1:
                        if (!!cur[0].done) return [3, 3];
                        return [4, cur.map(function (c) { return c.value; })];
                    case 2:
                        _a.sent();
                        cur = its.map(function (it) { return it.next(); });
                        return [3, 1];
                    case 3: return [2];
                }
            });
        };
        return DedupArbitrary;
    }(Arbitrary));
    function dedup(arb, numValues) {
        return new DedupArbitrary(arb, numValues);
    }

    function subArrayContains(tab, upperBound, includeValue) {
        for (var idx = 0; idx < upperBound; ++idx) {
            if (includeValue(tab[idx]))
                return true;
        }
        return false;
    }
    function swap(tab, idx1, idx2) {
        var temp = tab[idx1];
        tab[idx1] = tab[idx2];
        tab[idx2] = temp;
    }
    function buildCompareFilter(compare) {
        return function (tab) {
            var finalLength = tab.length;
            var _loop_1 = function (idx) {
                if (subArrayContains(tab, idx, function (t) { return compare(t.value_, tab[idx].value_); })) {
                    --finalLength;
                    swap(tab, idx, finalLength);
                }
            };
            for (var idx = tab.length - 1; idx !== -1; --idx) {
                _loop_1(idx);
            }
            return tab.slice(0, finalLength);
        };
    }
    function set(arb, aLength, bLength, compareFn) {
        var minLength = bLength == null || typeof bLength !== 'number' ? 0 : aLength;
        var maxLength = aLength == null || typeof aLength !== 'number' ? 10 : typeof bLength === 'number' ? bLength : aLength;
        var compare = compareFn != null
            ? compareFn
            : typeof bLength === 'function'
                ? bLength
                : typeof aLength === 'function'
                    ? aLength
                    : function (a, b) { return a === b; };
        var arrayArb = new ArrayArbitrary(arb, minLength, maxLength, buildCompareFilter(compare));
        if (minLength === 0)
            return arrayArb;
        return arrayArb.filter(function (tab) { return tab.length >= minLength; });
    }

    function toObject(items) {
        var e_1, _a;
        var obj = {};
        try {
            for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                var keyValue = items_1_1.value;
                obj[keyValue[0]] = keyValue[1];
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (items_1_1 && !items_1_1.done && (_a = items_1["return"])) _a.call(items_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return obj;
    }
    function dictionary(keyArb, valueArb) {
        return set(tuple(keyArb, valueArb), function (t1, t2) { return t1[0] === t2[0]; }).map(toObject);
    }

    var FrequencyArbitrary = (function (_super) {
        __extends(FrequencyArbitrary, _super);
        function FrequencyArbitrary(warbs) {
            var _this = _super.call(this) || this;
            _this.warbs = warbs;
            var currentWeight = 0;
            _this.summedWarbs = [];
            for (var idx = 0; idx !== warbs.length; ++idx) {
                currentWeight += warbs[idx].weight;
                _this.summedWarbs.push({ weight: currentWeight, arbitrary: warbs[idx].arbitrary });
            }
            _this.totalWeight = currentWeight;
            return _this;
        }
        FrequencyArbitrary.prototype.generate = function (mrng) {
            var selected = mrng.nextInt(0, this.totalWeight - 1);
            for (var idx = 0; idx !== this.summedWarbs.length; ++idx) {
                if (selected < this.summedWarbs[idx].weight)
                    return this.summedWarbs[idx].arbitrary.generate(mrng);
            }
            throw new Error("Unable to generate from fc.frequency");
        };
        FrequencyArbitrary.prototype.withBias = function (freq) {
            return new FrequencyArbitrary(this.warbs.map(function (v) { return ({ weight: v.weight, arbitrary: v.arbitrary.withBias(freq) }); }));
        };
        return FrequencyArbitrary;
    }(Arbitrary));
    function frequency() {
        var warbs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            warbs[_i] = arguments[_i];
        }
        if (warbs.length === 0) {
            throw new Error('fc.frequency expects at least one parameter');
        }
        return new FrequencyArbitrary(__spread(warbs));
    }

    function computeNumChoices(options) {
        if (options.length === 0)
            throw new Error("fc.mapToConstant expects at least one option");
        var numChoices = 0;
        for (var idx = 0; idx !== options.length; ++idx) {
            if (options[idx].num < 0)
                throw new Error("fc.mapToConstant expects all options to have a number of entries greater or equal to zero");
            numChoices += options[idx].num;
        }
        if (numChoices === 0)
            throw new Error("fc.mapToConstant expects at least one choice among options");
        return numChoices;
    }
    function mapToConstant() {
        var entries = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            entries[_i] = arguments[_i];
        }
        var numChoices = computeNumChoices(entries);
        return nat(numChoices - 1).map(function (choice) {
            var idx = -1;
            var numSkips = 0;
            while (choice >= numSkips) {
                numSkips += entries[++idx].num;
            }
            return entries[idx].build(choice - numSkips + entries[idx].num);
        });
    }

    var lowerCaseMapper = { num: 26, build: function (v) { return String.fromCharCode(v + 0x61); } };
    var upperCaseMapper = { num: 26, build: function (v) { return String.fromCharCode(v + 0x41); } };
    var numericMapper = { num: 10, build: function (v) { return String.fromCharCode(v + 0x30); } };
    var percentCharArb = fullUnicode().map(function (c) {
        var encoded = encodeURIComponent(c);
        return c !== encoded ? encoded : "%" + c.charCodeAt(0).toString(16);
    });
    var buildLowerAlphaArb = function (others) {
        return mapToConstant(lowerCaseMapper, { num: others.length, build: function (v) { return others[v]; } });
    };
    var buildLowerAlphaNumericArb = function (others) {
        return mapToConstant(lowerCaseMapper, numericMapper, { num: others.length, build: function (v) { return others[v]; } });
    };
    var buildAlphaNumericArb = function (others) {
        return mapToConstant(lowerCaseMapper, upperCaseMapper, numericMapper, { num: others.length, build: function (v) { return others[v]; } });
    };
    var buildAlphaNumericPercentArb = function (others) {
        return frequency({
            weight: 10,
            arbitrary: buildAlphaNumericArb(others)
        }, {
            weight: 1,
            arbitrary: percentCharArb
        });
    };

    var OptionArbitrary = (function (_super) {
        __extends(OptionArbitrary, _super);
        function OptionArbitrary(arb, frequency, nil) {
            var _this = _super.call(this) || this;
            _this.arb = arb;
            _this.frequency = frequency;
            _this.nil = nil;
            _this.isOptionArb = nat(frequency);
            return _this;
        }
        OptionArbitrary.extendedShrinkable = function (s, nil) {
            function g() {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, new Shrinkable(nil)];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            }
            return new Shrinkable(s.value_, function () {
                return s
                    .shrink()
                    .map(function (v) { return OptionArbitrary.extendedShrinkable(v, nil); })
                    .join(g());
            });
        };
        OptionArbitrary.prototype.generate = function (mrng) {
            return this.isOptionArb.generate(mrng).value === 0
                ? new Shrinkable(this.nil)
                : OptionArbitrary.extendedShrinkable(this.arb.generate(mrng), this.nil);
        };
        OptionArbitrary.prototype.withBias = function (freq) {
            return new OptionArbitrary(this.arb.withBias(freq), this.frequency, this.nil);
        };
        return OptionArbitrary;
    }(Arbitrary));
    function option(arb, constraints) {
        if (!constraints)
            return new OptionArbitrary(arb, 5, null);
        if (typeof constraints === 'number')
            return new OptionArbitrary(arb, constraints, null);
        return new OptionArbitrary(arb, constraints.freq == null ? 5 : constraints.freq, Object.prototype.hasOwnProperty.call(constraints, 'nil') ? constraints.nil : null);
    }

    function StringArbitrary(charArb, aLength, bLength) {
        var arrayArb = aLength != null ? (bLength != null ? array(charArb, aLength, bLength) : array(charArb, aLength)) : array(charArb);
        return arrayArb.map(function (tab) { return tab.join(''); });
    }
    function Base64StringArbitrary(minLength, maxLength) {
        if (minLength > maxLength)
            throw new Error('Minimal length should be inferior or equal to maximal length');
        if (minLength % 4 !== 0)
            throw new Error('Minimal length of base64 strings must be a multiple of 4');
        if (maxLength % 4 !== 0)
            throw new Error('Maximal length of base64 strings must be a multiple of 4');
        return StringArbitrary(base64(), minLength, maxLength).map(function (s) {
            switch (s.length % 4) {
                case 0:
                    return s;
                case 3:
                    return s + "=";
                case 2:
                    return s + "==";
                default:
                    return s.slice(1);
            }
        });
    }
    function stringOf(charArb, aLength, bLength) {
        return StringArbitrary(charArb, aLength, bLength);
    }
    function string(aLength, bLength) {
        return StringArbitrary(char(), aLength, bLength);
    }
    function asciiString(aLength, bLength) {
        return StringArbitrary(ascii(), aLength, bLength);
    }
    function string16bits(aLength, bLength) {
        return StringArbitrary(char16bits(), aLength, bLength);
    }
    function unicodeString(aLength, bLength) {
        return StringArbitrary(unicode(), aLength, bLength);
    }
    function fullUnicodeString(aLength, bLength) {
        return StringArbitrary(fullUnicode(), aLength, bLength);
    }
    function hexaString(aLength, bLength) {
        return StringArbitrary(hexa(), aLength, bLength);
    }
    function base64String(aLength, bLength) {
        var minLength = aLength != null && bLength != null ? aLength : 0;
        var maxLength = bLength == null ? (aLength == null ? 16 : aLength) : bLength;
        return Base64StringArbitrary(minLength + 3 - ((minLength + 3) % 4), maxLength - (maxLength % 4));
    }

    function subdomain() {
        var alphaNumericArb = buildLowerAlphaNumericArb([]);
        var alphaNumericHyphenArb = buildLowerAlphaNumericArb(['-']);
        return tuple(alphaNumericArb, option(tuple(stringOf(alphaNumericHyphenArb), alphaNumericArb)))
            .map(function (_a) {
            var _b = __read(_a, 2), f = _b[0], d = _b[1];
            return (d === null ? f : "" + f + d[0] + d[1]);
        })
            .filter(function (d) { return d.length <= 63; })
            .filter(function (d) {
            return d.length < 4 || d[0] !== 'x' || d[1] !== 'n' || d[2] !== '-' || d[3] !== '-';
        });
    }
    function domain() {
        var alphaNumericArb = buildLowerAlphaArb([]);
        var extensionArb = stringOf(alphaNumericArb, 2, 10);
        return tuple(array(subdomain(), 1, 5), extensionArb)
            .map(function (_a) {
            var _b = __read(_a, 2), mid = _b[0], ext = _b[1];
            return mid.join('.') + "." + ext;
        })
            .filter(function (d) { return d.length <= 255; });
    }
    function hostUserInfo() {
        var others = ['-', '.', '_', '~', '!', '$', '&', "'", '(', ')', '*', '+', ',', ';', '=', ':'];
        return stringOf(buildAlphaNumericPercentArb(others));
    }

    function emailAddress() {
        var others = ['!', '#', '$', '%', '&', "'", '*', '+', '-', '/', '=', '?', '^', '_', '`', '{', '|', '}', '~'];
        var atextArb = buildLowerAlphaNumericArb(others);
        var dotAtomArb = array(stringOf(atextArb, 1, 10), 1, 5).map(function (a) { return a.join('.'); });
        return tuple(dotAtomArb, domain()).map(function (_a) {
            var _b = __read(_a, 2), lp = _b[0], d = _b[1];
            return lp + "@" + d;
        });
    }

    function next(n) {
        return integer(0, (1 << n) - 1);
    }
    var floatInternal = function () {
        return next(24).map(function (v) { return v / (1 << 24); });
    };
    function float(a, b) {
        if (a === undefined)
            return floatInternal();
        if (b === undefined)
            return floatInternal().map(function (v) { return v * a; });
        return floatInternal().map(function (v) { return a + v * (b - a); });
    }
    var doubleFactor = Math.pow(2, 27);
    var doubleDivisor = Math.pow(2, -53);
    var doubleInternal = function () {
        return tuple(next(26), next(27)).map(function (v) { return (v[0] * doubleFactor + v[1]) * doubleDivisor; });
    };
    function double(a, b) {
        if (a === undefined)
            return doubleInternal();
        if (b === undefined)
            return doubleInternal().map(function (v) { return v * a; });
        return doubleInternal().map(function (v) { return a + v * (b - a); });
    }

    var crc32Table = [
        0x00000000,
        0x77073096,
        0xee0e612c,
        0x990951ba,
        0x076dc419,
        0x706af48f,
        0xe963a535,
        0x9e6495a3,
        0x0edb8832,
        0x79dcb8a4,
        0xe0d5e91e,
        0x97d2d988,
        0x09b64c2b,
        0x7eb17cbd,
        0xe7b82d07,
        0x90bf1d91,
        0x1db71064,
        0x6ab020f2,
        0xf3b97148,
        0x84be41de,
        0x1adad47d,
        0x6ddde4eb,
        0xf4d4b551,
        0x83d385c7,
        0x136c9856,
        0x646ba8c0,
        0xfd62f97a,
        0x8a65c9ec,
        0x14015c4f,
        0x63066cd9,
        0xfa0f3d63,
        0x8d080df5,
        0x3b6e20c8,
        0x4c69105e,
        0xd56041e4,
        0xa2677172,
        0x3c03e4d1,
        0x4b04d447,
        0xd20d85fd,
        0xa50ab56b,
        0x35b5a8fa,
        0x42b2986c,
        0xdbbbc9d6,
        0xacbcf940,
        0x32d86ce3,
        0x45df5c75,
        0xdcd60dcf,
        0xabd13d59,
        0x26d930ac,
        0x51de003a,
        0xc8d75180,
        0xbfd06116,
        0x21b4f4b5,
        0x56b3c423,
        0xcfba9599,
        0xb8bda50f,
        0x2802b89e,
        0x5f058808,
        0xc60cd9b2,
        0xb10be924,
        0x2f6f7c87,
        0x58684c11,
        0xc1611dab,
        0xb6662d3d,
        0x76dc4190,
        0x01db7106,
        0x98d220bc,
        0xefd5102a,
        0x71b18589,
        0x06b6b51f,
        0x9fbfe4a5,
        0xe8b8d433,
        0x7807c9a2,
        0x0f00f934,
        0x9609a88e,
        0xe10e9818,
        0x7f6a0dbb,
        0x086d3d2d,
        0x91646c97,
        0xe6635c01,
        0x6b6b51f4,
        0x1c6c6162,
        0x856530d8,
        0xf262004e,
        0x6c0695ed,
        0x1b01a57b,
        0x8208f4c1,
        0xf50fc457,
        0x65b0d9c6,
        0x12b7e950,
        0x8bbeb8ea,
        0xfcb9887c,
        0x62dd1ddf,
        0x15da2d49,
        0x8cd37cf3,
        0xfbd44c65,
        0x4db26158,
        0x3ab551ce,
        0xa3bc0074,
        0xd4bb30e2,
        0x4adfa541,
        0x3dd895d7,
        0xa4d1c46d,
        0xd3d6f4fb,
        0x4369e96a,
        0x346ed9fc,
        0xad678846,
        0xda60b8d0,
        0x44042d73,
        0x33031de5,
        0xaa0a4c5f,
        0xdd0d7cc9,
        0x5005713c,
        0x270241aa,
        0xbe0b1010,
        0xc90c2086,
        0x5768b525,
        0x206f85b3,
        0xb966d409,
        0xce61e49f,
        0x5edef90e,
        0x29d9c998,
        0xb0d09822,
        0xc7d7a8b4,
        0x59b33d17,
        0x2eb40d81,
        0xb7bd5c3b,
        0xc0ba6cad,
        0xedb88320,
        0x9abfb3b6,
        0x03b6e20c,
        0x74b1d29a,
        0xead54739,
        0x9dd277af,
        0x04db2615,
        0x73dc1683,
        0xe3630b12,
        0x94643b84,
        0x0d6d6a3e,
        0x7a6a5aa8,
        0xe40ecf0b,
        0x9309ff9d,
        0x0a00ae27,
        0x7d079eb1,
        0xf00f9344,
        0x8708a3d2,
        0x1e01f268,
        0x6906c2fe,
        0xf762575d,
        0x806567cb,
        0x196c3671,
        0x6e6b06e7,
        0xfed41b76,
        0x89d32be0,
        0x10da7a5a,
        0x67dd4acc,
        0xf9b9df6f,
        0x8ebeeff9,
        0x17b7be43,
        0x60b08ed5,
        0xd6d6a3e8,
        0xa1d1937e,
        0x38d8c2c4,
        0x4fdff252,
        0xd1bb67f1,
        0xa6bc5767,
        0x3fb506dd,
        0x48b2364b,
        0xd80d2bda,
        0xaf0a1b4c,
        0x36034af6,
        0x41047a60,
        0xdf60efc3,
        0xa867df55,
        0x316e8eef,
        0x4669be79,
        0xcb61b38c,
        0xbc66831a,
        0x256fd2a0,
        0x5268e236,
        0xcc0c7795,
        0xbb0b4703,
        0x220216b9,
        0x5505262f,
        0xc5ba3bbe,
        0xb2bd0b28,
        0x2bb45a92,
        0x5cb36a04,
        0xc2d7ffa7,
        0xb5d0cf31,
        0x2cd99e8b,
        0x5bdeae1d,
        0x9b64c2b0,
        0xec63f226,
        0x756aa39c,
        0x026d930a,
        0x9c0906a9,
        0xeb0e363f,
        0x72076785,
        0x05005713,
        0x95bf4a82,
        0xe2b87a14,
        0x7bb12bae,
        0x0cb61b38,
        0x92d28e9b,
        0xe5d5be0d,
        0x7cdcefb7,
        0x0bdbdf21,
        0x86d3d2d4,
        0xf1d4e242,
        0x68ddb3f8,
        0x1fda836e,
        0x81be16cd,
        0xf6b9265b,
        0x6fb077e1,
        0x18b74777,
        0x88085ae6,
        0xff0f6a70,
        0x66063bca,
        0x11010b5c,
        0x8f659eff,
        0xf862ae69,
        0x616bffd3,
        0x166ccf45,
        0xa00ae278,
        0xd70dd2ee,
        0x4e048354,
        0x3903b3c2,
        0xa7672661,
        0xd06016f7,
        0x4969474d,
        0x3e6e77db,
        0xaed16a4a,
        0xd9d65adc,
        0x40df0b66,
        0x37d83bf0,
        0xa9bcae53,
        0xdebb9ec5,
        0x47b2cf7f,
        0x30b5ffe9,
        0xbdbdf21c,
        0xcabac28a,
        0x53b39330,
        0x24b4a3a6,
        0xbad03605,
        0xcdd70693,
        0x54de5729,
        0x23d967bf,
        0xb3667a2e,
        0xc4614ab8,
        0x5d681b02,
        0x2a6f2b94,
        0xb40bbe37,
        0xc30c8ea1,
        0x5a05df1b,
        0x2d02ef8d
    ];
    function hash(repr) {
        var buf = Buffer.from(repr);
        var crc = 0xffffffff;
        for (var idx = 0; idx !== buf.length; ++idx) {
            crc = crc32Table[(crc & 0xff) ^ buf[idx]] ^ (crc >> 8);
        }
        return (crc | 0) + 0x80000000;
    }

    function func(arb) {
        return tuple(array(arb, 1, 10), integer().noShrink()).map(function (_a) {
            var _b = __read(_a, 2), outs = _b[0], seed = _b[1];
            var producer = function () {
                var _a;
                var recorded = {};
                var f = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var repr = stringify(args);
                    var val = outs[hash("" + seed + repr) % outs.length];
                    recorded[repr] = val;
                    return hasCloneMethod(val) ? val[cloneMethod]() : val;
                };
                return Object.assign(f, (_a = {
                        toString: function () {
                            return '<function :: ' +
                                Object.keys(recorded)
                                    .sort()
                                    .map(function (k) { return k + " => " + stringify(recorded[k]); })
                                    .join(', ') +
                                '>';
                        }
                    },
                    _a[cloneMethod] = producer,
                    _a));
            };
            return producer();
        });
    }
    function compareFuncImplem(cmp) {
        return tuple(integer().noShrink(), integer(1, 0xffffffff).noShrink()).map(function (_a) {
            var _b = __read(_a, 2), seed = _b[0], hashEnvSize = _b[1];
            var producer = function () {
                var _a;
                var recorded = {};
                var f = function (a, b) {
                    var reprA = stringify(a);
                    var reprB = stringify(b);
                    var hA = hash("" + seed + reprA) % hashEnvSize;
                    var hB = hash("" + seed + reprB) % hashEnvSize;
                    var val = cmp(hA, hB);
                    recorded["[" + reprA + "," + reprB + "]"] = val;
                    return val;
                };
                return Object.assign(f, (_a = {
                        toString: function () {
                            return '<function :: ' +
                                Object.keys(recorded)
                                    .sort()
                                    .map(function (k) { return k + " => " + recorded[k]; })
                                    .join(', ') +
                                '>';
                        }
                    },
                    _a[cloneMethod] = producer,
                    _a));
            };
            return producer();
        });
    }
    function compareFunc() {
        return compareFuncImplem(function (hA, hB) { return hA - hB; });
    }
    function compareBooleanFunc() {
        return compareFuncImplem(function (hA, hB) { return hA < hB; });
    }

    var OneOfArbitrary = (function (_super) {
        __extends(OneOfArbitrary, _super);
        function OneOfArbitrary(arbs) {
            var _this = _super.call(this) || this;
            _this.arbs = arbs;
            return _this;
        }
        OneOfArbitrary.prototype.generate = function (mrng) {
            var id = mrng.nextInt(0, this.arbs.length - 1);
            return this.arbs[id].generate(mrng);
        };
        OneOfArbitrary.prototype.withBias = function (freq) {
            return new OneOfArbitrary(this.arbs.map(function (a) { return a.withBias(freq); }));
        };
        return OneOfArbitrary;
    }(Arbitrary));
    function oneof() {
        var arbs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arbs[_i] = arguments[_i];
        }
        if (arbs.length === 0) {
            throw new Error('fc.oneof expects at least one parameter');
        }
        return new OneOfArbitrary(__spread(arbs));
    }

    function ipV4() {
        return tuple(nat(255), nat(255), nat(255), nat(255)).map(function (_a) {
            var _b = __read(_a, 4), a = _b[0], b = _b[1], c = _b[2], d = _b[3];
            return a + "." + b + "." + c + "." + d;
        });
    }
    function ipV4Extended() {
        var natRepr = function (maxValue) {
            return tuple(constantFrom('dec', 'oct', 'hex'), nat(maxValue)).map(function (_a) {
                var _b = __read(_a, 2), style = _b[0], v = _b[1];
                switch (style) {
                    case 'oct':
                        return "0" + Number(v).toString(8);
                    case 'hex':
                        return "0x" + Number(v).toString(16);
                    case 'dec':
                    default:
                        return "" + v;
                }
            });
        };
        return oneof(tuple(natRepr(255), natRepr(255), natRepr(255), natRepr(255)).map(function (_a) {
            var _b = __read(_a, 4), a = _b[0], b = _b[1], c = _b[2], d = _b[3];
            return a + "." + b + "." + c + "." + d;
        }), tuple(natRepr(255), natRepr(255), natRepr(65535)).map(function (_a) {
            var _b = __read(_a, 3), a = _b[0], b = _b[1], c = _b[2];
            return a + "." + b + "." + c;
        }), tuple(natRepr(255), natRepr(16777215)).map(function (_a) {
            var _b = __read(_a, 2), a = _b[0], b = _b[1];
            return a + "." + b;
        }), natRepr(4294967295));
    }
    function ipV6() {
        var h16Arb = hexaString(1, 4);
        var ls32Arb = oneof(tuple(h16Arb, h16Arb).map(function (_a) {
            var _b = __read(_a, 2), a = _b[0], b = _b[1];
            return a + ":" + b;
        }), ipV4());
        return oneof(tuple(array(h16Arb, 6, 6), ls32Arb).map(function (_a) {
            var _b = __read(_a, 2), eh = _b[0], l = _b[1];
            return eh.join(':') + ":" + l;
        }), tuple(array(h16Arb, 5, 5), ls32Arb).map(function (_a) {
            var _b = __read(_a, 2), eh = _b[0], l = _b[1];
            return "::" + eh.join(':') + ":" + l;
        }), tuple(array(h16Arb, 0, 1), array(h16Arb, 4, 4), ls32Arb).map(function (_a) {
            var _b = __read(_a, 3), bh = _b[0], eh = _b[1], l = _b[2];
            return bh.join(':') + "::" + eh.join(':') + ":" + l;
        }), tuple(array(h16Arb, 0, 2), array(h16Arb, 3, 3), ls32Arb).map(function (_a) {
            var _b = __read(_a, 3), bh = _b[0], eh = _b[1], l = _b[2];
            return bh.join(':') + "::" + eh.join(':') + ":" + l;
        }), tuple(array(h16Arb, 0, 3), array(h16Arb, 2, 2), ls32Arb).map(function (_a) {
            var _b = __read(_a, 3), bh = _b[0], eh = _b[1], l = _b[2];
            return bh.join(':') + "::" + eh.join(':') + ":" + l;
        }), tuple(array(h16Arb, 0, 4), h16Arb, ls32Arb).map(function (_a) {
            var _b = __read(_a, 3), bh = _b[0], eh = _b[1], l = _b[2];
            return bh.join(':') + "::" + eh + ":" + l;
        }), tuple(array(h16Arb, 0, 5), ls32Arb).map(function (_a) {
            var _b = __read(_a, 2), bh = _b[0], l = _b[1];
            return bh.join(':') + "::" + l;
        }), tuple(array(h16Arb, 0, 6), h16Arb).map(function (_a) {
            var _b = __read(_a, 2), bh = _b[0], eh = _b[1];
            return bh.join(':') + "::" + eh;
        }), tuple(array(h16Arb, 0, 7)).map(function (_a) {
            var _b = __read(_a, 1), bh = _b[0];
            return bh.join(':') + "::";
        }));
    }

    var LazyArbitrary = (function (_super) {
        __extends(LazyArbitrary, _super);
        function LazyArbitrary(name) {
            var _this = _super.call(this) || this;
            _this.name = name;
            _this.numBiasLevels = 0;
            _this.lastBiasedArbitrary = null;
            _this.underlying = null;
            return _this;
        }
        LazyArbitrary.prototype.generate = function (mrng) {
            if (!this.underlying) {
                throw new Error("Lazy arbitrary " + JSON.stringify(this.name) + " not correctly initialized");
            }
            return this.underlying.generate(mrng);
        };
        LazyArbitrary.prototype.withBias = function (freq) {
            if (!this.underlying) {
                throw new Error("Lazy arbitrary " + JSON.stringify(this.name) + " not correctly initialized");
            }
            if (this.numBiasLevels >= LazyArbitrary.MaxBiasLevels) {
                return this;
            }
            if (this.lastBiasedArbitrary !== null &&
                this.lastBiasedArbitrary.freq === freq &&
                this.lastBiasedArbitrary.arb === this.underlying &&
                this.lastBiasedArbitrary.lvl === this.numBiasLevels) {
                return this.lastBiasedArbitrary.biasedArb;
            }
            ++this.numBiasLevels;
            var biasedArb = this.underlying.withBias(freq);
            --this.numBiasLevels;
            this.lastBiasedArbitrary = {
                arb: this.underlying,
                lvl: this.numBiasLevels,
                freq: freq,
                biasedArb: biasedArb
            };
            return biasedArb;
        };
        LazyArbitrary.MaxBiasLevels = 5;
        return LazyArbitrary;
    }(Arbitrary));
    function isLazyArbitrary(arb) {
        return typeof arb === 'object' && arb !== null && Object.prototype.hasOwnProperty.call(arb, 'underlying');
    }
    function updateLazy(strictArbs, lazyArbs, key) {
        var lazyAtKey = lazyArbs[key];
        var lazyArb = isLazyArbitrary(lazyAtKey) ? lazyAtKey : new LazyArbitrary(key);
        lazyArb.underlying = strictArbs[key];
        lazyArbs[key] = lazyArb;
    }
    function letrec(builder) {
        var lazyArbs = Object.create(null);
        var tie = function (key) {
            if (!Object.prototype.hasOwnProperty.call(lazyArbs, key))
                lazyArbs[key] = new LazyArbitrary(key);
            return lazyArbs[key];
        };
        var strictArbs = builder(tie);
        for (var key in strictArbs) {
            if (!Object.prototype.hasOwnProperty.call(strictArbs, key)) {
                continue;
            }
            updateLazy(strictArbs, lazyArbs, key);
        }
        if (!Object.prototype.hasOwnProperty.call(strictArbs, '__proto__') &&
            isLazyArbitrary(strictArbs['__proto__'])) {
            updateLazy(strictArbs, lazyArbs, '__proto__');
        }
        return strictArbs;
    }

    var h = function (v, w) {
        return { arbitrary: constant(v), weight: w };
    };
    var loremWord = function () {
        return frequency(h('non', 6), h('adipiscing', 5), h('ligula', 5), h('enim', 5), h('pellentesque', 5), h('in', 5), h('augue', 5), h('et', 5), h('nulla', 5), h('lorem', 4), h('sit', 4), h('sed', 4), h('diam', 4), h('fermentum', 4), h('ut', 4), h('eu', 4), h('aliquam', 4), h('mauris', 4), h('vitae', 4), h('felis', 4), h('ipsum', 3), h('dolor', 3), h('amet,', 3), h('elit', 3), h('euismod', 3), h('mi', 3), h('orci', 3), h('erat', 3), h('praesent', 3), h('egestas', 3), h('leo', 3), h('vel', 3), h('sapien', 3), h('integer', 3), h('curabitur', 3), h('convallis', 3), h('purus', 3), h('risus', 2), h('suspendisse', 2), h('lectus', 2), h('nec,', 2), h('ultricies', 2), h('sed,', 2), h('cras', 2), h('elementum', 2), h('ultrices', 2), h('maecenas', 2), h('massa,', 2), h('varius', 2), h('a,', 2), h('semper', 2), h('proin', 2), h('nec', 2), h('nisl', 2), h('amet', 2), h('duis', 2), h('congue', 2), h('libero', 2), h('vestibulum', 2), h('pede', 2), h('blandit', 2), h('sodales', 2), h('ante', 2), h('nibh', 2), h('ac', 2), h('aenean', 2), h('massa', 2), h('suscipit', 2), h('sollicitudin', 2), h('fusce', 2), h('tempus', 2), h('aliquam,', 2), h('nunc', 2), h('ullamcorper', 2), h('rhoncus', 2), h('metus', 2), h('faucibus,', 2), h('justo', 2), h('magna', 2), h('at', 2), h('tincidunt', 2), h('consectetur', 1), h('tortor,', 1), h('dignissim', 1), h('congue,', 1), h('non,', 1), h('porttitor,', 1), h('nonummy', 1), h('molestie,', 1), h('est', 1), h('eleifend', 1), h('mi,', 1), h('arcu', 1), h('scelerisque', 1), h('vitae,', 1), h('consequat', 1), h('in,', 1), h('pretium', 1), h('volutpat', 1), h('pharetra', 1), h('tempor', 1), h('bibendum', 1), h('odio', 1), h('dui', 1), h('primis', 1), h('faucibus', 1), h('luctus', 1), h('posuere', 1), h('cubilia', 1), h('curae,', 1), h('hendrerit', 1), h('velit', 1), h('mauris,', 1), h('gravida', 1), h('ornare', 1), h('ut,', 1), h('pulvinar', 1), h('varius,', 1), h('turpis', 1), h('nibh,', 1), h('eros', 1), h('id', 1), h('aliquet', 1), h('quis', 1), h('lobortis', 1), h('consectetuer', 1), h('morbi', 1), h('vehicula', 1), h('tortor', 1), h('tellus,', 1), h('id,', 1), h('eu,', 1), h('quam', 1), h('feugiat,', 1), h('posuere,', 1), h('iaculis', 1), h('lectus,', 1), h('tristique', 1), h('mollis,', 1), h('nisl,', 1), h('vulputate', 1), h('sem', 1), h('vivamus', 1), h('placerat', 1), h('imperdiet', 1), h('cursus', 1), h('rutrum', 1), h('iaculis,', 1), h('augue,', 1), h('lacus', 1));
    };
    function lorem(maxWordsCount, sentencesMode) {
        var maxCount = maxWordsCount || 5;
        if (maxCount < 1)
            throw new Error("lorem has to produce at least one word/sentence");
        if (sentencesMode) {
            var sentence = array(loremWord(), 1, 10)
                .map(function (words) { return words.join(' '); })
                .map(function (s) { return (s[s.length - 1] === ',' ? s.substr(0, s.length - 1) : s); })
                .map(function (s) { return s[0].toUpperCase() + s.substring(1) + '.'; });
            return array(sentence, 1, maxCount).map(function (sentences) { return sentences.join(' '); });
        }
        else {
            return array(loremWord(), 1, maxCount).map(function (words) {
                return words.map(function (w) { return (w[w.length - 1] === ',' ? w.substr(0, w.length - 1) : w); }).join(' ');
            });
        }
    }

    var MemoArbitrary = (function (_super) {
        __extends(MemoArbitrary, _super);
        function MemoArbitrary(underlying) {
            var _this = _super.call(this) || this;
            _this.underlying = underlying;
            _this.lastFreq = -1;
            _this.lastBiased = _this;
            return _this;
        }
        MemoArbitrary.prototype.generate = function (mrng) {
            return this.underlying.generate(mrng);
        };
        MemoArbitrary.prototype.withBias = function (freq) {
            if (freq !== this.lastFreq) {
                this.lastFreq = freq;
                this.lastBiased = this.underlying.withBias(freq);
            }
            return this.lastBiased;
        };
        return MemoArbitrary;
    }(Arbitrary));
    var contextRemainingDepth = 10;
    var memo = function (builder) {
        var previous = {};
        return (function (maxDepth) {
            var n = maxDepth !== undefined ? maxDepth : contextRemainingDepth;
            if (!Object.prototype.hasOwnProperty.call(previous, n)) {
                var prev = contextRemainingDepth;
                contextRemainingDepth = n - 1;
                previous[n] = new MemoArbitrary(builder(n));
                contextRemainingDepth = prev;
            }
            return previous[n];
        });
    };

    function countToggledBits(n) {
        var count = 0;
        while (n > BigInt(0)) {
            if (n & BigInt(1))
                ++count;
            n >>= BigInt(1);
        }
        return count;
    }
    function computeNextFlags(flags, nextSize) {
        var allowedMask = (BigInt(1) << BigInt(nextSize)) - BigInt(1);
        var preservedFlags = flags & allowedMask;
        var numMissingFlags = countToggledBits(flags - preservedFlags);
        var nFlags = preservedFlags;
        for (var mask = BigInt(1); mask <= allowedMask && numMissingFlags !== 0; mask <<= BigInt(1)) {
            if (!(nFlags & mask)) {
                nFlags |= mask;
                --numMissingFlags;
            }
        }
        return nFlags;
    }
    var MixedCaseArbitrary = (function (_super) {
        __extends(MixedCaseArbitrary, _super);
        function MixedCaseArbitrary(stringArb, toggleCase) {
            var _this = _super.call(this) || this;
            _this.stringArb = stringArb;
            _this.toggleCase = toggleCase;
            return _this;
        }
        MixedCaseArbitrary.prototype.computeTogglePositions = function (chars) {
            var positions = [];
            for (var idx = 0; idx !== chars.length; ++idx) {
                if (this.toggleCase(chars[idx]) !== chars[idx])
                    positions.push(idx);
            }
            return positions;
        };
        MixedCaseArbitrary.prototype.wrapper = function (rawCase, chars, togglePositions, flags) {
            var _this = this;
            var newChars = chars.slice();
            for (var idx = 0, mask = BigInt(1); idx !== togglePositions.length; ++idx, mask <<= BigInt(1)) {
                if (flags & mask)
                    newChars[togglePositions[idx]] = this.toggleCase(newChars[togglePositions[idx]]);
            }
            return new Shrinkable(newChars.join(''), function () { return _this.shrinkImpl(rawCase, chars, togglePositions, flags); });
        };
        MixedCaseArbitrary.prototype.shrinkImpl = function (rawCase, chars, togglePositions, flags) {
            var _this = this;
            return rawCase
                .shrink()
                .map(function (s) {
                var nChars = __spread(s.value_);
                var nTogglePositions = _this.computeTogglePositions(nChars);
                var nFlags = computeNextFlags(flags, nTogglePositions.length);
                return _this.wrapper(s, nChars, nTogglePositions, nFlags);
            })
                .join(bigUintN(togglePositions.length)
                .shrinkableFor(flags)
                .shrink()
                .map(function (nFlags) {
                return _this.wrapper(new Shrinkable(rawCase.value), chars, togglePositions, nFlags.value_);
            }));
        };
        MixedCaseArbitrary.prototype.generate = function (mrng) {
            var rawCaseShrinkable = this.stringArb.generate(mrng);
            var chars = __spread(rawCaseShrinkable.value_);
            var togglePositions = this.computeTogglePositions(chars);
            var flagsArb = bigUintN(togglePositions.length);
            var flags = flagsArb.generate(mrng).value_;
            return this.wrapper(rawCaseShrinkable, chars, togglePositions, flags);
        };
        return MixedCaseArbitrary;
    }(Arbitrary));
    function defaultToggleCase(rawChar) {
        var upper = rawChar.toUpperCase();
        if (upper !== rawChar)
            return upper;
        return rawChar.toLowerCase();
    }
    function mixedCase(stringArb, constraints) {
        if (typeof BigInt === 'undefined') {
            throw new Error("mixedCase requires BigInt support");
        }
        var toggleCase = (constraints && constraints.toggleCase) || defaultToggleCase;
        return new MixedCaseArbitrary(stringArb, toggleCase);
    }

    var ObjectConstraints = (function () {
        function ObjectConstraints(key, values, maxDepth, maxKeys, withSet, withMap, withObjectString, withNullPrototype) {
            this.key = key;
            this.values = values;
            this.maxDepth = maxDepth;
            this.maxKeys = maxKeys;
            this.withSet = withSet;
            this.withMap = withMap;
            this.withObjectString = withObjectString;
            this.withNullPrototype = withNullPrototype;
        }
        ObjectConstraints.defaultValues = function () {
            return [
                boolean(),
                integer(),
                double(),
                string(),
                oneof(string(), constant(null), constant(undefined)),
                oneof(double(), constant(-0), constant(0), constant(Number.NaN), constant(Number.POSITIVE_INFINITY), constant(Number.NEGATIVE_INFINITY), constant(Number.EPSILON), constant(Number.MIN_VALUE), constant(Number.MAX_VALUE), constant(Number.MIN_SAFE_INTEGER), constant(Number.MAX_SAFE_INTEGER))
            ];
        };
        ObjectConstraints.boxArbitraries = function (arbs) {
            return arbs.map(function (arb) {
                return arb.map(function (v) {
                    switch (typeof v) {
                        case 'boolean':
                            return new Boolean(v);
                        case 'number':
                            return new Number(v);
                        case 'string':
                            return new String(v);
                        default:
                            return v;
                    }
                });
            });
        };
        ObjectConstraints.boxArbitrariesIfNeeded = function (arbs, boxEnabled) {
            return boxEnabled ? ObjectConstraints.boxArbitraries(arbs).concat(arbs) : arbs;
        };
        ObjectConstraints.from = function (settings) {
            function getOr(access, value) {
                return settings != null && access() != null ? access() : value;
            }
            return new ObjectConstraints(getOr(function () { return settings.key; }, string()), ObjectConstraints.boxArbitrariesIfNeeded(getOr(function () { return settings.values; }, ObjectConstraints.defaultValues()), getOr(function () { return settings.withBoxedValues; }, false)), getOr(function () { return settings.maxDepth; }, 2), getOr(function () { return settings.maxKeys; }, 5), getOr(function () { return settings.withSet; }, false), getOr(function () { return settings.withMap; }, false), getOr(function () { return settings.withObjectString; }, false), getOr(function () { return settings.withNullPrototype; }, false));
        };
        return ObjectConstraints;
    }());
    var anythingInternal = function (constraints) {
        var arbKeys = constraints.withObjectString
            ? memo(function (n) {
                return frequency({ arbitrary: constraints.key, weight: 10 }, { arbitrary: anythingArb(n).map(function (o) { return stringify(o); }), weight: 1 });
            })
            : memo(function () { return constraints.key; });
        var arbitrariesForBase = constraints.values;
        var maxDepth = constraints.maxDepth;
        var maxKeys = constraints.maxKeys;
        var entriesOf = function (keyArb, valueArb) {
            return set(tuple(keyArb, valueArb), 0, maxKeys, function (t1, t2) { return t1[0] === t2[0]; });
        };
        var mapOf = function (ka, va) { return entriesOf(ka, va).map(function (v) { return new Map(v); }); };
        var dictOf = function (ka, va) { return entriesOf(ka, va).map(function (v) { return toObject(v); }); };
        var baseArb = oneof.apply(void 0, __spread(arbitrariesForBase));
        var arrayBaseArb = oneof.apply(void 0, __spread(arbitrariesForBase.map(function (arb) { return array(arb, 0, maxKeys); })));
        var objectBaseArb = function (n) { return oneof.apply(void 0, __spread(arbitrariesForBase.map(function (arb) { return dictOf(arbKeys(n), arb); }))); };
        var setBaseArb = function () { return oneof.apply(void 0, __spread(arbitrariesForBase.map(function (arb) { return set(arb, 0, maxKeys).map(function (v) { return new Set(v); }); }))); };
        var mapBaseArb = function (n) { return oneof.apply(void 0, __spread(arbitrariesForBase.map(function (arb) { return mapOf(arbKeys(n), arb); }))); };
        var arrayArb = memo(function (n) { return oneof(arrayBaseArb, array(anythingArb(n), 0, maxKeys)); });
        var setArb = memo(function (n) { return oneof(setBaseArb(), set(anythingArb(n), 0, maxKeys).map(function (v) { return new Set(v); })); });
        var mapArb = memo(function (n) {
            return oneof(mapBaseArb(n), oneof(mapOf(arbKeys(n), anythingArb(n)), mapOf(anythingArb(n), anythingArb(n))));
        });
        var objectArb = memo(function (n) { return oneof(objectBaseArb(n), dictOf(arbKeys(n), anythingArb(n))); });
        var anythingArb = memo(function (n) {
            if (n <= 0)
                return oneof(baseArb);
            return oneof.apply(void 0, __spread([baseArb,
                arrayArb(),
                objectArb()], (constraints.withMap ? [mapArb()] : []), (constraints.withSet ? [setArb()] : []), (constraints.withObjectString ? [anythingArb().map(function (o) { return stringify(o); })] : []), (constraints.withNullPrototype ? [objectArb().map(function (o) { return Object.assign(Object.create(null), o); })] : [])));
        });
        return anythingArb(maxDepth);
    };
    var objectInternal = function (constraints) {
        return dictionary(constraints.key, anythingInternal(constraints));
    };
    function anything(settings) {
        return anythingInternal(ObjectConstraints.from(settings));
    }
    function object(settings) {
        return objectInternal(ObjectConstraints.from(settings));
    }
    function jsonSettings(stringArbitrary, maxDepth) {
        var key = stringArbitrary;
        var values = [boolean(), integer(), double(), stringArbitrary, constant(null)];
        return maxDepth != null ? { key: key, values: values, maxDepth: maxDepth } : { key: key, values: values };
    }
    function jsonObject(maxDepth) {
        return anything(jsonSettings(string(), maxDepth));
    }
    function unicodeJsonObject(maxDepth) {
        return anything(jsonSettings(unicodeString(), maxDepth));
    }
    function json(maxDepth) {
        var arb = maxDepth != null ? jsonObject(maxDepth) : jsonObject();
        return arb.map(JSON.stringify);
    }
    function unicodeJson(maxDepth) {
        var arb = maxDepth != null ? unicodeJsonObject(maxDepth) : unicodeJsonObject();
        return arb.map(JSON.stringify);
    }

    function rawRecord(recordModel) {
        var keys = Object.keys(recordModel);
        var arbs = keys.map(function (v) { return recordModel[v]; });
        return genericTuple(arbs).map(function (gs) {
            var obj = {};
            for (var idx = 0; idx !== keys.length; ++idx)
                obj[keys[idx]] = gs[idx];
            return obj;
        });
    }
    function record(recordModel, constraints) {
        var e_1, _a;
        if (constraints == null || (constraints.withDeletedKeys !== true && constraints.with_deleted_keys !== true))
            return rawRecord(recordModel);
        var updatedRecordModel = {};
        try {
            for (var _b = __values(Object.keys(recordModel)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var k = _c.value;
                updatedRecordModel[k] = option(recordModel[k].map(function (v) { return ({ value: v }); }));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return rawRecord(updatedRecordModel).map(function (obj) {
            var e_2, _a;
            var nobj = {};
            try {
                for (var _b = __values(Object.keys(obj)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var k = _c.value;
                    if (obj[k] != null)
                        nobj[k] = obj[k].value;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return nobj;
        });
    }

    var StreamArbitrary = (function (_super) {
        __extends(StreamArbitrary, _super);
        function StreamArbitrary(arb) {
            var _this = _super.call(this) || this;
            _this.arb = arb;
            return _this;
        }
        StreamArbitrary.prototype.generate = function (mrng) {
            var _this = this;
            var g = function (arb, clonedMrng) {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4, arb.generate(clonedMrng).value_];
                        case 1:
                            _a.sent();
                            return [3, 0];
                        case 2: return [2];
                    }
                });
            };
            var producer = function () { return new Stream(g(_this.arb, mrng.clone())); };
            var toString = function () {
                return "Stream(" + __spread(producer()
                    .take(10)
                    .map(stringify)).join(',') + "...)";
            };
            var enrichedProducer = function () {
                var _a;
                return Object.assign(producer(), (_a = { toString: toString }, _a[cloneMethod] = enrichedProducer, _a));
            };
            return new Shrinkable(enrichedProducer());
        };
        StreamArbitrary.prototype.withBias = function (freq) {
            var _this = this;
            return biasWrapper(freq, this, function () { return new StreamArbitrary(_this.arb.withBias(freq)); });
        };
        return StreamArbitrary;
    }(Arbitrary));
    function infiniteStream(arb) {
        return new StreamArbitrary(arb);
    }

    var SubarrayArbitrary = (function (_super) {
        __extends(SubarrayArbitrary, _super);
        function SubarrayArbitrary(originalArray, isOrdered, minLength, maxLength) {
            var _this = _super.call(this) || this;
            _this.originalArray = originalArray;
            _this.isOrdered = isOrdered;
            _this.minLength = minLength;
            _this.maxLength = maxLength;
            if (minLength < 0 || minLength > originalArray.length)
                throw new Error('fc.*{s|S}ubarrayOf expects the minimal length to be between 0 and the size of the original array');
            if (maxLength < 0 || maxLength > originalArray.length)
                throw new Error('fc.*{s|S}ubarrayOf expects the maximal length to be between 0 and the size of the original array');
            if (minLength > maxLength)
                throw new Error('fc.*{s|S}ubarrayOf expects the minimal length to be inferior or equal to the maximal length');
            _this.lengthArb = integer(minLength, maxLength);
            return _this;
        }
        SubarrayArbitrary.prototype.wrapper = function (items, shrunkOnce) {
            var _this = this;
            return new Shrinkable(items, function () { return _this.shrinkImpl(items, shrunkOnce).map(function (v) { return _this.wrapper(v, true); }); });
        };
        SubarrayArbitrary.prototype.generate = function (mrng) {
            var _this = this;
            var remainingElements = this.originalArray.map(function (v, idx) { return idx; });
            var size = this.lengthArb.generate(mrng).value;
            var ids = [];
            for (var idx = 0; idx !== size; ++idx) {
                var selectedIdIndex = mrng.nextInt(0, remainingElements.length - 1);
                ids.push(remainingElements[selectedIdIndex]);
                remainingElements.splice(selectedIdIndex, 1);
            }
            if (this.isOrdered)
                ids.sort(function (a, b) { return a - b; });
            return this.wrapper(ids.map(function (i) { return _this.originalArray[i]; }), false);
        };
        SubarrayArbitrary.prototype.shrinkImpl = function (items, shrunkOnce) {
            var _this = this;
            if (items.length === 0) {
                return Stream.nil();
            }
            var size = this.lengthArb.shrinkableFor(items.length, shrunkOnce);
            return size
                .shrink()
                .map(function (l) { return items.slice(items.length - l.value); })
                .join(items.length > this.minLength
                ? makeLazy(function () {
                    return _this.shrinkImpl(items.slice(1), false)
                        .filter(function (vs) { return _this.minLength <= vs.length + 1; })
                        .map(function (vs) { return [items[0]].concat(vs); });
                })
                : Stream.nil());
        };
        SubarrayArbitrary.prototype.withBias = function (freq) {
            return this.minLength !== this.maxLength
                ? biasWrapper(freq, this, function (originalArbitrary) {
                    return new SubarrayArbitrary(originalArbitrary.originalArray, originalArbitrary.isOrdered, originalArbitrary.minLength, originalArbitrary.minLength +
                        Math.floor(Math.log(originalArbitrary.maxLength - originalArbitrary.minLength) / Math.log(2)));
                })
                : this;
        };
        return SubarrayArbitrary;
    }(Arbitrary));
    function subarray(originalArray, minLength, maxLength) {
        if (minLength != null && maxLength != null)
            return new SubarrayArbitrary(originalArray, true, minLength, maxLength);
        return new SubarrayArbitrary(originalArray, true, 0, originalArray.length);
    }
    function shuffledSubarray(originalArray, minLength, maxLength) {
        if (minLength != null && maxLength != null)
            return new SubarrayArbitrary(originalArray, false, minLength, maxLength);
        return new SubarrayArbitrary(originalArray, false, 0, originalArray.length);
    }

    var padEight = function (arb) { return arb.map(function (n) { return StringPadStart(n.toString(16), 8, '0'); }); };
    function uuid() {
        var padded = padEight(nat(0xffffffff));
        var secondPadded = padEight(integer(0x10000000, 0x5fffffff));
        var thirdPadded = padEight(integer(0x80000000, 0xbfffffff));
        return tuple(padded, secondPadded, thirdPadded, padded).map(function (t) {
            return t[0] + "-" + t[1].substring(4) + "-" + t[1].substring(0, 4) + "-" + t[2].substring(0, 4) + "-" + t[2].substring(4) + t[3];
        });
    }
    function uuidV(versionNumber) {
        var padded = padEight(nat(0xffffffff));
        var secondPadded = padEight(nat(0x0fffffff));
        var thirdPadded = padEight(integer(0x80000000, 0xbfffffff));
        return tuple(padded, secondPadded, thirdPadded, padded).map(function (t) {
            return t[0] + "-" + t[1].substring(4) + "-" + versionNumber + t[1].substring(1, 4) + "-" + t[2].substring(0, 4) + "-" + t[2].substring(4) + t[3];
        });
    }

    function webAuthority(constraints) {
        var c = constraints || {};
        var hostnameArbs = [domain()]
            .concat(c.withIPv4 === true ? [ipV4()] : [])
            .concat(c.withIPv6 === true ? [ipV6().map(function (ip) { return "[" + ip + "]"; })] : [])
            .concat(c.withIPv4Extended === true ? [ipV4Extended()] : []);
        return tuple(c.withUserInfo === true ? option(hostUserInfo()) : constant(null), oneof.apply(void 0, __spread(hostnameArbs)), c.withPort === true ? option(nat(65535)) : constant(null)).map(function (_a) {
            var _b = __read(_a, 3), u = _b[0], h = _b[1], p = _b[2];
            return (u === null ? '' : u + "@") + h + (p === null ? '' : ":" + p);
        });
    }
    function webSegment() {
        var others = ['-', '.', '_', '~', '!', '$', '&', "'", '(', ')', '*', '+', ',', ';', '=', ':', '@'];
        return stringOf(buildAlphaNumericPercentArb(others));
    }
    function uriQueryOrFragment() {
        var others = ['-', '.', '_', '~', '!', '$', '&', "'", '(', ')', '*', '+', ',', ';', '=', ':', '@', '/', '?'];
        return stringOf(buildAlphaNumericPercentArb(others));
    }
    function webQueryParameters() {
        return uriQueryOrFragment();
    }
    function webFragments() {
        return uriQueryOrFragment();
    }
    function webUrl(constraints) {
        var c = constraints || {};
        var validSchemes = c.validSchemes || ['http', 'https'];
        var schemeArb = constantFrom.apply(void 0, __spread(validSchemes));
        var authorityArb = webAuthority(c.authoritySettings);
        var pathArb = array(webSegment()).map(function (p) { return p.map(function (v) { return "/" + v; }).join(''); });
        return tuple(schemeArb, authorityArb, pathArb, c.withQueryParameters === true ? option(webQueryParameters()) : constant(null), c.withFragments === true ? option(webFragments()) : constant(null)).map(function (_a) {
            var _b = __read(_a, 5), s = _b[0], a = _b[1], p = _b[2], q = _b[3], f = _b[4];
            return s + "://" + a + p + (q === null ? '' : "?" + q) + (f === null ? '' : "#" + f);
        });
    }

    var ReplayPath = (function () {
        function ReplayPath() {
        }
        ReplayPath.parse = function (replayPathStr) {
            var _a = __read(replayPathStr.split(':'), 2), serializedCount = _a[0], serializedChanges = _a[1];
            var counts = this.parseCounts(serializedCount);
            var changes = this.parseChanges(serializedChanges);
            return this.parseOccurences(counts, changes);
        };
        ReplayPath.stringify = function (replayPath) {
            var occurences = this.countOccurences(replayPath);
            var serializedCount = this.stringifyCounts(occurences);
            var serializedChanges = this.stringifyChanges(occurences);
            return serializedCount + ":" + serializedChanges;
        };
        ReplayPath.intToB64 = function (n) {
            if (n < 26)
                return String.fromCharCode(n + 65);
            if (n < 52)
                return String.fromCharCode(n + 97 - 26);
            if (n < 62)
                return String.fromCharCode(n + 48 - 52);
            return String.fromCharCode(n === 62 ? 43 : 47);
        };
        ReplayPath.b64ToInt = function (c) {
            if (c >= 'a')
                return c.charCodeAt(0) - 97 + 26;
            if (c >= 'A')
                return c.charCodeAt(0) - 65;
            if (c >= '0')
                return c.charCodeAt(0) - 48 + 52;
            return c === '+' ? 62 : 63;
        };
        ReplayPath.countOccurences = function (replayPath) {
            return replayPath.reduce(function (counts, cur) {
                if (counts.length === 0 || counts[counts.length - 1].count === 64 || counts[counts.length - 1].value !== cur)
                    counts.push({ value: cur, count: 1 });
                else
                    counts[counts.length - 1].count += 1;
                return counts;
            }, []);
        };
        ReplayPath.parseOccurences = function (counts, changes) {
            var replayPath = [];
            for (var idx = 0; idx !== counts.length; ++idx) {
                var count = counts[idx];
                var value = changes[idx];
                for (var num = 0; num !== count; ++num)
                    replayPath.push(value);
            }
            return replayPath;
        };
        ReplayPath.stringifyChanges = function (occurences) {
            var serializedChanges = '';
            for (var idx = 0; idx < occurences.length; idx += 6) {
                var changesInt = occurences
                    .slice(idx, idx + 6)
                    .reduceRight(function (prev, cur) { return prev * 2 + (cur.value ? 1 : 0); }, 0);
                serializedChanges += this.intToB64(changesInt);
            }
            return serializedChanges;
        };
        ReplayPath.parseChanges = function (serializedChanges) {
            var _this = this;
            var changesInt = serializedChanges.split('').map(function (c) { return _this.b64ToInt(c); });
            var changes = [];
            for (var idx = 0; idx !== changesInt.length; ++idx) {
                var current = changesInt[idx];
                for (var n = 0; n !== 6; ++n, current >>= 1) {
                    changes.push(current % 2 === 1);
                }
            }
            return changes;
        };
        ReplayPath.stringifyCounts = function (occurences) {
            var _this = this;
            return occurences.map(function (_a) {
                var count = _a.count;
                return _this.intToB64(count - 1);
            }).join('');
        };
        ReplayPath.parseCounts = function (serializedCount) {
            var _this = this;
            return serializedCount.split('').map(function (c) { return _this.b64ToInt(c) + 1; });
        };
        return ReplayPath;
    }());

    var CommandsIterable = (function () {
        function CommandsIterable(commands, metadataForReplay) {
            this.commands = commands;
            this.metadataForReplay = metadataForReplay;
        }
        CommandsIterable.prototype[Symbol.iterator] = function () {
            return this.commands[Symbol.iterator]();
        };
        CommandsIterable.prototype[cloneMethod] = function () {
            return new CommandsIterable(this.commands.map(function (c) { return c.clone(); }), this.metadataForReplay);
        };
        CommandsIterable.prototype.toString = function () {
            var serializedCommands = this.commands
                .filter(function (c) { return c.hasRan; })
                .map(function (c) { return c.toString(); })
                .join(',');
            var metadata = this.metadataForReplay();
            return metadata.length !== 0 ? serializedCommands + " /*" + metadata + "*/" : serializedCommands;
        };
        return CommandsIterable;
    }());

    var CommandWrapper = (function () {
        function CommandWrapper(cmd) {
            this.cmd = cmd;
            this.hasRan = false;
        }
        CommandWrapper.prototype.check = function (m) {
            return this.cmd.check(m);
        };
        CommandWrapper.prototype.run = function (m, r) {
            this.hasRan = true;
            return this.cmd.run(m, r);
        };
        CommandWrapper.prototype.clone = function () {
            if (hasCloneMethod(this.cmd))
                return new CommandWrapper(this.cmd[cloneMethod]());
            return new CommandWrapper(this.cmd);
        };
        CommandWrapper.prototype.toString = function () {
            return this.cmd.toString();
        };
        return CommandWrapper;
    }());

    var CommandsArbitrary = (function (_super) {
        __extends(CommandsArbitrary, _super);
        function CommandsArbitrary(commandArbs, maxCommands, sourceReplayPath, disableReplayLog) {
            var _this = _super.call(this) || this;
            _this.sourceReplayPath = sourceReplayPath;
            _this.disableReplayLog = disableReplayLog;
            _this.oneCommandArb = oneof.apply(void 0, __spread(commandArbs)).map(function (c) { return new CommandWrapper(c); });
            _this.lengthArb = nat(maxCommands);
            _this.replayPath = [];
            _this.replayPathPosition = 0;
            return _this;
        }
        CommandsArbitrary.prototype.metadataForReplay = function () {
            return this.disableReplayLog ? '' : "replayPath=" + JSON.stringify(ReplayPath.stringify(this.replayPath));
        };
        CommandsArbitrary.prototype.wrapper = function (items, shrunkOnce) {
            var _this = this;
            return new Shrinkable(new CommandsIterable(items.map(function (s) { return s.value_; }), function () { return _this.metadataForReplay(); }), function () {
                return _this.shrinkImpl(items, shrunkOnce).map(function (v) { return _this.wrapper(v, true); });
            });
        };
        CommandsArbitrary.prototype.generate = function (mrng) {
            var size = this.lengthArb.generate(mrng);
            var items = Array(size.value_);
            for (var idx = 0; idx !== size.value_; ++idx) {
                var item = this.oneCommandArb.generate(mrng);
                items[idx] = item;
            }
            this.replayPathPosition = 0;
            return this.wrapper(items, false);
        };
        CommandsArbitrary.prototype.filterOnExecution = function (itemsRaw) {
            var e_1, _a;
            var items = [];
            try {
                for (var itemsRaw_1 = __values(itemsRaw), itemsRaw_1_1 = itemsRaw_1.next(); !itemsRaw_1_1.done; itemsRaw_1_1 = itemsRaw_1.next()) {
                    var c = itemsRaw_1_1.value;
                    if (c.value_.hasRan) {
                        this.replayPath.push(true);
                        items.push(c);
                    }
                    else
                        this.replayPath.push(false);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (itemsRaw_1_1 && !itemsRaw_1_1.done && (_a = itemsRaw_1["return"])) _a.call(itemsRaw_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return items;
        };
        CommandsArbitrary.prototype.filterOnReplay = function (itemsRaw) {
            var _this = this;
            return itemsRaw.filter(function (c, idx) {
                var state = _this.replayPath[_this.replayPathPosition + idx];
                if (state === undefined)
                    throw new Error("Too short replayPath");
                if (!state && c.value_.hasRan)
                    throw new Error("Mismatch between replayPath and real execution");
                return state;
            });
        };
        CommandsArbitrary.prototype.filterForShrinkImpl = function (itemsRaw) {
            if (this.replayPathPosition === 0) {
                this.replayPath = this.sourceReplayPath !== null ? ReplayPath.parse(this.sourceReplayPath) : [];
            }
            var items = this.replayPathPosition < this.replayPath.length
                ? this.filterOnReplay(itemsRaw)
                : this.filterOnExecution(itemsRaw);
            this.replayPathPosition += itemsRaw.length;
            return items;
        };
        CommandsArbitrary.prototype.shrinkImpl = function (itemsRaw, shrunkOnce) {
            var _this = this;
            var items = this.filterForShrinkImpl(itemsRaw);
            if (items.length === 0) {
                return Stream.nil();
            }
            var rootShrink = shrunkOnce
                ? Stream.nil()
                : new Stream([[]][Symbol.iterator]());
            var nextShrinks = [];
            var _loop_1 = function (numToKeep) {
                nextShrinks.push(makeLazy(function () {
                    var size = _this.lengthArb.shrinkableFor(items.length - 1 - numToKeep, false);
                    var fixedStart = items.slice(0, numToKeep);
                    return size.shrink().map(function (l) { return fixedStart.concat(items.slice(items.length - (l.value + 1))); });
                }));
            };
            for (var numToKeep = 0; numToKeep !== items.length; ++numToKeep) {
                _loop_1(numToKeep);
            }
            var _loop_2 = function (itemAt) {
                nextShrinks.push(makeLazy(function () { return items[itemAt].shrink().map(function (v) { return items.slice(0, itemAt).concat([v], items.slice(itemAt + 1)); }); }));
            };
            for (var itemAt = 0; itemAt !== items.length; ++itemAt) {
                _loop_2(itemAt);
            }
            return rootShrink.join.apply(rootShrink, __spread(nextShrinks)).map(function (shrinkables) {
                return shrinkables.map(function (c) {
                    return new Shrinkable(c.value_.clone(), c.shrink);
                });
            });
        };
        return CommandsArbitrary;
    }(Arbitrary));
    function commands(commandArbs, settings) {
        var config = settings == null ? {} : typeof settings === 'number' ? { maxCommands: settings } : settings;
        return new CommandsArbitrary(commandArbs, config.maxCommands != null ? config.maxCommands : 10, config.replayPath != null ? config.replayPath : null, !!config.disableReplayLog);
    }

    var ScheduledCommand = (function () {
        function ScheduledCommand(s, cmd) {
            this.s = s;
            this.cmd = cmd;
        }
        ScheduledCommand.prototype.check = function (m) {
            return __awaiter(this, void 0, void 0, function () {
                var error, checkPassed, status;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            error = null;
                            checkPassed = false;
                            return [4, this.s.scheduleSequence([
                                    {
                                        label: "check@" + this.cmd.toString(),
                                        builder: function () { return __awaiter(_this, void 0, void 0, function () {
                                            var err_1;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        _a.trys.push([0, 2, , 3]);
                                                        return [4, Promise.resolve(this.cmd.check(m))];
                                                    case 1:
                                                        checkPassed = _a.sent();
                                                        return [3, 3];
                                                    case 2:
                                                        err_1 = _a.sent();
                                                        error = err_1;
                                                        throw err_1;
                                                    case 3: return [2];
                                                }
                                            });
                                        }); }
                                    }
                                ]).task];
                        case 1:
                            status = _a.sent();
                            if (status.faulty) {
                                throw error;
                            }
                            return [2, checkPassed];
                    }
                });
            });
        };
        ScheduledCommand.prototype.run = function (m, r) {
            return __awaiter(this, void 0, void 0, function () {
                var error, status;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            error = null;
                            return [4, this.s.scheduleSequence([
                                    {
                                        label: "run@" + this.cmd.toString(),
                                        builder: function () { return __awaiter(_this, void 0, void 0, function () {
                                            var err_2;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        _a.trys.push([0, 2, , 3]);
                                                        return [4, this.cmd.run(m, r)];
                                                    case 1:
                                                        _a.sent();
                                                        return [3, 3];
                                                    case 2:
                                                        err_2 = _a.sent();
                                                        error = err_2;
                                                        throw err_2;
                                                    case 3: return [2];
                                                }
                                            });
                                        }); }
                                    }
                                ]).task];
                        case 1:
                            status = _a.sent();
                            if (status.faulty) {
                                throw error;
                            }
                            return [2];
                    }
                });
            });
        };
        return ScheduledCommand;
    }());
    var scheduleCommands = function (s, cmds) {
        var cmds_1, cmds_1_1, cmd, e_1_1;
        var e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 7]);
                    cmds_1 = __values(cmds), cmds_1_1 = cmds_1.next();
                    _b.label = 1;
                case 1:
                    if (!!cmds_1_1.done) return [3, 4];
                    cmd = cmds_1_1.value;
                    return [4, new ScheduledCommand(s, cmd)];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    cmds_1_1 = cmds_1.next();
                    return [3, 1];
                case 4: return [3, 7];
                case 5:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 7];
                case 6:
                    try {
                        if (cmds_1_1 && !cmds_1_1.done && (_a = cmds_1["return"])) _a.call(cmds_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7];
                case 7: return [2];
            }
        });
    };

    var genericModelRun = function (s, cmds, initialValue, runCmd, then) {
        return s.then(function (o) {
            var e_1, _a;
            var model = o.model, real = o.real;
            var state = initialValue;
            var _loop_1 = function (c) {
                state = then(state, function () {
                    return runCmd(c, model, real);
                });
            };
            try {
                for (var cmds_1 = __values(cmds), cmds_1_1 = cmds_1.next(); !cmds_1_1.done; cmds_1_1 = cmds_1.next()) {
                    var c = cmds_1_1.value;
                    _loop_1(c);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (cmds_1_1 && !cmds_1_1.done && (_a = cmds_1["return"])) _a.call(cmds_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return state;
        });
    };
    var internalModelRun = function (s, cmds) {
        var then = function (p, c) { return c(); };
        var setupProducer = {
            then: function (fun) {
                fun(s());
                return undefined;
            }
        };
        var runSync = function (cmd, m, r) {
            if (cmd.check(m))
                cmd.run(m, r);
            return undefined;
        };
        return genericModelRun(setupProducer, cmds, undefined, runSync, then);
    };
    var isAsyncSetup = function (s) {
        return typeof s.then === 'function';
    };
    var internalAsyncModelRun = function (s, cmds, defaultPromise) {
        if (defaultPromise === void 0) { defaultPromise = Promise.resolve(); }
        return __awaiter(void 0, void 0, void 0, function () {
            var then, setupProducer, runAsync;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        then = function (p, c) { return p.then(c); };
                        setupProducer = {
                            then: function (fun) {
                                var out = s();
                                if (isAsyncSetup(out))
                                    return out.then(fun);
                                else
                                    return fun(out);
                            }
                        };
                        runAsync = function (cmd, m, r) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, cmd.check(m)];
                                    case 1:
                                        if (!_a.sent()) return [3, 3];
                                        return [4, cmd.run(m, r)];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3: return [2];
                                }
                            });
                        }); };
                        return [4, genericModelRun(setupProducer, cmds, defaultPromise, runAsync, then)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    var modelRun = function (s, cmds) {
        internalModelRun(s, cmds);
    };
    var asyncModelRun = function (s, cmds) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, internalAsyncModelRun(s, cmds)];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); };
    var scheduledModelRun = function (scheduler, s, cmds) { return __awaiter(void 0, void 0, void 0, function () {
        var scheduledCommands, out;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    scheduledCommands = scheduleCommands(scheduler, cmds);
                    out = internalAsyncModelRun(s, scheduledCommands, scheduler.schedule(Promise.resolve(), 'startModel'));
                    return [4, scheduler.waitAll()];
                case 1:
                    _a.sent();
                    return [4, out];
                case 2:
                    _a.sent();
                    return [2];
            }
        });
    }); };

    var SchedulerImplem = (function () {
        function SchedulerImplem(act, mrng) {
            this.act = act;
            this.mrng = mrng;
            this.lastTaskId = 0;
            this.sourceMrng = mrng.clone();
            this.scheduledTasks = [];
            this.triggeredTasksLogs = [];
        }
        SchedulerImplem.prototype.buildLog = function (taskId, meta, type, data) {
            return "[task#" + taskId + "] " + meta + " " + type + (data !== undefined ? " with value " + stringify(data) : '');
        };
        SchedulerImplem.prototype.log = function (taskId, meta, type, data) {
            this.triggeredTasksLogs.push(this.buildLog(taskId, meta, type, data));
        };
        SchedulerImplem.prototype.scheduleInternal = function (meta, task, thenTaskToBeAwaited) {
            var _this = this;
            var trigger = null;
            var taskId = ++this.lastTaskId;
            var scheduledPromise = new Promise(function (resolve, reject) {
                trigger = function () {
                    (thenTaskToBeAwaited ? task.then(function () { return thenTaskToBeAwaited(); }) : task).then(function (data) {
                        _this.log(taskId, meta, 'resolved', data);
                        return resolve(data);
                    }, function (err) {
                        _this.log(taskId, meta, 'rejected', err);
                        return reject(err);
                    });
                };
            });
            this.scheduledTasks.push({
                original: task,
                scheduled: scheduledPromise,
                trigger: trigger,
                label: this.buildLog(taskId, meta, 'pending', undefined)
            });
            return scheduledPromise;
        };
        SchedulerImplem.prototype.schedule = function (task, label) {
            return this.scheduleInternal(label === undefined ? 'promise' : "promise::" + label, task);
        };
        SchedulerImplem.prototype.scheduleFunction = function (asyncFunction) {
            var _this = this;
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _this.scheduleInternal("function::" + asyncFunction.name + "(" + args.map(stringify).join(',') + ")", asyncFunction.apply(void 0, __spread(args)));
            };
        };
        SchedulerImplem.prototype.scheduleSequence = function (sequenceBuilders) {
            var _this = this;
            var status = { done: false, faulty: false };
            var dummyResolvedPromise = { then: function (f) { return f(); } };
            var resolveSequenceTask = function () { };
            var sequenceTask = new Promise(function (resolve) { return (resolveSequenceTask = resolve); });
            sequenceBuilders
                .reduce(function (previouslyScheduled, item) {
                var _a = __read(typeof item === 'function' ? [item, item.name] : [item.builder, item.label], 2), builder = _a[0], label = _a[1];
                return previouslyScheduled.then(function () {
                    var scheduled = _this.scheduleInternal("sequence::" + label, dummyResolvedPromise, function () { return builder(); });
                    scheduled["catch"](function () {
                        status.faulty = true;
                        resolveSequenceTask();
                    });
                    return scheduled;
                });
            }, dummyResolvedPromise)
                .then(function () {
                status.done = true;
                resolveSequenceTask();
            }, function () {
            });
            return Object.assign(status, {
                task: Promise.resolve(sequenceTask).then(function () {
                    return { done: status.done, faulty: status.faulty };
                })
            });
        };
        SchedulerImplem.prototype.count = function () {
            return this.scheduledTasks.length;
        };
        SchedulerImplem.prototype.internalWaitOne = function () {
            return __awaiter(this, void 0, void 0, function () {
                var taskIndex, _a, scheduledTask, _err_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (this.scheduledTasks.length === 0) {
                                throw new Error('No task scheduled');
                            }
                            taskIndex = this.mrng.nextInt(0, this.scheduledTasks.length - 1);
                            _a = __read(this.scheduledTasks.splice(taskIndex, 1), 1), scheduledTask = _a[0];
                            scheduledTask.trigger();
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4, scheduledTask.scheduled];
                        case 2:
                            _b.sent();
                            return [3, 4];
                        case 3:
                            _err_1 = _b.sent();
                            return [3, 4];
                        case 4: return [2];
                    }
                });
            });
        };
        SchedulerImplem.prototype.waitOne = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.act(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, this.internalWaitOne()];
                                    case 1: return [2, _a.sent()];
                                }
                            }); }); })];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            });
        };
        SchedulerImplem.prototype.waitAll = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.scheduledTasks.length > 0)) return [3, 2];
                            return [4, this.waitOne()];
                        case 1:
                            _a.sent();
                            return [3, 0];
                        case 2: return [2];
                    }
                });
            });
        };
        SchedulerImplem.prototype.toString = function () {
            return ('Scheduler`\n' +
                this.triggeredTasksLogs
                    .concat(this.scheduledTasks.map(function (t) { return t.label; }))
                    .map(function (log) { return "-> " + log; })
                    .join('\n') +
                '`');
        };
        SchedulerImplem.prototype[cloneMethod] = function () {
            return new SchedulerImplem(this.act, this.sourceMrng);
        };
        return SchedulerImplem;
    }());
    var SchedulerArbitrary = (function (_super) {
        __extends(SchedulerArbitrary, _super);
        function SchedulerArbitrary(act) {
            var _this = _super.call(this) || this;
            _this.act = act;
            return _this;
        }
        SchedulerArbitrary.prototype.generate = function (mrng) {
            return new Shrinkable(new SchedulerImplem(this.act, mrng.clone()));
        };
        return SchedulerArbitrary;
    }(Arbitrary));
    function scheduler(constraints) {
        var _a = (constraints || {}).act, act = _a === void 0 ? function (f) { return f(); } : _a;
        return new SchedulerArbitrary(act);
    }

    var __type = 'module';
    var __version = '1.24.1';

    var fc = /*#__PURE__*/Object.freeze({
        __proto__: null,
        __type: __type,
        __version: __version,
        sample: sample,
        statistics: statistics,
        check: check,
        assert: assert,
        pre: pre,
        property: property,
        asyncProperty: asyncProperty,
        boolean: boolean,
        float: float,
        double: double,
        integer: integer,
        nat: nat,
        maxSafeInteger: maxSafeInteger,
        maxSafeNat: maxSafeNat,
        bigIntN: bigIntN,
        bigUintN: bigUintN,
        bigInt: bigInt,
        bigUint: bigUint,
        char: char,
        ascii: ascii,
        char16bits: char16bits,
        unicode: unicode,
        fullUnicode: fullUnicode,
        hexa: hexa,
        base64: base64,
        mixedCase: mixedCase,
        string: string,
        asciiString: asciiString,
        string16bits: string16bits,
        stringOf: stringOf,
        unicodeString: unicodeString,
        fullUnicodeString: fullUnicodeString,
        hexaString: hexaString,
        base64String: base64String,
        lorem: lorem,
        constant: constant,
        constantFrom: constantFrom,
        clonedConstant: clonedConstant,
        mapToConstant: mapToConstant,
        option: option,
        oneof: oneof,
        frequency: frequency,
        dedup: dedup,
        shuffledSubarray: shuffledSubarray,
        subarray: subarray,
        array: array,
        infiniteStream: infiniteStream,
        set: set,
        tuple: tuple,
        genericTuple: genericTuple,
        record: record,
        dictionary: dictionary,
        anything: anything,
        object: object,
        json: json,
        jsonObject: jsonObject,
        unicodeJson: unicodeJson,
        unicodeJsonObject: unicodeJsonObject,
        letrec: letrec,
        memo: memo,
        compareBooleanFunc: compareBooleanFunc,
        compareFunc: compareFunc,
        func: func,
        context: context,
        date: date,
        ipV4: ipV4,
        ipV4Extended: ipV4Extended,
        ipV6: ipV6,
        domain: domain,
        webAuthority: webAuthority,
        webSegment: webSegment,
        webFragments: webFragments,
        webQueryParameters: webQueryParameters,
        webUrl: webUrl,
        emailAddress: emailAddress,
        uuid: uuid,
        uuidV: uuidV,
        asyncModelRun: asyncModelRun,
        modelRun: modelRun,
        scheduledModelRun: scheduledModelRun,
        commands: commands,
        scheduler: scheduler,
        Arbitrary: Arbitrary,
        Shrinkable: Shrinkable,
        cloneMethod: cloneMethod,
        stringify: stringify,
        get ExecutionStatus () { return exports.ExecutionStatus; },
        ObjectConstraints: ObjectConstraints,
        Random: Random,
        Stream: Stream,
        stream: stream,
        get VerbosityLevel () { return exports.VerbosityLevel; },
        configureGlobal: configureGlobal,
        readConfigureGlobal: readConfigureGlobal,
        resetConfigureGlobal: resetConfigureGlobal
    });

    exports.Arbitrary = Arbitrary;
    exports.ObjectConstraints = ObjectConstraints;
    exports.Random = Random;
    exports.Shrinkable = Shrinkable;
    exports.Stream = Stream;
    exports.__type = __type;
    exports.__version = __version;
    exports.anything = anything;
    exports.array = array;
    exports.ascii = ascii;
    exports.asciiString = asciiString;
    exports.assert = assert;
    exports.asyncModelRun = asyncModelRun;
    exports.asyncProperty = asyncProperty;
    exports.base64 = base64;
    exports.base64String = base64String;
    exports.bigInt = bigInt;
    exports.bigIntN = bigIntN;
    exports.bigUint = bigUint;
    exports.bigUintN = bigUintN;
    exports.boolean = boolean;
    exports.char = char;
    exports.char16bits = char16bits;
    exports.check = check;
    exports.cloneMethod = cloneMethod;
    exports.clonedConstant = clonedConstant;
    exports.commands = commands;
    exports.compareBooleanFunc = compareBooleanFunc;
    exports.compareFunc = compareFunc;
    exports.configureGlobal = configureGlobal;
    exports.constant = constant;
    exports.constantFrom = constantFrom;
    exports.context = context;
    exports.date = date;
    exports.dedup = dedup;
    exports.default = fc;
    exports.dictionary = dictionary;
    exports.domain = domain;
    exports.double = double;
    exports.emailAddress = emailAddress;
    exports.float = float;
    exports.frequency = frequency;
    exports.fullUnicode = fullUnicode;
    exports.fullUnicodeString = fullUnicodeString;
    exports.func = func;
    exports.genericTuple = genericTuple;
    exports.hexa = hexa;
    exports.hexaString = hexaString;
    exports.infiniteStream = infiniteStream;
    exports.integer = integer;
    exports.ipV4 = ipV4;
    exports.ipV4Extended = ipV4Extended;
    exports.ipV6 = ipV6;
    exports.json = json;
    exports.jsonObject = jsonObject;
    exports.letrec = letrec;
    exports.lorem = lorem;
    exports.mapToConstant = mapToConstant;
    exports.maxSafeInteger = maxSafeInteger;
    exports.maxSafeNat = maxSafeNat;
    exports.memo = memo;
    exports.mixedCase = mixedCase;
    exports.modelRun = modelRun;
    exports.nat = nat;
    exports.object = object;
    exports.oneof = oneof;
    exports.option = option;
    exports.pre = pre;
    exports.property = property;
    exports.readConfigureGlobal = readConfigureGlobal;
    exports.record = record;
    exports.resetConfigureGlobal = resetConfigureGlobal;
    exports.sample = sample;
    exports.scheduledModelRun = scheduledModelRun;
    exports.scheduler = scheduler;
    exports.set = set;
    exports.shuffledSubarray = shuffledSubarray;
    exports.statistics = statistics;
    exports.stream = stream;
    exports.string = string;
    exports.string16bits = string16bits;
    exports.stringOf = stringOf;
    exports.stringify = stringify;
    exports.subarray = subarray;
    exports.tuple = tuple;
    exports.unicode = unicode;
    exports.unicodeJson = unicodeJson;
    exports.unicodeJsonObject = unicodeJsonObject;
    exports.unicodeString = unicodeString;
    exports.uuid = uuid;
    exports.uuidV = uuidV;
    exports.webAuthority = webAuthority;
    exports.webFragments = webFragments;
    exports.webQueryParameters = webQueryParameters;
    exports.webSegment = webSegment;
    exports.webUrl = webUrl;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
