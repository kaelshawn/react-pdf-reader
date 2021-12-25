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
import { remove } from 'lodash';
import { v4 } from 'uuid';
import EventBase from '../utils/eventBase2';
import { createElementTo, emptyElement, setStyles } from '../utils/tools';
import { OverlayPositionSelector } from './overlay-position-selector';
import { OverlayTypes } from './overlay/';
import { getLeftTop } from './utils';
var OverlayManager = /** @class */ (function (_super) {
    __extends(OverlayManager, _super);
    function OverlayManager(props) {
        var _this = _super.call(this) || this;
        _this.pdfReader = props.pdfReader;
        _this.positionSelector = new OverlayPositionSelector({
            manager: _this,
            pdfOverlayPosition: _this.pdfOverlayPosition,
        });
        _this.pdfReader.loader.addListener('onPdfPageLoad', function () {
            document.querySelectorAll('.overlay-layer').forEach(function (item) {
                emptyElement(item);
            });
            _this.pdfLoad();
        });
        return _this;
    }
    Object.defineProperty(OverlayManager.prototype, "pdfOverlayPosition", {
        /**
         * 获取全部的Overlay位置信息
         */
        get: function () {
            var _this = this;
            if (!this._pdfOverlayPosition) {
                this._pdfOverlayPosition = [];
                this.pdfReader.pdfDatas.forEach(function (data) {
                    var _a, _b;
                    (_a = data.seal) === null || _a === void 0 ? void 0 : _a.map(function (item) {
                        _this._pdfOverlayPosition.push(__assign(__assign({}, item), { name: item.name || '印章位', pdfId: data.id, id: item.id, type: 'Seal' }));
                    });
                    (_b = data.sign) === null || _b === void 0 ? void 0 : _b.map(function (item) {
                        _this._pdfOverlayPosition.push(__assign(__assign({}, item), { name: item.name || '签字位', pdfId: data.id, id: item.id, type: 'Sign' }));
                    });
                });
            }
            return this._pdfOverlayPosition;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OverlayManager.prototype, "currentPdfOverlay", {
        /**
         * 获取当前PDF的Overlay位置信息
         */
        get: function () {
            var _this = this;
            var result = this.pdfOverlayPosition.filter(function (item) { var _a; return item.pdfId === ((_a = _this.pdfReader.loader.currentPdf) === null || _a === void 0 ? void 0 : _a.id); });
            return result;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OverlayManager.prototype, "currentPdfId", {
        get: function () {
            var _a;
            return ((_a = this.pdfReader.loader.currentPdf) === null || _a === void 0 ? void 0 : _a.id) || '';
        },
        enumerable: false,
        configurable: true
    });
    OverlayManager.prototype.insert = function (props) {
        var _a;
        var position = __assign({ pdfId: ((_a = this.pdfReader.loader.currentPdf) === null || _a === void 0 ? void 0 : _a.id) || '', id: v4() }, props);
        var overlay = this.createOverlay(__assign({}, position));
        this.pdfOverlayPosition.push(__assign(__assign({}, position), { overlayView: overlay }));
        this.emit('onChange');
        return overlay;
    };
    /**
     *
     * @param page 从1开始
     * @returns
     */
    OverlayManager.prototype.getOverlayLayer = function (page) {
        var _a = this.pdfReader.loader.getPageView(page) || { scale: 0 }, div = _a.div, scale = _a.scale;
        if (!div) {
            return null;
        }
        var canvasWrapper = div.querySelector('.canvasWrapper');
        if (!canvasWrapper) {
            console.error('获取overlay-layer失败');
            return null;
        }
        var overlayLayer = canvasWrapper.querySelector('.overlay-layer');
        if (!overlayLayer) {
            overlayLayer = createElementTo('div', canvasWrapper, 'overlay-layer');
        }
        setStyles(overlayLayer, {
            width: canvasWrapper.clientWidth / scale + "px",
            height: canvasWrapper.clientHeight / scale + "px",
            transform: "scale(" + scale + ")",
        });
        return overlayLayer;
    };
    /**
     * 如果必填内容没完成将抛出异常 no-input
     * 如果非必填，并且未填的组件将不会被返回
     * @returns
     */
    OverlayManager.prototype.getValues = function () {
        var reuls = this.pdfOverlayPosition
            .map(function (item) {
            var _a;
            var value = ((_a = item.overlayView) === null || _a === void 0 ? void 0 : _a.getValue()) || null;
            if (item.required && !value) {
                var err = new Error('no-input');
                err.detail = __assign({}, item);
                throw err;
            }
            if (!value) {
                return false;
            }
            return {
                id: item.id,
                pdfId: item.pdfId,
                type: item.type,
                value: value,
            };
        })
            .filter(function (item) { return Boolean(item); });
        return reuls;
    };
    OverlayManager.prototype.clear = function (props) {
        var _this = this;
        remove(this._pdfOverlayPosition || [], function (item) {
            if (!props) {
                return true;
            }
            if (props.pdfIndex !== undefined) {
                if (item.pdfId === _this.pdfReader.pdfDatas[props.pdfIndex].id) {
                    return true;
                }
            }
            else if (item.id === props.overlayId) {
                return true;
            }
            return false;
        }).forEach(function (p) {
            if (p.overlayView) {
                p.overlayView.remove();
            }
        });
        this.emit('onChange');
    };
    OverlayManager.prototype.reRender = function (page) {
        this.currentPdfOverlay
            .filter(function (item) { return item.page === page && item.overlayView; })
            .forEach(function (item) {
            item.overlayView.render();
        });
    };
    /**
     * 将pdf定位到指定的组件位置
     * @param overlay
     */
    OverlayManager.prototype.goto = function (overlay) {
        var _this = this;
        var _a;
        var exec = function (time) {
            var overlayLayer = _this.pdfReader.overlayManager.getOverlayLayer(_this.pdfReader.pageIndex);
            if (!overlayLayer) {
                return;
            }
            var top = getLeftTop(__assign(__assign(__assign({}, OverlayTypes[overlay.type].defaultValue), { parentHeight: overlayLayer.clientHeight }), overlay)).top;
            setTimeout(function () {
                _this.pdfReader.once('onGotoPageComplete', function () {
                    _this.positionSelector.setFocus(overlay.id);
                });
                _this.pdfReader.gotoPage(overlay.page - 1, top);
            }, time);
        };
        if (overlay.pdfId !== ((_a = this.pdfReader.loader.currentPdf) === null || _a === void 0 ? void 0 : _a.id)) {
            this.pdfReader.loader.once('onPdfPageLoad', exec.bind(this, 700));
            this.pdfReader.loader.switchById(overlay.pdfId);
        }
        else {
            exec(0);
        }
    };
    OverlayManager.prototype.createOverlay = function (props) {
        var _this = this;
        var overlay = new OverlayTypes[props.type](__assign({ pdfReader: this.pdfReader }, props));
        overlay.addListener('onClick', function (e) {
            var position = _this.positionSelector.getById(props.id);
            if (!position) {
                throw new Error('未能找到组件配置信息');
            }
            if (e.type === 'Sign') {
                _this.emit('onSignClick', {
                    target: overlay,
                    position: position,
                });
            }
            else if (e.type === 'Seal') {
                _this.emit('onSealClick', {
                    target: overlay,
                    position: position,
                });
            }
        });
        overlay.addListener('onValueChange', function () {
            _this.emit('onChange');
        });
        overlay.render();
        return overlay;
    };
    OverlayManager.prototype.pdfLoad = function () {
        var _this = this;
        this.currentPdfOverlay.forEach(function (o) {
            if (!o.overlayView) {
                o.overlayView = _this.createOverlay(o);
            }
        });
        this.reRender(1);
    };
    return OverlayManager;
}(EventBase));
export default OverlayManager;
//# sourceMappingURL=overlay-manager.js.map