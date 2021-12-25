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
import AlloyFinger from 'alloyfinger';
import { debounce } from 'lodash-es';
import Dialog from '../dialog';
import EventBase from '../utils/eventBase2';
import { scrollToElement } from '../utils/scrollTo';
import { createElementTo } from '../utils/tools';
import PdfLoader from './loader';
import OverlayManager from './overlay-manager';
import './styles.less';
import PdfThumb from './thumb';
import { addIdProperty } from './utils';
var PdfReader = /** @class */ (function (_super) {
    __extends(PdfReader, _super);
    function PdfReader(props) {
        var _this = _super.call(this) || this;
        _this.pdfDatas = [];
        _this.pageCount = 0;
        /**
         * 从1开始
         */
        _this.pageIndex = 1;
        _this.status = 'INPUT';
        _this.mode = 'PC';
        _this.isScrolling = false;
        _this.dialog = new Dialog();
        _this.originScale = 1;
        _this.pdfStatus = 'NORMAL';
        _this.container = props.container;
        _this.props = props;
        _this.status = props.status || _this.status;
        _this.mode = props.mode || _this.mode;
        _this.setPdfDatas(props.dataSource || []);
        _this.renderPart = createElementTo('div', _this.container, 'ax-pdf-reader');
        _this.initLoader(props.loaderFactory);
        _this.overlayManager = new OverlayManager({
            pdfReader: _this,
        });
        if (props.thuembContainer !== false) {
            if (props.thuembContainer === true) {
                _this.thuembContainer = createElementTo('div', _this.renderPart, 'ax-pdf-thum-default');
            }
            else {
                _this.thuembContainer = props.thuembContainer;
            }
        }
        if (_this.mode === 'MOBILE') {
            var pdfScale_1;
            new AlloyFinger(_this.container, {
                pinch: function (e) {
                    var zoom = (e.zoom - 1) / 2;
                    _this.loader.setScale(pdfScale_1 * (1 + zoom));
                },
                multipointStart: function () {
                    pdfScale_1 = _this.loader.scale;
                },
                doubleTap: function () {
                    _this.loader.setScale(_this.originScale);
                },
            });
        }
        _this.renderPart.addEventListener('click', function (e) {
            var targetElement = e.target;
            if (targetElement.classList.contains('aos-position-layer')) {
                var canvasWrapper = targetElement.parentElement;
                var pageIndex = +canvasWrapper.parentElement.getAttribute('data-page-number');
                _this.emit('onSelectPosition', {
                    position: {
                        left: e.offsetX,
                        top: e.offsetY,
                        page: pageIndex,
                        pageHeight: targetElement.clientHeight,
                    },
                });
            }
        });
        return _this;
    }
    /**
     * @param pageIndex 下标应该从0开始
     */
    PdfReader.prototype.gotoPage = function (pageIndex, offset) {
        var _this = this;
        if (offset === void 0) { offset = 0; }
        this.isScrolling = true;
        var pageElement = this.container.querySelectorAll('.page')[pageIndex];
        scrollToElement(pageElement, {
            offset: offset,
            getContainer: function () {
                return _this.loader.scrollView;
            },
            callback: function () {
                _this.isScrolling = false;
                _this.emit('onGotoPageComplete', {
                    pageIndex: pageIndex,
                });
            },
        });
    };
    PdfReader.prototype.setPdfDatas = function (values) {
        this.pdfDatas = values.map(function (f) {
            var _a, _b;
            f.seal = (_a = f.seal) === null || _a === void 0 ? void 0 : _a.map(addIdProperty);
            f.sign = (_b = f.sign) === null || _b === void 0 ? void 0 : _b.map(addIdProperty);
            return addIdProperty(f);
        });
        return this;
    };
    /**
     *开启或关闭选择位置的功能
     */
    PdfReader.prototype.switchPosition = function (flag) {
        if (flag) {
            this.pdfStatus = 'POSITION';
        }
        else {
            this.pdfStatus = 'NORMAL';
        }
        this.positionLayer();
    };
    PdfReader.prototype.positionLayer = function () {
        var _this = this;
        var allLayer = document.querySelectorAll('.canvasWrapper');
        var scale = this.loader.scale;
        allLayer.forEach(function (layer) {
            var positionLayer = layer.querySelector('.aos-position-layer');
            if (!positionLayer && _this.pdfStatus === 'POSITION') {
                createElementTo('div', layer, ['aos-position-layer'], {
                    style: {
                        width: layer.clientWidth / scale + "px",
                        height: layer.clientHeight / scale + "px",
                        transform: "scale(" + scale + ")",
                    },
                });
            }
            else if (positionLayer && _this.pdfStatus === 'NORMAL') {
                positionLayer.remove();
            }
        });
    };
    PdfReader.prototype.pageRendered = function (page) {
        this.overlayManager.reRender(page);
    };
    PdfReader.prototype.initThumb = function (pageCount, thumbFactory) {
        var _this = this;
        var props = {
            container: this.thuembContainer,
            source: {
                pageCount: pageCount,
                gotoPage: function (pageIndex) {
                    _this.gotoPage(pageIndex);
                },
                getThumeView: function (page, cb) {
                    _this.loader.pdfDocument.getPage(page).then(cb);
                },
            },
        };
        if (thumbFactory) {
            this.thumb = thumbFactory(props);
        }
        else {
            this.thumb = new PdfThumb(props);
        }
    };
    PdfReader.prototype.initLoader = function (loaderFactory) {
        var _this = this;
        var loaderProps = {
            renderPart: this.renderPart,
            container: this.container,
            pdfReader: this,
        };
        if (loaderFactory) {
            this.loader = loaderFactory(loaderProps);
        }
        else {
            this.loader = new PdfLoader(loaderProps);
        }
        this.loader.addListener('onPdfSwitchBefore', function () {
            _this.dialog.loading({
                info: '加载中',
            });
        });
        this.loader.addListener('onPdfSwitchSuccess', function () {
            _this.pageIndex = 1;
        });
        this.loader.addListener('onPdfSwitchComplete', function () {
            _this.dialog.close();
        });
        this.loader.addListener('onPdfPageInit', function (_a) {
            var pagesCount = _a.pagesCount, scale = _a.scale;
            _this.originScale = scale;
            _this.pageCount = pagesCount;
            if (_this.thuembContainer) {
                _this.initThumb(pagesCount, _this.props.thumbFactory);
            }
        });
        this.loader.addListener('onPdfPageLoad', function () {
            if (_this.thumb && !_this.isScrolling) {
                _this.thumb.index = 0;
            }
            _this.loader.scrollView.scrollTop = 0;
        });
        this.loader.addListener('onPdfPageChange', function () {
            _this.positionLayer();
        });
        this.loader.addListener('onPdfPageChange', debounce(function (_a) {
            var page = _a.page;
            _this.pageIndex = page + 1;
            _this.positionLayer();
            if (_this.thumb && !_this.isScrolling) {
                _this.thumb.index = page;
            }
        }, 300));
        this.loader.addListener('onPdfRendered', function (_a) {
            var page = _a.page;
            _this.overlayManager.reRender(page);
        });
    };
    return PdfReader;
}(EventBase));
export default PdfReader;
//# sourceMappingURL=main.js.map