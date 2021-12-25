var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import Button from './button';
import SignToolsBar from './main';
var SignSampleBar = /** @class */ (function (_super) {
    __extends(SignSampleBar, _super);
    function SignSampleBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SignSampleBar.prototype.init = function (options) {
        var _this = this;
        this.options = __assign({ sampleCount: 5 }, options);
        this.samples = [];
        this.stepResults = [];
        this.toolsBar = document.createElement('div');
        this.toolsBar.classList.add('aos-sample-tools-bar');
        var leftArea = document.createElement('div');
        leftArea.className = 'left-area';
        var progressArea = this.crateProgressArea();
        leftArea.appendChild(progressArea);
        var textArea = document.createElement('div');
        textArea.textContent = "\u4F60\u4E00\u5171\u9700\u8981\u8FDB\u884C" + this.options.sampleCount + "\u6B21\u7B7E\u5B57\u7559\u6837";
        textArea.className = 'tips';
        leftArea.appendChild(textArea);
        this.toolsBar.appendChild(leftArea);
        var rightArea = document.createElement('div');
        this.btnCancel = Button.create({
            text: '返回',
            cssText: 'width:120px;margin-right:10px',
            onClick: function () {
                if (_this.options.callBack) {
                    _this.options.callBack();
                }
            },
        });
        rightArea.appendChild(this.btnCancel);
        this.btnSubmit = Button.create({
            type: 'primary',
            text: this.options.sampleCount > 1 ? '下一步' : '完成',
            cssText: 'width:120px',
            attrs: {
                disabled: 'disabled',
            },
            onClick: function () {
                _this.submit();
            },
        });
        rightArea.appendChild(this.btnSubmit);
        this.toolsBar.appendChild(rightArea);
        this.signer.signView.appendChild(this.toolsBar);
        this.signer.addEventListener('onChange', function (points) {
            if (points.length) {
                _this.btnClear.textContent = '重签';
                _this.btnClear.removeAttribute('disabled');
                _this.btnSubmit.removeAttribute('disabled');
            }
            else {
                if (_this.samples.length === 0) {
                    _this.btnClear.setAttribute('disabled', 'disabled');
                }
                else {
                    _this.btnClear.textContent = '全部重签';
                }
                _this.btnSubmit.setAttribute('disabled', 'disabled');
            }
        });
        return this;
    };
    SignSampleBar.prototype.submit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, boardWidth, boardHeight, handle, params, result;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.signer.getBoardSize(), boardWidth = _a.width, boardHeight = _a.height;
                        handle = function () { return __awaiter(_this, void 0, void 0, function () {
                            var res;
                            return __generator(this, function (_a) {
                                if (this.options.submit) {
                                    res = this.options.submit({
                                        signBoard: this.signer,
                                        stepResultList: this.stepResults,
                                        boardWidth: boardWidth,
                                        boardHeight: boardHeight,
                                    });
                                    if (res) {
                                        this.clear();
                                        return [2 /*return*/, true];
                                    }
                                }
                                this.stepResults.pop();
                                this.samples.pop();
                                return [2 /*return*/, false];
                            });
                        }); };
                        params = {
                            points: this.signer.points,
                            signBoard: this.signer,
                            boardWidth: boardWidth,
                            boardHeight: boardHeight,
                            index: this.samples.length + 1,
                        };
                        if (!(this.samples.length < this.options.sampleCount)) return [3 /*break*/, 5];
                        if (!this.options.nextSubmit) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.options.nextSubmit(params)];
                    case 1:
                        result = _b.sent();
                        if (!result) {
                            return [2 /*return*/];
                        }
                        this.stepResults.push(result);
                        this.samples.push(this.signer.dataUrl());
                        this.createDots();
                        if (!(this.samples.length === this.options.sampleCount)) return [3 /*break*/, 3];
                        return [4 /*yield*/, handle()];
                    case 2:
                        if (_b.sent()) {
                            this.signer.clean();
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        if (this.samples.length === this.options.sampleCount - 1) {
                            this.btnSubmit.textContent = '完成';
                        }
                        this.signer.clean();
                        _b.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, handle()];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SignSampleBar.prototype.crateProgressArea = function () {
        var _this = this;
        var progressArea = document.createElement('div');
        progressArea.className = 'progress-area';
        this.dotsArea = document.createElement('div');
        this.dotsArea.className = 'dots-area';
        progressArea.appendChild(this.dotsArea);
        this.createDots();
        this.btnClear = Button.create({
            type: 'primary',
            text: '重签',
            size: 'small',
            onClick: function () {
                if (_this.btnClear.textContent === '重签') {
                    _this.signer.clean();
                }
                else {
                    _this.clear();
                }
            },
            attrs: {
                disabled: 'disabled',
            },
        });
        progressArea.appendChild(this.btnClear);
        return progressArea;
    };
    SignSampleBar.prototype.clear = function () {
        this.btnClear.textContent = '重签';
        this.btnSubmit.textContent = '下一步';
        this.samples.splice(0);
        this.stepResults.splice(0);
        this.btnClear.setAttribute('disabled', 'disabled');
        this.createDots();
    };
    SignSampleBar.prototype.createDots = function () {
        removeAllChild(this.dotsArea);
        for (var index = 0; index < this.options.sampleCount; index += 1) {
            var dotView = document.createElement('div');
            dotView.classList.add('dot');
            if (this.samples.length > index) {
                dotView.classList.add('active');
            }
            this.dotsArea.appendChild(dotView);
        }
        var textView = document.createElement('span');
        textView.className = 'text';
        textView.textContent = this.samples.length + "/" + this.options.sampleCount;
        this.dotsArea.appendChild(textView);
    };
    return SignSampleBar;
}(SignToolsBar));
function removeAllChild(parentNode) {
    while (parentNode.hasChildNodes()) {
        parentNode.removeChild(parentNode.firstChild);
    }
}
export default SignSampleBar;
//# sourceMappingURL=sample.js.map