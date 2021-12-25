// export { default as UserService } from './userService';
// export { default as SignService } from './signService';
import userService from './userService';
import signService from './signService';
import sealService from './sealService';
import utils, { setConfig } from './utils';
var timeid = null;
var refersh = function () {
    timeid && clearTimeout(timeid);
    if (userService.isLogin) {
        if (userService.expire < Date.now() + 10 * 60 * 1000) {
            userService
                .refresh()
                .then(function () {
                timeid = setTimeout(function () {
                    refersh();
                }, 60 * 1000);
            })
                .catch(function () {
                timeid = setTimeout(function () {
                    refersh();
                }, 10 * 1000);
            });
            return;
        }
    }
    timeid = setTimeout(function () {
        refersh();
    }, 10 * 1000);
};
function toApiConfig(value) {
    var result = {
        host: '',
    };
    if (typeof value === 'string') {
        result.host = value;
    }
    else if (value === null) {
        value = { host: '' };
    }
    else {
        result = value;
    }
    if (!result.host) {
        result.host = process.env.host || '';
    }
    if (Array.isArray(process.env.headers)) {
        var missHeader = process.env.headers.find(function (header) { return !result.headers || !result.headers[header]; });
        if (missHeader) {
            throw new Error("\u521D\u59CB\u5316\u5931\u8D25\uFF0C\u7F3A\u5C11\u5FC5\u8981\u53C2\u6570\u300A" + missHeader + "\u300B");
        }
    }
    return result;
}
export var init = function (props, cb) {
    if (props === void 0) { props = ''; }
    setConfig(toApiConfig(props));
    cb({
        userService: userService,
        signService: signService,
        sealService: sealService,
    });
    refersh();
};
export function setHeader(Headers) {
    setConfig(Headers);
}
export var get = utils.get;
export var post = utils.post;
//# sourceMappingURL=index.js.map