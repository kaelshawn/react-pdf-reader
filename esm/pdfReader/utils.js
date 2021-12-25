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
/**
 * 判断是否点击的是组件
 * @param e
 */
function isClickOverlay(e) {
    var _a;
    var path = e.path;
    if (!path) {
        return false;
    }
    for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
        var element = path_1[_i];
        if ((_a = element.classList) === null || _a === void 0 ? void 0 : _a.contains('overlay-elem')) {
            return true;
        }
    }
    return false;
}
function getPdfPageInfoByEvent(e) {
    var canvasWrapper = ((e.path || (e.composedPath && e.composedPath())).find(function (item) { return item.className === 'canvasWrapper'; }));
    if (canvasWrapper) {
        var _a = canvasWrapper.getBoundingClientRect(), top_1 = _a.top, left = _a.left;
        var pageNumber = +canvasWrapper.parentElement.getAttribute('data-page-number') - 1;
        return {
            top: top_1,
            left: left,
            pageNumber: pageNumber,
            canvasWrapper: canvasWrapper,
        };
    }
    return null;
}
function getPdfPageClickInfo(e, scale) {
    if (scale === void 0) { scale = 1; }
    var pageInfo = getPdfPageInfoByEvent(e);
    if (!pageInfo) {
        return null;
    }
    return __assign({ y: (e.y - pageInfo.top) / scale, x: (e.x - pageInfo.left) / scale }, pageInfo);
}
export default {
    getPdfPageClickInfo: getPdfPageClickInfo,
    getPdfPageInfoByEvent: getPdfPageInfoByEvent,
    isClickOverlay: isClickOverlay,
};
//# sourceMappingURL=utils.js.map