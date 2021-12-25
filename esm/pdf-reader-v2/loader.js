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
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';
import * as pdfjsLib from 'pdfjs-dist/es5/build/pdf.js';
import * as pdfjsViewer from 'pdfjs-dist/es5/web/pdf_viewer';
import EventBase from '../utils/eventBase2';
import { createElementTo } from '../utils/tools';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
var MAX_IMAGE_SIZE = -1;
var CMAP_PACKED = true;
var USE_ONLY_CSS_ZOOM = true;
var TEXT_LAYER_MODE = 0;
var PdfLoader = /** @class */ (function (_super) {
    __extends(PdfLoader, _super);
    function PdfLoader(props) {
        var _this = _super.call(this) || this;
        _this.switchIndex = -1;
        _this.index = -1;
        _this.pagesCount = 0;
        _this._scale = 1;
        _this.pdfReader = props.pdfReader;
        _this.container = props.container;
        _this.renderPart = props.renderPart;
        _this.viewer = createElementTo('div', _this.renderPart, 'ax-pdf-view');
        _this.init();
        return _this;
    }
    Object.defineProperty(PdfLoader.prototype, "scale", {
        get: function () {
            return this._scale;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfLoader.prototype, "currentPdf", {
        get: function () {
            if (this.index === -1) {
                return null;
            }
            return this.pdfReader.pdfDatas[this.index];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfLoader.prototype, "currentIndex", {
        get: function () {
            return this.index;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfLoader.prototype, "scrollView", {
        get: function () {
            return document.querySelector('.ax-pdf-view');
        },
        enumerable: false,
        configurable: true
    });
    PdfLoader.prototype.init = function () {
        var _this = this;
        createElementTo('div', this.viewer);
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
            _this.pagesInit(e);
        });
        this.eventBus.on('pagesloaded', function (e) {
            _this.pagesLoaded(e);
        });
        this.eventBus.on('pagechanging', function (_a) {
            var pageNumber = _a.pageNumber;
            _this.emit('onPdfPageChange', {
                page: pageNumber - 1,
            });
        }, true);
        this.eventBus.on('pagerendered', function (_a) {
            var pageNumber = _a.pageNumber, source = _a.source;
            _this.emit('onPdfRendered', {
                page: pageNumber,
            });
        }, true);
    };
    PdfLoader.prototype.pagesInit = function (_a) {
        var source = _a.source;
        this.pdfViewer.currentScaleValue = 'auto';
        var scale = this.pdfViewer.getPageView(0).viewport.scale;
        this._scale = scale;
        this.emit('onPdfPageInit', {
            pagesCount: source.pagesCount,
            scale: scale,
        });
    };
    PdfLoader.prototype.pagesLoaded = function (_a) {
        var pagesCount = _a.pagesCount;
        this.pagesCount = pagesCount;
        this.emit('onPdfPageLoad', {
            pagesCount: pagesCount,
        });
    };
    PdfLoader.prototype.load = function (pdf) {
        var _this = this;
        this.emit('onPdfSwitchBefore', {
            index: this.index,
        });
        pdfjsLib
            .getDocument({
            url: pdf,
            maxImageSize: MAX_IMAGE_SIZE,
            cMapPacked: CMAP_PACKED,
        })
            .promise.then(function (pdfDocument) {
            _this.pdfDocument = pdfDocument;
            _this.linkService.setDocument(pdfDocument);
            _this.pdfViewer.setDocument(pdfDocument);
            _this.pdfHistory.initialize({ fingerprint: pdfDocument.fingerprint });
            _this.index = _this.switchIndex;
            _this.emit('onPdfSwitchSuccess', {
                target: _this.pdfReader,
                id: _this.pdfReader.pdfDatas[_this.index].id,
                index: _this.index,
            });
            _this.emit('onPdfSwitchComplete', undefined);
        })
            .catch(function (err) {
            _this.emit('onPdfSwitchFail', err);
            _this.emit('onPdfSwitchComplete', undefined);
        });
    };
    /**
     * 获取指定的页的信息
     * @param page 从1开始
     */
    PdfLoader.prototype.getPageView = function (page) {
        var _a = this.pdfViewer.getPageView(page - 1) || {}, div = _a.div, viewport = _a.viewport;
        if (!div) {
            return null;
        }
        return {
            div: div,
            scale: viewport.scale,
        };
    };
    PdfLoader.prototype.switchById = function (id) {
        if (!this.pdfReader.pdfDatas) {
            return false;
        }
        var index = this.pdfReader.pdfDatas.findIndex(function (item) { return item.id === id; });
        if (index === -1) {
            return false;
        }
        return this.switchByIndex(index);
    };
    PdfLoader.prototype.switchByIndex = function (index, force) {
        var _this = this;
        if (force === void 0) { force = false; }
        if (this.switchIndex === index && !force) {
            return;
        }
        this.switchIndex = index;
        var data = this.pdfReader.pdfDatas[index];
        if (!data) {
            return false;
        }
        if (typeof data.value === 'function') {
            data.value().then(function (str) {
                _this.load(str);
            });
        }
        else {
            this.load(data.value);
        }
    };
    PdfLoader.prototype.setScale = function (scale) {
        var scaleOffset = scale - this.pdfViewer.currentScaleValue;
        var left = (this.viewer.clientWidth * scaleOffset) / 4;
        var top = (this.viewer.clientHeight * scaleOffset) / 4;
        this.viewer.scrollTop = this.viewer.scrollTop + top;
        this.viewer.scrollLeft = this.viewer.scrollLeft + left;
        this.pdfViewer.currentScaleValue = scale;
        return {
            scrollTop: this.container.scrollTop,
            scrollLeft: this.container.scrollLeft,
            scale: scale,
        };
    };
    return PdfLoader;
}(EventBase));
export default PdfLoader;
//# sourceMappingURL=loader.js.map