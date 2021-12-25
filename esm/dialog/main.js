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
import Button from '../signToolBar/button';
import loading from '../../assets/img/loading-2.gif';
var Dialog = /** @class */ (function () {
    function Dialog() {
        this.options = {
            width: '60%',
        };
    }
    Dialog.prototype.loading = function (option) {
        this.options = __assign({}, option);
        this.createLoading();
    };
    Dialog.prototype.confirm = function (option) {
        this.options = __assign(__assign({}, this.options), option);
        this.createConfirm();
        return this;
    };
    Dialog.prototype.createConfirm = function () {
        this.createContainer();
        var confirmContainer = document.createElement('div');
        confirmContainer.className = 'dialog-confirm-container';
        if (this.options.width) {
            confirmContainer.style.width = this.options.width;
        }
        if (this.options.height) {
            confirmContainer.style.height = this.options.height;
        }
        if (this.options.title || this.options.showClose) {
            confirmContainer.appendChild(this.createTitle());
        }
        confirmContainer.appendChild(this.createBody());
        confirmContainer.appendChild(this.createFooter());
        this.container.appendChild(confirmContainer);
        document.body.appendChild(this.container);
    };
    Dialog.prototype.createTitle = function () {
        var _this = this;
        var titleContainer = document.createElement('div');
        titleContainer.className = 'dialog-title';
        var titleEle = document.createElement('div');
        titleEle.textContent = this.options.title || '';
        titleEle.className = 'dialog-title-text';
        titleContainer.appendChild(titleEle);
        if (this.options.showClose) {
            var closeEle = document.createElement('i');
            closeEle.className = 'iconfont icon-close dialog-title-icon';
            closeEle.addEventListener('click', function () {
                if (_this.options.onClose)
                    _this.options.onClose();
            });
            titleContainer.appendChild(closeEle);
        }
        return titleContainer;
    };
    Dialog.prototype.createBody = function () {
        var body = document.createElement('div');
        body.className = 'dialog-content';
        if (this.options.info instanceof HTMLElement) {
            body.appendChild(this.options.info);
            return body;
        }
        body.textContent = this.options.info || '';
        return body;
    };
    Dialog.prototype.createFooter = function () {
        var _this = this;
        var footer = document.createElement('div');
        footer.className = 'dialog-footer';
        if (!this.options.hideCancel) {
            var cancelBtn = Button.create({
                text: this.options.cancelText || '取消',
                onClick: function () {
                    if (_this.options.onClose)
                        _this.options.onClose();
                },
            });
            footer.appendChild(cancelBtn);
        }
        var okBtn = Button.create({
            type: 'primary',
            text: this.options.okText || '确定',
            onClick: function () {
                if (_this.options.onOk)
                    _this.options.onOk();
            },
        });
        footer.appendChild(okBtn);
        return footer;
    };
    Dialog.prototype.createContainer = function () {
        this.container = document.createElement('div');
        this.container.className = 'dialog-body';
    };
    Dialog.prototype.createLoading = function () {
        this.createContainer();
        var loadingContainer = document.createElement('div');
        loadingContainer.className = 'dialog-loading-content';
        var loadingImg = document.createElement('img');
        loadingImg.src = loading;
        loadingContainer.appendChild(loadingImg);
        if (this.options.info instanceof HTMLElement) {
            loadingContainer.appendChild(this.options.info);
        }
        else {
            var noteElement = document.createElement('div');
            noteElement.className = 'dialog-loading-note';
            noteElement.textContent = this.options.info || '';
            loadingContainer.appendChild(noteElement);
        }
        this.container.appendChild(loadingContainer);
        document.body.appendChild(this.container);
    };
    Dialog.prototype.close = function () {
        var _a;
        this.options = {};
        if (this.container) {
            if (!this.container.parentElement) {
                debugger;
            }
            (_a = this.container.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(this.container);
        }
    };
    return Dialog;
}());
export default Dialog;
//# sourceMappingURL=main.js.map