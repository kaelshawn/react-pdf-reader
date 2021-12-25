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
import { getPxValue, addPx, getPxString } from '../../utils/tools';
var HANDLERS = ['LEFT_TOP', 'RIGHT_TOP', 'RIGHT_BOTTOM', 'LEFT_BOTTOM'];
/**
 * 可变尺寸
 */
export function variableSize(options) {
    var overlay = options.overlay, minWidth = options.minWidth, minHeight = options.minHeight, getScale = options.getScale, getMaxLeft = options.getMaxLeft, getMaxTop = options.getMaxTop, onChange = options.onChange, isEqualRatio = options.isEqualRatio;
    var overlayElem = overlay.overlayElem;
    overlayElem.classList.add('overlay-allow-size');
    HANDLERS.forEach(function (direction) {
        var sizeElem = document.createElement('div');
        var drag = d3.drag();
        var selection = d3Sel.select(sizeElem);
        sizeElem.className = 'overlay-size-hander';
        sizeElem.classList.add(direction);
        overlayElem.appendChild(sizeElem);
        drag(selection);
        var maxTop = getMaxTop();
        var maxLeft = getMaxLeft();
        var startWidth;
        var startHeight;
        var startX;
        var startY;
        var startLeft;
        var startTop;
        var params = {
            overlayElem: overlayElem,
            minWidth: minWidth,
            minHeight: minHeight,
            maxTop: maxTop,
            maxLeft: maxLeft,
            direction: direction,
        };
        drag
            .on('start', function (_a) {
            var sourceEvent = _a.sourceEvent;
            if (sourceEvent.type === 'touchstart') {
                startY = sourceEvent.touches[0].clientY;
                startX = sourceEvent.touches[0].clientX;
            }
            else {
                startX = sourceEvent.x;
                startY = sourceEvent.y;
            }
            console.log(startY, startY);
            startWidth = getPxValue(overlayElem.clientWidth);
            startHeight = getPxValue(overlayElem.clientHeight);
            startLeft = getPxValue(overlayElem.style.left);
            startTop = getPxValue(overlayElem.style.top);
        })
            .on('drag', function (_a) {
            var sourceEvent = _a.sourceEvent;
            var scale = getScale();
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
            changeComplete(changeSize(__assign(__assign({}, params), { isEqualRatio: isEqualRatio,
                scale: scale, moveX: (eventX - startX) / scale, moveY: (eventY - startY) / scale, startWidth: startWidth,
                startHeight: startHeight,
                startLeft: startLeft,
                startTop: startTop, x: eventX, y: eventY })));
        });
    });
    function changeComplete(result) {
        overlayElem.style.height = result.height + "px";
        overlayElem.style.width = result.width + "px";
        onChange(result);
    }
}
export function changeSize(params) {
    var overlayElem = params.overlayElem, minWidth = params.minWidth, minHeight = params.minHeight, maxTop = params.maxTop, maxLeft = params.maxLeft, direction = params.direction, startWidth = params.startWidth, startHeight = params.startHeight, startLeft = params.startLeft, startTop = params.startTop;
    var moveX = params.moveX, moveY = params.moveY;
    var nWidth;
    var nHeight;
    var left = getPxValue(overlayElem.style.left);
    var top = getPxValue(overlayElem.style.top);
    var oWidth = getPxValue(overlayElem.clientWidth);
    var oHeight = getPxValue(overlayElem.clientHeight);
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
    if (params.isEqualRatio) {
        var ratio = params.minWidth / params.minHeight;
        if (nWidth < nHeight) {
            nHeight = nWidth / ratio;
        }
        else {
            nWidth = nHeight / ratio;
        }
    }
    overlayElem.style.left = getPxString(left);
    overlayElem.style.top = getPxString(top);
    return {
        width: nWidth,
        height: nHeight,
        x: getPxValue(left),
        y: getPxValue(top),
    };
}
//# sourceMappingURL=variableSize.js.map