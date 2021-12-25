var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import _ from 'lodash';
var EventBase = /** @class */ (function () {
    function EventBase() {
        this.events = {};
    }
    EventBase.prototype.emit = function (eventName) {
        var _this = this;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        if (this.events[eventName]) {
            this.events[eventName].forEach(function (event) {
                event.apply(void 0, __spreadArray([_this], params));
            });
        }
    };
    EventBase.prototype.removeEventListener = function (eventName, cb) {
        if (this.events[eventName]) {
            _.remove(this.events[eventName], cb);
        }
    };
    EventBase.prototype.addEventListener = function (eventName, cb) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(cb);
    };
    return EventBase;
}());
export default EventBase;
//# sourceMappingURL=eventBase.js.map