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
import { ENUM_OVERLAY_TYPE } from './interface';
var ImgBlock = /** @class */ (function (_super) {
    __extends(ImgBlock, _super);
    function ImgBlock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.placeholder = null;
        _this.imgElement = null;
        _this.value = null;
        return _this;
    }
    ImgBlock.prototype.init = function (options, dataInfo) {
        if (dataInfo === void 0) { dataInfo = {}; }
        _super.prototype.init.call(this, __assign({ isEqualRatio: true, allowChangeSize: true, width: 120, height: 120, minWidth: 80, minHeight: 80 }, options), dataInfo);
        return this;
    };
    ImgBlock.prototype.create = function () {
        if (_super.prototype.create.call(this)) {
            var overlayElem = this.overlayElem;
            overlayElem.classList.add('overlay-elem-img');
            return true;
        }
        return false;
    };
    ImgBlock.prototype.render = function () {
        console.log('render');
        _super.prototype.render.call(this);
        var overlayElem = this.overlayElem;
        if (this.value) {
            if (this.placeholder) {
                this.placeholder.remove();
                this.placeholder = null;
            }
            if (!this.imgElement) {
                this.imgElement = createElement('img');
                this.imgElement.classList.add('overlay-img');
                overlayElem.appendChild(this.imgElement);
            }
            this.imgElement.src = this.value.img;
        }
        else {
            if (this.imgElement) {
                overlayElem.removeChild(this.imgElement);
                this.imgElement = null;
            }
            if (this.placeholder === null && this.options.placeholder) {
                if (typeof this.options.placeholder === 'function') {
                    this.placeholder = this.options.placeholder();
                }
                else {
                    this.placeholder = this.options.placeholder.cloneNode(true);
                }
                overlayElem.appendChild(this.placeholder);
            }
        }
    };
    ImgBlock.prototype.getValue = function () {
        return __assign(__assign({}, this.getInfo()), { value: this.value });
    };
    ImgBlock.prototype.overlayElemClick = function () {
        if (this.options.onClick) {
            this.options.onClick(this);
        }
    };
    ImgBlock.prototype.setValue = function (values) {
        this.value = values ? __assign({}, values) : null;
        if (this.overlayElem) {
            this.render();
        }
    };
    ImgBlock.create = function (data) {
        var overlay = new ImgBlock();
        var x = data.x, y = data.y, typeName = data.typeName;
        overlay.init(__assign(__assign({}, data), { type: ENUM_OVERLAY_TYPE.IMG_BLOCK.toLowerCase() }), __assign(__assign({}, data), { typeName: typeName }));
        return {
            typeName: typeName,
            overlay: overlay,
            pageNumber: data.page,
            dataX: x,
            dataY: y,
        };
    };
    return ImgBlock;
}(OverlayBase));
export default ImgBlock;
//# sourceMappingURL=imgBlock.js.map