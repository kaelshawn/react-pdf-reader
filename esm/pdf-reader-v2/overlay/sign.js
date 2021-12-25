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
var Sign = /** @class */ (function (_super) {
    __extends(Sign, _super);
    function Sign(props) {
        var _this = _super.call(this, __assign(__assign({}, Sign.defaultValue), props)) || this;
        _this.minWidth = 120;
        _this.minHeight = 60;
        return _this;
    }
    Sign.prototype.createContent = function () {
        _super.prototype.createContent.call(this);
        if (this.element) {
            this.element.classList.add('overlay-elem-img');
            this.placeholderView = createElementTo('div', this.element, [
                'imgblock',
                'iconfont',
                'icon-ziyuan',
            ]);
            this.placeholderView.textContent = '签字位';
        }
    };
    Sign.prototype.setValue = function (value) {
        _super.prototype.setValue.call(this, __assign({}, value));
    };
    Sign.prototype.getValue = function () {
        var value = _super.prototype.getValue.call(this);
        if (!value || !this.value) {
            return null;
        }
        return __assign(__assign({}, value), { deviceInfo: this.value.deviceInfo, fgpInfo: this.value.fgpInfo, color: this.value.color, id: this.id, points: this.value.points, boardWidth: this.value.boardWidth, boardHeight: this.value.boardHeight, fake_pressure: this.value.fake_pressure, fakePressure: this.value.fake_pressure, handWrittings: this.value.points, height: this.height, width: this.width, thickness: this.value.thickness, sourceH: this.value.boardHeight, sourceW: this.value.boardWidth, signPlateW: this.value.boardWidth, signPlateH: this.value.boardHeight, pMin: 0, pMax: 1, __value: this.value });
    };
    Sign.defaultValue = __assign(__assign({}, ImgBlock.defaultValue), { width: 120, height: 60 });
    return Sign;
}(ImgBlock));
export default Sign;
//# sourceMappingURL=sign.js.map