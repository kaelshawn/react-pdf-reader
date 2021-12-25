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
import ImgBlock from './img-block';
var Seal = /** @class */ (function (_super) {
    __extends(Seal, _super);
    function Seal(props) {
        var _this = _super.call(this, __assign(__assign({}, Seal.defaultValue), props)) || this;
        _this.isVariableSize = false;
        return _this;
    }
    Seal.prototype.createContent = function () {
        _super.prototype.createContent.call(this);
        if (this.element) {
            this.element.classList.add('overlay-elem-img');
            this.placeholderView = createElementTo('div', this.element, [
                'imgblock',
                'iconfont',
                'icon-yinzhang',
            ]);
            this.placeholderView.textContent = '印章位';
        }
    };
    Seal.prototype.setValue = function (value) {
        _super.prototype.setValue.call(this, __assign({}, value));
    };
    Seal.defaultValue = __assign(__assign({}, ImgBlock.defaultValue), { width: 120, height: 120 });
    return Seal;
}(ImgBlock));
export default Seal;
//# sourceMappingURL=seal.js.map