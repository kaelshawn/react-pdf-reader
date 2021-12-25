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
var ToolBar = /** @class */ (function () {
    function ToolBar() {
        this.options = {
            hasSeal: true,
            signType: 'SIGN_TEMPLATE',
            container: document.body,
        };
        this.signModule = '';
    }
    ToolBar.prototype.init = function (option) {
        this.options = __assign(__assign({}, this.options), option);
        this.create();
        return this;
    };
    ToolBar.prototype.switchOperateStatus = function (status) {
        this.switchBtnStatus(this.btnSubmitStart, status);
        this.switchBtnStatus(this.btnSubmitSign, status);
        this.switchBtnStatus(this.btnSign, status);
        this.switchBtnStatus(this.btnSeal, status);
    };
    ToolBar.prototype.switchBtnStatus = function (ele, status) {
        if (ele) {
            if (status) {
                ele.removeAttribute('disabled');
                return;
            }
            ele.setAttribute('disabled', 'disabled');
        }
    };
    ToolBar.prototype.create = function () {
        this.options.container.classList.add('tool-bar-container');
        var container = document.createElement('div');
        container.className = 'tool-bar-content';
        container.appendChild(this.createBtnBack());
        switch (this.options.signType) {
            case 'SIGN_START':
                container.appendChild(this.createBtnSubmitStart());
                break;
            case 'SIGN_TEMPLATE':
                container.appendChild(this.createBtnSubmitSign());
                break;
            case 'SIGN_FREE':
                container.appendChild(this.createBtnSign());
                if (this.options.hasSeal)
                    container.appendChild(this.createBtnSeal());
                container.appendChild(this.createBtnSubmitSign());
                break;
            case 'SIGN_TEMPLATE_AND_FREE':
                container.appendChild(this.createBtnSign());
                if (this.options.hasSeal)
                    container.appendChild(this.createBtnSeal());
                container.appendChild(this.createBtnSubmitSign());
                break;
            default:
                break;
        }
        this.options.container.appendChild(container);
    };
    ToolBar.prototype.createBtnBack = function () {
        this.btnBack = Button.create({
            text: '返回',
            cssText: 'width: 100%',
            onClick: function () { },
        });
        return this.btnBack;
    };
    ToolBar.prototype.createBtnSubmitSign = function () {
        var _this = this;
        this.btnSubmitSign = Button.create({
            text: '提交',
            type: 'primary',
            cssText: 'width: 100%',
            onClick: function () {
                if (_this.options.submit)
                    _this.options.submit();
            },
            attrs: {
                disabled: 'disabled',
            },
        });
        return this.btnSubmitSign;
    };
    ToolBar.prototype.createBtnSubmitStart = function () {
        this.btnSubmitStart = Button.create({
            text: '发起签署',
            type: 'primary',
            cssText: 'width: 100%',
            onClick: function () { },
            attrs: {
                disabled: 'disabled',
            },
        });
        return this.btnSubmitStart;
    };
    ToolBar.prototype.createBtnSign = function () {
        var _this = this;
        this.btnSign = Button.create({
            text: '签字',
            cssText: 'width: 100%',
            onClick: function () {
                _this.signModule = 'SIGN';
                _this.showSigning();
                if (_this.options.addSign) {
                    _this.options.addSign();
                }
            },
            attrs: {
                disabled: 'disabled',
            },
        });
        return this.btnSign;
    };
    ToolBar.prototype.createBtnSeal = function () {
        var _this = this;
        this.btnSeal = Button.create({
            text: '印章',
            cssText: 'width: 100%',
            onClick: function () {
                _this.signModule = 'SEAL';
                _this.showSigning();
                if (_this.options.addSeal) {
                    _this.options.addSeal();
                }
            },
            attrs: {
                disabled: 'disabled',
            },
        });
        return this.btnSeal;
    };
    ToolBar.prototype.showSigning = function () {
        if (!this.signContainer) {
            this.options.container.appendChild(this.createSigning());
        }
        this.signContainer.style.display = 'flex';
    };
    ToolBar.prototype.hideSigning = function () {
        if (this.signContainer)
            this.signContainer.style.display = 'none';
    };
    ToolBar.prototype.createSigning = function () {
        this.signContainer = document.createElement('div');
        this.signContainer.className = 'toolbar-sign-container';
        var signNote = document.createElement('div');
        signNote.className = 'toolbar-sign-container-note';
        if (this.signModule === 'SEAL') {
            signNote.textContent = '请点击文档区域确定位置';
        }
        else if (this.signModule === 'SIGN') {
            signNote.textContent = '请点击文档区域确定位置';
        }
        this.signContainer.appendChild(signNote);
        this.signContainer.appendChild(this.createBtnCancel());
        return this.signContainer;
    };
    ToolBar.prototype.createBtnCancel = function () {
        var _this = this;
        this.btnSeal = Button.create({
            type: 'primary',
            text: '取消',
            onClick: function () {
                _this.signModule = '';
                _this.hideSigning();
            },
        });
        return this.btnSeal;
    };
    return ToolBar;
}());
export default ToolBar;
//# sourceMappingURL=main.js.map