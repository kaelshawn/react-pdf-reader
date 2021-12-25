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
import assert from 'assert';
import path from 'path';
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
import ECB from 'crypto-js/mode-ecb';
import Pkcs7 from 'crypto-js/pad-pkcs7';
import axios from './utils';
import UserService from './userService';
var normalizeValue = function (item, type) {
    var commonParams = {
        format: item.format || '',
        name: item.name,
        width: item.width,
        height: item.height,
        x: item.x,
        y: item.pdfHeight ? item.pdfHeight - item.y - item.height : item.y,
        page: item.page || 1,
        relateSignDateTimeIds: item.relateSignDateTimeIds || [],
        signatoriesUuid: item.signatoriesUuid,
        signed: false,
        required: item.required || false,
    };
    if (type == 'seal' || type == 'sign') {
        return __assign(__assign({}, commonParams), { displayDate: item.displayDate || 0, flag: item.flag || 0, format: item.format || '', mode: item.mode || 0, id: item.id || Date.now().toString(32) });
    }
    if (type === 'field') {
        return __assign(__assign({}, commonParams), { fieldId: item.id || Date.now().toString(32), font: item.font || '', fontSize: item.fontSize || 12, type: item.typeName, showName: item.showName || false });
    }
    return null;
};
var _SignService = /** @class */ (function () {
    function _SignService() {
        this.url = '';
    }
    _SignService.prototype.insertFileUrl = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var contractDescribe, contractName, endTime, signatories, depId, metadata, carbonCopys, templateFilesName, widgetParams, paths, _a, code, data, msg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        contractDescribe = (params === null || params === void 0 ? void 0 : params.contractDescribe) != undefined ? params.contractDescribe : 'demo';
                        contractName = params.contractName || 'demo';
                        endTime = (params === null || params === void 0 ? void 0 : params.endTime) || '2022-10-01 20:30:11';
                        signatories = (params === null || params === void 0 ? void 0 : params.signatories) || [
                            {
                                businessId: UserService.userInfo.loginVo.businessId,
                                telephone: UserService.userInfo.loginVo.userId,
                            },
                        ];
                        depId = (params === null || params === void 0 ? void 0 : params.depId) || '';
                        metadata = JSON.stringify((params === null || params === void 0 ? void 0 : params.metadata) || {});
                        carbonCopys = (params === null || params === void 0 ? void 0 : params.carbonCopys) || [];
                        templateFilesName = [];
                        widgetParams = [];
                        paths = ((params === null || params === void 0 ? void 0 : params.files) || []).map(function (_a) {
                            var url = _a.url, _b = _a.config, config = _b === void 0 ? { fields: [], seal: [], sign: [] } : _b;
                            var fileName = url ? path.basename(url) : '';
                            templateFilesName.push(fileName);
                            widgetParams.push({
                                templateFilesName: fileName,
                                sign: config.sign
                                    .map(function (item) {
                                    return normalizeValue(item, 'sign');
                                })
                                    .filter(function (item) { return !!item; }),
                                seal: config.seal
                                    .map(function (item) {
                                    return normalizeValue(item, 'seal');
                                })
                                    .filter(function (item) { return !!item; }),
                                fields: config.fields
                                    .map(function (item) {
                                    return normalizeValue(item, 'field');
                                })
                                    .filter(function (item) { return !!item; }),
                            });
                            return url;
                        });
                        return [4 /*yield*/, axios.post({
                                url: '/saas/proxy/contract/no/template/insert/fileUrl',
                                data: {
                                    carbonCopys: carbonCopys,
                                    config: {
                                        addCarbonCopy: true,
                                        freeSign: true,
                                        halfwayStop: true,
                                        position: false,
                                        transferSign: true,
                                        queue: true,
                                    },
                                    contractDescribe: contractDescribe,
                                    contractName: contractName,
                                    depId: depId,
                                    endTime: endTime,
                                    paths: paths,
                                    metadata: metadata,
                                    signatories: signatories,
                                    templateFilesName: templateFilesName,
                                    widgetParams: widgetParams,
                                },
                            })];
                    case 1:
                        _a = _b.sent(), code = _a.code, data = _a.data, msg = _a.msg;
                        assert(code === '200', msg);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    _SignService.prototype.signatories = function (_a) {
        var contractNum = _a.contractNum;
        return __awaiter(this, void 0, void 0, function () {
            var _b, code, data, msg;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, axios.get({
                            url: "/saas/proxy/contract/query/signatories/" + contractNum,
                        })];
                    case 1:
                        _b = _c.sent(), code = _b.code, data = _b.data, msg = _b.msg;
                        assert(code === '200', msg);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    _SignService.prototype.contractQuery = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, code, data, msg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, axios.get({
                            url: '/saas/contract/query',
                            data: __assign({ pageNum: 1, pageSize: 999, state: 0 }, params),
                        })];
                    case 1:
                        _a = _b.sent(), code = _a.code, data = _a.data, msg = _a.msg;
                        assert(code === '200', msg);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    _SignService.prototype.certificateUnGet = function (contractNum) {
        return __awaiter(this, void 0, void 0, function () {
            var result, downloadLink;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.get({
                            url: "/saas/contract/get/certificate/un/" + contractNum + ".pdf",
                            isFile: true,
                        })];
                    case 1:
                        result = _a.sent();
                        assert(result instanceof Blob, '文件下载出错');
                        downloadLink = document.createElement('a');
                        downloadLink.href = URL.createObjectURL(result);
                        downloadLink.target = '_blank';
                        downloadLink.click();
                        return [2 /*return*/];
                }
            });
        });
    };
    _SignService.prototype.contractDetail = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, code, data, msg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, axios.get({
                            url: "/saas/contract/get/" + id,
                        })];
                    case 1:
                        _a = _b.sent(), code = _a.code, data = _a.data, msg = _a.msg;
                        assert(code === '200', msg);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    _SignService.prototype.downloadPDF = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, code, data, msg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, axios.get({
                            url: "/saas/file/download/" + id,
                        })];
                    case 1:
                        _a = _b.sent(), code = _a.code, data = _a.data, msg = _a.msg;
                        assert(code === '200', msg);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    _SignService.prototype.contractSign = function (id, body) {
        return __awaiter(this, void 0, void 0, function () {
            var key, json, encrypted, _a, code, msg, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        key = UserService.cryptoKey;
                        assert(key, '请先登录，确保正常调用');
                        json = JSON.stringify(body);
                        encrypted = AES.encrypt(Utf8.parse(json), Utf8.parse(key), {
                            mode: ECB,
                            padding: Pkcs7,
                        });
                        return [4 /*yield*/, axios.post({
                                url: "/saas/contract/sign/" + id,
                                data: {
                                    id: id,
                                    body: encrypted.toString(),
                                    origin: json,
                                    key: key,
                                },
                            })];
                    case 1:
                        _a = _b.sent(), code = _a.code, msg = _a.msg, data = _a.data;
                        assert(code === '200', msg);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    _SignService.prototype.querySignCollect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, code, data, msg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, axios.get({
                            url: '/saas/proxy/verification/querySignCollect',
                        })];
                    case 1:
                        _a = _b.sent(), code = _a.code, data = _a.data, msg = _a.msg;
                        assert(code === '200', msg);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    _SignService.prototype.getSignData = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, code, data, msg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, axios.post({
                            url: '/get_data',
                            data: { id: id },
                        })];
                    case 1:
                        _a = _b.sent(), code = _a.code, data = _a.data, msg = _a.msg;
                        assert(code == '200', msg);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    _SignService.prototype.getSignDataList = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, code, data, msg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, axios.post({
                            url: '/get_data_list',
                            data: { user_id: user_id },
                        })];
                    case 1:
                        _a = _b.sent(), code = _a.code, data = _a.data, msg = _a.msg;
                        assert(code == '200', msg);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    // 检查是否签字留样
    _SignService.prototype.queryCollectSignInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, code, data, msg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, axios.get({
                            url: '/user/user/queryCollectSignInfo',
                        })];
                    case 1:
                        _a = _b.sent(), code = _a.code, data = _a.data, msg = _a.msg;
                        assert(code == '200', msg);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    // 上传签字数据 适用于采集
    _SignService.prototype.collectSignInfo = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, code, data, msg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, axios.post({
                            url: '/user/user/collectSignInfo',
                            data: params,
                        })];
                    case 1:
                        _a = _b.sent(), code = _a.code, data = _a.data, msg = _a.msg;
                        assert(code == '200', msg);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    // 签字留样
    _SignService.prototype.userUploadSign = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, code, data, msg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, axios.post({
                            url: '/user/user/userUploadSign',
                            data: params,
                        })];
                    case 1:
                        _a = _b.sent(), code = _a.code, data = _a.data, msg = _a.msg;
                        assert(code == '200', msg);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    // 签字识别
    _SignService.prototype.verificationDiscern = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, code, data, msg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, axios.post({
                            url: '/saas/proxy/verification/app/discern',
                            data: params,
                        })];
                    case 1:
                        _a = _b.sent(), code = _a.code, data = _a.data, msg = _a.msg;
                        assert(code == '200', msg);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 发起并签署
     */
    _SignService.prototype.launchAndSign = function (contractInfo, signInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var launchRes, res, details_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.insertFileUrl(contractInfo)];
                    case 1:
                        launchRes = _a.sent();
                        if (!launchRes) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.contractDetail(launchRes.contractNum)];
                    case 2:
                        details_1 = _a.sent();
                        signInfo.sign.signContents.forEach(function (signContent, index) {
                            signContent.uploadFileId = details_1.signFiles[index].uploadFileId;
                            signContent.currentFileId = details_1.signFiles[index].currentFileId;
                            signContent.templateFileId = details_1.signFiles[index].templateFileId;
                        });
                        return [4 /*yield*/, this.contractSign(launchRes.contractNum, signInfo)];
                    case 3:
                        res = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, res];
                }
            });
        });
    };
    return _SignService;
}());
export { _SignService };
export default new _SignService();
//# sourceMappingURL=signService.js.map