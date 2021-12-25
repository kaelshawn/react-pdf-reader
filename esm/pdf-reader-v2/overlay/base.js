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
import EventBase from '../../utils/eventBase2';
import { createElement } from '../../utils/tools';
import { getXY } from '../utils';
import { VariableMove } from './variable-move';
import { VariableSize } from './variable-size';
var OverlayBase = /** @class */ (function (_super) {
    __extends(OverlayBase, _super);
    function OverlayBase(_a) {
        var isFree = _a.isFree, props = __rest(_a, ["isFree"]);
        var _this = _super.call(this) || this;
        _this.x = 0;
        _this.y = 0;
        _this.width = 0;
        _this.height = 0;
        _this.required = false;
        _this.isFocus = false;
        _this.minWidth = 100;
        _this.minHeight = 100;
        _this._isFree = false;
        _this.isVariableSize = true;
        _this.isVariableMove = true;
        _this.isEmpty = true;
        _this.page = -1;
        _this.origin = 'LEFT_TOP';
        _this._isFree = isFree || false;
        factory(_this, props);
        return _this;
    }
    Object.defineProperty(OverlayBase.prototype, "isFree", {
        get: function () {
            return this._isFree;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OverlayBase.prototype, "elementLeft", {
        get: function () {
            if (this.origin === 'CENTER') {
                return this.x - this.width / 2 + 'px';
            }
            return this.x + 'px';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OverlayBase.prototype, "elementTop", {
        get: function () {
            if (this.origin === 'CENTER') {
                return this.y - this.height / 2 + 'px';
            }
            else if (this.origin === 'LEFT_BOTTOM') {
                var overlayLayer = this.pdfReader.overlayManager.getOverlayLayer(this.page);
                if (!overlayLayer) {
                    return 0;
                }
                return overlayLayer.clientHeight - this.y - this.height + 'px';
            }
            return this.y + 'px';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OverlayBase.prototype, "elementWidth", {
        get: function () {
            return this.width + 'px';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OverlayBase.prototype, "elementHeight", {
        get: function () {
            return this.height + 'px';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OverlayBase.prototype, "elementId", {
        get: function () {
            return "overlay_" + this.id;
        },
        enumerable: false,
        configurable: true
    });
    OverlayBase.prototype.saveInfo = function (value) {
        var position = this.pdfReader.overlayManager.positionSelector.getById(this.id);
        if (position) {
            Object.assign(position, value);
            this.x = position.x;
            this.y = position.y;
            this.width = position.width || this.width;
            this.height = position.height || this.height;
            console.log(this.width);
        }
    };
    OverlayBase.prototype.render = function () {
        var _a, _b;
        var overlayLayer = this.pdfReader.overlayManager.getOverlayLayer(this.page);
        if (!overlayLayer) {
            return;
        }
        this.create();
        if (!overlayLayer.querySelector('#' + this.elementId)) {
            overlayLayer.appendChild(this.element);
        }
        if (this.isFocus) {
            (_a = this.element) === null || _a === void 0 ? void 0 : _a.classList.add('focus');
        }
        else {
            (_b = this.element) === null || _b === void 0 ? void 0 : _b.classList.remove('focus');
        }
        if (this.isFree || this.pdfReader.status === 'EDIT') {
            this.initVariableSize();
            this.initVariableMove();
        }
    };
    OverlayBase.prototype.create = function () {
        var _this = this;
        if (!this.element) {
            this.element = createElement('div', 'overlay-elem', {
                id: this.elementId,
                style: {
                    width: this.elementWidth,
                    height: this.elementHeight,
                    left: this.elementLeft,
                    top: this.elementTop,
                },
            });
            this.element.addEventListener('click', function () {
                _this.emit('onClick', {
                    id: _this.id,
                    type: _this.type,
                });
            });
            this.createContent();
        }
    };
    OverlayBase.prototype.remove = function () {
        var _a;
        if (this.element) {
            (_a = this.element.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(this.element);
        }
    };
    OverlayBase.prototype.setFocus = function (value) {
        if (this.isFocus !== value) {
            this.isFocus = value;
            this.render();
            return true;
        }
        return false;
    };
    OverlayBase.prototype.initVariableSize = function () {
        var _this = this;
        if (this.isVariableSize && !this.variableSize) {
            this.variableSize = new VariableSize({
                target: this.element,
                config: function () {
                    return _this.variableSizeConfig();
                },
            }).on('onSizeChanged', function (e) {
                var overlayLayer = _this.pdfReader.overlayManager.getOverlayLayer(_this.page);
                if (!overlayLayer) {
                    return 0;
                }
                var _a = getXY({
                    left: e.x,
                    top: e.y,
                    width: e.width,
                    height: e.height,
                    origin: _this.origin,
                    parentHeight: overlayLayer.clientHeight,
                }), x = _a.x, y = _a.y;
                _this.x = x;
                _this.y = y;
                _this.width = e.width;
                _this.height = e.height;
                _this.saveInfo({ x: x, y: y, height: e.height, width: e.width });
            });
        }
    };
    OverlayBase.prototype.initVariableMove = function () {
        var _this = this;
        if (this.isVariableMove && !this.variableMove) {
            this.variableMove = new VariableMove({
                target: this.element,
                config: function () {
                    return _this.variableMoveConfig();
                },
            }).on('onMoved', function (e) {
                var overlayLayer = _this.pdfReader.overlayManager.getOverlayLayer(_this.page);
                if (!overlayLayer) {
                    return 0;
                }
                var _a = getXY({
                    left: e.x,
                    top: e.y,
                    width: _this.width,
                    height: _this.height,
                    origin: _this.origin,
                    parentHeight: overlayLayer.clientHeight,
                }), x = _a.x, y = _a.y;
                _this.x = x;
                _this.y = y;
                _this.saveInfo({ x: x, y: y });
            });
        }
    };
    OverlayBase.prototype.variableSizeConfig = function () {
        var _a = this.pdfReader.loader.getPageView(this.page) || {
            div: createElement('div'),
            scale: 1,
        }, div = _a.div, scale = _a.scale;
        var res = {
            scale: scale,
            minWidth: this.minWidth,
            minHeight: this.minHeight,
            maxTop: div.clientHeight / scale,
            maxLeft: div.clientWidth / scale,
            isEqualRatio: false,
        };
        return res;
    };
    OverlayBase.prototype.variableMoveConfig = function () {
        var scale = (this.pdfReader.loader.getPageView(this.page) || { scale: 1 }).scale;
        var res = {
            scale: scale,
        };
        return res;
    };
    OverlayBase.prototype.getValue = function () {
        if (this.isEmpty) {
            return null;
        }
        return {
            page: this.page,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
        };
    };
    return OverlayBase;
}(EventBase));
export { OverlayBase };
function factory(instance, props) {
    for (var key in props) {
        instance[key] = props[key];
    }
}
//# sourceMappingURL=base.js.map