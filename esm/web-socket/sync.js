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
 @param isAsync -[boolean] 是否开启定期检查所有用户是否在线, 这可能消耗服务器的性能？
 @param tag -[boolean] 是否开启离线消息的处理
 @param id -[string|number] 用户id
 @param url -[string] ws地址
*/
var WsClient = /** @class */ (function (_super) {
    __extends(WsClient, _super);
    function WsClient(props) {
        var _this = _super.call(this) || this;
        var hostname = document.location.hostname;
        var module = 'sync';
        var id = (_this.id = props.id || 'notify');
        _this.protocols = props.protocols || 'i-signing-notify';
        var url = props.url || "ws://" + hostname + ":8808";
        var config = { module: module, id: id };
        if (props.isMaster) {
            config.isMaster = 1;
        }
        if (props.tag) {
            config.tag = 1;
        }
        if (props.isAsync) {
            config.async = 1;
            _this.isAsync = true;
        }
        if (props.width) {
            config.width = props.width;
        }
        if (props.height) {
            config.height = props.height;
        }
        _this.socketUrl = url + "/?" + queryStr(config);
        console.log(id + ": socket \u8FDE\u63A5\u4E2D...");
        _this.start();
        return _this;
    }
    WsClient.prototype.send = function (value, isBuffer) {
        if (this.wsClient.readyState == 1) {
            var v = isBuffer ? encode(value) : typeof value == 'object' ? JSON.stringify(value) : value;
            this.wsClient.send(v);
        }
        else {
            this.emit('sendFail', this.wsClient.readyState);
        }
    };
    WsClient.prototype.start = function (isReset) {
        var _this = this;
        if (isReset === void 0) { isReset = false; }
        if (isReset && !this.wsClient)
            return;
        var openCallback = function () {
            console.log(_this.id + ': ' + (isReset ? '重新连接成功' : '连接成功...'));
            _this.emit('open', isReset);
        };
        var closeCallback = function () {
            if (_this.heartbeatTimer) {
                clearInterval(_this.heartbeatTimer);
                _this.heartbeatTimer = null;
            }
            console.log(_this.id + ": \u8FDE\u63A5\u88AB\u5173\u95ED...");
            _this.emit('close');
            setTimeout(function () {
                _this.start(true);
            }, 3000);
        };
        var handler = function (message) {
            if (message === null || message === void 0 ? void 0 : message.data) {
                if (typeof message.data == 'string') {
                    try {
                        var data = JSON.parse(message.data);
                        if (data.type == 'start') {
                            if (_this.heartbeatTimer) {
                                clearInterval(_this.heartbeatTimer);
                                _this.heartbeatTimer = null;
                            }
                            _this.heartbeatTimer = setInterval(function () {
                                _this.wsClient.send(JSON.stringify({
                                    type: _this.isAsync ? 'ping' : 'heartbeat',
                                }));
                            }, _this.isAsync ? 2000 : 30000);
                        }
                        else if (data.type == 'offline') {
                            // console.log('对方离线了');
                            _this.emit(data.type, data.value);
                        }
                        else if (data.type == 'online') {
                            // console.log('对方上线了');
                            _this.emit(data.type, data.value);
                        }
                        else if (data.type == 'tick') {
                            _this.wsClient.send(JSON.stringify({
                                type: 'receipt',
                                value: data.value,
                            }));
                        }
                        else {
                            _this.emit('message', data);
                        }
                    }
                    catch (e) {
                        _this.emit('message', message.data);
                    }
                }
                else {
                    _this.emit('message', decode(new Uint8Array(message.data)));
                    _this.emit('buffer', message.data);
                }
            }
        };
        if (this.wsClient) {
            this.wsClient.removeEventListener('message', handler);
        }
        this.wsClient = new Client(this.socketUrl, this.protocols);
        this.wsClient.binaryType = 'arraybuffer';
        this.wsClient.onopen = openCallback;
        this.wsClient.onclose = closeCallback;
        this.wsClient.addEventListener('message', handler);
    };
    WsClient.prototype.close = function () {
        if (this.wsClient) {
            this.wsClient.close();
            this.wsClient = null;
        }
    };
    return WsClient;
}(EventEmitter));
export default WsClient;
//# sourceMappingURL=sync.js.map