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
import AlloyFinger from 'alloyfinger';
import * as pdfjsLib from 'pdfjs-dist/build/pdf.js';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';
import * as pdfjsViewer from 'pdfjs-dist/web/pdf_viewer';
import { scrollToElement } from '../utils/scrollTo';
import { createElementTo } from '../utils/tools';
import BoxSelector from './boxSelector';
import Multiple from './multiple';
import OverlayEditor from './overlayEditor';
import PdfThumb from './thumb';
import utils from './utils';
/**
 * 允许的最大图像大小
 *以总像素为单位，即宽度*高度。高于此值的图像将不会
 */
var MAX_IMAGE_SIZE = -1;
var CMAP_PACKED = true;
var USE_ONLY_CSS_ZOOM = true;
var TEXT_LAYER_MODE = 0;
var PdfReader = /** @class */ (function () {
    function PdfReader() {
        /**
         * 框选div
         */
        this.boxSelections = null;
        this.originScale = 1;
        this.lastEmptyOverlayId = '';
        this.pageCount = 0;
        this.multiple = null;
        /**
         * 点击PDF后的回调函数
         */
        this._pdfClickCallBack = null;
        /**
         * 是否正在滚动，滚动的时候不会定位pdf的选中页
         */
        this.isScrolling = false;
        /**
         * 组件编辑器
         */
        this.overlayEditor = null;
        this.loadedCallBack = null;
        this.loadedCallBackOnce = null;
        this.loadedFailCallback = null;
    }
    Object.defineProperty(PdfReader.prototype, "pdfClickCallBack", {
        get: function () {
            return this._pdfClickCallBack;
        },
        set: function (value) {
            var _a, _b;
            this._pdfClickCallBack = value;
            if (this._pdfClickCallBack) {
                (_a = this.renderPart) === null || _a === void 0 ? void 0 : _a.classList.add('wait-click');
            }
            else {
                (_b = this.renderPart) === null || _b === void 0 ? void 0 : _b.classList.remove('wait-click');
            }
        },
        enumerable: false,
        configurable: true
    });
    PdfReader.prototype.initScale = function () {
        var _this = this;
        var pdfScale;
        var tepScale;
        new AlloyFinger(this.container, {
            pinch: function (e) {
                var zoom = e.zoom - 1;
                tepScale = Math.min(Math.max(pdfScale * (1 + zoom), 0.1), 10);
                _this.setScale(tepScale);
            },
            multipointStart: function () {
                pdfScale = tepScale || _this.getScale();
            },
            doubleTap: function () {
                tepScale = pdfScale = _this.reScale();
            },
        });
    };
    PdfReader.prototype.initOverlayEditor = function () {
        if (!this.options.overlayConfig || !this.options.overlayConfig.overlayAdapter) {
            return;
        }
        this.overlayEditor = new OverlayEditor().init({
            reader: this,
            config: this.options.overlayConfig,
            onChange: this.options.overlayConfig.onChange,
            overlayAdapter: this.options.overlayConfig.overlayAdapter,
        });
    };
    PdfReader.prototype.pdfClick = function (info) {
        if (this.pdfClickCallBack) {
            this.pdfClickCallBack(info);
            this.pdfClickCallBack = null;
        }
    };
    PdfReader.prototype.initBoxSelector = function () {
        var _this = this;
        BoxSelector({
            container: this.container,
            onSelected: function (rect) {
                _this.overlayEditor.selected(rect);
            },
            onCancelSelected: function () {
                _this.overlayEditor.overlaies.forEach(function (item) {
                    if (item.isSelected) {
                        item.setSelected(false);
                    }
                });
            },
            onStart: function () {
                if (_this.pdfClickCallBack) {
                    _this.setPositionCallBack();
                    return false;
                }
                return true;
            },
        });
    };
    PdfReader.prototype.init = function (options) {
        var _this = this;
        this.options = __assign({ mode: 'MODE_PC', allowBoxSelect: true, allowGesture: true, workerSrc: pdfWorker }, options);
        if (options.loadedCallBack) {
            this.loadedCallBack = options.loadedCallBack;
        }
        if (options.loadedFailBack) {
            this.loadedFailCallback = options.loadedFailBack;
        }
        pdfjsLib.GlobalWorkerOptions.workerSrc = options.workerSrc;
        this.container = options.container;
        this.renderPart = document.createElement('div');
        this.renderPart.className = 'ax-pdf-reader';
        this.container.appendChild(this.renderPart);
        this.viewer = options.viewer || document.createElement('div');
        this.viewer.className = 'ax-pdf-view';
        this.viewer.appendChild(document.createElement('div'));
        this.viewer.addEventListener('click', function (e) {
            e.stopPropagation();
            var eventInfo = utils.getPdfPageClickInfo(e);
            if (eventInfo) {
                _this.pdfClick(eventInfo);
            }
        });
        this.renderPart.appendChild(this.viewer);
        this.eventBus = new pdfjsViewer.EventBus();
        this.linkService = new pdfjsViewer.PDFLinkService({
            eventBus: this.eventBus,
        });
        this.pdfViewer = new pdfjsViewer.PDFViewer({
            container: this.viewer,
            eventBus: this.eventBus,
            linkService: this.linkService,
            useOnlyCssZoom: USE_ONLY_CSS_ZOOM,
            textLayerMode: TEXT_LAYER_MODE,
            l10n: pdfjsViewer.NullL10n,
        });
        this.linkService.setViewer(this.pdfViewer);
        this.pdfHistory = new pdfjsViewer.PDFHistory({
            eventBus: this.eventBus,
            linkService: this.linkService,
        });
        this.linkService.setHistory(this.pdfHistory);
        this.eventBus.on('pagesinit', function (e) {
            _this.pdfViewer.currentScaleValue = 'auto';
            _this.originScale = _this.pdfViewer.currentScale;
            _this.pageCount = e.source.pagesCount;
            if (_this.options.thumOptions) {
                _this.createThumb(e);
            }
            document.querySelector('.ax-pdf-view').scrollTop = 0;
        });
        this.eventBus.on('pagesloaded', function () {
            if (_this.loadedCallBack) {
                _this.loadedCallBack({
                    scale: _this.pdfViewer.currentScale,
                    pagesCount: _this.pageCount,
                });
            }
            if (_this.loadedCallBackOnce) {
                _this.loadedCallBackOnce({
                    scale: _this.pdfViewer.currentScale,
                    pagesCount: _this.pageCount,
                });
                _this.loadedCallBackOnce = null;
            }
        });
        this.eventBus.on('pagechanging', function (evt) {
            if (_this.pdfThumb && !_this.isScrolling) {
                _this.pdfThumb.index = evt.pageNumber - 1;
            }
        }, true);
        this.eventBus.on('pagerendered', function (_a) {
            var _b;
            var pageNumber = _a.pageNumber;
            var scale = _this.pdfViewer.getPageView(0).viewport.scale;
            (_b = _this.overlayEditor) === null || _b === void 0 ? void 0 : _b.reInsert(pageNumber, scale);
        }, true);
        if (this.options.mode === 'MODE_MOBILE') {
            if (this.options.allowGesture) {
                this.initScale();
            }
        }
        else if (this.options.allowBoxSelect && this.options.overlayConfig) {
            this.initBoxSelector();
        }
        this.initOverlayEditor();
        if (this.options.thumOptions) {
            if (!this.options.thumOptions.container) {
                this.options.thumOptions.container = createElementTo('div', this.renderPart, 'ax-pdf-thum-default');
            }
        }
        if (this.options.signFiles || this.options.templateFiles) {
            this.multiple = new Multiple(this, this.options.signFiles, this.options.templateFiles);
        }
        return this;
    };
    PdfReader.prototype.createThumb = function (e) {
        var _this = this;
        this.pdfThumb = new PdfThumb(__assign(__assign({}, this.options.thumOptions), { source: {
                pageCount: e.source.pagesCount,
                gotoPage: function (pageIndex) {
                    _this.gotoPageIsSetThum(pageIndex, false);
                },
                getThumeView: function (page, cb) {
                    _this.pdfDocument.getPage(page).then(cb);
                },
            } }));
    };
    PdfReader.prototype.getCurrentPageIndex = function (targetElem) {
        var pdfPageIndex = -1;
        if (targetElem.classList.contains('canvasWrapper')) {
            pdfPageIndex = +targetElem.parentElement.getAttribute('data-page-number') - 1;
        }
        return pdfPageIndex;
    };
    PdfReader.prototype.setLoadedCallBack = function (value) {
        this.loadedCallBack = value;
    };
    /**
     * 加载PDF base64文件
     * @param pdf
     */
    PdfReader.prototype.load = function (pdf, cb, errcb) {
        var _this = this;
        var _a;
        (_a = this.overlayEditor) === null || _a === void 0 ? void 0 : _a.clear(false);
        this.loadedCallBackOnce = cb;
        pdfjsLib
            .getDocument({
            url: pdf,
            maxImageSize: MAX_IMAGE_SIZE,
            cMapPacked: CMAP_PACKED,
            cMapUrl: window.location.origin + "/pdf/cmaps/",
        })
            .promise.then(function (pdfDocument) {
            _this.pdfDocument = pdfDocument;
            _this.linkService.setDocument(pdfDocument);
            _this.pdfViewer.setDocument(pdfDocument);
            _this.pdfHistory.initialize({ fingerprint: pdfDocument.fingerprint });
        })
            .catch(function (err) {
            if (_this.loadedFailCallback) {
                _this.loadedFailCallback(err);
            }
            if (errcb) {
                errcb(err);
            }
        });
    };
    /**
     * 切换pdf
     * @param pdf
     * @param fileId
     */
    PdfReader.prototype.switchPdf = function (pdf, fileId, sign, cb, errcb) {
        if (sign === void 0) { sign = false; }
        if (this.multiple) {
            this.multiple.switch(pdf, fileId, sign, cb, errcb);
        }
        else {
            this.load(pdf, cb, errcb);
        }
    };
    PdfReader.prototype.switchTemplate = function (pdf, templateId, userTag) {
        if (this.multiple) {
            this.multiple.switchTemplate(pdf, templateId, userTag);
        }
        else {
            this.load(pdf);
        }
    };
    /**
     * 获取下一个空白组件
     * @param typeNames 组件的类型名称
     */
    PdfReader.prototype.getEmptyOverlay = function (typeNames, order, fileId) {
        var _a, _b, _c;
        var infos = (((_a = this.multiple) === null || _a === void 0 ? void 0 : _a.getFileValuesByWidgetContent(fileId)) || []).filter(function (item) {
            return !item.value &&
                (typeNames === '' || typeNames === item.typeName || typeNames.includes(item.typeName));
        });
        for (var i = 0; i < infos.length; i++) {
            if (this.lastEmptyOverlayId === '') {
                this.lastEmptyOverlayId = infos[i].id;
            }
            if (order === 'next') {
                if (((_b = infos[i - 1]) === null || _b === void 0 ? void 0 : _b.id) === this.lastEmptyOverlayId) {
                    this.lastEmptyOverlayId = infos[i].id;
                    return infos[i];
                }
            }
            else if (((_c = infos[i + 1]) === null || _c === void 0 ? void 0 : _c.id) === this.lastEmptyOverlayId) {
                this.lastEmptyOverlayId = infos[i].id;
                return infos[i];
            }
        }
        if (infos.length > 0) {
            if (order === 'next') {
                this.lastEmptyOverlayId = infos[0].id;
                return infos[0];
            }
            else {
                this.lastEmptyOverlayId = infos[infos.length - 1].id;
                return infos[infos.length - 1];
            }
        }
    };
    /**
     * 获取所有PDF中签署的内容 如果多页没有切换的将不会返回
     * @returns
     */
    PdfReader.prototype.getAllPdfValues = function (widgetContent) {
        var _a, _b;
        if (this.options.signFiles) {
            return (_a = this.multiple) === null || _a === void 0 ? void 0 : _a.getValues(true);
        }
        return [(_b = this.overlayEditor) === null || _b === void 0 ? void 0 : _b.getValues(widgetContent)];
    };
    /**
     * 通过WidgetContent获取所有的签署信息
     * @returns
     */
    PdfReader.prototype.getAllPdfValuesByWidgetContent = function () {
        var _a;
        return ((_a = this.multiple) === null || _a === void 0 ? void 0 : _a.getFileValuesByWidgetContent()) || [];
    };
    /**
     * 获取所有PDF中的组件配置信息
     */
    PdfReader.prototype.getAllPdfWidgetInfos = function () {
        var _a, _b;
        if (this.options.templateFiles) {
            return (_a = this.multiple) === null || _a === void 0 ? void 0 : _a.getWidgetInfos();
        }
        return (_b = this.overlayEditor) === null || _b === void 0 ? void 0 : _b.getInfos();
    };
    PdfReader.prototype.reSnapshot = function (snapshot) {
        if (this.multiple) {
            this.multiple.reSnapshot(snapshot);
            return;
        }
        this.overlayEditor.allValues = snapshot;
    };
    PdfReader.prototype.getSnapshot = function () {
        var _a;
        if (this.multiple) {
            return this.multiple.getSnapshot();
        }
        return (_a = this.overlayEditor) === null || _a === void 0 ? void 0 : _a.allValues;
    };
    /**
     * 设置缩放比例
     * @param scale
     */
    PdfReader.prototype.setScale = function (scale) {
        var scaleOffset = 1 + scale - this.pdfViewer.currentScaleValue;
        var left = (this.container.scrollWidth * scaleOffset - this.container.scrollWidth) / 2;
        var top = (this.container.scrollHeight * scaleOffset - this.container.scrollHeight) / 2;
        this.container.scrollTop = this.container.scrollTop + top;
        this.container.scrollLeft = this.container.scrollLeft + left;
        this.pdfViewer.currentScaleValue = scale;
        if (this.overlayEditor) {
            this.overlayEditor.reRender();
        }
        return {
            scrollTop: this.container.scrollTop,
            scrollLeft: this.container.scrollLeft,
            scale: scale,
        };
    };
    PdfReader.prototype.getScale = function () {
        var scale = this.pdfViewer.getPageView(0).viewport.scale;
        return scale;
    };
    PdfReader.prototype.reScale = function () {
        this.pdfViewer.currentScaleValue = this.originScale;
        return this.originScale;
    };
    PdfReader.prototype.getPdfPage = function () {
        var pages = this.pdfViewer.getPagesOverview();
        return { width: pages[0].width, height: pages[0].height, rotation: pages[0].rotation };
    };
    /**
     * 进入或退出可以获取位置的状态，
     * 进入状态后将在下一次点击PDF时回调cb
     * @param cb 如果为空将退出选取位置的状态，反之则进入
     */
    PdfReader.prototype.setPositionCallBack = function (cb) {
        this.pdfClickCallBack = cb || null;
    };
    PdfReader.prototype.gotoPage = function (pageIndex) {
        this.gotoPageIsSetThum(pageIndex, true);
    };
    /**
     * 滚动到指定的签署位
     * @param overlayInfo
     * @param sign 是否签署
     * @param getPdf 获取pdf的方法，用于多个文件的切换
     */
    PdfReader.prototype.scrollToOverlay = function (overlayInfo, sign, getPdf) {
        return __awaiter(this, void 0, void 0, function () {
            var scrollOverlayElemen, scrollPage, _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        scrollOverlayElemen = function () {
                            _this.isScrolling = true;
                            var overlayElemen = document.getElementById(overlayInfo.overlayElementId);
                            if (overlayElemen) {
                                _this.gotoPageIsSetThum(overlayInfo.page - 1, true, undefined, overlayElemen.offsetTop);
                            }
                        };
                        scrollPage = function () {
                            _this.gotoPageIsSetThum(overlayInfo.page - 1, true, scrollOverlayElemen);
                        };
                        if (!(this.multiple && getPdf)) return [3 /*break*/, 2];
                        _b = (_a = this.multiple).switch;
                        return [4 /*yield*/, getPdf(overlayInfo.currentFileId)];
                    case 1:
                        _b.apply(_a, [_c.sent(),
                            overlayInfo.currentFileId,
                            sign,
                            scrollPage]);
                        return [3 /*break*/, 3];
                    case 2:
                        scrollPage();
                        _c.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PdfReader.prototype.gotoPageIsSetThum = function (pageIndex, isSetThum, cb, offset) {
        var _this = this;
        if (offset === void 0) { offset = 0; }
        this.isScrolling = true;
        scrollToElement(this.container.querySelectorAll('.page')[pageIndex], {
            offset: offset,
            getContainer: function () {
                return document.querySelector('.ax-pdf-view');
            },
            callback: function () {
                if (isSetThum && _this.pdfThumb) {
                    _this.pdfThumb.index = pageIndex;
                }
                _this.isScrolling = false;
                cb && cb();
            },
        });
    };
    return PdfReader;
}());
export default PdfReader;
//# sourceMappingURL=main.js.map