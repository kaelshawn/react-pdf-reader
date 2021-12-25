var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import fingerprintjs2 from 'fingerprintjs2';
var oa = (function () {
    var ua = navigator.userAgent.toLowerCase();
    var name = 'Unknown';
    var deviceName = 'Unknown';
    var systemName = 'Unknown';
    var deviceType = '';
    if (ua.indexOf('win') > -1) {
        name = systemName = 'Windows';
    }
    else if (ua.indexOf('iphone') > -1) {
        name = 'iPhone';
        systemName = 'IOS';
    }
    else if (ua.indexOf('ipad') > -1) {
        name = 'iPad';
        systemName = 'IOS';
    }
    else if (ua.indexOf('mac') > -1) {
        name = systemName = 'Mac';
    }
    else if (ua.indexOf('x11') > -1 ||
        ua.indexOf('unix') > -1 ||
        ua.indexOf('sunname') > -1 ||
        ua.indexOf('bsd') > -1) {
        name = systemName = 'Unix';
    }
    else if (ua.indexOf('linux') > -1) {
        if (ua.indexOf('android') > -1) {
            name = systemName = 'Android';
        }
        else {
            name = systemName = 'Linux';
        }
    }
    ua = navigator.userAgent;
    var isWindowsPhone = /(?:Windows Phone)/.test(ua);
    var isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone;
    var isFireFox = /(?:Firefox)/.test(ua);
    var isTablet = /(?:iPad|PlayBook)/.test(ua) ||
        (name == 'Android' && !/(?:Mobile)/.test(ua)) ||
        (isFireFox && /(?:Tablet)/.test(ua));
    var isPc = !(name == 'iPhone') && !(name == 'Android') && !(name == 'iPad') && !isSymbian;
    if (isPc) {
        deviceName = 'pc';
        deviceType = 3;
        if (name == 'Mac') {
            deviceType = 4;
        }
    }
    else if (isTablet) {
        deviceName = 'pad';
        deviceType = 2;
    }
    else if (name == 'iPhone' || name == 'Android') {
        deviceName = 'phone';
        deviceType = 1;
    }
    return { name: name, systemName: systemName, deviceName: deviceName, deviceType: deviceType };
})();
export function getMurmur(f) {
    var _this = this;
    var get = function (resolve) {
        fingerprintjs2.get(f
            ? null
            : {
                excludes: {
                    audio: true,
                    enumerateDevices: true,
                    webgl: true,
                    canvas: true,
                },
            }, function (components) { return __awaiter(_this, void 0, void 0, function () {
            var all, audioFgp, canvasCanvasFgp, cssFontFgp, userAgentFgp, webglFgp, vendorFgp, deviceWidth, deviceHeight, values, _a, _b;
            var _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        all = {};
                        audioFgp = '';
                        canvasCanvasFgp = '';
                        cssFontFgp = '';
                        userAgentFgp = '';
                        webglFgp = '';
                        vendorFgp = '';
                        deviceWidth = 0;
                        deviceHeight = 0;
                        values = components.map(function (component, index) {
                            var key = component.key;
                            all[key] = component.value;
                            if (key == 'audio') {
                                audioFgp = fingerprintjs2.x64hash128(component.value, 31);
                            }
                            else if (key == 'canvas') {
                                canvasCanvasFgp = fingerprintjs2.x64hash128(component.value[1], 31);
                            }
                            else if (key == 'fonts') {
                                cssFontFgp = fingerprintjs2.x64hash128(component.value.join(''), 31);
                            }
                            else if (key == 'userAgent') {
                                vendorFgp = component.value;
                                userAgentFgp = btoa(component.value);
                            }
                            else if (key == 'webgl') {
                                webglFgp = fingerprintjs2.x64hash128(component.value[0], 31);
                            }
                            else if (key == 'screenResolution') {
                                deviceWidth = component.value[0];
                                deviceHeight = component.value[1];
                            }
                            if (index === 0) {
                                return component.value.replace(/\bNetType\/\w+\b/, '');
                            }
                            return component.value;
                        });
                        _a = resolve;
                        if (!f) return [3 /*break*/, 2];
                        _c = {
                            data: all,
                            fgpInfo: {
                                audioFgp: audioFgp,
                                canvasCanvasFgp: canvasCanvasFgp,
                                cssFontFgp: cssFontFgp,
                                userAgentFgp: userAgentFgp,
                                webglFgp: webglFgp,
                                vendorFgp: vendorFgp,
                            }
                        };
                        _d = {};
                        return [4 /*yield*/, getMurmur()];
                    case 1:
                        _b = (_c.deviceInfo = (_d.deviceId = _e.sent(),
                            _d.deviceWidth = deviceWidth,
                            _d.deviceHeight = deviceHeight,
                            _d.deviceSystem = oa.systemName,
                            _d.deviceType = oa.deviceType,
                            _d),
                            _c);
                        return [3 /*break*/, 3];
                    case 2:
                        _b = fingerprintjs2.x64hash128(values.join(''), 31);
                        _e.label = 3;
                    case 3:
                        _a.apply(void 0, [_b]);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return new Promise(function (resolve) {
        if (window.requestIdleCallback) {
            window.requestIdleCallback(function () {
                get(resolve);
            });
        }
        else {
            setTimeout(function () {
                get(resolve);
            }, 500);
        }
    });
}
//# sourceMappingURL=fingerprint.js.map