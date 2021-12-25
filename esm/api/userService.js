var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import assert from 'assert';
import { assign, join, times } from 'lodash';
import NodeRSA from 'node-rsa';
import axios, { waterfallReducer, _persist } from './utils';
var _UserService = /** @class */ (function () {
    function _UserService() {
        this.url = '';
    }
    _UserService.prototype._update = function (_a) {
        var token = _a.token, cryptoKey = _a.cryptoKey, info = __rest(_a, ["token", "cryptoKey"]);
        this.token = token;
        sessionStorage.setItem('aos_token', token);
        this.expire = Date.now() + 30 * 60 * 1000;
        this.cryptoKey = cryptoKey;
        this.userInfo = assign(this.userInfo, info);
    };
    _UserService.prototype._clean = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.token = '';
                this.expire = '';
                this.cryptoKey = '';
                this.userInfo = {};
                return [2 /*return*/];
            });
        });
    };
    Object.defineProperty(_UserService.prototype, "isLogin", {
        get: function () {
            return this.token && this.expire > Date.now();
        },
        enumerable: false,
        configurable: true
    });
    _UserService.prototype.logout = function () {
        return this._clean();
    };
    _UserService.prototype._login2 = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, code, data, msg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, axios.get({
                            url: '/saas/proxy/user/third/login2',
                            data: params,
                        })];
                    case 1:
                        _a = _b.sent(), code = _a.code, data = _a.data, msg = _a.msg;
                        assert(code === '200', msg);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    _UserService.prototype._generateKey = function (_a) {
        var loginBase = _a.loginBase, loginVo = _a.loginVo;
        return __awaiter(this, void 0, void 0, function () {
            var token, publicKeyString, rsaKey, cryptoKey, encryptKey, _b, code, msg;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        token = loginBase.token;
                        publicKeyString = loginVo.publicKeyString;
                        rsaKey = new NodeRSA(publicKeyString, 'pkcs8-public', {
                            environment: 'browser',
                            encryptionScheme: 'pkcs1',
                        });
                        cryptoKey = join(times(4, function () { return Math.random().toString(36).slice(-4); }), '');
                        encryptKey = rsaKey.encrypt(cryptoKey, 'base64', 'utf8');
                        return [4 /*yield*/, axios.post({
                                url: '/saas/login/upload/keyEncrypt',
                                query: true,
                                data: {
                                    encryptKey: encryptKey,
                                    _token: token,
                                },
                            })];
                    case 1:
                        _b = _c.sent(), code = _b.code, msg = _b.msg;
                        assert(code === '200', msg);
                        return [2 /*return*/, { cryptoKey: cryptoKey, publicKeyString: publicKeyString, token: token }];
                }
            });
        });
    };
    _UserService.prototype.login2 = function (_a) {
        var userId = _a.userId, _b = _a.appId, appId = _b === void 0 ? 16 : _b, _c = _a.loginmode, loginmode = _c === void 0 ? 2 : _c, _d = _a.appcode, appcode = _d === void 0 ? 'ISIGNING-SAAS-POX' : _d, password = _a.password, businessId = _a.businessId;
        var enters = {
            userId: userId,
            businessId: businessId,
            appId: appId,
            password: password || '',
            loginmode: loginmode,
            appcode: appcode,
        };
        return [this._login2, this._clean, this._generateKey, this._update].reduce(waterfallReducer(this), Promise.resolve(enters));
    };
    _UserService.prototype._thirdAuth = function (_a) {
        var clientId = _a.clientId, clientSecret = _a.clientSecret, params = __rest(_a, ["clientId", "clientSecret"]);
        return __awaiter(this, void 0, void 0, function () {
            var _b, code, data, msg;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        assert(clientId && clientSecret, '没有clientId与clientSecret，无法验证身份!');
                        return [4 /*yield*/, axios.post({
                                url: '/saas/proxy/user/third/auth',
                                data: params,
                                thirdOpts: { clientId: clientId, clientSecret: clientSecret },
                            })];
                    case 1:
                        _b = _c.sent(), code = _b.code, data = _b.data, msg = _b.msg;
                        assert(code === '200', msg);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    _UserService.prototype.thirdAuth = function (params) {
        return [this._thirdAuth, this._clean, this._generateKey, this._update].reduce(waterfallReducer(this), Promise.resolve(params));
    };
    _UserService.prototype.saas = function (_a) {
        var loginBase = _a.loginBase, loginVo = _a.loginVo;
        return __awaiter(this, void 0, void 0, function () {
            var _b, code, data, msg;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, axios.get({
                            url: '/saas/login',
                            data: { _token: loginBase.token },
                        })];
                    case 1:
                        _b = _c.sent(), code = _b.code, data = _b.data, msg = _b.msg;
                        assert(code === '200', msg);
                        return [2 /*return*/, {
                                loginBase: loginBase,
                                loginVo: __assign(__assign({}, loginVo), { businessAdmin: data.businessAdmin, businessId: data.businessId, businessName: data.businessName, businesses: data.businesses, config: data.config, saasBusinessUserStop: data.saasBusinessUserStop, publicKeyString: data.publicKeyString }),
                            }];
                }
            });
        });
    };
    _UserService.prototype._refresh = function (_a) {
        var token = _a.token, userInfo = _a.userInfo;
        return __awaiter(this, void 0, void 0, function () {
            var _b, code, data, msg;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, axios.get({
                            url: '/user/user/refresh',
                            data: {
                                token: token,
                                userid: userInfo.loginBase.unifiedUseId,
                                refreshToken: userInfo.loginBase.refreshtoken,
                            },
                        })];
                    case 1:
                        _b = _c.sent(), code = _b.code, data = _b.data, msg = _b.msg;
                        assert(code === '200', msg);
                        return [2 /*return*/, {
                                loginBase: __assign(__assign({}, userInfo.loginBase), { token: data.token, refreshtoken: data.refreshtoken }),
                                loginVo: __assign({}, userInfo.loginVo),
                            }];
                }
            });
        });
    };
    _UserService.prototype.refresh = function () {
        return [this._refresh, this.saas, this._generateKey, this._update].reduce(waterfallReducer(this), Promise.resolve({
            token: this.token,
            userInfo: this.userInfo,
        }));
    };
    _UserService.prototype._switchBusinessByContractNum = function (_a) {
        var contractNum = _a.contractNum;
        return __awaiter(this, void 0, void 0, function () {
            var _b, code, msg;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, axios.get({
                            url: '/saas/business/contract/switchBusiness',
                            data: { contractNum: contractNum },
                        })];
                    case 1:
                        _b = _c.sent(), code = _b.code, msg = _b.msg;
                        assert(code === '200', msg);
                        return [2 /*return*/, {
                                loginBase: __assign({}, this.userInfo.loginBase),
                                loginVo: __assign({}, this.userInfo.loginVo),
                            }];
                }
            });
        });
    };
    _UserService.prototype._switchBusiness = function (_a) {
        var _b = _a.businessId, businessId = _b === void 0 ? '' : _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, code, msg;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, axios.post({
                            url: '/saas/business/switchBusiness',
                            data: { businessId: businessId },
                            query: true,
                        })];
                    case 1:
                        _c = _d.sent(), code = _c.code, msg = _c.msg;
                        assert(code === '200', msg);
                        return [2 /*return*/, {
                                loginBase: __assign({}, this.userInfo.loginBase),
                                loginVo: __assign({}, this.userInfo.loginVo),
                            }];
                }
            });
        });
    };
    _UserService.prototype.switchBusiness = function (params) {
        var queue = [];
        if (params === null || params === void 0 ? void 0 : params.contractNum) {
            queue.push(this._switchBusinessByContractNum);
        }
        else {
            queue.push(this._switchBusiness);
        }
        return __spreadArray(__spreadArray([], queue), [this.saas, this._generateKey, this._update]).reduce(waterfallReducer(this), Promise.resolve(__assign({}, params)));
    };
    _UserService.prototype.getUserIdentity = function (id) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, code, data, msg;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, axios.get({
                            url: "/saas/account/userIdentity/" + (id || ((_b = (_a = this.userInfo) === null || _a === void 0 ? void 0 : _a.loginVo) === null || _b === void 0 ? void 0 : _b.userId)),
                        })];
                    case 1:
                        _c = _d.sent(), code = _c.code, data = _c.data, msg = _c.msg;
                        assert(code === '200', msg);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    __decorate([
        _persist()
    ], _UserService.prototype, "token", void 0);
    __decorate([
        _persist()
    ], _UserService.prototype, "expire", void 0);
    __decorate([
        _persist()
    ], _UserService.prototype, "userInfo", void 0);
    __decorate([
        _persist()
    ], _UserService.prototype, "cryptoKey", void 0);
    return _UserService;
}());
export { _UserService };
export default new _UserService();
//# sourceMappingURL=userService.js.map