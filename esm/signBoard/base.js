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
import { Transform, Writable } from 'stream';
var Pi2 = 2 * Math.PI;
var separate = 0.5;
export var EnumPointEventType;
(function (EnumPointEventType) {
    EnumPointEventType[EnumPointEventType["down"] = 0] = "down";
    EnumPointEventType[EnumPointEventType["move"] = 1] = "move";
    EnumPointEventType[EnumPointEventType["up"] = 2] = "up";
})(EnumPointEventType || (EnumPointEventType = {}));
var PointStream = /** @class */ (function (_super) {
    __extends(PointStream, _super);
    function PointStream() {
        return _super.call(this, { objectMode: true }) || this;
    }
    PointStream.prototype.line = function (start, end) {
        var dis = distance(start, end);
        for (var i = 0; i < dis; i++) {
            var v = start.v + ((start.v - end.v) / dis) * i;
            var point = getMiddlePoint(start, end, i / dis);
            this.push(__assign(__assign({}, point), { v: v }));
        }
    };
    PointStream.prototype.bezierCurve = function (start, end, ctrl) {
        for (var i = 0; i < 1000; i++) {
            var t = i / 1000;
            var v = start.v + (end.v - start.v) * t;
            var x = (1 - t) * (1 - t) * start.x + 2 * t * (1 - t) * ctrl.x + t * t * end.x;
            var y = (1 - t) * (1 - t) * start.y + 2 * t * (1 - t) * ctrl.y + t * t * end.y;
            this.push({ x: x, y: y, v: v });
        }
    };
    PointStream.prototype._transform = function (point, _, callback) {
        if (!this.lastPoint) {
            this.lastPoint = __assign(__assign({}, point), { v: 0 });
            callback(null);
            return;
        }
        var dis = distance(this.lastPoint, point);
        point.v = dis / point.t;
        var middlePoint = getMiddlePoint(this.lastPoint, point);
        if (this.lastPoint.middlePoint) {
            this.bezierCurve(__assign(__assign({}, middlePoint), { v: point.v }), __assign(__assign({}, this.lastPoint.middlePoint), { v: this.lastPoint.v }), this.lastPoint);
        }
        else {
            this.line(this.lastPoint, __assign(__assign({}, middlePoint), { v: point.v }));
        }
        callback(null);
        if (point.s === EnumPointEventType.up) {
            this.lastPoint = undefined;
        }
        else {
            this.lastPoint = point;
            this.lastPoint.middlePoint = middlePoint;
        }
    };
    return PointStream;
}(Transform));
export { PointStream };
var BrushStream = /** @class */ (function (_super) {
    __extends(BrushStream, _super);
    function BrushStream(props) {
        var _this = _super.call(this, { objectMode: true }) || this;
        _this.canvas = props.canvas;
        _this.ctx = _this.canvas.getContext('2d');
        _this.ctx.strokeStyle = props.color || '#000000';
        return _this;
    }
    BrushStream.prototype._write = function (chunk, encode, done) {
        this.ctx.beginPath();
        console.log(chunk.v);
        this.ctx.arc(chunk.x, chunk.y, 4 * (chunk.v || 1), 0, Pi2);
        this.ctx.fill();
        this.ctx.closePath();
        done(null, chunk);
    };
    return BrushStream;
}(Writable));
export { BrushStream };
var DOMPointerStream = /** @class */ (function (_super) {
    __extends(DOMPointerStream, _super);
    function DOMPointerStream(props) {
        var _this = _super.call(this, { objectMode: true }) || this;
        _this.isDraw = false;
        _this.dom = props.dom;
        _this.domRect = props.dom.getBoundingClientRect();
        _this.create();
        return _this;
    }
    DOMPointerStream.prototype._transform = function (e, encode, callback) {
        if (e.type === 'pointerleave') {
            this.isDraw = false;
            callback(null);
            return;
        }
        var s = e.type === 'pointerdown'
            ? EnumPointEventType.down
            : e.type === 'pointermove'
                ? EnumPointEventType.move
                : EnumPointEventType.up;
        if (s !== EnumPointEventType.down && !this.isDraw) {
            callback(null);
            return;
        }
        this.isDraw = s !== EnumPointEventType.up;
        var now = Date.now();
        var t = this.lastTime ? now - this.lastTime : 0;
        var point = {
            x: e.clientX - this.domRect.x,
            y: e.clientY - this.domRect.y,
            p: e.pressure,
            s: s,
            t: t,
        };
        this.lastTime = now;
        callback(null, point);
    };
    DOMPointerStream.prototype.create = function () {
        this.dom.addEventListener('pointerleave', this.write.bind(this));
        this.dom.addEventListener('pointerup', this.write.bind(this));
        this.dom.addEventListener('pointerdown', this.write.bind(this));
        this.dom.addEventListener('pointermove', this.write.bind(this));
    };
    return DOMPointerStream;
}(Transform));
export { DOMPointerStream };
function distance(a, b) {
    var l1 = a.x - b.x;
    var l2 = a.y - b.y;
    var m = Math.sqrt(l1 * l1 + l2 * l2);
    return m;
}
/**
 * 取两个点的中间位置
 * @param a
 * @param b
 */
function getMiddlePoint(a, b, s) {
    var x = a.x + (b.x - a.x) * (s || separate);
    var y = a.y + (b.y - a.y) * (s || separate);
    return { x: x, y: y };
}
//# sourceMappingURL=base.js.map