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
/**
 * paas端提供的签署接口
 */
import assert from 'assert';
import axios, { setConfig as sc } from './utils';
//停止定时刷新token
var stopRefersh = function (service) {
    if (service.__timeid) {
        clearTimeout(service.__timeid);
        delete service.__timeid;
    }
};
var getToken = function () {
    return {
        aos_token: sessionStorage.aos_token,
        aos_token_info: sessionStorage.aos_token_info,
        aos_token_datetime: sessionStorage.aos_token_datetime,
    };
};
//定时刷新token
export var startRefersh = function (service, callback) {
    var serviceDatetime;
    var value = sessionStorage.aos_token_info && JSON.parse(sessionStorage.aos_token_info);
    if (value) {
        var currentDate = sessionStorage['aos_token_datetime'] || Date.now();
        // console.warn(currentDate);
        serviceDatetime = currentDate + value.expires_in * 1000;
        // serviceDatetime = currentDate + value.expires_in;
    }
    window.onunload = function () {
        stopRefersh(service);
        delete service.__expire;
    };
    var refersh = function (expire) {
        stopRefersh(service);
        if (!value) {
            return;
        }
        //超过有效期
        if (Date.now() >= serviceDatetime) {
            if (callback) {
                callback(getToken());
            }
            return;
        }
        if (typeof expire == 'number' && expire < 900 * 1000) {
            service
                .token({
                refresh_token: value.refresh_token,
                access_token: value.access_token,
                isRefersh: true,
            })
                .then(function (e) {
                var t = 60 * 1000;
                var currentDate = Date.now();
                sessionStorage.aos_token = e.access_token;
                sessionStorage.aos_token_info = JSON.stringify(e);
                sessionStorage.aos_token_datetime = currentDate;
                serviceDatetime = currentDate + e.expires_in * 1000;
                service.__timeid = setTimeout(function () {
                    service.__expire = e.expires_in * 1000 - t;
                    refersh(service.__expire);
                }, t);
            })
                .catch(function (err) {
                if (err.code == '401') {
                    if (callback) {
                        callback(getToken());
                    }
                    return;
                }
                var t = 10 * 1000;
                service.__timeid = setTimeout(function () {
                    service.__expire = expire - t;
                    refersh(service.__expire);
                }, t);
            });
            return;
        }
        service.__timeid = setTimeout(function () {
            var expiresIn = expire || value.expires_in * 1000;
            service.__expire = expiresIn - 10 * 1000;
            refersh(service.__expire);
        }, 10 * 1000);
    };
    return refersh;
};
var Service = /** @class */ (function () {
    function Service(config) {
        sc(config);
    }
    Service.prototype.tokenCreate = function (clientToken) {
        return __awaiter(this, void 0, void 0, function () {
            var params, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = new URLSearchParams();
                        params.append('grant_type', 'aos_exchange_token');
                        params.append('scope', 'all');
                        params.append('clientToken', clientToken);
                        params.append('userInfoUrl', 'https://paasdev.isigning.cn/gateway/paas-account/public/personlRncInfo');
                        return [4 /*yield*/, axios.post({
                                url: '/paas-auth/oauth/token',
                                data: params,
                                thirdOpts: { clientId: 'paas-h5-sdk', clientSecret: '123456' },
                                ignoreErr: false,
                            })];
                    case 1:
                        res = _a.sent();
                        assert(res.code === 200, res);
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    Service.prototype.tokenRefresh = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var params, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = new URLSearchParams();
                        params.append('grant_type', 'refresh_token');
                        params.append('access_token', props.access_token);
                        params.append('refresh_token', props.refresh_token);
                        return [4 /*yield*/, axios.post({
                                url: '/paas-auth/oauth/token',
                                data: params,
                                thirdOpts: { clientId: 'paas-h5-sdk', clientSecret: '123456' },
                                ignoreErr: true,
                            })];
                    case 1:
                        res = _a.sent();
                        assert(res.code === 200, res);
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    /**
     * @deprecated 使用 tokenRefresh tokenCreate 替代
     * @param props
     * @returns
     */
    Service.prototype.token = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var params, isRefersh, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = new URLSearchParams();
                        isRefersh = props === null || props === void 0 ? void 0 : props.isRefersh;
                        params.append('grant_type', isRefersh ? 'refresh_token' : 'aos_exchange_token');
                        if (isRefersh) {
                            params.append('access_token', props === null || props === void 0 ? void 0 : props.access_token);
                            params.append('refresh_token', props === null || props === void 0 ? void 0 : props.refresh_token);
                        }
                        else {
                            params.append('scope', 'all');
                            params.append('clientToken', (props === null || props === void 0 ? void 0 : props.clientToken) || '450902199601282522');
                            params.append('userInfoUrl', 'https://paasdev.isigning.cn/gateway/paas-account/public/personlRncInfo');
                        }
                        return [4 /*yield*/, axios.post({
                                url: '/paas-auth/oauth/token',
                                data: params,
                                thirdOpts: { clientId: 'paas-h5-sdk', clientSecret: '123456' },
                                ignoreErr: isRefersh,
                            })];
                    case 1:
                        res = _a.sent();
                        assert(res.code === 200, res);
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    //下载文件
    Service.prototype.fileDownload = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, code, data, msg, fileName, fileData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, axios.get({
                            url: "/paas-standard-sdk/file/download/" + id,
                            isDownLoad: true,
                        })];
                    case 1:
                        _a = _b.sent(), code = _a.code, data = _a.data, msg = _a.msg, fileName = _a.fileName, fileData = _a.fileData;
                        assert(code === 200, msg);
                        return [2 /*return*/, {
                                fileName: fileName,
                                fileData: fileData,
                                id: id,
                            }];
                }
            });
        });
    };
    //上传文件
    Service.prototype.fileUpload = function (file, currentFileId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, code, data, msg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, axios.form({
                            url: '/paas-standard-sdk/file/upload',
                            file: file,
                        })];
                    case 1:
                        _a = _b.sent(), code = _a.code, data = _a.data, msg = _a.msg;
                        assert(code === 200, msg);
                        return [2 /*return*/, {
                                fileId: data.fileId,
                                currentFileId: currentFileId,
                            }];
                }
            });
        });
    };
    //上传笔迹-识别笔迹
    Service.prototype.handWritingUpload = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, code, data, msg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        params = JSON.parse(JSON.stringify(params));
                        delete params.__value;
                        return [4 /*yield*/, axios.post({
                                url: '/paas-standard-sdk/handwriting/upload',
                                data: params,
                            })];
                    case 1:
                        _a = _b.sent(), code = _a.code, data = _a.data, msg = _a.msg;
                        assert(code === 200, msg);
                        return [2 /*return*/, {
                                pass: data.pass,
                                handWritingId: data.id,
                                id: params.signData.id,
                            }];
                }
            });
        });
    };
    //查询印章列表
    Service.prototype.sealList = function (socialCreditCode) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, code, data, msg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, axios.post({
                            url: '/paas-standard-sdk/seal/sealList',
                            data: { socialCreditCode: socialCreditCode },
                        })];
                    case 1:
                        _a = _b.sent(), code = _a.code, data = _a.data, msg = _a.msg;
                        assert(code === 200, msg);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    //验证用章密码
    Service.prototype.sealVerifyAuth = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, code, data, msg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, axios.post({
                            url: '/paas-standard-sdk/seal/verifyAuth',
                            data: params,
                        })];
                    case 1:
                        _a = _b.sent(), code = _a.code, data = _a.data, msg = _a.msg;
                        assert(code === 200, msg);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    //验证电子印章pin码
    Service.prototype.sealVerifyPin = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, code, data, msg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, axios.post({
                            url: '/paas-standard-sdk/seal/verifyPin',
                            data: params,
                        })];
                    case 1:
                        _a = _b.sent(), code = _a.code, data = _a.data, msg = _a.msg;
                        assert(code === 200, msg);
                        return [2 /*return*/, { pass: data.success }];
                }
            });
        });
    };
    /**
     * 签署
     */
    Service.prototype.sign = function (props, thirdBizId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, code, data, msg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, axios.post({
                            url: '/paas-standard-sdk/sign/sign',
                            data: __assign(__assign({}, props), { thirdBizId: thirdBizId }),
                        })];
                    case 1:
                        _a = _b.sent(), code = _a.code, data = _a.data, msg = _a.msg;
                        assert(code === 200, msg);
                        return [2 /*return*/, {
                                signId: data.signId,
                                thirdBizId: thirdBizId,
                            }];
                }
            });
        });
    };
    /**
     * 获取签署详情
     */
    Service.prototype.getSignFileListBySignId = function (signId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, code, data, msg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, axios.get({
                            url: "/paas-standard-sdk/sign/getSignInfo/" + signId,
                        })];
                    case 1:
                        _a = _b.sent(), code = _a.code, data = _a.data, msg = _a.msg;
                        assert(code === 200, msg);
                        return [2 /*return*/, {
                                fileList: data.fileList,
                            }];
                }
            });
        });
    };
    return Service;
}());
export { Service };
export default Service;
export var EnumSealInfoType;
(function (EnumSealInfoType) {
    EnumSealInfoType[EnumSealInfoType["\u4E09\u6240"] = 1] = "\u4E09\u6240";
    EnumSealInfoType[EnumSealInfoType["AOS"] = 2] = "AOS";
})(EnumSealInfoType || (EnumSealInfoType = {}));
export var EnumSignType;
(function (EnumSignType) {
    EnumSignType[EnumSignType["\u5370\u7AE0"] = 1] = "\u5370\u7AE0";
    EnumSignType[EnumSignType["\u7B7E\u5B57"] = 2] = "\u7B7E\u5B57";
    EnumSignType[EnumSignType["\u56FE\u7247"] = 3] = "\u56FE\u7247";
    EnumSignType[EnumSignType["\u6587\u5B57"] = 4] = "\u6587\u5B57";
})(EnumSignType || (EnumSignType = {}));
export var EnumSealUseType;
(function (EnumSealUseType) {
    EnumSealUseType[EnumSealUseType["pin"] = 0] = "pin";
    EnumSealUseType[EnumSealUseType["sign"] = 1] = "sign";
    EnumSealUseType[EnumSealUseType["password"] = 2] = "password";
    EnumSealUseType[EnumSealUseType["signAndPassword"] = 3] = "signAndPassword";
})(EnumSealUseType || (EnumSealUseType = {}));
//# sourceMappingURL=paas-sign-service.js.map