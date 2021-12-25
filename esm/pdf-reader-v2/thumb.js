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
import EventBase from '../utils/eventBase';
import { scrollToElement } from '../utils/scrollTo';
import { closestByClassName, createElement, createElementInsert, createElementTo, emptyElement, } from '../utils/tools';
var PdfThumb = /** @class */ (function (_super) {
    __extends(PdfThumb, _super);
    function PdfThumb(_options) {
        var _this = _super.call(this) || this;
        _this.thumItemViews = [];
        _this._index = -1;
        _this.container = _options.container;
        _this.source = _options.source;
        _this.width = _options.width || 110;
        _this.height = _options.height || 140;
        _this.init();
        return _this;
    }
    Object.defineProperty(PdfThumb.prototype, "index", {
        get: function () {
            return this._index;
        },
        set: function (value) {
            var _a;
            if (this._index !== value) {
                if (!this.thumItemViews[value]) {
                    return;
                }
                (_a = this.thumItemViews[this._index]) === null || _a === void 0 ? void 0 : _a.classList.remove('active');
                this.thumItemViews[value].classList.add('active');
                this._index = value;
                scrollToElement(this.thumItemViews[value], {
                    getContainer: function () {
                        return document.querySelector('.ax-pdf-thum-v2');
                    },
                });
            }
        },
        enumerable: false,
        configurable: true
    });
    PdfThumb.prototype.init = function () {
        var _this = this;
        this.thumItemViews.splice(0);
        this.container.classList.add('ax-pdf-thum-v2');
        emptyElement(this.container);
        var _loop_1 = function (i) {
            var itemView = this_1.itemGenerate(i);
            this_1.thumItemViews.push(itemView);
            this_1.container.appendChild(itemView);
            this_1.source.getThumeView(i, function (pageInfo) {
                _this.makeThumb(pageInfo).then(function (canvas) {
                    _this.addThumCanvas(canvas, i - 1);
                });
            });
        };
        var this_1 = this;
        for (var i = 1; i < this.source.pageCount + 1; i++) {
            _loop_1(i);
        }
        this.container.addEventListener('click', function (e) {
            var thumbView = closestByClassName(e.target, 'thumb-view');
            if (thumbView) {
                var index = _this.thumItemViews.findIndex(function (item) { return item === thumbView; });
                if (index > -1) {
                    _this.goIndex(index);
                }
            }
        });
    };
    /**
     * 添加缩略图
     * @param view
     */
    PdfThumb.prototype.addThumCanvas = function (view, index) {
        var thumItemView = this.thumItemViews[index];
        if (thumItemView) {
            var wrap = createElementInsert('div', thumItemView);
            wrap.appendChild(view);
        }
    };
    /**
     * 移动到指定页
     */
    PdfThumb.prototype.goIndex = function (index) {
        this.index = index;
        this.source.gotoPage(index);
    };
    /**
     * 创建单个
     * @param page 页码
     */
    PdfThumb.prototype.itemGenerate = function (page) {
        var pageView = createElement('div', 'thumb-view');
        createElementTo('div', pageView, 'page-number').textContent = "\u7B2C" + page + "\u9875";
        return pageView;
    };
    PdfThumb.prototype.makeThumb = function (pageInfo) {
        var vp = pageInfo.getViewport({
            scale: 1,
        });
        var canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        var scale = Math.min(canvas.width / vp.width, canvas.height / vp.height);
        var rotate = pageInfo.rotate;
        return pageInfo
            .render({
            canvasContext: canvas.getContext('2d'),
            viewport: pageInfo.getViewport({
                scale: scale,
                rotate: rotate,
            }),
        })
            .promise.then(function (other) {
            if (other) {
                return other;
            }
            return canvas;
        });
    };
    return PdfThumb;
}(EventBase));
export default PdfThumb;
//# sourceMappingURL=thumb.js.map