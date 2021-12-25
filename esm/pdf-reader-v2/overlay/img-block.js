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
import { createElementTo } from '../../utils/tools';
import { OverlayBase } from './base';
var ImgBlock = /** @class */ (function (_super) {
    __extends(ImgBlock, _super);
    function ImgBlock(props) {
        var _this = _super.call(this, __assign(__assign({}, ImgBlock.defaultValue), props)) || this;
        _this._url = '';
        return _this;
    }
    Object.defineProperty(ImgBlock.prototype, "url", {
        get: function () {
            return this._url;
        },
        set: function (value) {
            this._url = value;
            this.render();
        },
        enumerable: false,
        configurable: true
    });
    ImgBlock.prototype.setValue = function (value) {
        var _a;
        this.isEmpty = false;
        this.url = value.url;
        this.value = value;
        if (this.imgView) {
            this.imgView.src = this.url;
            this.imgView.classList.remove('aos-hide');
        }
        (_a = this.placeholderView) === null || _a === void 0 ? void 0 : _a.classList.add('aos-hide');
        this.emit('onValueChange');
    };
    ImgBlock.prototype.createContent = function () {
        if (this.element) {
            this.imgView = createElementTo('img', this.element, ['aos-hide']);
        }
    };
    ImgBlock.prototype.getValue = function () {
        var value = _super.prototype.getValue.call(this);
        if (!value) {
            return null;
        }
        return __assign(__assign(__assign({}, value), this.value), { url: this.url });
    };
    ImgBlock.defaultValue = {
        origin: 'LEFT_BOTTOM',
    };
    return ImgBlock;
}(OverlayBase));
export default ImgBlock;
//# sourceMappingURL=img-block.js.map