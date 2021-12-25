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
import { Message } from '../';
import Dialog from '../dialog';
import PostMessage from '../utils/post-message';
import { createElement } from '../utils/tools';
import weixin from '../utils/weixin';
import ProjectEvent from './event';
import TokenHelper from './token';
var classNames = {
    'aox-iframe': {
        h5: 'aox-h5-iframe',
        pc: 'aox-h5-iframe',
    },
};
var SignProjectHelper = /** @class */ (function () {
    function SignProjectHelper(_a) {
        var mode = _a.mode, rest = __rest(_a, ["mode"]);
        this.apiConfig = rest;
        this.mode = mode;
        this.dialog = new Dialog();
        this.message = new Message();
        this.token = new TokenHelper(rest);
        this.event = new ProjectEvent();
    }
    Object.defineProperty(SignProjectHelper.prototype, "hasIframe", {
        get: function () {
            return !!this.iframe;
        },
        enumerable: false,
        configurable: true
    });
    SignProjectHelper.prototype.getUrl = function (htmlName) {
        var url;
        if (this.apiConfig.remoteService) {
            url = this.apiConfig.remoteServiceUrl + "/" + htmlName + ".html";
        }
        else {
            url = "./" + htmlName + ".html";
        }
        return url;
    };
    SignProjectHelper.prototype.openUrl = function (url) {
        this.crateIframe();
        this.iframe.src = url;
    };
    SignProjectHelper.prototype.crateIframe = function () {
        var _this = this;
        if (!this.iframe) {
            this.iframe = createElement('iframe', classNames['aox-iframe'][this.mode], {
                frameborder: 'no',
                border: 0,
                scrolling: 'no',
                allowtransparency: 'yes',
            });
            document.body.appendChild(this.iframe);
            this.postMessage = new PostMessage(this.iframe.contentWindow);
            this.postMessage.message('closeMe', function () {
                _this.closeIframe();
            });
        }
    };
    SignProjectHelper.prototype.closeIframe = function () {
        if (this.iframe) {
            document.body.removeChild(this.iframe);
            this.event.emit('onCloseFrame');
        }
        this.iframe = undefined;
    };
    SignProjectHelper.prototype.startSign = function (_a) {
        var _this = this;
        var face = _a.face, onSignBefore = _a.onSignBefore, onSubmitBefore = _a.onSubmitBefore, props = __rest(_a, ["face", "onSignBefore", "onSubmitBefore"]);
        if (this.hasIframe) {
            return;
        }
        if (!sessionStorage.aos_token) {
            alert('请先设置Token后继续签字');
            return;
        }
        if (!props.signType) {
            props.signType = 'TOUCH';
        }
        this.crateIframe();
        this.postMessage.message('ready', function () {
            var _a;
            if (_this.apiConfig.remoteService) {
                (_a = _this.postMessage) === null || _a === void 0 ? void 0 : _a.send('setToken', _this.token.value);
            }
            _this.postMessage.send('signData', __assign(__assign({}, props), { onSubmitBefore: !!onSubmitBefore, apiConfig: _this.apiConfig }));
        })
            .message('onSignLoadComplete', function () {
            if (face) {
                var wx = weixin();
                wx.gotoFaceAuth(face).catch(function (err) {
                    _this.message.show({ type: 'error', message: err.message });
                    _this.closeIframe();
                });
            }
            _this.event.emit('onSignLoadComplete');
        })
            .message('invalidate-token', function () {
            _this.event.emit('onTokenInvalidate');
        })
            .message('onSignBefore', function (positionId) { return __awaiter(_this, void 0, void 0, function () {
            var value;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!onSignBefore) return [3 /*break*/, 2];
                        return [4 /*yield*/, onSignBefore(positionId)];
                    case 1:
                        value = _c.sent();
                        (_a = this.postMessage) === null || _a === void 0 ? void 0 : _a.send('onSignBeforeCallback', value);
                        return [3 /*break*/, 3];
                    case 2:
                        (_b = this.postMessage) === null || _b === void 0 ? void 0 : _b.send('onSignBeforeCallback');
                        _c.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); })
            .message('onSignComplete', function () {
            _this.event.emit('onSignComplete');
        })
            .message('onSignStart', function () {
            _this.event.emit('onSignStart');
        })
            .message('onSubmitSuccess', function (res) {
            _this.event.emit('onSubmitSuccess', res);
        })
            .message('onSubmitBefore', function (e) { return __awaiter(_this, void 0, void 0, function () {
            var value;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!onSubmitBefore) return [3 /*break*/, 2];
                        return [4 /*yield*/, onSubmitBefore(e)];
                    case 1:
                        value = _b.sent();
                        (_a = this.postMessage) === null || _a === void 0 ? void 0 : _a.send('submitBefore', value);
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        this.openUrl(this.getUrl('sign'));
    };
    SignProjectHelper.prototype.startView = function (signId) {
        var _this = this;
        if (this.hasIframe) {
            return;
        }
        if (!sessionStorage.aos_token) {
            alert('请先设置Token后继续签字');
            return;
        }
        this.crateIframe();
        this.openUrl(this.getUrl('view'));
        this.postMessage.message('ready', function () {
            var _a;
            if (_this.apiConfig.remoteService) {
                _this.postMessage.send('setToken', _this.token.value);
            }
            (_a = _this.postMessage) === null || _a === void 0 ? void 0 : _a.send('viewInfo', {
                signId: signId,
                apiConfig: _this.apiConfig,
            });
        });
        // this.postMessage!.message('invalidate-token', e => {
        //   if (viewInfo.onInvalidateToken) {
        //     viewInfo.onInvalidateToken(e);
        //   }
        // });
    };
    SignProjectHelper.prototype.externalSign = function (value) {
        var _a;
        (_a = this.postMessage) === null || _a === void 0 ? void 0 : _a.send('onExternalSignSetValue', value);
    };
    SignProjectHelper.prototype.startSubmit = function (value) {
        var _a;
        (_a = this.postMessage) === null || _a === void 0 ? void 0 : _a.send('startSubmit', value);
    };
    return SignProjectHelper;
}());
export { SignProjectHelper };
//# sourceMappingURL=index.js.map