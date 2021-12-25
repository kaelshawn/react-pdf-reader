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
import { isNumber, sortBy } from 'lodash';
import EventBase from '../utils/eventBase2';
/**
 * 选择器
 */
var OverlayPositionSelector = /** @class */ (function (_super) {
    __extends(OverlayPositionSelector, _super);
    function OverlayPositionSelector(props) {
        var _this = _super.call(this) || this;
        _this.index = -1;
        _this.manager = props.manager;
        _this.pdfOverlayPosition = props.pdfOverlayPosition;
        window.document.body.addEventListener('click', function () {
            _this.clearFocus();
        });
        return _this;
    }
    Object.defineProperty(OverlayPositionSelector.prototype, "all", {
        get: function () {
            return this.pdfOverlayPosition;
        },
        enumerable: false,
        configurable: true
    });
    OverlayPositionSelector.prototype.getEmptyList = function (type, pdfIndex) {
        var pdfId;
        if (isNumber(pdfIndex)) {
            pdfId = this.manager.pdfReader.pdfDatas[pdfIndex].id;
        }
        return sortBy(this.pdfOverlayPosition.filter(function (p) {
            if (pdfId !== undefined && p.pdfId !== pdfId) {
                return false;
            }
            if (type !== undefined && type !== p.type) {
                return false;
            }
            if (!p.overlayView || p.overlayView.isEmpty) {
                return true;
            }
            return false;
        }), function (p) {
            return p.page;
        });
    };
    OverlayPositionSelector.prototype.getUpEmpty = function (type, pdfIndex) {
        var positions = this.getEmptyList(type, pdfIndex);
        if (!positions.length) {
            return null;
        }
        if (this.index <= 0) {
            this.index = positions.length - 1;
        }
        else {
            this.index--;
        }
        return positions[this.index];
    };
    OverlayPositionSelector.prototype.getNextEmpty = function (type, pdfIndex) {
        var positions = this.getEmptyList(type, pdfIndex);
        if (!positions.length) {
            return null;
        }
        this.index = (this.index + 1) % positions.length;
        return positions[this.index];
    };
    OverlayPositionSelector.prototype.getByType = function (type) {
        return this.pdfOverlayPosition.filter(function (item) { return item.type === type; });
    };
    OverlayPositionSelector.prototype.getById = function (id) {
        return this.pdfOverlayPosition.find(function (item) { return item.id === id; });
    };
    OverlayPositionSelector.prototype.setFocus = function (id) {
        var _a;
        this.clearFocus();
        var position = this.getById(id);
        if (position) {
            var res = (_a = position.overlayView) === null || _a === void 0 ? void 0 : _a.setFocus(true);
            if (res) {
                this.emit('onFocus', { target: position });
            }
        }
    };
    /**
     * 取消所有组件的焦点状态
     */
    OverlayPositionSelector.prototype.clearFocus = function () {
        var _this = this;
        this.pdfOverlayPosition
            .filter(function (position) { return position.pdfId === _this.manager.currentPdfId; })
            .forEach(function (position) {
            var _a;
            var res = (_a = position.overlayView) === null || _a === void 0 ? void 0 : _a.setFocus(false);
            if (res) {
                _this.emit('onBlur', { target: position });
            }
        });
    };
    return OverlayPositionSelector;
}(EventBase));
export { OverlayPositionSelector };
//# sourceMappingURL=overlay-position-selector.js.map