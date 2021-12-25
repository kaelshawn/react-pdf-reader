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
import { v4 } from 'uuid';
export var addIdProperty = function (value) {
    return __assign({ id: v4() }, value);
};
export var getXY = function (props) {
    var result = { x: props.left, y: props.top };
    if (props.origin === 'CENTER') {
        result.x = props.left - props.width / 2;
        result.y = props.height / 2;
    }
    else if (props.origin === 'LEFT_BOTTOM') {
        result.y = props.parentHeight - props.top - props.height;
    }
    return result;
};
export var getLeftTop = function (props) {
    var result = { left: props.x, top: props.y };
    if (props.origin === 'CENTER') {
        result.left = props.x - props.width / 2;
        result.top = props.height / 2;
    }
    else if (props.origin === 'LEFT_BOTTOM') {
        result.top = props.parentHeight - props.y - props.height;
    }
    return result;
};
//# sourceMappingURL=utils.js.map