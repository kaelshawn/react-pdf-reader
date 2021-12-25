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
import SignToolsBar from '../signToolBar/main';
import SignSampleBar from '../signToolBar/sample';
import { getMurmur } from '../utils/fingerprint';
var SignBoard = /** @class */ (function () {
    function SignBoard() {
        this.points = [];
        /**
         * 屏幕是否旋转
         */
        this.isRotate = false;
        this.events = {};
        this.murmurInfo = {};
        this.fakePressure = true;
        this.maxPressure = 1;
    }
    Object.defineProperty(SignBoard.prototype, "thickness", {
        get: function () {
            return this.options.thickness;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SignBoard.prototype, "isPortrait", {
        get: function () {
            return this.isRotate || false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SignBoard.prototype, "color", {
        get: function () {
            return this.options.color || 'black';
        },
        set: function (color) {
            this.options.color = color;
            if (this.bs) {
                this.bs.color = color;
            }
        },
        enumerable: false,
        configurable: true
    });
    SignBoard.prototype.orientationChange = function () {
        var _this = this;
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
        this.timeoutId = setTimeout(function () {
            // this.changeCanvas();
            _this.createCanvas();
            _this.changeCanvas();
        }, 300);
    };
    SignBoard.prototype.init = function (options) {
        var _this = this;
        this.options = __assign({ throttle: 20, thickness: 4 }, options);
        this.container = this.options.container;
        if (typeof this.options.fakePressure !== 'undefined') {
            this.fakePressure = this.options.fakePressure;
        }
        if (typeof this.options.maxPressure != 'undefined') {
            this.maxPressure = Math.max(this.options.maxPressure, 1);
        }
        var isOrientation = window.orientation != undefined;
        this.container.classList.add(this.options.className || (isOrientation ? 'aos-sign-board' : 'aos-pc-sign-board'));
        this.isRotate =
            this.options.forceRotate != undefined
                ? this.options.forceRotate
                : window.orientation != undefined && window.innerWidth < window.innerHeight;
        this.listener = document.createElement('div');
        this.signView = document.createElement('div');
        this.canvas = document.createElement('canvas');
        this.bgView = document.createElement('div');
        this.signView.className = 'sign-view';
        this.listener.setAttribute('touch-action', 'none');
        this.listener.className = 'listener';
        // 传入背景
        this.listener.appendChild(this.canvas);
        this.signView.appendChild(this.listener);
        this.container.appendChild(this.signView);
        this.createBgView(this.options.bgContent);
        this.container.appendChild(this.bgView);
        this.createCanvas();
        this.crateToolsBar();
        this.updateSize();
        window.addEventListener('orientationchange', this.orientationChange.bind(this));
        if (!this.options.enabled) {
            this.disable();
        }
        getMurmur(true).then(function (e) {
            _this.murmurInfo = e;
            _this.onEvent('loaded', _this.getSignInfo());
        });
        return this;
    };
    SignBoard.prototype.changeCanvas = function () {
        this.clean();
        // this.isRotate = window.orientation !== 90 && window.orientation !== -90;
        this.isRotate =
            this.options.forceRotate != undefined
                ? this.options.forceRotate
                : window.orientation != undefined && window.innerWidth < window.innerHeight;
        this.rotate();
    };
    SignBoard.prototype.updateSize = function () {
        if (this.isRotate) {
            this.container.setAttribute('org-width', this.container.clientWidth.toString());
            this.container.setAttribute('org-height', this.container.clientHeight.toString());
            this.rotate();
        }
        else {
            this.container.setAttribute('org-width', this.container.clientHeight.toString());
            this.container.setAttribute('org-height', this.container.clientWidth.toString());
            this.updateCanvasSize();
        }
    };
    SignBoard.prototype.updateCanvasSize = function () {
        this.canvas.setAttribute('width', this.listener.clientWidth + "px");
        this.canvas.setAttribute('height', this.listener.clientHeight + "px");
        this.createCanvas();
    };
    SignBoard.prototype.createCanvas = function () {
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
                color: this.color,
            }));
            var ds = (this.ds = new DOMPointerStream({
                dom: this.listener,
            }));
            var ts = (this.ts = new Transform({
                objectMode: true,
                transform: function (_chunk, _, callback) {
                    var width = _this.listener.clientHeight;
                    var chunk = _chunk;
                    if (_this.isRotate) {
                        chunk = __assign(__assign({}, chunk), { x: chunk.y, y: width - chunk.x });
                    }
                    _this.points.push(chunk);
                    _this.onEvent('onPushPoint', chunk);
                    _this.onEvent('onChange', _this.points, chunk);
                    if (_this.options.bgContent == undefined)
                        _this.bgView.style.display = 'none';
                    return callback(null, chunk);
                },
            }));
            ds.pipe(ts);
            ts.pipe(ps);
            ps.pipe(bs);
            // ts.on('data', (e: any) => {
            //   console.log('c', e);
            //   this.points.push(e);
            //   this.onEvent('onChange', this.points, e);
            //   if (this.options.bgContent == undefined) this.bgView.style.display = 'none';
            // });
            // window.addEventListener('resize', () => {});
        }
        catch (e) {
            ctx.fillText(e.message, 10, 10);
        }
    };
    SignBoard.prototype.getCanvase = function () {
        return this.canvas;
    };
    SignBoard.prototype.createBgView = function (bgContent) {
        this.bgView = document.createElement('div');
        this.bgView.className = 'bg-view';
        this.changeBgContent(bgContent);
    };
    SignBoard.prototype.changeBgContent = function (bgContent) {
        this.bgView.innerHTML = '';
        this.options.bgContent = bgContent;
        // 传入背景
        if (bgContent != undefined) {
            if (typeof bgContent == 'string') {
                this.bgView.textContent = bgContent;
            }
            else {
                this.bgView.appendChild(bgContent);
            }
        }
        else {
            this.bgView.textContent = '签字区';
        }
    };
    SignBoard.prototype.crateToolsBar = function () {
        if (this.options.toolsBar === 'SIGN_TOOLS_BAR') {
            this.toolsBar = new SignToolsBar(this).init(this.options.toolsBarConfig);
        }
        else if (this.options.toolsBar === 'SING_SAMPLE_BAR') {
            this.toolsBar = new SignSampleBar(this).init(this.options.toolsBarConfig);
        }
        else if (typeof this.options.toolsBar === 'function') {
            this.toolsBar = this.options.toolsBar({
                signer: this,
            });
        }
    };
    SignBoard.prototype.rotate = function () {
        var _this = this;
        var orgWidth = +this.container.attributes.getNamedItem('org-width').value;
        var orgHeight = +this.container.attributes.getNamedItem('org-height').value;
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
    SignBoard.prototype.clean = function () {
        var ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.points.splice(0);
        this.bgView.style.display = 'block';
        this.onEvent('onChange', []);
    };
    SignBoard.prototype.disable = function () {
        if (!this.signMask) {
            this.signMask = document.createElement('div');
            this.signMask.className = 'mask-layer';
            this.container.appendChild(this.signMask);
        }
    };
    SignBoard.prototype.addEventListener = function (eventName, cb) {
        if (!this.events[eventName]) {
            this.events[eventName] = [cb];
        }
        else {
            this.events[eventName].push(cb);
        }
    };
    SignBoard.prototype.onEvent = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.events[eventName]) {
            this.events[eventName].forEach(function (cb) {
                cb.apply(void 0, args);
            });
        }
    };
    SignBoard.prototype.dataUrl = function (type, quality) {
        if (type === void 0) { type = 'image/png'; }
        return this.canvas.toDataURL(type, quality);
    };
    SignBoard.prototype.getBoardSize = function () {
        return {
            width: this.listener.clientWidth,
            height: this.listener.clientHeight,
        };
    };
    /**
     * 获取标准的签字信息
     * 包括点位信息、
     */
    SignBoard.prototype.getSignInfo = function () {
        return {
            data: this.points,
            deviceInfo: __assign(__assign({}, this.murmurInfo.deviceInfo), { deviceWidth: this.listener.clientWidth, deviceHeight: this.listener.clientHeight, deviceSamplingRate: 0 }),
            fgpInfo: __assign({}, this.murmurInfo.fgpInfo),
        };
    };
    SignBoard.prototype.getSignDetails = function () {
        return {
            deviceInfo: __assign(__assign({}, this.murmurInfo.deviceInfo), { deviceWidth: this.listener.clientWidth, deviceHeight: this.listener.clientHeight, deviceSamplingRate: 0 }),
            fgpInfo: __assign({}, this.murmurInfo.fgpInfo),
            signData: {
                color: this.color,
                fakePressure: this.fakePressure,
                handWrittings: this.points,
                height: this.signView.clientWidth,
                width: this.signView.clientWidth,
                pMin: 0,
                pMax: 1,
                signPlateW: this.listener.clientHeight,
                signPlateH: this.listener.clientWidth,
                sourceH: this.listener.clientHeight,
                sourceW: this.listener.clientWidth,
                thickness: this.thickness || 4,
            },
        };
    };
    SignBoard.prototype.clear = function () {
        if (this.ps) {
            this.ps.destroy();
        }
    };
    SignBoard.prototype.destory = function () {
        window.removeEventListener('orientationchange', this.orientationChange);
        this.clear();
    };
    return SignBoard;
}());
export default SignBoard;
// export default SignBoard;
//# sourceMappingURL=main.js.map