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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { ENUM_ORIGIN_TYPE, ENUM_OVERLAY_TYPE } from './overlay/interface';
import OverlayInput from './overlay/input';
import OverlayImgBlock from './overlay/imgBlock';
import OverlayCheckBox from './overlay/checkBox';
import OverlayDateInput from './overlay/dateInput';
import { toJson, createElement } from '../utils/tools';
export var ENUM_AX_OVERLAY_TYPE;
(function (ENUM_AX_OVERLAY_TYPE) {
    ENUM_AX_OVERLAY_TYPE["INPUT"] = "INPUT";
    ENUM_AX_OVERLAY_TYPE["SIGN"] = "SIGN";
    ENUM_AX_OVERLAY_TYPE["SEAL"] = "SEAL";
    ENUM_AX_OVERLAY_TYPE["CHECKBOX"] = "CHECKBOX";
    ENUM_AX_OVERLAY_TYPE["DATEINPUT"] = "DATEINPUT";
})(ENUM_AX_OVERLAY_TYPE || (ENUM_AX_OVERLAY_TYPE = {}));
/**
 *
 */
var OverlayAdapter = /** @class */ (function () {
    function OverlayAdapter() {
        this.options = {};
    }
    OverlayAdapter.prototype.init = function (options) {
        this.options = __assign({}, options);
        return this;
    };
    OverlayAdapter.prototype.insertInput = function (data) {
        var _a = this.options.text, el = _a.el, inputOptions = __rest(_a, ["el"]);
        var overlay = new OverlayInput().init(__assign(__assign(__assign(__assign({}, data), { status: this.options.status }), inputOptions), { type: ENUM_OVERLAY_TYPE.INPUT }), __assign(__assign({}, data), { typeName: 'text' }));
        return {
            typeName: 'text',
            overlay: overlay,
            pageNumber: data.page,
            dataX: data.x,
            dataY: data.y,
        };
    };
    OverlayAdapter.prototype.getInputBlock = function () {
        return {
            status: this.options.status,
            type: ENUM_OVERLAY_TYPE.INPUT,
        };
    };
    OverlayAdapter.prototype.getSealBlock = function () {
        var _a = this.options.seal, el = _a.el, options = __rest(_a, ["el"]);
        return __assign({ origin: ENUM_ORIGIN_TYPE.LEFT_BOTTOM, placeholder: function () {
                var result = createElement('div', ['imgblock', 'iconfont', 'icon-yinzhang']);
                result.textContent = '印章区';
                return result;
            }, typeName: 'seal', type: ENUM_OVERLAY_TYPE.IMG_BLOCK, status: this.options.status, width: 120, height: 120 }, options);
    };
    OverlayAdapter.prototype.getSignBlock = function () {
        var _a = this.options.sign, el = _a.el, options = __rest(_a, ["el"]);
        return __assign({ origin: ENUM_ORIGIN_TYPE.LEFT_BOTTOM, isEqualRatio: false, placeholder: function () {
                var result = createElement('div', ['imgblock', 'iconfont', 'icon-ziyuan']);
                result.textContent = '签名区';
                return result;
            }, status: this.options.status, typeName: 'sign', type: ENUM_OVERLAY_TYPE.IMG_BLOCK, allowChangeSize: false, width: 180, height: 100, minWidth: 90, minHeight: 50 }, options);
    };
    OverlayAdapter.prototype.getCheckBoxBlock = function () {
        var _a = this.options.checkbox, el = _a.el, options = __rest(_a, ["el"]);
        return __assign({ status: this.options.status, typeName: 'checkbox', type: ENUM_OVERLAY_TYPE.CHECKBOX }, options);
    };
    OverlayAdapter.prototype.getDateInput = function () {
        var _a = this.options.dateinput, el = _a.el, options = __rest(_a, ["el"]);
        return __assign({ status: this.options.status, typeName: 'dateinput', type: ENUM_OVERLAY_TYPE.DATE_INPUT }, options);
    };
    OverlayAdapter.prototype.insertByTemplateData = function (widgetParams, signerTag) {
        var _this = this;
        if (widgetParams === void 0) { widgetParams = { fields: [], sign: [], seal: [] }; }
        if (signerTag === void 0) { signerTag = ''; }
        if (typeof widgetParams === 'string') {
            widgetParams = toJson(widgetParams);
        }
        var fields = __spreadArray(__spreadArray(__spreadArray([], widgetParams.fields), widgetParams.sign.map(function (sign) {
            sign.type = 'SIGN';
            return sign;
        })), widgetParams.seal.map(function (seal) {
            seal.type = 'SEAL';
            return seal;
        }));
        var result = [];
        fields === null || fields === void 0 ? void 0 : fields.forEach(function (field) {
            var fieldType = _this.strToTypeName(field.type.toString());
            var option = _this.options[fieldType];
            if (!option) {
                throw new Error("\u6CA1\u6709\u5BF9" + field.type + "\u8FDB\u884C\u914D\u7F6E");
            }
            var defValue = option.defValue;
            if (typeof defValue === 'function') {
                defValue = defValue(field.type);
            }
            field.visible = signerTag === '' || signerTag === field.signatoriesUuid;
            field.allowChangeSize = field.status === 'FREE' || field.status === 'EDITING';
            var fieldTypeEnum = _this.strToTypeEnum(field.type.toString());
            if (fieldTypeEnum === ENUM_AX_OVERLAY_TYPE.SEAL) {
                result.push(OverlayImgBlock.create(__assign(__assign(__assign({}, defValue), _this.getSealBlock()), field)));
            }
            else if (fieldTypeEnum === ENUM_AX_OVERLAY_TYPE.SIGN) {
                result.push(OverlayImgBlock.create(__assign(__assign(__assign({}, defValue), _this.getSignBlock()), field)));
            }
            else if (fieldTypeEnum === ENUM_AX_OVERLAY_TYPE.CHECKBOX) {
                result.push(OverlayCheckBox.create(__assign(__assign(__assign({}, defValue), _this.getCheckBoxBlock()), field)));
            }
            else if (fieldTypeEnum === ENUM_AX_OVERLAY_TYPE.DATEINPUT) {
                result.push(OverlayDateInput.create(__assign(__assign(__assign({}, defValue), _this.getDateInput()), field)));
            }
            else {
                var _a = _this.options.text, el = _a.el, inputOptions = __rest(_a, ["el"]);
                result.push(OverlayInput.create(__assign(__assign(__assign(__assign({}, defValue), { status: _this.options.status }), inputOptions), field)));
            }
        });
        return result;
    };
    OverlayAdapter.prototype.getDragsConfig = function () {
        var _this = this;
        var configNames = [
            {
                name: 'text',
                get: this.getInputBlock,
            },
            {
                name: 'seal',
                get: this.getSealBlock,
            },
            {
                name: 'sign',
                get: this.getSignBlock,
            },
            {
                name: 'checkbox',
                get: this.getCheckBoxBlock,
            },
            {
                name: 'dateinput',
                get: this.getDateInput,
            },
        ];
        return configNames
            .map(function (item) {
            if (_this.options[item.name]) {
                return __assign({ typeName: item.name, el: _this.options[item.name].el }, item.get.apply(_this));
            }
            return false;
        })
            .filter(Boolean);
    };
    OverlayAdapter.prototype.getOverlayDatas = function (overlaies) {
        var _this = this;
        var result = {
            fields: [],
            seal: [],
            sign: [],
        };
        overlaies.forEach(function (overlay) {
            var item = overlay.getInfo();
            var typeName = item.typeName;
            var type = _this.strToTypeEnum(typeName);
            if (type === ENUM_AX_OVERLAY_TYPE.INPUT ||
                type === ENUM_AX_OVERLAY_TYPE.CHECKBOX ||
                type === ENUM_AX_OVERLAY_TYPE.DATEINPUT) {
                result.fields.push(__assign(__assign({}, item), { type: _this.typeNameToDataName(typeName) }));
            }
            else if (type === ENUM_AX_OVERLAY_TYPE.SIGN) {
                result.sign.push(__assign(__assign({}, item), { type: _this.typeNameToDataName(typeName) }));
            }
            else if (type === ENUM_AX_OVERLAY_TYPE.SEAL) {
                result.seal.push(__assign(__assign({}, item), { type: _this.typeNameToDataName(typeName) }));
            }
        });
        return result;
    };
    OverlayAdapter.prototype.creatOverlayByType = function (params) {
        var fieldType = this.strToTypeName(params.typeName.toString());
        var option = this.options[fieldType];
        if (!option) {
            throw new Error("\u6CA1\u6709\u5BF9" + params.typeName + "\u8FDB\u884C\u914D\u7F6E");
        }
        var el = option.el, fieldInfo = __rest(option, ["el"]);
        var defValue = option.defValue;
        if (typeof defValue === 'function') {
            defValue = defValue(params.typeName);
        }
        var _defValue = {};
        var id = Date.now().toString(32);
        switch (params.typeName) {
            case 'text':
                _defValue = {
                    'text-type': 'text',
                    type: 'text',
                    autoSize: {
                        fixedWidth: true,
                    },
                };
                break;
            case 'checkbox':
                _defValue = {
                    type: 'checkbox',
                    fontSize: 20,
                };
                break;
            default:
                _defValue = {
                    type: params.typeName,
                };
                break;
        }
        var initInfo = __assign(__assign(__assign(__assign({}, params), fieldInfo), defValue), { status: this.options.status });
        var dataInfo = __assign(__assign(__assign({}, _defValue), defValue), { id: id, fieldId: id, typeName: params.typeName });
        switch (params.type) {
            case ENUM_OVERLAY_TYPE.CHECKBOX: {
                return new OverlayCheckBox().init(__assign(__assign({}, initInfo), { type: ENUM_OVERLAY_TYPE.IMG_BLOCK }), dataInfo);
            }
            case ENUM_OVERLAY_TYPE.IMG_BLOCK: {
                return new OverlayImgBlock().init(__assign(__assign({}, initInfo), { type: ENUM_OVERLAY_TYPE.IMG_BLOCK, allowChangeSize: params.typeName !== 'seal' }), dataInfo);
            }
            case ENUM_OVERLAY_TYPE.DATE_INPUT: {
                return new OverlayDateInput().init(__assign(__assign({}, initInfo), { type: ENUM_OVERLAY_TYPE.DATE_INPUT }), dataInfo);
            }
            default: {
                return new OverlayInput().init(__assign(__assign({}, initInfo), { type: ENUM_OVERLAY_TYPE.INPUT }), dataInfo);
            }
        }
    };
    OverlayAdapter.prototype.getValues = function (overlaies, signFile) {
        var _this = this;
        if (!signFile) {
            signFile = {
                widgetContent: JSON.stringify({
                    fields: [],
                    seal: [],
                    sign: [],
                }),
            };
        }
        var widgetContent = toJson(signFile.widgetContent);
        if (!widgetContent) {
            throw new Error('Widgetcontent does not exist');
        }
        var widgets = __spreadArray(__spreadArray(__spreadArray([], widgetContent.fields), widgetContent.seal), widgetContent.sign);
        var reult = {
            templateFileId: signFile.templateFileId,
            templateSn: signFile.templateSn,
            uploadFileId: signFile.uploadFileId,
            currentFileId: signFile.currentFileId,
            signs: [],
            signSeals: [],
        };
        overlaies.forEach(function (overlay) {
            var overlayInfo = overlay.getValue();
            if (!overlayInfo.value) {
                return;
            }
            var widget = widgets.find(function (_widget) { return _widget.id === overlay.id; });
            var rect = {
                x: overlayInfo.x,
                y: overlayInfo.y,
                width: overlayInfo.width,
                height: overlayInfo.height,
            };
            var overlayValue = {
                templateSignVo: __assign(__assign({}, rect), { id: overlayInfo.id, signatoriesUuid: widget === null || widget === void 0 ? void 0 : widget.signatoriesUuid, page: overlayInfo.page, mode: widget === null || widget === void 0 ? void 0 : widget.mode, flag: widget === null || widget === void 0 ? void 0 : widget.flag, format: widget === null || widget === void 0 ? void 0 : widget.format, displayDate: widget === null || widget === void 0 ? void 0 : widget.displayDate }),
            };
            if (overlayInfo.typeName === 'sign') {
                reult.signs.push(__assign(__assign({}, overlayValue), _this.getSignValue(overlayInfo.value)));
            }
            else if (overlayInfo.typeName === 'seal') {
                reult.signSeals.push(__assign(__assign({}, overlayValue), _this.getSealValue(__assign({ signFileId: signFile.currentFileId, signFilePage: overlayInfo.page }, overlayInfo.value), rect)));
            }
        });
        return reult;
    };
    OverlayAdapter.prototype.getSealValue = function (_a, rect) {
        var img = _a.img, sealInfo = __rest(_a, ["img"]);
        return {
            sealSource: 2,
            signFileParam: __assign({ rect: rect, signFileId: '', signFilePage: 1 }, sealInfo.signFileParam),
        };
    };
    OverlayAdapter.prototype.getSignValue = function (signInfo) {
        return {
            signPlateW: signInfo.boardWidth,
            signPlateH: signInfo.boardHeight,
            sourceW: 800,
            sourceH: 600,
            signatures: signInfo.points,
            thickness: signInfo.thickness,
            fakePressure: signInfo.fakePressure,
        };
    };
    OverlayAdapter.prototype.formatValues = function (widgetContent, values) {
        return [];
    };
    OverlayAdapter.prototype.typeNameToDataName = function (type) {
        type = type.toUpperCase();
        if (type === ENUM_AX_OVERLAY_TYPE.DATEINPUT) {
            return 'sign-datetime';
        }
        if (type === ENUM_AX_OVERLAY_TYPE.INPUT) {
            return 'text';
        }
        return type.toLowerCase();
    };
    OverlayAdapter.prototype.strToTypeName = function (str) {
        if (str == 'sign-datetime') {
            return 'dateinput';
        }
        return str.toLowerCase();
    };
    OverlayAdapter.prototype.strToTypeEnum = function (str) {
        if (str == 'sign-datetime') {
            return ENUM_AX_OVERLAY_TYPE.DATEINPUT;
        }
        if (str == 'text') {
            return ENUM_AX_OVERLAY_TYPE.INPUT;
        }
        return str.toUpperCase();
    };
    return OverlayAdapter;
}());
export default OverlayAdapter;
//# sourceMappingURL=overlayAdapter.js.map