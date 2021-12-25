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
import EventBase from '../utils/eventBase';
import { toJson } from '../utils/tools';
import { ENUM_OVERLAY_STATUS } from './overlay/interface';
var Multiple = /** @class */ (function (_super) {
    __extends(Multiple, _super);
    function Multiple(pdfReader, signFiles, templateFiles) {
        var _a;
        var _this = _super.call(this) || this;
        _this.currentFileId = null;
        _this.allValues = {};
        _this.freeSignInfo = {};
        _this.values = {};
        _this.widgetInfos = {};
        _this.pdfReader = pdfReader;
        _this.signFiles = signFiles;
        _this.templateFiles = templateFiles;
        (_a = _this.templateFiles) === null || _a === void 0 ? void 0 : _a.forEach(function (template) {
            _this.widgetInfos[template.uploadFileId] = template;
        });
        return _this;
    }
    Multiple.prototype.getSignFileById = function (fileId) {
        var _a;
        return (_a = this.signFiles) === null || _a === void 0 ? void 0 : _a.find(function (item) { return item.currentFileId === fileId; });
    };
    Multiple.prototype.getTemplateFileById = function (fileId) {
        var _a;
        return (_a = this.templateFiles) === null || _a === void 0 ? void 0 : _a.find(function (item) { return item.uploadFileId === fileId; });
    };
    Multiple.prototype.setCurrentValues = function () {
        var _a;
        var file = null;
        if (((_a = this.pdfReader.overlayEditor) === null || _a === void 0 ? void 0 : _a.status) === ENUM_OVERLAY_STATUS.FREE) {
            file = this.freeSignInfo[this.currentFileId];
        }
        else {
            file = this.getSignFileById(this.currentFileId);
        }
        this.values[this.currentFileId] = this.pdfReader.overlayEditor.getValues(file);
    };
    Multiple.prototype.setCurrentTemplate = function () {
        this.widgetInfos[this.currentFileId] = Object.assign(this.widgetInfos[this.currentFileId] || {}, this.pdfReader.overlayEditor.getInfos());
    };
    Multiple.prototype.switch = function (pdf, fileId, sign, cb, errcb) {
        var _this = this;
        if (sign === void 0) { sign = false; }
        if (this.currentFileId === fileId) {
            cb && cb();
            return;
        }
        if (this.currentFileId) {
            if (this.pdfReader.overlayEditor) {
                this.allValues[this.currentFileId] = this.pdfReader.overlayEditor.allValues;
                this.setCurrentValues();
                this.freeSignInfo[this.currentFileId].widgetContent = valuesToWidgetContent(this.allValues[this.currentFileId]);
            }
        }
        this.pdfReader.load(pdf, function () {
            if (_this.pdfReader.overlayEditor) {
                if (sign) {
                    if (_this.freeSignInfo[_this.currentFileId]) {
                        _this.pdfReader.overlayEditor.insertForTemplateData(_this.freeSignInfo[_this.currentFileId].widgetContent);
                    }
                    else {
                        var file_1 = _this.getSignFileById(_this.currentFileId);
                        if (file_1) {
                            _this.pdfReader.overlayEditor.insertForTemplateData(file_1.widgetContent);
                        }
                    }
                }
                if (_this.allValues[_this.currentFileId]) {
                    _this.pdfReader.overlayEditor.allValues = _this.allValues[_this.currentFileId];
                }
                var file = _this.getSignFileById(_this.currentFileId);
                _this.freeSignInfo[_this.currentFileId] = __assign(__assign({}, file), { widgetContent: JSON.stringify({
                        currentFileId: _this.currentFileId,
                        fields: [],
                        sign: [],
                        seal: [],
                    }) });
            }
            if (cb) {
                cb();
            }
        }, errcb);
        this.currentFileId = fileId;
    };
    Multiple.prototype.switchTemplate = function (pdf, templateId, userTag) {
        var _this = this;
        if (this.currentFileId) {
            if (this.pdfReader.overlayEditor) {
                this.allValues[this.currentFileId] = this.pdfReader.overlayEditor.allValues;
                this.setCurrentTemplate();
            }
        }
        this.pdfReader.load(pdf, function () {
            if (_this.pdfReader.overlayEditor) {
                var file = _this.getTemplateFileById(_this.currentFileId);
                if (file) {
                    _this.pdfReader.overlayEditor.insertForTemplateData(file, userTag);
                }
            }
        });
        this.currentFileId = templateId;
    };
    Multiple.prototype.getValues = function (isRequired) {
        var _this = this;
        var _a;
        if (isRequired === void 0) { isRequired = true; }
        this.setCurrentValues();
        var defaultValue = {};
        (_a = this.signFiles) === null || _a === void 0 ? void 0 : _a.forEach(function (item) {
            defaultValue[item.currentFileId] = {
                currentFileId: item.currentFileId,
                signSeals: [],
                signs: [],
            };
        });
        var allValues = __assign(__assign({}, defaultValue), this.values);
        var result = Object.keys(allValues).map(function (key) {
            var _a;
            if (isRequired && ((_a = _this.pdfReader.overlayEditor) === null || _a === void 0 ? void 0 : _a.status) === ENUM_OVERLAY_STATUS.INPUT) {
                _this.checkRequired(key, allValues[key]);
            }
            return allValues[key];
        });
        return result;
    };
    /**
     * 根据WidgetContent获取所有的签署位的__value值
     * 兼容多个文件的处理
     */
    Multiple.prototype.getFileValuesByWidgetContent = function (fileId) {
        var _this = this;
        var _a;
        this.setCurrentValues();
        var result = [];
        (_a = this.signFiles) === null || _a === void 0 ? void 0 : _a.filter(function (file) {
            return !fileId || file.currentFileId === fileId;
        }).forEach(function (file) {
            var _a;
            var formatValue = (_a = _this.pdfReader.overlayEditor) === null || _a === void 0 ? void 0 : _a.getFormatValues(file, _this.values[file.currentFileId]);
            result.push.apply(result, (formatValue || []));
        });
        return result;
    };
    /**
     *
     * @param isRequired 是否判断必填项
     * @returns
     */
    Multiple.prototype.getWidgetInfos = function () {
        var _this = this;
        this.setCurrentTemplate();
        return Object.keys(this.widgetInfos).map(function (key) {
            return _this.widgetInfos[key];
        });
    };
    /**
     * 获取快照
     */
    Multiple.prototype.getSnapshot = function () {
        var _this = this;
        var result = {};
        this.allValues[this.currentFileId] = this.pdfReader.overlayEditor.allValues;
        if (this.templateFiles) {
            result.isTemplate = true;
            this.templateFiles.forEach(function (template) {
                result[template.uploadFileId] = templateSetValue(template, _this.allValues[template.uploadFileId]);
            });
        }
        else if (this.signFiles) {
            result.isSign = true;
            this.signFiles.forEach(function (signFile) {
                result[signFile.currentFileId] = __assign(__assign({}, signFile), { allValues: _this.allValues[signFile.currentFileId] });
            });
        }
        return result;
    };
    /**
     * 设置快照
     */
    Multiple.prototype.reSnapshot = function (_a) {
        var _this = this;
        var isTemplate = _a.isTemplate, isSign = _a.isSign, snapshot = __rest(_a, ["isTemplate", "isSign"]);
        if (isTemplate) {
            this.pdfReader.overlayEditor.clear(false);
            this.templateFiles = Object.keys(snapshot).map(function (item) {
                return snapshot[item];
            });
        }
        else if (isSign) {
            this.signFiles = Object.keys(snapshot).map(function (key) {
                var _a = snapshot[key], allValues = _a.allValues, signFile = __rest(_a, ["allValues"]);
                _this.allValues[signFile.currentFileId] = allValues;
                return signFile;
            });
            this.pdfReader.overlayEditor.allValues = this.allValues[this.currentFileId];
        }
    };
    Multiple.prototype.checkRequired = function (fileId, _a) {
        var _b = _a.fields, fields = _b === void 0 ? [] : _b, _c = _a.signSeals, signSeals = _c === void 0 ? [] : _c, _d = _a.signs, signs = _d === void 0 ? [] : _d;
        var file = this.getSignFileById(fileId);
        var widgetConfig = toJson(file === null || file === void 0 ? void 0 : file.widgetContent);
        if (widgetConfig) {
            __spreadArray(__spreadArray(__spreadArray([], widgetConfig.fields), widgetConfig.seal.map(function (item) {
                item.isSeal = true;
                return item;
            })), widgetConfig.sign.map(function (item) {
                item.isSign = true;
                return item;
            })).filter(function (item) { return item.required; })
                .forEach(function (item) {
                if (!__spreadArray(__spreadArray(__spreadArray([], fields), signSeals), signs).some(function (overlay) { var _a; return overlay.id === ((_a = item.templateSignVo) === null || _a === void 0 ? void 0 : _a.id) || overlay.id === item.id; })) {
                    var err = new Error('no-sign');
                    err.detail = {
                        signFile: __assign({}, file),
                        item: item,
                    };
                    throw err;
                }
            });
        }
    };
    return Multiple;
}(EventBase));
export default Multiple;
function valuesToWidgetContent(values) {
    var assemble = function (value) {
        return {
            page: value.page,
            id: value.id,
            x: value.x,
            y: value.y,
            width: value.width,
            height: value.height,
            type: value.type,
            status: value.status,
        };
    };
    return JSON.stringify({
        fields: values.filter(function (item) { return item.type === 'INPUT'; }).map(assemble),
        sign: values.filter(function (item) { return item.typeName === 'sign'; }).map(assemble),
        seal: values.filter(function (item) { return item.typeName === 'seal'; }).map(assemble),
    });
}
function templateSetValue(template, fileds) {
    var result = JSON.parse(JSON.stringify(template));
    if (fileds) {
        var templateFiled_1 = __spreadArray(__spreadArray(__spreadArray([], template.fields), template.seal), template.sign);
        result.fields = fileds.filter(function (item) {
            return !!templateFiled_1.find(function (tf) { return tf.id === item.id && item.type === 'INPUT'; });
        });
        result.seal = fileds.filter(function (item) {
            return !!templateFiled_1.find(function (tf) { return tf.id === item.id && item.typeName === 'seal'; });
        });
        result.sign = fileds.filter(function (item) {
            return !!templateFiled_1.find(function (tf) { return tf.id === item.id && item.typeName === 'sign'; });
        });
    }
    return result;
}
//# sourceMappingURL=multiple.js.map