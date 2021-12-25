import { remove } from 'lodash';
var PostMessage = /** @class */ (function () {
    function PostMessage(target, targetOrigin) {
        var _this = this;
        this.messageCallBacks = [];
        this.targetOrigin = targetOrigin || '*';
        this.target = target;
        if (window['passMessageEvent']) {
            window.removeEventListener('message', window['passMessageEvent']);
        }
        window['passMessageEvent'] = function (e) {
            var _a;
            (_a = _this.messageCallBacks) === null || _a === void 0 ? void 0 : _a.forEach(function (item) {
                if (item.name === e.data.name) {
                    item.cb(e.data.value);
                }
            });
        };
        window.addEventListener('message', window['passMessageEvent']);
    }
    PostMessage.prototype.sendReady = function () {
        this.send('ready');
        return this;
    };
    PostMessage.prototype.send = function (name, value) {
        try {
            this.target.postMessage({
                name: name,
                value: value,
            }, this.targetOrigin);
        }
        catch (error) {
            console.error(error);
        }
    };
    PostMessage.prototype.message = function (name, cb) {
        this.messageCallBacks.push({
            name: name,
            cb: cb,
        });
        return this;
    };
    PostMessage.prototype.once = function (name, cb) {
        this.remove(name);
        return this.message(name, cb);
    };
    PostMessage.prototype.remove = function (name) {
        remove(this.messageCallBacks, function (item) {
            return item.name === name;
        });
    };
    return PostMessage;
}());
export default PostMessage;
//# sourceMappingURL=post-message.js.map