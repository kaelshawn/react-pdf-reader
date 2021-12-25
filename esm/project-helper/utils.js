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
import { isNumber, random } from 'lodash-es';
import { DefaultSize } from '../pdf-reader-v2/overlay';
export var buildPosition = function (type, totals) {
    var result = [];
    for (var i = 0; i < totals; i++) {
        result.push(__assign({ x: random(20, 200), y: random(20, 500), page: 1, required: false, name: i + 1 + '号' + (type === 'Sign' ? '签署位' : '印章位') }, DefaultSize[type]));
    }
    return result;
};
export var filesToSignFiles = function (files, fixPosition) {
    var result = [];
    if (isNumber(files)) {
        files = new Array(files);
    }
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var item = {
            currentFileId: '',
            seal: [],
            sign: [],
        };
        if (isFile(file)) {
            item.file = file;
        }
        if (fixPosition) {
            item.seal = buildPosition('Seal', 2);
            item.sign = buildPosition('Sign', 2);
        }
        result.push(item);
    }
    return result;
};
export function isFile(value) {
    if (value === null || value === void 0 ? void 0 : value.lastModified) {
        return true;
    }
    return false;
}
//# sourceMappingURL=utils.js.map