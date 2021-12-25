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
import EventEmitter from 'events';
var EventBase = /** @class */ (function (_super) {
    __extends(EventBase, _super);
    function EventBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EventBase.prototype.removeListener = function (eventName, cb) {
        _super.prototype.removeListener.call(this, eventName.toString(), cb);
        return this;
    };
    EventBase.prototype.addListener = function (eventName, cb) {
        _super.prototype.addListener.call(this, eventName.toString(), cb);
        return this;
    };
    EventBase.prototype.emit = function (eventName, args) {
        return _super.prototype.emit.call(this, eventName.toString(), args);
    };
    EventBase.prototype.once = function (eventName, cb) {
        _super.prototype.once.call(this, eventName.toString(), cb);
        return this;
    };
    EventBase.prototype.on = function (eventName, cb) {
        _super.prototype.on.call(this, eventName.toString(), cb);
        return this;
    };
    return EventBase;
}(EventEmitter));
export default EventBase;
//# sourceMappingURL=eventBase2.js.map