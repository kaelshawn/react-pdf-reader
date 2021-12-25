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
import { BrushStream, DOMPointerStream, PointStream } from 'isigning-signboard';
import { Transform } from 'stream';
import SignBoard from './main';
var SignStreamBoard = /** @class */ (function (_super) {
    __extends(SignStreamBoard, _super);
    function SignStreamBoard(props) {
        var _this = _super.call(this) || this;
        _this.isMaster = (props === null || props === void 0 ? void 0 : props.isMaster) || false;
        _this.pipe = props === null || props === void 0 ? void 0 : props.pipe;
        _this.scale = (props === null || props === void 0 ? void 0 : props.scale) || 1;
        _this.forceChangeSize = (props === null || props === void 0 ? void 0 : props.forceChangeSize) || false;
        return _this;
    }
    SignStreamBoard.prototype.updateCanvasSize = function () {
        this.canvas.setAttribute('width', this.listener.clientWidth / this.scale + "px");
        this.canvas.setAttribute('height', this.listener.clientHeight / this.scale + "px");
        var ctx = this.canvas.getContext('2d');
        ctx.scale(this.scale, this.scale);
    };
    SignStreamBoard.prototype.dataUrl = function (type, quality) {
        if (type === void 0) { type = 'image/png'; }
        var newCanvas = document.createElement('canvas');
        newCanvas.width = this.listener.clientWidth;
        newCanvas.height = this.listener.clientHeight;
        var newContext = newCanvas.getContext('2d');
        newContext.drawImage(this.canvas, 0, 0);
        return newCanvas.toDataURL(type, quality);
    };
    SignStreamBoard.prototype.rotate = function () {
        var _this = this;
        var orgWidth = this.container.clientWidth;
        var orgHeight = this.container.clientHeight;
        if (this.isRotate) {
            this.container.style.height = orgWidth + "px";
            this.container.style.width = orgHeight + "px";
            this.container.style.transformOrigin = (orgWidth / orgHeight / 2) * 100 + "% 50%";
        }
        else {
            this.container.style.height = '';
            this.container.style.width = '';
            this.container.style.transformOrigin = '';
        }
        setTimeout(function () {
            _this.updateCanvasSize();
        }, 100);
    };
    SignStreamBoard.prototype.changeCanvas = function () {
        _super.prototype.changeCanvas.call(this);
        if (!this.isMaster || this.forceChangeSize) {
            var width = this.container.clientWidth;
            var height = this.container.clientHeight;
            this.onEvent('changeSize', {
                width: width,
                height: height,
            });
        }
    };
    SignStreamBoard.prototype.setScale = function (scale) {
        this.scale = scale;
    };
    SignStreamBoard.prototype.createCanvas = function () {
        var _this = this;
        var ctx = this.canvas.getContext('2d');
        try {
            this.clear();
            var ps = (this.ps = new PointStream({
                fakePressure: this.fakePressure,
                maxPressure: this.maxPressure,
                throttle: this.options.throttle,
            }));
            var bs = (this.bs = new BrushStream({
                canvas: this.canvas,
                thickness: this.options.thickness,
                color: this.options.color || 'black',
            }));
            var ds = (this.ds =
                this.isMaster && this.pipe
                    ? this.pipe
                    : new DOMPointerStream({
                        dom: this.listener,
                    }));
            var ts = (this.ts = new Transform({
                objectMode: true,
                transform: function (_chunk, _, callback) {
                    // console.log(_chunk);
                    var chunk = _chunk;
                    if (_this.isRotate && !chunk._r) {
                        var width = _this.listener.clientHeight;
                        chunk = __assign(__assign({}, chunk), { x: chunk.y, y: width - chunk.x });
                    }
                    _this.onEvent('onPushPoint', chunk);
                    return callback(null, chunk);
                },
            }));
            ds.pipe(ts);
            if (!this.isMaster) {
                this.pipe && ds.pipe(this.pipe);
            }
            ts.pipe(ps);
            ps.pipe(bs);
            ts.on('data', function (e) {
                _this.points.push(e);
                _this.onEvent('onChange', _this.points, e);
                if (_this.options.bgContent == undefined)
                    _this.bgView.style.display = 'none';
            });
            window.addEventListener('resize', function () { });
        }
        catch (e) {
            ctx.fillText(e.message, 10, 10);
        }
    };
    SignStreamBoard.prototype.destory = function () {
        _super.prototype.destory.call(this);
        if (this.pipe) {
            this.pipe.destroy();
        }
    };
    return SignStreamBoard;
}(SignBoard));
export default SignStreamBoard;
//# sourceMappingURL=sign-stream-board.js.map