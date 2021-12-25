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
import * as d3 from 'd3-drag';
import * as d3Sel from 'd3-selection';
import EventBase from '../../utils/eventBase2';
/**
 * 可变尺寸
 */
var VariableMove = /** @class */ (function (_super) {
    __extends(VariableMove, _super);
    function VariableMove(props) {
        var _this = _super.call(this) || this;
        _this.target = props.target;
        _this.config = props.config;
        _this.init();
        return _this;
    }
    VariableMove.prototype.init = function () {
        var _this = this;
        var drag = d3.drag();
        var selection = d3Sel.select(this.target);
        this.target.classList.add('overlay-allow-move');
        drag(selection);
        var startX; // 开始移动时点击组件的X值
        var startY; // 开始移动时点击组件的Y值
        var top, left;
        var scale;
        drag
            .on('start', function (_a) {
            var x = _a.x, y = _a.y;
            scale = _this.config().scale;
            startX = x / scale - _this.target.offsetLeft;
            startY = y / scale - _this.target.offsetTop;
        })
            .on('drag', function (_a) {
            var x = _a.x, y = _a.y;
            left = Math.min(Math.max(0, x / scale - startX), _this.target.parentElement.clientWidth - _this.target.clientWidth);
            top = y / scale - startY;
            top = Math.min(Math.max(0, top), _this.target.parentElement.clientHeight - _this.target.clientHeight);
            _this.target.style.left = left + "px";
            _this.target.style.top = top + "px";
        })
            .on('end', function (e) {
            if (left !== undefined) {
                _this.emit('onMoved', {
                    x: left,
                    y: top,
                });
            }
        });
    };
    return VariableMove;
}(EventBase));
export { VariableMove };
//# sourceMappingURL=variable-move.js.map