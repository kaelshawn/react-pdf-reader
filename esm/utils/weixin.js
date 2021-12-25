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
import wx from 'weixin-js-sdk';
import { AxiosInstance } from '../api/utils';
import { queryParse } from '../utils/tools';
export default (function () {
    var axios = AxiosInstance();
    var ua = window.navigator.userAgent.toLowerCase();
    var isWeixin = ua.match(/MicroMessenger/i) == 'micromessenger';
    var shell = {
        goto: function (path, isRedirect, success) {
            var g = wx.miniProgram[isRedirect ? 'redirectTo' : 'navigateTo'];
            g({ url: path, success: success });
        },
        back: function (delta) {
            if (delta === void 0) { delta = 1; }
            wx.miniProgram.navigateBack({ delta: delta });
        },
        gotoFaceAuth: function (params) {
            return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
                var data_1, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!isWeixin) return [3 /*break*/, 5];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, axios.post({
                                    // url: '/services/tc-api/detectAuth',
                                    url: '/services/tc-api/detectAuth',
                                    data: __assign({ RedirectUrl: window.location.href + "/result.html" }, params),
                                })];
                        case 2:
                            data_1 = _a.sent();
                            shell.goto("/pages/faceview/index?url=" + btoa(data_1.Url), false, function () {
                                resolve(data_1);
                            });
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _a.sent();
                            reject(err_1);
                            return [3 /*break*/, 4];
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            reject(new Error('非微信不支持人脸识别'));
                            _a.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            }); });
        },
        getFaceInfo: function (gotoType) {
            if (gotoType === void 0) { gotoType = 1; }
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
                            var query, data, values, err_2;
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        if (!isWeixin) return [3 /*break*/, 5];
                                        _c.label = 1;
                                    case 1:
                                        _c.trys.push([1, 3, , 4]);
                                        query = queryParse(window.location.search);
                                        return [4 /*yield*/, axios.post({
                                                url: '/services/tc-api/getDetectInfo',
                                                data: {
                                                    BizToken: query === null || query === void 0 ? void 0 : query.BizToken,
                                                },
                                            })];
                                    case 2:
                                        data = _c.sent();
                                        values = JSON.parse(data.DetectInfo);
                                        if (((_a = values === null || values === void 0 ? void 0 : values.Text) === null || _a === void 0 ? void 0 : _a.ErrCode) == 0) {
                                            setTimeout(function () {
                                                if (gotoType == 1) {
                                                    shell.goto('/pages/webview/index', true);
                                                }
                                                else if (gotoType == 2) {
                                                    shell.back();
                                                }
                                            }, 0);
                                            resolve(data);
                                        }
                                        else {
                                            setTimeout(function () {
                                                shell.back();
                                            }, 1000);
                                            reject(new Error((_b = values === null || values === void 0 ? void 0 : values.Text) === null || _b === void 0 ? void 0 : _b.ErrCode));
                                        }
                                        return [3 /*break*/, 4];
                                    case 3:
                                        err_2 = _c.sent();
                                        setTimeout(function () {
                                            shell.back();
                                        }, 1000);
                                        reject(new Error(err_2));
                                        return [3 /*break*/, 4];
                                    case 4: return [3 /*break*/, 6];
                                    case 5:
                                        reject(new Error('非微信不支持人脸识别'));
                                        _c.label = 6;
                                    case 6: return [2 /*return*/];
                                }
                            });
                        }); })];
                });
            });
        },
    };
    return shell;
});
//# sourceMappingURL=weixin.js.map