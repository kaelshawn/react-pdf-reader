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
import axios from 'axios';
import md5 from 'blueimp-md5';
import { merge } from 'lodash-es';
import qs from 'qs';
export function _persist(storage) {
    if (storage === void 0) { storage = localStorage; }
    return function decorator(target, key) {
        var className = target.constructor.name || 'persist';
        var itemName = md5(className + "-" + key);
        return {
            enumerable: true,
            configurable: true,
            set: function (v) {
                if (v === '' || typeof v === 'undefined') {
                    storage.removeItem(itemName);
                    return;
                }
                storage.setItem(itemName, JSON.stringify(v));
            },
            get: function () {
                var v = storage.getItem(itemName);
                if (v) {
                    return JSON.parse(v);
                }
                return null;
            },
        };
    };
}
var _apiConfig = {
    host: '',
};
export function setConfig(value) {
    _apiConfig = value;
}
export function waterfallReducer(that) {
    var _this = this;
    return function (p, fn) { return __awaiter(_this, void 0, void 0, function () {
        var last, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, p];
                case 1:
                    last = _a.sent();
                    return [4 /*yield*/, fn.call(that, last)];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, __assign(__assign({}, last), result)];
            }
        });
    }); };
}
function getAuthConfig(config) {
    var result = {};
    var headers = {};
    if ((config === null || config === void 0 ? void 0 : config.clientId) && (config === null || config === void 0 ? void 0 : config.clientSecret)) {
        headers.Authorization = "Basic " + btoa(config.clientId + ":" + config.clientSecret);
    }
    Object.keys(headers).forEach(function (key) {
        if (headers[key] === undefined) {
            delete headers[key];
        }
    });
    result.headers = headers;
    return result;
}
function getConfig(opts) {
    var headers = (opts === null || opts === void 0 ? void 0 : opts.headers) || _apiConfig.headers || {};
    headers['Content-Type'] = (opts === null || opts === void 0 ? void 0 : opts.contentType) || 'application/json';
    var result = {
        timeout: Number.isNaN(opts === null || opts === void 0 ? void 0 : opts.timeout) ? 200000 : (opts === null || opts === void 0 ? void 0 : opts.timeout) || 200000,
        headers: headers,
    };
    if (sessionStorage.getItem('aos_token')) {
        result.headers.Authorization = "Bearer " + sessionStorage.getItem('aos_token');
    }
    if ((opts === null || opts === void 0 ? void 0 : opts.isFile) || (opts === null || opts === void 0 ? void 0 : opts.isDownLoad)) {
        result.responseType = 'blob';
    }
    return result;
}
function create(promise) {
    var _this = this;
    var instance = axios.create();
    instance.interceptors.response.use((function (res) { return __awaiter(_this, void 0, void 0, function () {
        var disposition, fileName_1, arrs;
        return __generator(this, function (_a) {
            if (promise.opts.isDownLoad) {
                disposition = res.headers['content-disposition'];
                fileName_1 = Date.now().toString();
                if (disposition) {
                    arrs = disposition.split(';');
                    arrs.forEach(function (item) {
                        var itemArr = item.split('=');
                        if (itemArr[0] === 'filename' && itemArr.length > 1) {
                            fileName_1 = decodeURI(itemArr[1]);
                        }
                    });
                }
                promise.resolve({
                    code: 200,
                    fileName: fileName_1,
                    fileData: res.data,
                });
                return [2 /*return*/];
            }
            if (!promise.opts.ignoreErr &&
                res.data.code &&
                res.data.code != '200' &&
                res.data.code != '0' &&
                res.data.code != '1') {
                promise.reject({
                    message: res.data.msg || '请求失败',
                    data: res.data.data,
                });
                return [2 /*return*/];
            }
            promise.resolve(res.data);
            return [2 /*return*/];
        });
    }); }), function (error) { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            if (((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status) == 401) {
                error.message = '登录已过期';
            }
            else if (error.code == 'ECONNABORTED') {
                error.message = '当前网络异常';
            }
            promise.reject(error);
            return [2 /*return*/];
        });
    }); });
    return instance;
}
function requestFail(failFun) {
    var _this = this;
    return function (error) { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            if (((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
                error.message = '登录已过期';
                error.code = 401;
            }
            failFun(error);
            return [2 /*return*/];
        });
    }); };
}
function get(opts) {
    return new Promise(function (resolve, reject) {
        var params = '';
        if (opts.data) {
            params = "?" + qs.stringify(opts.data);
        }
        var instance;
        var url;
        if ((opts === null || opts === void 0 ? void 0 : opts.host) != undefined) {
            url = "" + opts.host + opts.url;
        }
        else {
            url = "" + _apiConfig.host + opts.url;
        }
        var startFun = function () {
            instance.get("" + url + params, merge(getConfig(opts), getAuthConfig(opts === null || opts === void 0 ? void 0 : opts.thirdOpts)));
        };
        instance = create({
            resolve: resolve,
            reject: requestFail(reject),
            opts: opts,
        });
        startFun();
    });
}
function post(opts) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var instance;
                    var url;
                    if ((opts === null || opts === void 0 ? void 0 : opts.host) != undefined) {
                        url = "" + opts.host + opts.url;
                    }
                    else {
                        url = "" + _apiConfig.host + opts.url;
                    }
                    if (opts.query) {
                        var params = '';
                        if (opts.data) {
                            params = "?" + qs.stringify(opts.data);
                        }
                        url = "" + url + params;
                    }
                    var data = opts.data;
                    if (!(data instanceof URLSearchParams)) {
                        data = JSON.stringify(data);
                    }
                    else {
                        opts.contentType = 'application/x-www-form-urlencoded';
                    }
                    var startFun = function () {
                        instance.post(url, data, merge(getConfig(opts), getAuthConfig(opts === null || opts === void 0 ? void 0 : opts.thirdOpts)));
                    };
                    instance = create({
                        resolve: resolve,
                        reject: requestFail(reject),
                        opts: opts,
                    });
                    startFun();
                })];
        });
    });
}
function _delete(opts) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var instance;
                    var params = '';
                    if (opts.data) {
                        params = "?" + qs.stringify(opts.data);
                    }
                    var url;
                    if ((opts === null || opts === void 0 ? void 0 : opts.host) != undefined) {
                        url = "" + opts.host + opts.url;
                    }
                    else {
                        url = "" + _apiConfig.host + opts.url;
                    }
                    var startFun = function () {
                        instance.delete("" + url + params, getConfig());
                    };
                    instance = create({
                        resolve: resolve,
                        reject: requestFail(reject),
                        opts: opts,
                    });
                    startFun();
                })];
        });
    });
}
function put(opts) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var url;
                    if ((opts === null || opts === void 0 ? void 0 : opts.host) != undefined) {
                        url = "" + opts.host + opts.url;
                    }
                    else {
                        url = "" + _apiConfig.host + opts.url;
                    }
                    if (opts.query) {
                        var params = '';
                        if (opts.data) {
                            params = "?" + qs.stringify(opts.data);
                        }
                        url = "" + url + params;
                    }
                    var instance;
                    var startFun = function () {
                        instance.put(url, JSON.stringify(opts.data), getConfig());
                    };
                    instance = create({
                        resolve: resolve,
                        reject: requestFail(reject),
                        opts: opts,
                    });
                    startFun();
                })];
        });
    });
}
function form(opts) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var formdata1 = new FormData();
                    for (var attr in opts.data) {
                        if ({}.hasOwnProperty.call(opts.data, attr)) {
                            formdata1.append(attr, opts.data[attr]);
                        }
                    }
                    if (opts.file) {
                        formdata1.append('file', opts.file, opts.file.name);
                    }
                    var instance = create({
                        resolve: resolve,
                        reject: requestFail(reject),
                        opts: opts,
                    });
                    var requestConfig = getConfig(opts);
                    requestConfig.headers['Content-Type'] = 'multipart/form-data';
                    requestConfig.onUploadProgress = function (e) {
                        if (opts.onUploadProgress) {
                            opts.onUploadProgress(e);
                        }
                    };
                    var url;
                    if ((opts === null || opts === void 0 ? void 0 : opts.host) != undefined) {
                        url = "" + opts.host + opts.url;
                    }
                    else {
                        url = "" + _apiConfig.host + opts.url;
                    }
                    instance.post("" + url, formdata1, requestConfig);
                })];
        });
    });
}
var Axios = {
    get: get,
    post: post,
    form: form,
    put: put,
    delete: _delete,
};
export default Axios;
export function AxiosInstance(props) {
    if (props === void 0) { props = { host: '' }; }
    var cloneAxios = __assign({}, Axios);
    var targetAxios = {};
    var keys = Object.keys(cloneAxios);
    var _loop_1 = function (key) {
        targetAxios[key] = function (opts) {
            return cloneAxios[key](__assign(__assign({}, props), opts));
        };
    };
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        _loop_1(key);
    }
    return targetAxios;
}
//# sourceMappingURL=utils.js.map