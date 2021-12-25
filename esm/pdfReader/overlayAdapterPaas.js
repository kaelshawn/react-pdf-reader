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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { sortBy } from 'lodash';
import { EnumSealInfoType } from '../api/paas-sign-service';
import { toJson } from '../utils/tools';
import base from './overlayAdapter';
var OverlayAdapter = /** @class */ (function (_super) {
    __extends(OverlayAdapter, _super);
    function OverlayAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OverlayAdapter.prototype.getBaseInfo = function (overlayInfo) {
        return {
            id: overlayInfo.id,
            // crop: [
            //   overlayInfo.x,
            //   overlayInfo.y,
            //   overlayInfo.x + overlayInfo.width,
            //   overlayInfo.y + overlayInfo.height,
            // ],
            rectangle: {
                width: overlayInfo.width,
                height: overlayInfo.height,
                x: overlayInfo.x,
                y: overlayInfo.y,
            },
            page: overlayInfo.page,
        };
    };
    OverlayAdapter.prototype.getSignValue = function (overlayInfo) {
        return __assign(__assign({}, this.getBaseInfo(overlayInfo)), { fakePressure: overlayInfo.value.fakePressure, handWrittings: overlayInfo.value.points, height: overlayInfo.height, width: overlayInfo.width, thickness: overlayInfo.value.thickness, sourceH: overlayInfo.value.boardHeight, sourceW: overlayInfo.value.boardWidth, signPlateW: overlayInfo.value.boardWidth, signPlateH: overlayInfo.value.boardHeight, pMin: 0, pMax: 1, __value: overlayInfo.value, fingerInfo: overlayInfo.value.fingerInfo });
    };
    OverlayAdapter.prototype.getSealValue = function (overlayInfo) {
        return __assign(__assign({}, this.getBaseInfo(overlayInfo)), { handwritingId: '', lawPersonFlag: overlayInfo.value.lawPersonFlag, isUseSign: overlayInfo.value.isUseSign, useType: overlayInfo.value.useType, pin: overlayInfo.value.pin, sealCode: overlayInfo.value.sealCode, sealTypeCode: overlayInfo.value.sealTypeCode, type: EnumSealInfoType.三所, usePassword: overlayInfo.value.password, sealId: overlayInfo.value.id, __value: overlayInfo.value });
    };
    OverlayAdapter.prototype.getValues = function (overlaies, signFile) {
        var _this = this;
        if (!signFile) {
            signFile = {
                widgetContent: JSON.stringify({
                    seal: [],
                    sign: [],
                }),
            };
        }
        var widgetContent = toJson(signFile.widgetContent);
        if (!widgetContent) {
            throw new Error('Widgetcontent does not exist');
        }
        var reult = {
            currentFileId: signFile.currentFileId,
            signs: [],
            signSeals: [],
        };
        overlaies.forEach(function (overlay) {
            var overlayInfo = overlay.getValue();
            if (!overlayInfo.value) {
                return;
            }
            if (overlayInfo.typeName === 'sign') {
                reult.signs.push(_this.getSignValue(overlayInfo));
            }
            else if (overlayInfo.typeName === 'seal') {
                reult.signSeals.push(_this.getSealValue(overlayInfo));
            }
        });
        return reult;
    };
    OverlayAdapter.prototype.formatValues = function (file, values) {
        if (values === void 0) { values = { signSeals: [], signs: [] }; }
        var result = [];
        if (file.widgetContent) {
            var widgetContent = file.widgetContent;
            if (typeof widgetContent === 'string') {
                widgetContent = JSON.parse(widgetContent);
            }
            var ovelayValues_1 = __spreadArray(__spreadArray([], values.signSeals), values.signs);
            sortBy(__spreadArray(__spreadArray([], widgetContent.seal.map(function (item) {
                item.typeName = 'seal';
                return item;
            })), widgetContent.sign.map(function (item) {
                item.typeName = 'sign';
                return item;
            })), ['page', 'x', 'y']).forEach(function (widget) {
                var ovelayValue = ovelayValues_1.find(function (o) { return o.id === widget.id; });
                var item = {
                    id: widget.id,
                    currentFileId: file.currentFileId,
                    typeName: widget.typeName,
                    value: null,
                    page: widget.page,
                    top: widget.y,
                    left: widget.x,
                    overlayElementId: 'overlay-elem-' + widget.id,
                };
                if (ovelayValue) {
                    item.value = ovelayValue.__value;
                }
                else {
                    item.value = null;
                }
                result.push(item);
            });
        }
        return result;
    };
    return OverlayAdapter;
}(base));
export default OverlayAdapter;
//# sourceMappingURL=overlayAdapterPaas.js.map