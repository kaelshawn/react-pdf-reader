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
export default function scrollTo(y, options) {
    if (options === void 0) { options = {}; }
    var _a = options.getContainer, getContainer = _a === void 0 ? function () { return window; } : _a, callback = options.callback, _b = options.duration, duration = _b === void 0 ? 450 : _b, _c = options.offset, offset = _c === void 0 ? 0 : _c;
    var container = getContainer();
    var scrollTop = getScroll(container, true);
    var startTime = Date.now();
    var frameFunc = function () {
        var timestamp = Date.now();
        var time = timestamp - startTime;
        var nextScrollTop = easeInOutCubic(time > duration ? duration : time, scrollTop, y, duration);
        if (isWindow(container)) {
            container.scrollTo(window.pageXOffset, nextScrollTop);
        }
        else if (container instanceof HTMLDocument || container.constructor.name === 'HTMLDocument') {
            container.documentElement.scrollTop = nextScrollTop;
        }
        else {
            container.scrollTop = nextScrollTop;
        }
        if (time < duration) {
            setTimeout(frameFunc, 16);
        }
        else if (typeof callback === 'function') {
            callback();
        }
    };
    setTimeout(frameFunc, 16);
}
export function scrollToElement(element, options) {
    if (options === void 0) { options = {}; }
    var _a = options.getContainer, getContainer = _a === void 0 ? function () { return window; } : _a, _b = options.duration, duration = _b === void 0 ? 450 : _b, offset = options.offset, rest = __rest(options, ["getContainer", "duration", "offset"]);
    var container = getContainer();
    scrollTo(element.offsetTop + (offset || 0), __assign({ getContainer: function () { return container; }, duration: duration }, rest));
}
function isWindow(obj) {
    return obj !== null && obj !== undefined && obj === obj.window;
}
function getScroll(target, top) {
    if (typeof window === 'undefined') {
        return 0;
    }
    var method = top ? 'scrollTop' : 'scrollLeft';
    var result = 0;
    if (isWindow(target)) {
        result = target[top ? 'pageYOffset' : 'pageXOffset'];
    }
    else if (target instanceof Document) {
        result = target.documentElement[method];
    }
    else if (target) {
        result = target[method];
    }
    if (target && !isWindow(target) && typeof result !== 'number') {
        result = (target.ownerDocument || target).documentElement[method];
    }
    return result;
}
function easeInOutCubic(t, b, c, d) {
    var cc = c - b;
    t /= d / 2;
    if (t < 1) {
        return (cc / 2) * t * t * t + b;
    }
    return (cc / 2) * ((t -= 2) * t * t + 2) + b;
}
//# sourceMappingURL=scrollTo.js.map