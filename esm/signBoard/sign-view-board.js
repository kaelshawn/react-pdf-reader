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
import { Transform } from 'stream';
import { emptyElement } from '../utils/tools';
import SignStreamBoard from './sign-stream-board';
var EnumModeType;
(function (EnumModeType) {
    EnumModeType["MOBILE"] = "MOBILE";
    EnumModeType["PC"] = "PC";
})(EnumModeType || (EnumModeType = {}));
var SignViewBoard = /** @class */ (function () {
    function SignViewBoard(props) {
        var isRotate = window.innerWidth < window.innerHeight;
        this.container = props.container;
        this.mode = props.mode || EnumModeType.PC;
        this.canvasWidth =
            props.width ||
                (this.mode == EnumModeType.MOBILE
                    ? isRotate
                        ? window.innerHeight
                        : window.innerWidth
                    : 500);
        this.createStream();
    }
    SignViewBoard.prototype.createStream = function () {
        this.socketTransformer = new Transform({
            objectMode: true,
            transform: function (chunk, _, callback) {
                return callback(null, __assign(__assign({}, chunk), { _r: true }));
            },
        });
    };
    SignViewBoard.prototype.updateScale = function (size) {
        var scale = 1;
        if (size.width && (size === null || size === void 0 ? void 0 : size.height)) {
            var isMax = this.canvasWidth > size.width;
            scale = isMax ? 1 : this.canvasWidth / size.width;
            var width = size.width * scale;
            var height = size.height * scale;
            var _width = width;
            var _height = height;
            if (this.mode == EnumModeType.MOBILE) {
                var isRotate = window.innerWidth < window.innerHeight;
                _width = isRotate ? height : width;
                _height = isRotate ? width : height;
            }
            this.container.style.width = _width + 'px';
            this.container.style.height = _height + 'px';
        }
        return scale;
    };
    SignViewBoard.prototype.write = function (data) {
        var _this = this;
        this.clean();
        this.points = JSON.parse(JSON.stringify(data));
        if (this.socketTransformer) {
            var timeId_1;
            var draw_1 = function (data) {
                var point = data[0];
                if (!point) {
                    clearTimeout(timeId_1);
                    timeId_1 = null;
                    return;
                }
                timeId_1 = setTimeout(function () {
                    _this.writePoint(__assign({}, point));
                    data.splice(0, 1);
                    draw_1(data);
                }, point.t != undefined ? point.t : 60);
            };
            try {
                draw_1(data);
            }
            catch (e) {
                clearTimeout(timeId_1);
                this.socketTransformer.end();
            }
        }
    };
    SignViewBoard.prototype.writePoint = function (point) {
        this.socketTransformer.write(__assign({}, point));
    };
    SignViewBoard.prototype.createSignBoard = function (size, fakePressure, maxPressure) {
        var _this = this;
        if (fakePressure === void 0) { fakePressure = true; }
        if (maxPressure === void 0) { maxPressure = 1; }
        emptyElement(this.container);
        if (this.signBoard) {
            this.signBoard.destory();
            delete this.signBoard;
        }
        var scale = this.updateScale(size);
        var isPC = this.mode == EnumModeType.PC;
        var signBoard = (this.signBoard = new SignStreamBoard({
            isMaster: true,
            pipe: this.socketTransformer,
            forceChangeSize: true,
            scale: scale,
        }).init({
            container: this.container,
            fakePressure: fakePressure,
            maxPressure: maxPressure,
            enabled: false,
            bgContent: '',
            forceRotate: isPC ? false : undefined,
            className: isPC ? 'aos-sign-view-board' : 'aos-sign-board',
        }));
        signBoard.addEventListener('changeSize', function () {
            var _a;
            _this.clean();
            signBoard.setScale(_this.updateScale(size));
            signBoard.updateSize();
            if ((_a = _this.points) === null || _a === void 0 ? void 0 : _a.length) {
                _this.write(_this.points);
            }
        });
        return this;
    };
    SignViewBoard.prototype.clean = function () {
        var signBoard = this.signBoard;
        if (signBoard) {
            signBoard.clean();
        }
    };
    SignViewBoard.prototype.close = function () {
        emptyElement(this.container);
        if (this.socketTransformer) {
            this.socketTransformer.destroy();
        }
        if (this.signBoard) {
            this.signBoard.destory();
            delete this.signBoard;
        }
    };
    SignViewBoard.prototype.getSignInfo = function () {
        var signBoard = this.signBoard;
        if (signBoard) {
            var _a = signBoard.getBoardSize(), width = _a.width, height = _a.height;
            var boardWidth = width;
            var boardHeight = height;
            return {
                points: JSON.parse(JSON.stringify(signBoard.points)),
                dataUrl: signBoard.dataUrl(),
                boardWidth: boardWidth,
                boardHeight: boardHeight,
                info: signBoard.getSignInfo(),
            };
        }
        return null;
    };
    SignViewBoard.prototype.setColor = function (color) {
        if (this.signBoard) {
            this.signBoard.color = color;
        }
    };
    SignViewBoard.PC_MODE = EnumModeType.PC;
    SignViewBoard.MOBILE_MODE = EnumModeType.MOBILE;
    return SignViewBoard;
}());
export default SignViewBoard;
//# sourceMappingURL=sign-view-board.js.map