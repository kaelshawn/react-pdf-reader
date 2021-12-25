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
import * as d3 from 'd3-drag';
import * as d3Sel from 'd3-selection';
import * as _ from 'lodash-es';
import { ENUM_OVERLAY_STATUS } from './overlay/interface';
import pdfUtils from './utils';
import { createElement } from '../utils/tools';
import EventBase from '../utils/eventBase';
var OverlayEditor = /** @class */ (function (_super) {
    __extends(OverlayEditor, _super);
    function OverlayEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._overlay = null;
        _this.overlayDrags = [];
        _this._freeActivedOverlay = null;
        /**
         * 所有的组件
         */
        _this.overlaies = [];
        _this.status = ENUM_OVERLAY_STATUS.EDITING;
        /**
         * 被选中的组件
         */
        _this.overlaySelected = [];
        _this.onChange = null;
        return _this;
    }
    Object.defineProperty(OverlayEditor.prototype, "freeActivedOverlay", {
        get: function () {
            return this._freeActivedOverlay;
        },
        set: function (value) {
            if (this._freeActivedOverlay !== value) {
                if (this._freeActivedOverlay) {
                    this._freeActivedOverlay.isActivedFree = false;
                }
                this._freeActivedOverlay = value;
                this.emit('onFreeActivedOverlayChange', value);
            }
        },
        enumerable: false,
        configurable: true
    });
    OverlayEditor.prototype.emitChange = function () {
        if (this.options.onChange) {
            this.options.onChange();
        }
    };
    Object.defineProperty(OverlayEditor.prototype, "allValues", {
        get: function () {
            var result = [];
            this.overlaies.forEach(function (element) {
                result.push(__assign(__assign({}, element.getValue()), { status: element.status }));
            });
            return result;
        },
        set: function (values) {
            var _this = this;
            if (values) {
                values.forEach(function (_a) {
                    var id = _a.id, value = _a.value, status = _a.status;
                    var overlaiy = _this.overlaies.find(function (item) { return item.id === id; });
                    if (overlaiy) {
                        if (status) {
                            overlaiy.status = status;
                        }
                        overlaiy.setValue(value);
                    }
                });
            }
            else {
                this.overlaies.forEach(function (overlaiy) {
                    overlaiy.setValue(null);
                });
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 刷新组件
     * @param value
     */
    OverlayEditor.prototype.reRender = function () {
        this.overlaies.forEach(function (overlay) {
            overlay.reRender();
        });
    };
    /**
     * 重新将组件放入pdf
     * @param pageNumber
     */
    OverlayEditor.prototype.reInsert = function (pageNumber, scale) {
        var pdfPage = this.reader.pdfViewer.getPageView(pageNumber - 1);
        var div = pdfPage.div, canvas = pdfPage.canvas;
        var canvasWrapper = div.querySelector('.canvasWrapper');
        if (!canvasWrapper) {
            return;
        }
        canvas.style.width = canvasWrapper.clientWidth + "px";
        canvas.style.height = canvasWrapper.clientHeight + "px";
        var overlayLayer = canvasWrapper.querySelector('.overlay-layer');
        if (!overlayLayer) {
            overlayLayer = createElement('div', 'overlay-layer');
            overlayLayer.style.width = canvasWrapper.clientWidth / scale + "px";
            overlayLayer.style.height = canvasWrapper.clientHeight / scale + "px";
            canvasWrapper.appendChild(overlayLayer);
        }
        overlayLayer.style.transform = "scale(" + scale + ")";
        this.overlaies
            .filter(function (item) {
            return item.pageNumber == pageNumber;
        })
            .forEach(function (item) {
            item.reInsert();
        });
    };
    OverlayEditor.prototype.init = function (options) {
        var _this = this;
        this.options = __assign({}, options);
        this.status = options.config.status;
        this.reader = this.options.reader;
        this.overlayDrags = options.overlayAdapter.getDragsConfig();
        this.overlayDrags.forEach(function (item) {
            var drag = d3.drag();
            var selection = d3Sel.select(item.el);
            drag(selection);
            drag
                .on('start', function (_a) {
                var sourceEvent = _a.sourceEvent;
                _this.reader.container.classList.add('drag-container');
                var dragOpt = _this.overlayDrags.find(function (_dragOpt) { return _dragOpt.el === sourceEvent.currentTarget; });
                _this._overlay = options.overlayAdapter.creatOverlayByType(__assign(__assign(__assign({}, _this.options.config), dragOpt), { type: item.type }));
                var view = sourceEvent.currentTarget.cloneNode(true);
                view.style.width = sourceEvent.currentTarget.clientWidth + "px";
                view.style.height = sourceEvent.currentTarget.clientHeight + "px";
                _this._overlay.dragElemRender(sourceEvent.clientX + 2, sourceEvent.clientY + 2, _this.reader.getScale(), view);
            })
                .on('drag', function (_a) {
                var _b;
                var sourceEvent = _a.sourceEvent;
                (_b = _this._overlay) === null || _b === void 0 ? void 0 : _b.dragElemSetPosition(sourceEvent.clientX + 2, sourceEvent.clientY + 2);
            })
                .on('end', function (_a) {
                var _b;
                var sourceEvent = _a.sourceEvent;
                _this.reader.container.classList.remove('drag-container');
                var eventInfo = pdfUtils.getPdfPageClickInfo(sourceEvent, _this.reader.getScale());
                if (!eventInfo) {
                    (_b = _this._overlay) === null || _b === void 0 ? void 0 : _b.directory();
                    _this._overlay = null;
                    return;
                }
                var pdfPage = _this.reader.pdfViewer.getPageView(eventInfo.pageNumber);
                _this.insert(_this._overlay, pdfPage, eventInfo);
                _this._overlay = null;
            });
        });
        return this;
    };
    /**
     * 放入一个组件
     * @param overlay
     * @param pdfPage
     * @param param2
     */
    OverlayEditor.prototype.insert = function (overlay, pdfPage, params, isFree) {
        var _this = this;
        if (isFree === void 0) { isFree = false; }
        var oldIndex = this.overlaies.findIndex(function (item) { return item.id === overlay.id; });
        if (oldIndex > -1) {
            this.overlaies.splice(oldIndex, 1);
        }
        var pageNumber = params.pageNumber, x = params.x, y = params.y, dataX = params.dataX, dataY = params.dataY;
        var success = overlay.insert({
            status: isFree ? ENUM_OVERLAY_STATUS.FREE : this.status,
            pdfPage: pdfPage,
            pdfPageNumber: pageNumber,
            dataX: dataX,
            dataY: dataY,
            x: x,
            y: y,
        });
        if (success) {
            this.overlaies.push(overlay);
            overlay.addEventListener('onActived', function (e) {
                if (e.isActivedFree) {
                    if (_this.freeActivedOverlay) {
                        _this.freeActivedOverlay.isActivedFree = false;
                    }
                    _this.freeActivedOverlay = e;
                }
                else {
                    _this.freeActivedOverlay = null;
                }
            });
        }
        if (this.options.onChange) {
            overlay.addEventListener('onChange', function () {
                _this.emitChange();
            });
            this.emitChange();
        }
        return overlay;
    };
    OverlayEditor.prototype.insertForTemplateData = function (fields, signerTag) {
        var _this = this;
        if (signerTag === void 0) { signerTag = ''; }
        this.options.overlayAdapter.insertByTemplateData(fields, signerTag).forEach(function (view) {
            var pdfPage = _this.reader.pdfViewer.getPageView(view.pageNumber - 1);
            _this.insert(view.overlay, pdfPage, {
                pageNumber: view.pageNumber - 1,
                dataX: view.dataX,
                dataY: view.dataY,
            });
        });
    };
    /**
     * 放入一个组件
     * @param type
     * @param params x,y 将会除以缩放比例
     * @param typeName 类型名称
     * @param isFree 是否为自由签署
     */
    OverlayEditor.prototype.insertByType = function (type, params, typeName, isFree) {
        if (typeName === void 0) { typeName = ''; }
        if (isFree === void 0) { isFree = false; }
        var dragOpt = this.overlayDrags.find(function (_dragOpt) { return (typeName === '' || _dragOpt.typeName === typeName) && _dragOpt.type === type; });
        var overlay = this.options.overlayAdapter.creatOverlayByType(__assign(__assign(__assign({}, this.options.config), dragOpt), { type: type }));
        var scale = this.reader.getScale();
        var pdfPage = this.reader.pdfViewer.getPageView(params.pageNumber);
        this.insert(overlay, pdfPage, {
            pageNumber: params.pageNumber,
            x: params.x / scale,
            y: params.y / scale,
        }, isFree);
        return overlay;
    };
    /**
     * 清空所有的组件
     */
    OverlayEditor.prototype.clear = function (isEmitChange) {
        if (isEmitChange === void 0) { isEmitChange = false; }
        this.overlaies.forEach(function (item) {
            item.directory();
        });
        this.overlaies.splice(0);
        if (isEmitChange) {
            this.emitChange();
        }
    };
    /**
     * 移除指定的组件
     */
    OverlayEditor.prototype.remove = function (ids) {
        this.overlaies
            .filter(function (item) { return ids.includes(item.id); })
            .forEach(function (item) {
            item.directory();
        });
        _.remove(this.overlaies, function (item) { return ids.includes(item.id); });
        this.emitChange();
    };
    /**
     * 获取所有的组件配置信息
     */
    OverlayEditor.prototype.getInfos = function () {
        return this.options.overlayAdapter.getOverlayDatas(this.overlaies);
    };
    /**
     *
     * @param widgetContent 其它对组件的配置信息
     * @returns
     */
    OverlayEditor.prototype.getValues = function (widgetContent) {
        return this.options.overlayAdapter.getValues(this.overlaies, widgetContent);
    };
    /**
     * 批量设置选中组件的配置信息
     */
    OverlayEditor.prototype.selectedSetInfo = function (values) {
        this.overlaySelected.forEach(function (item) {
            item.setInfo(values);
        });
    };
    /**
     * 选中指定区域中的组件
     * @param rect
     */
    OverlayEditor.prototype.selected = function (rect) {
        var scale = this.reader.reScale();
        var startX = rect.startX / scale;
        var startY = rect.startY / scale;
        var endX = rect.endX / scale;
        var endY = rect.endY / scale;
        this.overlaySelected = this.overlaies.filter(function (item) {
            var _a = item.getInfo(), width = _a.width, height = _a.height, page = _a.page;
            var _b = item.getInfo(), overlayStartX = _b.x, overlayStartY = _b.y;
            overlayStartX = overlayStartX * scale;
            overlayStartY = overlayStartY * scale;
            var overlayEndX = overlayStartX + width;
            var overlayEndY = overlayStartY + height;
            if (page === rect.pageNumber &&
                Math.max(startX, overlayStartX) <= Math.min(endX, overlayEndX) &&
                Math.max(startY, overlayStartY) <= Math.min(endY, overlayEndY)) {
                item.setAllowSelected(true);
                item.setSelected(true);
                return true;
            }
            item.setAllowSelected(false);
            item.setSelected(false);
            return false;
        });
    };
    /**
     * 根据传入的签署位配置获取格式完整的签署结果
     */
    OverlayEditor.prototype.getFormatValues = function (file, values) {
        return this.options.overlayAdapter.formatValues(file, values);
    };
    return OverlayEditor;
}(EventBase));
export default OverlayEditor;
//# sourceMappingURL=overlayEditor.js.map