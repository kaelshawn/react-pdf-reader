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
import { decode, encode } from 'msgpack-lite';
import { w3cwebsocket as Client } from 'websocket';
import { queryStr } from '../utils/tools';
/*
 @param tag -[string|number] 用户标签，用于处理离线消息
 @param url -[string] ws地址
*/
var WsClient = /** @class */ (function (_super) {
    __extends(WsClient, _super);
    // private tag: any;
    function WsClient(props) {
        var _this = _super.call(this) || this;
        var host = document.location.host;
        var module = 'notify';
        _this.protocols = props.protocols || 'i-signing-notify';
        // this.tag = props.tag != undefined ? props.tag : false;
        var config = { module: module };
        _this.socketUrl = (props.url || host) + "/?" + queryStr(config);
        console.log('socket 连接中...');
        _this.start();
        return _this;
    }
    WsClient.prototype.connect = function (eventName, tag) {
        var _this = this;
        this.setConnect(eventName, true, tag);
        var handler = function (message) {
            if (message === null || message === void 0 ? void 0 : message.data) {
                if (typeof message.data == 'string') {
                    var msgValue = JSON.parse(message.data);
                    if (msgValue.name == eventName) {
                        _this.emit('message', msgValue.value);
                        if (tag && msgValue.id) {
                            _this.wsClient.send(JSON.stringify({
                                type: 'receipt',
                                id: msgValue.__id,
                            }));
                        }
                    }
                }
                else {
                    var msgValue = decode(new Uint8Array(message.data));
                    if (msgValue[0] == eventName) {
                        _this.emit('message', msgValue[1]);
                        if (tag && msgValue[3]) {
                            _this.wsClient.send(JSON.stringify({
                                type: 'receipt',
                                id: msgValue[3],
                            }));
                        }
                    }
                }
            }
        };
        this.wsClient.removeEventListener('message', handler);
        this.wsClient.addEventListener('message', handler);
        var unloadCallback = function () {
            if (!_this.wsClient)
                return;
            _this.setConnect(eventName, false, tag);
            _this.wsClient.close();
        };
        window.removeEventListener('beforeunload', unloadCallback);
        window.addEventListener('beforeunload', unloadCallback);
        var reflects = {
            send: function (value, isBuffer) {
                if (isBuffer === void 0) { isBuffer = false; }
                if (_this.wsClient.readyState == 1) {
                    var v = isBuffer
                        ? encode([eventName, value, tag])
                        : JSON.stringify({
                            name: eventName,
                            value: value,
                            tag: tag,
                        });
                    _this.wsClient.send(v);
                }
                return reflects;
            },
            clear: function () {
                _this.setConnect(eventName, false, tag);
                return reflects;
            },
        };
        return reflects;
    };
    WsClient.prototype.setConnect = function (eventName, isAdd, tag) {
        if (isAdd === void 0) { isAdd = true; }
        if (this.wsClient.readyState == 1) {
            var statusName = isAdd ? 'online' : 'offline';
            this.wsClient.send(JSON.stringify({ type: statusName, name: eventName, tag: tag }));
        }
    };
    WsClient.prototype.start = function (isReset) {
        var _this = this;
        if (isReset === void 0) { isReset = false; }
        var openCallback = function () {
            console.log(isReset ? '重新连接成功' : '连接成功...');
            if (_this.heartbeatTimer) {
                clearInterval(_this.heartbeatTimer);
                _this.heartbeatTimer = null;
            }
            _this.heartbeatTimer = setInterval(function () {
                _this.wsClient.send('heartbeat');
            }, 30000);
            _this.emit('open', isReset);
        };
        var closeCallback = function () {
            if (_this.heartbeatTimer) {
                clearInterval(_this.heartbeatTimer);
                _this.heartbeatTimer = null;
            }
            console.log('连接被关闭...');
            _this.emit('close');
            setTimeout(function () {
                _this.start(true);
            }, 3000);
        };
        this.wsClient = new Client(this.socketUrl, this.protocols);
        this.wsClient.binaryType = 'arraybuffer';
        this.wsClient.onopen = openCallback;
        this.wsClient.onclose = closeCallback;
    };
    return WsClient;
}(EventEmitter));
export default WsClient;
//# sourceMappingURL=notification.js.map