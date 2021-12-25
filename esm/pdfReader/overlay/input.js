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
import OverlayBase from './base';
import { ENUM_OVERLAY_TYPE } from './interface';
var Input = /** @class */ (function (_super) {
    __extends(Input, _super);
    function Input() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.value = '';
        return _this;
    }
    Input.prototype.init = function (options, dataInfo) {
        if (dataInfo === void 0) { dataInfo = {}; }
        _super.prototype.init.call(this, __assign({ allowChangeSize: true, width: 180, height: 30, minWidth: 180, minHeight: 30 }, options), __assign({ lineHeight: 28, reminder: '请输入', color: '#000000', fontSize: 14, autoSize: {
                fixedWidth: false,
            } }, dataInfo));
        return this;
    };
    Object.defineProperty(Input.prototype, "height", {
        /**
         *漂浮元素显示高度
         */
        get: function () {
            var _a;
            if ((_a = this.overlayElem) === null || _a === void 0 ? void 0 : _a.clientHeight) {
                return this.overlayElem.clientHeight + 2;
            }
            return this._height;
        },
        set: function (value) {
            this._height = value;
            this.emit('onChange');
        },
        enumerable: false,
        configurable: true
    });
    Input.prototype.create = function () {
        var _this = this;
        if (_super.prototype.create.call(this)) {
            var overlayElem = this.overlayElem;
            overlayElem.classList.add('overlay-elem-input');
            this.textElem = document.createElement('div');
            this.textElem.className = 'overlay-input-text';
            overlayElem.appendChild(this.textElem);
            if (this.status === 'INPUT') {
                this.textAreaElem = document.createElement('textarea');
                overlayElem.appendChild(this.textAreaElem);
                this.textAreaElem.addEventListener('blur', function () {
                    _this.textAreaOnblur();
                });
                this.textAreaElem.addEventListener('input', function (e) {
                    _this.textAreaInput(e);
                });
            }
            return true;
        }
        return false;
    };
    Input.prototype.render = function () {
        _super.prototype.render.call(this);
        var overlayElem = this.overlayElem;
        overlayElem.style.lineHeight = this.dataInfo.lineHeight + "px";
        overlayElem.style.minHeight = this.minHeight + "px";
        overlayElem.style.minWidth = this.minWidth + "px";
        var color = this.dataInfo.color || '#000000';
        var placeholder = this.dataInfo.reminder;
        var textContent = this.value || placeholder;
        var fontSize = this.dataInfo.fontSize + "px";
        overlayElem.style.fontSize = fontSize;
        if (this.status === 'INPUT') {
            overlayElem.style.height = 'auto';
            overlayElem.style.width = 'auto';
            this.textElem.textContent = textContent;
            this.textAreaElem.value = this.value;
            this.textAreaElem.placeholder = placeholder;
            this.textAreaElem.style.lineHeight = this.dataInfo.lineHeight + "px";
            this.textAreaElem.style.fontSize = fontSize;
            this.textAreaElem.style.color = color;
            this.textElem.style.fontSize = fontSize;
            this.textElem.style.color = color;
            if (this.dataInfo.autoSize) {
                if (this.dataInfo.fixedWidth) {
                    overlayElem.style.width = this.width + "px";
                    this.textElem.style.wordBreak = 'break-all';
                    this.textElem.style.whiteSpace = 'break-spaces';
                }
                else {
                    overlayElem.style.minWidth = this.width + "px";
                }
            }
            else {
                overlayElem.style.width = this.width + "px";
            }
        }
        else {
            this.textElem.textContent = textContent;
            this.textElem.style.color = color;
        }
    };
    Input.prototype.textAreaOnblur = function () {
        this.overlayElem.classList.remove('input');
        if (!this.value) {
            this.textElem.textContent = this.dataInfo.reminder;
        }
    };
    Input.prototype.textAreaInput = function (e) {
        this.value = e.target.value;
        var _a = this.measure(this.value), width = _a.width, height = _a.height;
        this.width = width;
        this.height = height;
    };
    Input.prototype.overlayElemClick = function () {
        if (this.status === 'INPUT') {
            this.overlayElem.classList.add('input');
            this.textAreaElem.focus();
        }
        else if (this.options.onClick) {
            this.options.onClick(this);
        }
    };
    Input.prototype.measure = function (text) {
        var _this = this;
        this.textElem.textContent = '';
        text.split(/\n/).forEach(function (item) {
            var p = document.createElement('p');
            p.textContent = item;
            if (!item) {
                p.textContent = 'empty';
                p.style.opacity = '0';
            }
            _this.textElem.appendChild(p);
        });
        var result = {
            width: Math.max(this.textElem.offsetWidth, this.width),
            height: Math.max(this.textElem.offsetHeight, this.height),
        };
        return result;
    };
    Input.prototype.setValue = function (values) {
        this.value = values.text;
        if (this.overlayElem) {
            this.render();
        }
    };
    Input.prototype.getValue = function () {
        return __assign(__assign({}, this.getInfo()), { value: this.value });
    };
    Input.create = function (data) {
        var overlay = new Input().init(__assign(__assign({}, data), { type: ENUM_OVERLAY_TYPE.INPUT }), __assign(__assign({}, data), { typeName: 'text' }));
        return {
            typeName: 'text',
            overlay: overlay,
            pageNumber: data.page,
            dataX: data.x,
            dataY: data.y,
        };
    };
    return Input;
}(OverlayBase));
export default Input;
//# sourceMappingURL=input.js.map