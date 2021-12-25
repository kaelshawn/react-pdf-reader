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
var DateInput = /** @class */ (function (_super) {
    __extends(DateInput, _super);
    function DateInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.value = '';
        return _this;
    }
    DateInput.prototype.getValue = function () {
        return __assign(__assign({}, this.getInfo()), { type: 'sign-datetime', value: this.value });
    };
    DateInput.prototype.setValue = function (values) {
        this.value = values;
        if (this.overlayElem) {
            this.render();
        }
    };
    DateInput.prototype.overlayElemClick = function () {
        if (this.options.onClick) {
            this.options.onClick(this);
        }
    };
    DateInput.prototype.init = function (options, dataInfo) {
        if (dataInfo === void 0) { dataInfo = {}; }
        _super.prototype.init.call(this, __assign({ allowChangeSize: false, width: 180, height: 30 }, options), __assign({ lineHeight: (dataInfo === null || dataInfo === void 0 ? void 0 : dataInfo.height) || 28, color: '#000000', fontSize: 14 }, dataInfo));
        return this;
    };
    DateInput.prototype.create = function () {
        if (_super.prototype.create.call(this)) {
            var overlayElem = this.overlayElem;
            overlayElem.classList.add('overlay-elem-input');
            this.textElem = document.createElement('div');
            this.textElem.className = 'overlay-input-text';
            overlayElem.appendChild(this.textElem);
            return true;
        }
        return false;
    };
    DateInput.prototype.render = function () {
        _super.prototype.render.call(this);
        var textContent = this.value || this.dataInfo.reminder || this.dataInfo.name;
        var color = this.dataInfo.color || '#000000';
        this.textElem.textContent = textContent;
        this.textElem.style.color = color;
        this.overlayElem.style.lineHeight = this.dataInfo.lineHeight + "px";
    };
    DateInput.create = function (data) {
        var overlay = new DateInput().init(__assign(__assign({}, data), { type: ENUM_OVERLAY_TYPE.INPUT }), __assign(__assign({}, data), { typeName: 'dateinput' }));
        return {
            typeName: 'dateinput',
            overlay: overlay,
            pageNumber: data.page,
            dataX: data.x,
            dataY: data.y,
        };
    };
    return DateInput;
}(OverlayBase));
export default DateInput;
//# sourceMappingURL=dateInput.js.map