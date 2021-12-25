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
import Cropper from 'cropperjs';
import { createElement, fileToBase64 } from '../utils/tools';
import Slider from '../slider';
var SLIDER_KEY_HOLLOW = 'SLIDER_KEY_HOLLOW';
var SLIDER_KEY_AUGMENT_RED = 'SLIDER_KEY_AUGMENT_RED';
var ImgEditor = /** @class */ (function () {
    function ImgEditor() {
        /**
         * 镂空用的控制器
         */
        this.slider = {};
    }
    Object.defineProperty(ImgEditor.prototype, "previewImgView", {
        get: function () {
            if (!this._previewImgView) {
                this._previewImgView = this.previewBox.querySelector('img');
            }
            return this._previewImgView;
        },
        enumerable: false,
        configurable: true
    });
    ImgEditor.prototype.init = function (options) {
        var cropperOptions = options.cropperOptions, params = __rest(options, ["cropperOptions"]);
        this.options = __assign({ accept: 'image/*', isHollow: false, isAugment: false, isChoose: true }, params);
        this.options.cropperOptions = __assign(__assign({ aspectRatio: 1, guides: true, autoCropArea: 1, movable: true, zoomable: true, rotatable: true }, cropperOptions), { preview: '.preview-box' });
        this.options.container.classList.add('aos-img-editor');
        this.create();
        return this;
    };
    ImgEditor.prototype.create = function () {
        this.pavedArea = createElement('div', 'paved');
        var dragBox = createElement('div', 'drag-box');
        this.tailoringImg = createElement('img', 'tailoring-img');
        dragBox.appendChild(this.tailoringImg);
        this.pavedArea.appendChild(dragBox);
        this.options.container.appendChild(this.pavedArea);
        // 构建右侧工具栏
        this.toolBox = createElement('div', 'tools-box');
        this.previewBox = createElement('div', 'preview-box');
        this.toolBox.appendChild(this.previewBox);
        this.options.container.appendChild(this.toolBox);
        if (this.options.isHollow) {
            this.createHandlerSlider({ txt: '镂空', key: SLIDER_KEY_HOLLOW });
        }
        if (this.options.isAugment) {
            this.createHandlerSlider({ txt: '红色增强', key: SLIDER_KEY_AUGMENT_RED });
        }
        if (this.options.isChoose) {
            this.createImgSelector();
        }
    };
    ImgEditor.prototype.createImgSelector = function () {
        var _this = this;
        var chooseButton = createElement('label', [
            'aos-button',
            'primary',
            'choose-button',
            'small',
        ]);
        chooseButton.textContent = '选取图片';
        chooseButton.htmlFor = 'imgEditorInputFile';
        this.toolBox.appendChild(chooseButton);
        var file = createElement('input', 'input-file', {
            type: 'file',
            id: 'imgEditorInputFile',
        });
        file.accept = this.options.accept;
        file.addEventListener('change', function (e) {
            var _a;
            _this.load((_a = e.target) === null || _a === void 0 ? void 0 : _a.files[0]);
            file.value = '';
        });
        this.toolBox.appendChild(file);
        this.chooseLayer = createElement('label', 'choose-layer', { for: 'imgEditorInputFile' });
        this.pavedArea.appendChild(this.chooseLayer);
        var chooseTag = createElement('div', ['choose-tag', 'iconfont', 'icon-jia']);
        this.chooseLayer.appendChild(chooseTag);
    };
    /**
     * 图片加载成功后
     */
    ImgEditor.prototype.imgLoadEnd = function () {
        if (this.chooseLayer) {
            this.chooseLayer.classList.add('aos-hide');
        }
    };
    ImgEditor.prototype.createCropper = function () {
        this.cropper = new Cropper(this.tailoringImg, this.options.cropperOptions);
        this.cropper.reset();
    };
    /**
     * 创建滑块操作区
     */
    ImgEditor.prototype.createHandlerSlider = function (_a) {
        var _this = this;
        var txt = _a.txt, key = _a.key;
        var hollowBox = createElement('div', 'hollow-box');
        var label = createElement('label');
        label.textContent = txt;
        hollowBox.appendChild(label);
        var sliderBox = createElement('div', 'slider');
        hollowBox.appendChild(sliderBox);
        this.toolBox.appendChild(hollowBox);
        this.slider[key] = new Slider().init({
            disabled: true,
            container: sliderBox,
            onChange: function () {
                _this.adjustCutout();
            },
        });
    };
    ImgEditor.prototype.adjustCutout = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var image, hollowValue, augmentRedValue, imgUrl;
            return __generator(this, function (_c) {
                image = this.cropper.getCroppedCanvas({
                    width: 200,
                    height: 200,
                    imageSmoothingQuality: 'high',
                });
                hollowValue = 255 - ((_a = this.slider[SLIDER_KEY_HOLLOW]) === null || _a === void 0 ? void 0 : _a.value) * 2 || 255;
                augmentRedValue = ((_b = this.slider[SLIDER_KEY_AUGMENT_RED]) === null || _b === void 0 ? void 0 : _b.value) * 4 || 0;
                imgUrl = this.cutout(image, hollowValue, augmentRedValue);
                this.previewImgView.style.transform = '';
                this.previewImgView.style.width = '200px';
                this.previewImgView.style.height = '200px';
                this.previewImgView.setAttribute('src', imgUrl);
                return [2 /*return*/];
            });
        });
    };
    /**
     * 获取编辑结果
     * @param param0
     */
    ImgEditor.prototype.getEditResult = function (_a) {
        var width = _a.width, height = _a.height;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_b) {
                if (!this.cropper) {
                    return [2 /*return*/, null];
                }
                this._cutCanvas = undefined;
                return [2 /*return*/, new Promise(function (resolve) {
                        var _a, _b;
                        var image = _this.cropper.getCroppedCanvas({
                            width: width,
                            height: height,
                            imageSmoothingQuality: 'high',
                        });
                        var hollowValue = 255 - ((_a = _this.slider[SLIDER_KEY_HOLLOW]) === null || _a === void 0 ? void 0 : _a.value) * 2 || 255;
                        var augmentRedValue = ((_b = _this.slider[SLIDER_KEY_AUGMENT_RED]) === null || _b === void 0 ? void 0 : _b.value) * 4 || 0;
                        _this.cutout(image, hollowValue, augmentRedValue, function (e) {
                            _this._cutCanvas = undefined;
                            resolve(e);
                        });
                    })];
            });
        });
    };
    /**
     * 加载图片
     * @param img
     */
    ImgEditor.prototype.load = function (img) {
        return __awaiter(this, void 0, void 0, function () {
            var imgUrl, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.clear();
                        if (!(typeof img !== 'string')) return [3 /*break*/, 2];
                        return [4 /*yield*/, fileToBase64(img)];
                    case 1:
                        imgUrl = (_a.sent());
                        return [3 /*break*/, 3];
                    case 2:
                        imgUrl = img;
                        _a.label = 3;
                    case 3:
                        for (key in this.slider) {
                            this.slider[key].setValue(0).setDisabled(false);
                        }
                        this.tailoringImg.src = imgUrl;
                        this.createCropper();
                        this.imgLoadEnd();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 清空数据
     */
    ImgEditor.prototype.clear = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var key;
            return __generator(this, function (_b) {
                this.tailoringImg.src = '';
                this._previewImgView = undefined;
                (_a = this.cropper) === null || _a === void 0 ? void 0 : _a.destroy();
                if (this.chooseLayer) {
                    this.chooseLayer.classList.remove('aos-hide');
                }
                for (key in this.slider) {
                    this.slider[key].setValue(0).setDisabled(true);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param img 图片数据
     * @param value 抠图阈值
     * @param repairReadValue 补强红色
     */
    ImgEditor.prototype.cutout = function (img, value, repairReadValue, toBlobCallBack) {
        if (!this._cutCanvas) {
            this._cutCanvas = createElement('canvas', '', img);
        }
        var ctx = this._cutCanvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        var imageData = ctx.getImageData(0, 0, img.width, img.height);
        var data = imageData.data;
        filter(data, value, repairReadValue);
        ctx.putImageData(imageData, 0, 0);
        if (toBlobCallBack) {
            this._cutCanvas.toBlob(toBlobCallBack);
            return '';
        }
        return this._cutCanvas.toDataURL();
    };
    return ImgEditor;
}());
export default ImgEditor;
function filter(data, value, repairReadValue) {
    for (var i = 0; i < data.length; i += 4) {
        var r = data[i];
        var g = data[i + 1];
        var b = data[i + 2];
        if ([r, g, b].every(function (v) { return v < 256 && v > value; })) {
            data[i + 3] = 0;
        }
        else if ((r + repairReadValue) / 2 > g && (r + repairReadValue) / 2 > b) {
            data[i] = 255;
            data[i + 1] = 0;
            data[i + 2] = 0;
        }
    }
}
//# sourceMappingURL=main.js.map