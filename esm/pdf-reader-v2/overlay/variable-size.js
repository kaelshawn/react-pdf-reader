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
import * as d3 from 'd3-drag';
import * as d3Sel from 'd3-selection';
import { throttle } from 'lodash-es';
import EventBase from '../../utils/eventBase2';
import { addPx, createElementTo, getPxString, getPxValue } from '../../utils/tools';
/**
 * 可变尺寸
 */
var VariableSize = /** @class */ (function (_super) {
    __extends(VariableSize, _super);
    function VariableSize(props) {
        var _this = _super.call(this) || this;
        _this._variableSizeAllow = true;
        _this.handlers = [];
        _this.target = props.target;
        _this.config = props.config;
        _this.init();
        return _this;
    }
    Object.defineProperty(VariableSize.prototype, "variableSizeAllow", {
        get: function () {
            return this._variableSizeAllow;
        },
        set: function (value) {
            if (this._variableSizeAllow !== value) {
                this._variableSizeAllow = value;
                this.render();
            }
        },
        enumerable: false,
        configurable: true
    });
    VariableSize.prototype.init = function () {
        this.handlerCreate();
        this.render();
    };
    VariableSize.prototype.handlerCreate = function () {
        var _this = this;
        if (this.handlers.length) {
            return;
        }
        var HANDLERS = ['LEFT_TOP', 'RIGHT_TOP', 'RIGHT_BOTTOM', 'LEFT_BOTTOM'];
        HANDLERS.forEach(function (direction) {
            var sizeElem = createElementTo('div', _this.target, ['overlay-size-hander', direction]);
            _this.variableDrag(sizeElem, direction);
            _this.handlers.push({
                element: sizeElem,
                direction: direction,
            });
        });
    };
    VariableSize.prototype.variableDrag = function (handlerElem, direction) {
        var _this = this;
        var drag = d3.drag();
        var selection = d3Sel.select(handlerElem);
        drag(selection);
        var startWidth;
        var startHeight;
        var startX;
        var startY;
        var startLeft;
        var startTop;
        var changeValue;
        var config;
        drag
            .on('start', function (_a) {
            var sourceEvent = _a.sourceEvent;
            config = _this.config();
            if (sourceEvent.type === 'touchstart') {
                startY = sourceEvent.touches[0].clientY;
                startX = sourceEvent.touches[0].clientX;
            }
            else {
                startX = sourceEvent.x;
                startY = sourceEvent.y;
            }
            startWidth = getPxValue(_this.target.clientWidth);
            startHeight = getPxValue(_this.target.clientHeight);
            startLeft = getPxValue(_this.target.style.left);
            startTop = getPxValue(_this.target.style.top);
        })
            .on('drag', throttle(function (_a) {
            var sourceEvent = _a.sourceEvent;
            var eventX;
            var eventY;
            if (sourceEvent.type === 'touchmove') {
                eventY = sourceEvent.touches[0].clientY;
                eventX = sourceEvent.touches[0].clientX;
            }
            else {
                eventX = sourceEvent.x;
                eventY = sourceEvent.y;
            }
            changeValue = variableCalculationSize(__assign(__assign({}, config), { direction: direction, targetElement: _this.target, moveX: (eventX - startX) / config.scale, moveY: (eventY - startY) / config.scale, startWidth: startWidth,
                startHeight: startHeight,
                startLeft: startLeft,
                startTop: startTop, x: eventX, y: eventY }));
            _this.target.style.height = changeValue.height + "px";
            _this.target.style.width = changeValue.width + "px";
        }, 50))
            .on('end', function () {
            _this.emit('onSizeChanged', changeValue);
        });
    };
    VariableSize.prototype.render = function () {
        if (this.variableSizeAllow) {
            this.target.classList.add('overlay-allow-size');
        }
        else {
            this.target.classList.remove('overlay-allow-size');
        }
    };
    return VariableSize;
}(EventBase));
export { VariableSize };
export var variableCalculationSize = function (params) {
    var targetElement = params.targetElement, minWidth = params.minWidth, minHeight = params.minHeight, maxTop = params.maxTop, maxLeft = params.maxLeft, direction = params.direction, startWidth = params.startWidth, startHeight = params.startHeight, startLeft = params.startLeft, startTop = params.startTop;
    var moveX = params.moveX, moveY = params.moveY;
    if (params.isEqualRatio) {
        var ratio = params.minWidth / params.minHeight;
        if (Math.abs(moveX) < Math.abs(moveY)) {
            moveX = ((moveX / Math.abs(moveX)) * moveY) / ratio;
        }
        else {
            moveY = ((moveY / Math.abs(moveY)) * moveX) / ratio;
        }
        console.log(ratio, Math.abs(moveX / moveY), moveX, moveY);
    }
    var nWidth;
    var nHeight;
    var left = getPxValue(targetElement.style.left);
    var top = getPxValue(targetElement.style.top);
    var oWidth = getPxValue(targetElement.clientWidth);
    var oHeight = getPxValue(targetElement.clientHeight);
    function changeWidth(_moveX, checkMaxWidth) {
        if (checkMaxWidth === void 0) { checkMaxWidth = false; }
        addPx(startWidth, _moveX, function (value) {
            if (value < minWidth) {
                nWidth = minWidth;
                moveX = startWidth - nWidth;
            }
            else if (checkMaxWidth && startLeft + value > maxLeft) {
                nWidth = maxLeft - startLeft;
                moveX = startWidth - nWidth;
            }
            else {
                nWidth = value;
            }
            return nWidth;
        });
    }
    function changeHeight(_moveY, checkMaxHeight) {
        if (checkMaxHeight === void 0) { checkMaxHeight = false; }
        addPx(startHeight, _moveY, function (value) {
            if (value < minHeight) {
                nHeight = minHeight;
                moveY = startHeight - nHeight;
            }
            else if (checkMaxHeight && startTop + value > maxTop) {
                nWidth = maxTop - startTop;
                moveY = startHeight - nHeight;
            }
            else {
                nHeight = value;
            }
            return nHeight;
        });
    }
    function changeLeft() {
        left = addPx(startLeft, moveX, function (value) {
            if (value < 0) {
                nWidth = oWidth;
            }
            return Math.max(0, value);
        });
    }
    function changeTop() {
        top = addPx(startTop, moveY, function (value) {
            if (value < 0) {
                nHeight = oHeight;
            }
            return Math.max(0, value);
        });
    }
    if (direction === 'LEFT_TOP') {
        changeWidth(-moveX);
        changeHeight(-moveY);
        changeLeft();
        changeTop();
    }
    else if (direction === 'RIGHT_TOP') {
        changeWidth(moveX, true);
        changeHeight(-moveY);
        changeTop();
    }
    else if (direction === 'LEFT_BOTTOM') {
        changeWidth(-moveX);
        changeHeight(moveY, true);
        changeLeft();
    }
    else {
        changeWidth(moveX, true);
        changeHeight(moveY, true);
    }
    targetElement.style.left = getPxString(left);
    targetElement.style.top = getPxString(top);
    return {
        width: nWidth,
        height: nHeight,
        x: getPxValue(left),
        y: getPxValue(top),
    };
};
//# sourceMappingURL=variable-size.js.map