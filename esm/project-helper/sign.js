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
import { v4 } from 'uuid';
import { run } from '../api/async-helper';
import { EnumSealInfoType, EnumSealUseType, EnumSignType, } from '../api/paas-sign-service';
var SignUtils = /** @class */ (function () {
    function SignUtils(service) {
        this.handledIds = [];
        this.buildSubmitData = function (files) {
            var result = {
                fileInfo: files.map(function (file) {
                    return {
                        fileId: '',
                        currentFileId: file.currentFileId,
                        signInfo: [],
                    };
                }),
                thirdBizId: '',
            };
            return result;
        };
        this.service = service;
    }
    SignUtils.prototype.loadViewInfo = function (signId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.loadSignInfo(signId, [])];
            });
        });
    };
    SignUtils.prototype.loadSignInfo = function (signId, files) {
        return __awaiter(this, void 0, void 0, function () {
            var result, res;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        return [4 /*yield*/, run(function () { return __awaiter(_this, void 0, void 0, function () {
                                var signFileRes, works;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.service.getSignFileListBySignId(signId)];
                                        case 1:
                                            signFileRes = _a.sent();
                                            works = signFileRes.fileList.map(function (item) {
                                                return _this.service.fileDownload(item);
                                            });
                                            return [4 /*yield*/, Promise.all(works)];
                                        case 2: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); })];
                    case 1:
                        res = _a.sent();
                        if (res !== false) {
                            res.map(function (item, index) {
                                var currentFileId = v4();
                                var sealFile = files[index];
                                _this.handledIds[currentFileId] = item.id;
                                result.push({
                                    file: new File([item.fileData], item.fileName, { type: 'pdf' }),
                                    currentFileId: currentFileId,
                                    seal: (sealFile === null || sealFile === void 0 ? void 0 : sealFile.seal) || [],
                                    sign: (sealFile === null || sealFile === void 0 ? void 0 : sealFile.sign) || [],
                                });
                            });
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    SignUtils.prototype.buildSignSeal = function (overlayValues, submitData, signSealHandwritingId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                overlayValues
                    .filter(function (item) { return item.type === 'Seal'; })
                    .forEach(function (_a) {
                    var _b;
                    var pdfId = _a.pdfId, value = _a.value;
                    var sealValue = value;
                    var sealInfo = {
                        type: EnumSealInfoType.三所,
                        pin: sealValue.pin,
                        usePassword: sealValue.usePassword,
                        sealCode: sealValue.sealCode,
                        sealTypeCode: sealValue.sealTypeCode,
                        sealId: sealValue.sealId,
                    };
                    if (sealValue.isUseSign ||
                        sealValue.useType === EnumSealUseType.sign ||
                        sealValue.useType === EnumSealUseType.signAndPassword) {
                        if (signSealHandwritingId) {
                            sealInfo.handwritingId = signSealHandwritingId;
                        }
                        else {
                            throw { code: 'sign-seal', message: '需要进行签字调章' };
                        }
                    }
                    var subFile = (_b = submitData.fileInfo) === null || _b === void 0 ? void 0 : _b.find(function (item) { return item.currentFileId === pdfId; });
                    subFile === null || subFile === void 0 ? void 0 : subFile.signInfo.push({
                        page: sealValue.page,
                        rectangle: {
                            width: sealValue.width,
                            height: sealValue.height,
                            x: sealValue.x,
                            y: sealValue.y,
                        },
                        type: EnumSignType.印章,
                        sealInfo: sealInfo,
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    SignUtils.prototype.buildSignId = function (overlayValues, submitData) {
        return __awaiter(this, void 0, void 0, function () {
            var signInfo, handWritingUploads, handWritingResult;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        signInfo = [];
                        overlayValues
                            .filter(function (item) { return item.type === 'Sign'; })
                            .forEach(function (_a) {
                            var id = _a.id, value = _a.value;
                            var sealValue = value;
                            // 只校验没有校验通过的签字信息
                            if (!_this.handledIds[id] && sealValue) {
                                sealValue.id = id;
                                signInfo.push({
                                    distinguishFlag: false,
                                    fgpInfo: sealValue.fgpInfo,
                                    deviceInfo: sealValue.deviceInfo,
                                    signData: __assign(__assign({}, sealValue), { rectangle: {
                                            width: sealValue.width,
                                            height: sealValue.height,
                                            x: sealValue.x,
                                            y: sealValue.y,
                                        } }),
                                });
                            }
                        });
                        handWritingUploads = signInfo.map(function (item) {
                            return _this.service.handWritingUpload(item);
                        });
                        return [4 /*yield*/, Promise.all(handWritingUploads)];
                    case 1:
                        handWritingResult = _a.sent();
                        handWritingResult.forEach(function (res) {
                            _this.handledIds[res.id] = res.handWritingId;
                        });
                        overlayValues
                            .filter(function (item) { return item.type === 'Sign'; })
                            .forEach(function (_a) {
                            var id = _a.id, value = _a.value, pdfId = _a.pdfId;
                            var signValue = value;
                            if (!signValue) {
                                return;
                            }
                            var submitFileInfo = submitData.fileInfo.find(function (item) { return item.currentFileId === pdfId; });
                            if (!_this.handledIds[id]) {
                                throw __assign({ code: 'no-handwritingId', message: '签字存储失败' }, { id: id, value: value, pdfId: pdfId });
                            }
                            submitFileInfo.signInfo.push({
                                type: EnumSignType.签字,
                                page: signValue.page,
                                rectangle: {
                                    width: signValue.width,
                                    height: signValue.height,
                                    x: signValue.x,
                                    y: signValue.y,
                                },
                                handwritingInfo: {
                                    handwritingId: _this.handledIds[id],
                                },
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    SignUtils.prototype.buildFile = function (signData, submitData) {
        return __awaiter(this, void 0, void 0, function () {
            var works, uploadRes;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        works = signData.files
                            .filter(function (item) { return !_this.handledIds[item.currentFileId]; })
                            .map(function (item) {
                            return _this.service.fileUpload(item.file, item.currentFileId);
                        });
                        if (!works.length) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all(works)];
                    case 1:
                        uploadRes = _a.sent();
                        uploadRes.forEach(function (item) {
                            _this.handledIds[item.currentFileId] = item.fileId;
                        });
                        _a.label = 2;
                    case 2:
                        submitData.fileInfo.forEach(function (file) {
                            file.fileId = _this.handledIds[file.currentFileId];
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    SignUtils.prototype.checkSign = function (singValue) {
        return __awaiter(this, void 0, void 0, function () {
            var signInfo, res, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        signInfo = {
                            distinguishFlag: true,
                            deviceInfo: singValue.deviceInfo,
                            fgpInfo: singValue.fgpInfo,
                            signData: __assign({ id: '' }, singValue.signData),
                        };
                        return [4 /*yield*/, this.service.handWritingUpload(signInfo)];
                    case 1:
                        res = _a.sent();
                        result = {
                            id: '',
                            pass: false,
                        };
                        if (res) {
                            if (res.pass) {
                                result.id = res.handWritingId;
                                result.pass = true;
                            }
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return SignUtils;
}());
export default SignUtils;
//# sourceMappingURL=sign.js.map