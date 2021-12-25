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
var Message = /** @class */ (function () {
    function Message() {
        this.options = {
            offset: 20,
            message: '',
            duration: 2000,
            showClose: true,
        };
    }
    Message.prototype.show = function (option) {
        this.options = __assign(__assign({}, this.options), option);
        this.createMessage();
    };
    Message.prototype.createMessage = function () {
        var _this = this;
        if (!this.container) {
            this.container = document.createElement('div');
        }
        this.container.innerHTML = '';
        this.container.className = 'aos-message';
        var icon = document.createElement('i');
        icon.className = 'iconfont';
        if (this.options.offset) {
            this.container.style.top = this.options.offset + "px";
        }
        if (this.options.width) {
            this.container.style.width = this.options.width;
        }
        switch (this.options.type) {
            case 'success':
                icon.classList.add('icon-chenggong');
                this.container.classList.add('aos-message-success');
                break;
            case 'warning':
                icon.classList.add('icon-warning_1');
                this.container.classList.add('aos-message-warn');
                break;
            case 'info':
                icon.classList.add('icon-info');
                this.container.classList.add('aos-message-info');
                break;
            case 'error':
                icon.classList.add('icon-guanbi1');
                this.container.classList.add('aos-message-error');
                break;
            default:
                break;
        }
        this.container.appendChild(icon);
        var message = document.createElement('span');
        message.className = 'aos-message-span';
        message.textContent = this.options.message;
        this.container.appendChild(message);
        if (this.options.showClose) {
            var closeBtn = document.createElement('i');
            closeBtn.className = 'iconfont icon-close message-close';
            closeBtn.addEventListener('click', function () {
                _this.clearTimer();
                _this.dismiss();
            });
            this.container.appendChild(closeBtn);
        }
        document.body.appendChild(this.container);
        this.clearTimer();
        if (this.options.duration) {
            this.timer = setTimeout(function () {
                _this.dismiss();
            }, this.options.duration);
        }
    };
    Message.prototype.clearTimer = function () {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    };
    Message.prototype.dismiss = function () {
        document.body.removeChild(this.container);
    };
    return Message;
}());
export default Message;
//# sourceMappingURL=main.js.map