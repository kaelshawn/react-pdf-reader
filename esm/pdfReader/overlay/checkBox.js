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
import { createElement } from '../../utils/tools';
import OverlayBase from './base';
import { ENUM_OVERLAY_TYPE, ENUM_OVERLAY_STATUS } from './interface';
var CheckBox = /** @class */ (function (_super) {
    __extends(CheckBox, _super);
    function CheckBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.value = false;
        _this.checkBoxElement = null;
        return _this;
    }
    CheckBox.prototype.getValue = function () {
        return __assign(__assign({}, this.getInfo()), { value: this.value });
    };
    CheckBox.prototype.setValue = function (values) {
        this.value = !!values;
        if (this.overlayElem) {
            this.render();
        }
    };
    CheckBox.prototype.overlayElemClick = function () {
        if (this.status === ENUM_OVERLAY_STATUS.INPUT) {
            this.setValue(!this.value);
        }
        else if (this.options.onClick) {
            this.options.onClick(this);
        }
    };
    CheckBox.prototype.init = function (options, dataInfo) {
        if (dataInfo === void 0) { dataInfo = {}; }
        _super.prototype.init.call(this, __assign({ allowChangeSize: false, width: 'auto', height: 'auto' }, options), dataInfo);
        return this;
    };
    CheckBox.prototype.create = function () {
        if (_super.prototype.create.call(this)) {
            var overlayElem = this.overlayElem;
            overlayElem.classList.add('overlay-elem-checkbox');
            return true;
        }
        return false;
    };
    CheckBox.prototype.render = function () {
        var _a, _b;
        _super.prototype.render.call(this);
        var overlayElem = this.overlayElem;
        if (!this.checkBoxElement) {
            this.checkBoxElement = createElement('div', ['imgblock', 'iconfont']);
            overlayElem.appendChild(this.checkBoxElement);
        }
        if (this.status === ENUM_OVERLAY_STATUS.INPUT && !this.value) {
            this.checkBoxElement.classList.remove('icon-check');
            this.checkBoxElement.classList.add('icon-weigouxuan');
        }
        else {
            this.checkBoxElement.classList.remove('icon-weigouxuan');
            this.checkBoxElement.classList.add('icon-check');
        }
        if ((_a = this.dataInfo) === null || _a === void 0 ? void 0 : _a.fontSize) {
            this.checkBoxElement.style.fontSize = ((_b = this.dataInfo) === null || _b === void 0 ? void 0 : _b.fontSize) + "px";
        }
    };
    CheckBox.create = function (data) {
        var overlay = new CheckBox();
        var x = data.x, y = data.y, typeName = data.typeName;
        overlay.init(__assign(__assign({}, data), { type: ENUM_OVERLAY_TYPE.CHECKBOX }), __assign(__assign({}, data), { typeName: typeName }));
        return {
            typeName: typeName,
            overlay: overlay,
            pageNumber: data.page,
            dataX: x,
            dataY: y,
        };
    };
    return CheckBox;
}(OverlayBase));
export default CheckBox;
//# sourceMappingURL=checkBox.js.map