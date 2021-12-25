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
export var queryStr = function (obj, q) {
    if (obj === void 0) { obj = {}; }
    if (q === void 0) { q = new URLSearchParams(); }
    Object.entries(obj).forEach(function (_a) {
        var k = _a[0], v = _a[1];
        if (Array.isArray(v))
            v.forEach(function (_v) {
                if (_v != null)
                    q.append(k, _v.toString());
            });
        else if (v != null && v !== '')
            q.set(k, v.toString());
    });
    return q.toString();
};
export var queryParse = function (str) {
    if (!str) {
        return {};
    }
    str = decodeURI(str);
    str = str.slice(1);
    var obj = {};
    var arr = str.split('&');
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split('=');
        obj[arr[i][0]] = arr[i][1];
    }
    return obj;
};
export function printLog(str) {
    var axLog = document.querySelector('.ax-log');
    if (!axLog) {
        axLog = document.createElement('div');
        axLog.className = 'ax-log';
        document.body.appendChild(axLog);
    }
    axLog.textContent = str;
}
export function getPxValue(str) {
    return +str.toString().replace(/px/i, '');
}
export function getPxString(value) {
    return value.toString().replace(/px/i, '') + "px";
}
export function addPx(px1, px2, format) {
    var value = +px1.toString().replace(/px/i, '') + +px2.toString().replace(/px/i, '');
    if (format) {
        value = format(value);
    }
    return value;
}
export function getRequest(key, urlStr) {
    var url;
    var theRequest;
    var isLocation = false;
    var prop = '__REQUEST';
    if (typeof urlStr == 'undefined') {
        if (!window[prop]) {
            url = window.location.search;
            isLocation = true;
        }
        else {
            theRequest = window[prop];
        }
    }
    else {
        url = "?" + urlStr.split('?')[1];
    }
    if (url) {
        theRequest = {};
        if (url.indexOf('?') != -1) {
            var strs = url.substr(1).split('&'); // 中文被编码
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1]);
            }
        }
        if (isLocation) {
            window[prop] = theRequest;
        }
    }
    else if (!theRequest) {
        return undefined;
    }
    if (key) {
        return theRequest[key];
    }
    return theRequest;
}
export function switchClass(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className);
    }
    else {
        element.classList.add(className);
    }
}
export function setStyles(element, styles) {
    for (var key in styles) {
        element.style[key] = styles[key];
    }
}
export function createElementInsert(type, parentElement, classNames, attrs, ref) {
    if (ref === void 0) { ref = null; }
    ref = ref || parentElement.firstChild;
    return parentElement.insertBefore(createElement(type, classNames, attrs), ref);
}
export function createElementTo(type, parentElement, classNames, attrs) {
    return parentElement.appendChild(createElement(type, classNames, attrs));
}
export function createElement(type, classNames, attrs) {
    var element = document.createElement(type);
    if (typeof classNames === 'string') {
        element.className = classNames;
    }
    else if (classNames) {
        classNames.forEach(function (className) {
            if (className) {
                element.classList.add(className);
            }
        });
    }
    if (attrs) {
        for (var key in attrs) {
            var value = attrs[key];
            if (key === 'style' && typeof value === 'object') {
                value = cssToString(value);
            }
            element.setAttribute(key, value);
        }
    }
    return element;
}
export function cssToString(styleObj) {
    function createParser(matcher, replacer) {
        var regex = RegExp(matcher, 'g');
        return function (string) {
            if (!string.match(regex)) {
                return string;
            }
            return string.replace(regex, replacer);
        };
    }
    var camelToKebab = createParser(/[A-Z]/, function (match) { return "-" + match.toLowerCase(); });
    var lines = Object.keys(styleObj).map(function (property) { return camelToKebab(property) + ": " + styleObj[property] + ";"; });
    return lines.join('\n');
}
export function fileToBase64(file) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function (ev) {
                        var dataURL = ev.target.result || '';
                        resolve(dataURL.toString());
                    };
                })];
        });
    });
}
export function toJson(str, defValue) {
    try {
        return JSON.parse(str);
    }
    catch (error) {
        if (defValue) {
            return defValue;
        }
        return str;
    }
}
export function emptyElement(elem) {
    while (elem.hasChildNodes()) {
        elem.removeChild(elem.firstChild);
    }
}
export function getElementById(id) {
    return document.getElementById(id);
}
export function base64ToImg(base64) {
    if (/,/.test(base64)) {
        return base64;
    }
    return "data:image/png;base64," + base64;
}
export function hide(element) {
    element.style.display = 'none';
}
export function show(element, orign) {
    if (orign === void 0) { orign = 'block'; }
    element.style.display = element.getAttribute('data-display') || orign;
}
export function closestByClassName(element, className) {
    var query = function (element) {
        if (element.classList.contains(className)) {
            return element;
        }
        if (element.parentElement) {
            return query(element.parentElement);
        }
        return null;
    };
    return query(element);
}
export function copyParse(value) {
    return JSON.parse(JSON.stringify(value));
}
export function dateFormat(date, fmt) {
    var ret;
    var opt = {
        'y+': date.getFullYear().toString(),
        'm+': (date.getMonth() + 1).toString(),
        'd+': date.getDate().toString(),
        'H+': date.getHours().toString(),
        'M+': date.getMinutes().toString(),
        'S+': date.getSeconds().toString(), // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (var k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
        }
    }
    return fmt;
}
//# sourceMappingURL=tools.js.map