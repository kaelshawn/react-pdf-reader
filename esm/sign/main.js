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
import { ENUM_OVERLAY_STATUS, ENUM_OVERLAY_TYPE } from '../pdfReader/overlay/interface';
import PdfReader from '../pdfReader';
import SignBoard from '../signBoard';
import SignSeal from '../signSeal';
import OverlayAdapter from '../pdfReader/overlayAdapter';
import Message from '../message';
import Dialog from '../dialog';
var APPID = 11;
var BaseSign = /** @class */ (function () {
    function BaseSign(options) {
        this.seals = [];
        this.fileCurrentIndex = 0;
        this.isVerify = false;
        this.personIdentity = '';
        this.stashSignId = '';
        this.dialog = new Dialog();
        this.curPoint = null;
        this.fileUrl = '';
        this.filePathType = 'ID';
        this.apiServer = options;
        this.message = new Message();
        return this;
    }
    BaseSign.prototype.init = function (options) {
        var _this = this;
        this.options = __assign({}, options);
        this.create();
        this.fileCurrentIndex = 0;
        if (!this.options.token) {
            this.dialog.confirm({
                title: '提示',
                info: '用户信息不能为空',
                hideCancel: true,
                onOk: function () {
                    _this.options.back();
                },
            });
            return this;
        }
        this.dialog.loading({ info: '加载中' });
        this.apiServer
            .login({
            userId: this.options.token,
            appId: this.options.appId || APPID,
            loginmode: 2,
        })
            .then(function (res) {
            _this.personIdentity = res.loginBase.idnum;
            _this.user = res;
            if (_this.options.needSeal) {
                _this.apiServer
                    .getSeals()
                    .then(function (data) {
                    _this.seals = data;
                    _this.createSignSeal();
                    _this.initSignSeal();
                })
                    .catch(function (err) {
                    _this.message.show({
                        message: err.message,
                        type: 'error',
                        offset: 170,
                    });
                });
            }
            _this.loadFile();
        })
            .catch(function (err) {
            _this.message.show({
                message: err.message,
                type: 'error',
                offset: 170,
            });
        });
        return this;
    };
    BaseSign.prototype.create = function () {
        this.options.container.className = 'viewer-container';
        this.createSelectContainer();
        this.createPdfContainer();
        this.createToolBarContainer();
        this.createSignBoard();
    };
    BaseSign.prototype.createSelectContainer = function () {
        var _this = this;
        this.SelectContainer = document.createElement('div');
        this.SelectContainer.className = 'sign-select-container';
        var label = document.createElement('div');
        label.textContent = '文件列表';
        this.SelectContainerElem = document.createElement('select');
        this.SelectContainerElem.className = 'sign-select';
        this.SelectContainer.appendChild(label);
        this.SelectContainer.appendChild(this.SelectContainerElem);
        this.SelectContainerElem.addEventListener('change', function (e) {
            var target = e.target;
            var value = target.value;
            _this.switchFile(value);
        });
        this.options.container.appendChild(this.SelectContainer);
    };
    BaseSign.prototype.refreshSelect = function () {
        var _this = this;
        this.SelectContainerElem.innerHTML = '';
        var files = this.getFileList();
        if (files && files.length > 1) {
            this.showSelect(true);
            this.getFileList().forEach(function (file, index) {
                var option = document.createElement('option');
                option.setAttribute('value', "" + index);
                option.textContent = file.fileName;
                _this.SelectContainerElem.appendChild(option);
            });
        }
        else {
            this.showSelect(false);
        }
    };
    BaseSign.prototype.showSelect = function (status) {
        if (status) {
            this.SelectContainer.style.display = 'flex';
        }
        else {
            this.SelectContainer.style.display = 'none';
        }
    };
    BaseSign.prototype.getSignPoint = function () {
        var _this = this;
        this.pdfReader.setPositionCallBack(function (e) {
            _this.curPoint = e;
            _this.showSignBoard();
        });
    };
    BaseSign.prototype.getSealPoint = function () {
        var _this = this;
        if (this.seals && this.seals.length > 0) {
            this.pdfReader.setPositionCallBack(function (e) {
                _this.curPoint = e;
                _this.showSignSeal();
            });
            return;
        }
        this.freeSignEnd();
        this.message.show({
            message: '该用户暂无可用印章',
            type: 'error',
            offset: 200,
        });
    };
    BaseSign.prototype.switchFile = function (index) {
        this.fileCurrentIndex = index;
        this.dialog.loading({
            info: '加载中',
        });
        this.switchPdf();
    };
    BaseSign.prototype.submit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.dialog.loading({
                            info: '提交中',
                        });
                        try {
                            this.signContents = this.pdfReader.getAllPdfValues(null);
                        }
                        catch (error) {
                            if (error.message === 'no-sign') {
                                this.message.show({
                                    message: '请完成签署',
                                    type: 'error',
                                    offset: 200,
                                });
                                this.dialog.close();
                            }
                            return [2 /*return*/];
                        }
                        if (!this.isNeedSign()) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.apiServer.queryCollectSignInfo()];
                    case 1:
                        res = _a.sent();
                        this.dialog.close();
                        // 没有签字留样
                        if (!res) {
                            this.createSampleBoard();
                            this.showSampleBoard();
                            return [2 /*return*/];
                        }
                        this.startVerifySign();
                        return [2 /*return*/];
                    case 2:
                        this.dialog.close();
                        /**
                         * 提交签字数据
                         */
                        this.submitSign();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseSign.prototype.startVerifySign = function () {
        this.isVerify = true;
        this.showSignBoard();
    };
    /**
     * 校验印章的签字
     */
    BaseSign.prototype.verifySealSign = function (param) {
        var _this = this;
        this.dialog.loading({
            info: '提交中',
        });
        this.apiServer
            .verificationDiscern(param)
            .then(function (res) {
            var score = res.score < 0.01 ? 0.01 : res.score;
            var percent = Number(score) * 100;
            var isMe = percent >= 50;
            if (isMe) {
                _this.signContents = _this.signContents.map(function (item) {
                    item.signSeals = item.signSeals.map(function (seal) {
                        if (_this.sealNeedSign(seal.signFileParam.useType)) {
                            seal.signFileParam.stashSignId = res.stashId;
                        }
                        delete seal.signFileParam.useType;
                        return seal;
                    });
                    return item;
                });
                _this.isVerify = false;
                _this.dialog.close();
                _this.submitSign();
            }
            else {
                _this.message.show({
                    message: '签字识未通过',
                    type: 'error',
                    offset: 200,
                });
                _this.dialog.close();
            }
        })
            .catch(function (error) {
            _this.message.show({
                message: error.message,
                type: 'error',
            });
            _this.submitFail();
        });
    };
    BaseSign.prototype.isNeedSign = function () {
        var _this = this;
        var signSeal = this.signContents.find(function (sign) {
            if (sign.signSeals && sign.signSeals.length > 0) {
                return sign.signSeals.find(function (seal) { return _this.sealNeedSign(seal.signFileParam.useType); });
            }
            return null;
        });
        return !!signSeal;
    };
    BaseSign.prototype.sealNeedSign = function (useType) {
        return useType == 1 || useType == 2;
    };
    BaseSign.prototype.submitFail = function () {
        this.dialog.close();
    };
    BaseSign.prototype.createPdfContainer = function () {
        this.pdfContainer = document.createElement('div');
        this.pdfContainer.className = 'pdf-container';
        this.options.container.appendChild(this.pdfContainer);
    };
    BaseSign.prototype.createToolBarContainer = function () {
        this.toolBarContainer = document.createElement('div');
        this.toolBarContainer.className = 'toolbar-container';
        this.options.container.appendChild(this.toolBarContainer);
    };
    BaseSign.prototype.createSignBoard = function () {
        this.signBoardElem = document.createElement('div');
        this.signBoardElem.className = 'sample-sign-board';
        document.body.appendChild(this.signBoardElem);
    };
    BaseSign.prototype.createSignSeal = function () {
        this.signSealElem = document.createElement('div');
        this.signSealElem.className = 'sign-seal';
        document.body.appendChild(this.signSealElem);
    };
    BaseSign.prototype.createSampleBoard = function () {
        this.sampleBoardElem = document.createElement('div');
        this.sampleBoardElem.className = 'sample-sign-board';
        document.body.appendChild(this.sampleBoardElem);
    };
    BaseSign.prototype.loadPdf = function (fid, url) {
        if (!this.pdfReader) {
            this.buildPdfReader();
        }
        switch (this.filePathType) {
            case 'ID':
                this.loadPdfById(fid);
                break;
            case 'URL':
                this.loadPdfByUrl(fid, url);
                break;
            default:
                break;
        }
    };
    BaseSign.prototype.loadPdfByUrl = function (fid, url) {
        this.pdfReader.switchPdf(url, fid, this.canOprtate());
        this.dialog.close();
    };
    BaseSign.prototype.loadPdfById = function (fid) {
        var _this = this;
        this.apiServer
            .downloadPDF(fid)
            .then(function (base64) {
            _this.pdfReader.switchPdf("data:application/pdf;base64," + base64, fid, _this.canOprtate());
            _this.dialog.close();
        })
            .catch(function (err) {
            _this.message.show({
                message: err.message,
                type: 'error',
                offset: 200,
            });
            _this.dialog.close();
        });
    };
    BaseSign.prototype.buildPdfReader = function () {
        var _this = this;
        this.pdfReader = new PdfReader().init({
            // 多个文件时需要传入签署文件列表
            signFiles: this.getFileList(),
            container: this.pdfContainer,
            mode: 'MODE_MOBILE',
            overlayConfig: {
                drags: [],
                typeName: '',
                status: ENUM_OVERLAY_STATUS.INPUT,
                overlayAdapter: new OverlayAdapter().init({
                    sign: {
                        onClick: function (e) {
                            _this.curOverlay = e;
                            _this.showSignBoard();
                        },
                    },
                    seal: {
                        onClick: function (e) {
                            _this.curOverlay = e;
                            if (_this.seals && _this.seals.length > 0) {
                                _this.showSignSeal();
                            }
                            else {
                                _this.message.show({
                                    message: '该用户暂无可用印章',
                                    type: 'error',
                                    offset: 200,
                                });
                            }
                        },
                    },
                }),
            },
            loadedCallBack: function () {
                if (_this.canOprtate()) {
                    _this.toolBar.switchOperateStatus(true);
                }
            },
        });
    };
    BaseSign.prototype.initSignBoard = function () {
        var _this = this;
        this.signBoard = new SignBoard().init({
            fakePressure: true,
            enabled: true,
            thickness: 3,
            container: this.signBoardElem,
            toolsBar: 'SIGN_TOOLS_BAR',
            toolsBarConfig: {
                callBack: function () {
                    _this.closeSignBoard();
                },
                submit: function (e) {
                    var _a;
                    var setValue = function (o) {
                        o.setValue({
                            img: e.signBoard.dataUrl(),
                            points: e.points,
                            boardWidth: e.boardWidth,
                            boardHeight: e.boardHeight,
                            thickness: e.signBoard.thickness,
                            fakePressure: e.signBoard.fakePressure,
                        });
                    };
                    if (_this.isVerify) {
                        var param = {
                            discern: true,
                            fakePressure: true,
                            signPoints: e.points,
                        };
                        _this.verifySealSign(param);
                    }
                    else if (_this.curPoint) {
                        _this.curOverlay = _this.pdfReader.overlayEditor.insertByType(ENUM_OVERLAY_TYPE.IMG_BLOCK, _this.curPoint, 'sign');
                        setValue(_this.curOverlay);
                        _this.freeSignEnd();
                    }
                    else if (_this.curOverlay) {
                        if ((_a = _this.curOverlay) === null || _a === void 0 ? void 0 : _a.group) {
                            _this.pdfReader
                                .overlayEditor.overlaies.filter(function (o) { var _a; return o.typeName === 'sign' && o.group === ((_a = _this.curOverlay) === null || _a === void 0 ? void 0 : _a.group); })
                                .forEach(setValue);
                        }
                        else {
                            setValue(_this.curOverlay);
                        }
                    }
                    _this.closeSignBoard();
                    return false;
                },
            },
        });
    };
    BaseSign.prototype.closeSignBoard = function () {
        this.freeSignEnd();
        this.signBoardElem.style.display = 'none';
        this.signBoard.clean();
    };
    BaseSign.prototype.freeSignEnd = function () {
        if (this.toolBar)
            this.toolBar.hideSigning();
        this.curPoint = null;
    };
    BaseSign.prototype.showSampleBoard = function () {
        this.sampleBoardElem.style.display = 'flex';
        if (!this.sampleBoard) {
            this.initSampleBoard();
        }
    };
    BaseSign.prototype.initSampleBoard = function () {
        var _this = this;
        this.sampleBoard = new SignBoard().init({
            fakePressure: true,
            enabled: true,
            thickness: 3,
            container: this.sampleBoardElem,
            toolsBar: 'SING_SAMPLE_BAR',
            toolsBarConfig: {
                callBack: function () {
                    _this.sampleBoardElem.style.display = 'none';
                },
                submit: function (e) {
                    _this.sampleBoardElem.style.display = 'none';
                    _this.sampleBoard.clean();
                    var files = e.stepResultList;
                    _this.submitSampleSign(files).then(function (res) {
                        if (res && res.success) {
                            _this.startVerifySign();
                        }
                    });
                    return false;
                },
                nextSubmit: function (e) { return __awaiter(_this, void 0, void 0, function () {
                    var file;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.uploadSampleSign(e.points)];
                            case 1:
                                file = _a.sent();
                                if (file)
                                    return [2 /*return*/, file.fid];
                                return [2 /*return*/, false];
                        }
                    });
                }); },
            },
        });
    };
    BaseSign.prototype.uploadSampleSign = function (points) {
        return __awaiter(this, void 0, void 0, function () {
            var param;
            return __generator(this, function (_a) {
                param = {
                    data: points,
                };
                return [2 /*return*/, this.apiServer.collectSignInfo(param)];
            });
        });
    };
    BaseSign.prototype.submitSampleSign = function (fids) {
        return __awaiter(this, void 0, void 0, function () {
            var param;
            return __generator(this, function (_a) {
                param = {
                    fids: fids,
                };
                return [2 /*return*/, this.apiServer.userUploadSign(param)];
            });
        });
    };
    BaseSign.prototype.showSignBoard = function () {
        this.signBoardElem.style.display = 'flex';
        if (!this.signBoard) {
            this.initSignBoard();
        }
    };
    BaseSign.prototype.pinVerify = function (seal, pin, cb) {
        this.apiServer
            .pinVerify({
            pin: pin,
            sealCode: seal.sealCode,
            sealTypeCode: seal.sealTypeCode,
        })
            .then(function (res) { return cb(res); });
    };
    BaseSign.prototype.passwordVerify = function (seal, password, cb) {
        this.apiServer
            .verifyAuth({
            usePassword: password,
            authId: seal.authId,
        })
            .then(function (res) { return cb(res); });
    };
    BaseSign.prototype.closeSignSeal = function () {
        if (this.curPoint) {
            this.freeSignEnd();
        }
        this.signSealElem.style.display = 'none';
    };
    BaseSign.prototype.initSignSeal = function () {
        var _this = this;
        this.signSeal = new SignSeal().init({
            seals: this.seals,
            width: '80%',
            container: this.signSealElem,
            callBack: function () {
                _this.closeSignSeal();
            },
            pinVerify: function (seal, pin, cb) {
                _this.pinVerify(seal, pin, cb);
            },
            passwordVerify: function (seal, password, cb) {
                _this.passwordVerify(seal, password, cb);
            },
            submit: function (seal) {
                if (_this.curPoint) {
                    _this.curOverlay = _this.pdfReader.overlayEditor.insertByType(ENUM_OVERLAY_TYPE.IMG_BLOCK, _this.curPoint, 'seal');
                    _this.curOverlay.setValue({
                        img: "data:image/png;base64," + seal.sealPic,
                        sealSource: 2,
                        signFileParam: {
                            sealCode: seal.sealCode,
                            sealTypeCode: seal.sealTypeCode,
                            identityType: '111',
                            personIdentity: _this.personIdentity,
                            pin: seal.pin,
                            stashSignId: '',
                            usePassword: seal.usePassword,
                            useType: seal.useType,
                        },
                    });
                }
                _this.closeSignSeal();
            },
        });
    };
    BaseSign.prototype.showSignSeal = function () {
        this.signSealElem.style.display = 'flex';
        if (!this.signSeal) {
            this.initSignSeal();
        }
        if (this.signInfo) {
            // const file = this.signInfo.signFiles[this.fileCurrentIndex];
            // this.signSeal.showSeals(this.options.cid);
            // 按文件校验印章密码
            this.signSeal.showSeals(this.getFileId(this.fileCurrentIndex));
        }
    };
    return BaseSign;
}());
export default BaseSign;
//# sourceMappingURL=main.js.map