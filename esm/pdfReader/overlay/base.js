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
import * as d3 from 'd3-drag';
import * as d3Sel from 'd3-selection';
import { isNumber } from 'lodash-es';
import EventBase from '../../utils/eventBase';
import { ENUM_ORIGIN_TYPE, ENUM_OVERLAY_STATUS } from './interface';
import { variableSize } from './variableSize';
var OverlayBase = /** @class */ (function (_super) {
    __extends(OverlayBase, _super);
    function OverlayBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.noAllowDrag = false;
        _this._status = ENUM_OVERLAY_STATUS.EDITING;
        /**
         * 当前签署位是否为被激活的自由签署位
         */
        _this._isActivedFree = false;
        /**
         * 是否已选中
         */
        _this.isSelected = false;
        _this.x = -1;
        _this.y = -1;
        _this._dataX = -1;
        _this._dataY = -1;
        _this._height = 100;
        _this._width = 100;
        /**
         * 未创建漂浮元素前的拖拽元素
         */
        _this.dragElem = null;
        /**
         * 漂浮元素最小宽度
         */
        _this.minWidth = 0;
        /**
         * 漂浮元素最小高度
         */
        _this.minHeight = 0;
        /**
         * 当前漂浮元素所在PDF页码
         */
        _this.pageNumber = -1;
        /**
         * 漂浮元素
         */
        _this.overlayElem = null;
        return _this;
    }
    Object.defineProperty(OverlayBase.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (value) {
            this._status = value;
            this.changeStatus();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OverlayBase.prototype, "isActivedFree", {
        get: function () {
            return this._isActivedFree;
        },
        set: function (value) {
            var _a, _b;
            if (value !== this._isActivedFree) {
                if (value) {
                    (_a = this.overlayElem) === null || _a === void 0 ? void 0 : _a.classList.add('overlay-actived');
                }
                else {
                    (_b = this.overlayElem) === null || _b === void 0 ? void 0 : _b.classList.remove('overlay-actived');
                }
                this._isActivedFree = value;
                this.emit('onActived', this);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OverlayBase.prototype, "group", {
        get: function () {
            return this.options.group;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OverlayBase.prototype, "type", {
        get: function () {
            return this.options.type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OverlayBase.prototype, "typeName", {
        get: function () {
            return this.options.typeName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OverlayBase.prototype, "width", {
        /**
         * 漂浮元素显示宽度
         */
        get: function () {
            var _a;
            return ((_a = this.overlayElem) === null || _a === void 0 ? void 0 : _a.clientWidth) || this._width;
        },
        set: function (value) {
            this._width = value;
            this.emit('onChange');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OverlayBase.prototype, "height", {
        /**
         *漂浮元素显示高度
         */
        get: function () {
            return this._height;
        },
        set: function (value) {
            this._height = value;
            this.emit('onChange');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OverlayBase.prototype, "dataX", {
        get: function () {
            return this._dataX;
        },
        set: function (value) {
            this._dataX = value;
            this.emit('onChange');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OverlayBase.prototype, "dataY", {
        get: function () {
            return this._dataY;
        },
        set: function (value) {
            this._dataY = value;
            this.emit('onChange');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OverlayBase.prototype, "dataInfo", {
        get: function () {
            return this._dataInfo;
        },
        set: function (value) {
            this._dataInfo = value;
            this.emit('onChange');
        },
        enumerable: false,
        configurable: true
    });
    OverlayBase.prototype.create = function () {
        var _this = this;
        if (!this.options.visible) {
            return false;
        }
        var div = this.pdfPage.div;
        var canvasWrapper = div.querySelector('.canvasWrapper');
        if (!canvasWrapper) {
            return false;
        }
        var layer = canvasWrapper.querySelector('.overlay-layer');
        var queryElement = layer.querySelector('#' + this.elemId);
        if (queryElement) {
            layer.removeChild(queryElement);
        }
        this.overlayElem = document.createElement('div');
        this.selecteElem = document.createElement('div');
        this.selecteElem.className = 'selecte-elem';
        this.overlayElem.appendChild(this.selecteElem);
        layer.appendChild(this.overlayElem);
        this.overlayElem.setAttribute('id', this.elemId);
        this.overlayElem.classList.add('overlay-elem');
        if (this.options.className) {
            this.overlayElem.classList.add(this.options.className);
        }
        this.changeStatus();
        this.overlayElem.addEventListener('click', function () {
            if (_this.status === ENUM_OVERLAY_STATUS.FREE) {
                _this.isActivedFree = !_this.isActivedFree;
            }
            else {
                _this.overlayElemClick();
            }
        });
        return true;
    };
    OverlayBase.prototype.changeStatus = function () {
        var _this = this;
        if (!this.pdfPage || !this.overlayElem) {
            return;
        }
        var div = this.pdfPage.div;
        if (this.status === ENUM_OVERLAY_STATUS.EDITING || this.status === ENUM_OVERLAY_STATUS.FREE) {
            this.overlayElem.classList.add('status-editing');
            if (this.options.allowChangeSize) {
                variableSize({
                    overlay: this,
                    origin: this.options.origin,
                    isEqualRatio: this.options.isEqualRatio,
                    minWidth: this.minWidth,
                    minHeight: this.minHeight,
                    getMaxTop: function () {
                        return div.clientHeight / _this.pdfPage.viewport.scale;
                    },
                    getMaxLeft: function () {
                        return div.clientWidth / _this.pdfPage.viewport.scale;
                    },
                    getScale: function () {
                        return _this.pdfPage.viewport.scale;
                    },
                    onChange: function (value) {
                        _this.width = value.width;
                        _this.height = value.height;
                        _this.x = value.x;
                        _this.y = value.y;
                        _this.render();
                    },
                });
            }
            if (this.options.allowDrag) {
                this.pressMove();
            }
            else {
                this.overlayElem.classList.add('no-drag');
            }
        }
        else if (this.status === ENUM_OVERLAY_STATUS.INPUT) {
            this.overlayElem.classList.add('status-input');
        }
    };
    OverlayBase.prototype.dataPositionRefresh = function () {
        if (!this.options.visible) {
            return;
        }
        var layerElement = this.pdfPage.div
            .querySelector('.canvasWrapper')
            .querySelector('.overlay-layer');
        var height = layerElement.clientHeight;
        var _a = this, x = _a.x, y = _a.y;
        if (this.options.origin === ENUM_ORIGIN_TYPE.CENTER) {
            x = x + this.width / 2;
            y = height - y - this.height / 2;
        }
        else if (this.options.origin === ENUM_ORIGIN_TYPE.LEFT_BOTTOM) {
            y = height - y - this.height;
        }
        this.dataX = x;
        this.dataY = y;
    };
    /**
     * 渲染漂浮物，将对位置、尺寸进行缩放
     */
    OverlayBase.prototype.render = function () {
        if (!this.options.visible) {
            return;
        }
        if (this.dataX > -1 && this.dataY > -1 && this.x === -1 && this.y === -1) {
            var layerElement = this.pdfPage.div
                .querySelector('.canvasWrapper')
                .querySelector('.overlay-layer');
            var height = layerElement.clientHeight;
            var x = this.dataX;
            var y = this.dataY;
            if (this.options.origin === ENUM_ORIGIN_TYPE.CENTER) {
                x = x - this.width / 2;
                y = height - y - this.height / 2;
            }
            else if (this.options.origin === ENUM_ORIGIN_TYPE.LEFT_BOTTOM) {
                y = height - y - this.height;
            }
            this.x = x;
            this.y = y;
        }
        this.overlayElem.style.top = this.y + "px";
        this.overlayElem.style.left = this.x + "px";
        if (isNumber(this.width)) {
            this.overlayElem.style.width = this.width + "px";
            this.overlayElem.style.height = this.height + "px";
        }
    };
    OverlayBase.prototype.pressMove = function () {
        var _this = this;
        var drag = d3.drag();
        var overlayElem = this.overlayElem;
        var selection = d3Sel.select(overlayElem);
        overlayElem.classList.add('overlay-allow-move');
        drag(selection);
        var startX; // 开始移动时点击组件的X值
        var startY; // 开始移动时点击组件的Y值
        drag
            .on('start', function (_a) {
            var x = _a.x, y = _a.y;
            var scale = _this.pdfPage.viewport.scale;
            startX = x / scale - _this.x;
            startY = y / scale - _this.y;
        })
            .on('drag', function (_a) {
            var x = _a.x, y = _a.y;
            // x y 以父级左上解为坐标系
            if (_this.noAllowDrag) {
                return;
            }
            var scale = _this.pdfPage.viewport.scale;
            _this.x = Math.min(Math.max(0, x / scale - startX), overlayElem.parentElement.clientWidth - _this.width);
            overlayElem.style.left = _this.x + "px";
            _this.y = y / scale - startY;
            _this.y = Math.min(Math.max(0, _this.y), overlayElem.parentElement.clientHeight - _this.height);
            overlayElem.style.top = _this.y + "px";
            _this.dataPositionRefresh();
        });
    };
    OverlayBase.prototype.init = function (options, dataInfo) {
        if (dataInfo === void 0) { dataInfo = {}; }
        this.dataInfo = JSON.parse(JSON.stringify(dataInfo));
        this.options = __assign({ allowDrag: true, allowChangeSize: true, isEqualRatio: false, origin: ENUM_ORIGIN_TYPE.LEFT_TOP, visible: true }, options);
        if (isNumber(this.options.width) && isNumber(this.options.height)) {
            this.width = this.options.width;
            this.height = this.options.height;
        }
        this.minWidth = this.options.minWidth;
        this.minHeight = this.options.minHeight;
        return this;
    };
    OverlayBase.prototype.reRender = function () {
        if (!this.options.visible) {
            return;
        }
        if (!this.overlayElem) {
            this.create();
        }
        this.render();
    };
    OverlayBase.prototype.reInsert = function () {
        if (!this.overlayElem) {
            this.reRender();
        }
        else {
            var div = this.pdfPage.div;
            var canvasWrapper = div.querySelector('.canvasWrapper');
            canvasWrapper.querySelector('.overlay-layer').appendChild(this.overlayElem);
        }
    };
    /**
     * 设置
     * @param value
     */
    OverlayBase.prototype.setSelected = function (value) {
        var _a, _b;
        this.isSelected = value;
        if (value) {
            (_a = this.overlayElem) === null || _a === void 0 ? void 0 : _a.classList.add('selected');
        }
        else {
            (_b = this.overlayElem) === null || _b === void 0 ? void 0 : _b.classList.remove('selected');
        }
    };
    /**
     * 设置是否允许选中
     * @param value
     */
    OverlayBase.prototype.setAllowSelected = function (value) {
        var _a, _b;
        this.isSelected = value;
        if (value) {
            (_a = this.overlayElem) === null || _a === void 0 ? void 0 : _a.classList.add('allow-selecte');
        }
        else {
            (_b = this.overlayElem) === null || _b === void 0 ? void 0 : _b.classList.remove('allow-selecte');
        }
    };
    /**
     * 拖拽物的渲染
     */
    OverlayBase.prototype.dragElemRender = function (x, y, scale, view) {
        this.dragElem = view || document.createElement('div');
        if (!view) {
            this.dragElem.style.width = this.width * scale + "px";
            this.dragElem.style.height = this.height * scale + "px";
        }
        this.dragElem.classList.add('overlay-elem-drag');
        document.body.appendChild(this.dragElem);
        this.dragElemSetPosition(x, y);
    };
    /**
     * 设置拖拽元素所在位置
     * @param x
     * @param y
     */
    OverlayBase.prototype.dragElemSetPosition = function (x, y) {
        if (this.dragElem) {
            this.dragElem.style.top = y + "px";
            this.dragElem.style.left = x + "px";
        }
    };
    /**
     * 将拖拽物插入到pdf页中，渲染漂浮物
     * @param param0
     */
    OverlayBase.prototype.insert = function (_a) {
        var _b;
        var status = _a.status, pdfPage = _a.pdfPage, pdfPageNumber = _a.pdfPageNumber, x = _a.x, y = _a.y, dataX = _a.dataX, dataY = _a.dataY;
        this.status = status;
        if (this.dragElem) {
            document.body.removeChild(this.dragElem);
            this.dragElem = null;
        }
        if (pdfPage) {
            this.pdfPage = pdfPage;
            this.pageNumber = pdfPageNumber + 1;
            if (isNumber(dataX) && isNumber(dataY)) {
                this.dataX = dataX;
                this.dataY = dataY;
            }
            else {
                this.dataY = y;
                this.y = y;
                this.dataX = x;
                this.x = x;
            }
            var layerElement = (_b = this.pdfPage.div
                .querySelector('.canvasWrapper')) === null || _b === void 0 ? void 0 : _b.querySelector('.overlay-layer');
            if (layerElement) {
                if (this.create()) {
                    this.render();
                }
                this.dataPositionRefresh();
            }
            return true;
        }
        return false;
    };
    OverlayBase.prototype.directory = function () {
        var _a;
        if (this.dragElem) {
            document.body.removeChild(this.dragElem);
            this.dragElem = null;
        }
        if (this.overlayElem) {
            (_a = this.overlayElem.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(this.overlayElem);
            this.overlayElem = null;
        }
    };
    /**
     * 设置配置信息
     */
    OverlayBase.prototype.setInfo = function (info) {
        this.dataInfo = __assign(__assign({}, this.dataInfo), info);
        if (this.overlayElem) {
            this.render();
        }
        return this;
    };
    /**
     * 获取配置信息
     */
    OverlayBase.prototype.getInfo = function () {
        var _a = this.dataInfo, visible = _a.visible, dataInfo = __rest(_a, ["visible"]);
        return __assign(__assign({}, dataInfo), { x: this.dataX, y: this.dataY, width: this.width, height: this.height, page: this.pageNumber });
    };
    Object.defineProperty(OverlayBase.prototype, "id", {
        get: function () {
            return this.dataInfo.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OverlayBase.prototype, "elemId", {
        get: function () {
            return 'overlay-elem-' + this.id;
        },
        enumerable: false,
        configurable: true
    });
    return OverlayBase;
}(EventBase));
export default OverlayBase;
//# sourceMappingURL=base.js.map