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
var VERIFY_TYPE;
(function (VERIFY_TYPE) {
    VERIFY_TYPE["NONE"] = "NONE";
    VERIFY_TYPE["PASSWORD"] = "PASSWORD";
    VERIFY_TYPE["PIN"] = "PIN";
})(VERIFY_TYPE || (VERIFY_TYPE = {}));
var PNG_PRE = 'data:image/png;base64,';
var REGX = /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,/;
var SignSeal = /** @class */ (function () {
    function SignSeal() {
        this.currentIndex = 0;
        this.showDotted = false;
        this.sealVerifys = {};
        this.sealVerifyKey = '';
        this.password = '';
        /**
         * 当前选择印章的校验方式
         */
        this.verify_type = '';
    }
    /**
     * 初始化印章组件
     * @param options
     */
    SignSeal.prototype.init = function (options) {
        this.options = __assign({}, options);
        this.create();
        return this;
    };
    /**
     * 传入当前签字位判断校验的标识
     * @param key
     */
    SignSeal.prototype.showSeals = function (key) {
        if (!this.sealVerifys[status]) {
            this.sealVerifys[key] = [];
        }
        this.sealVerifyKey = key;
    };
    /**
     * 根据印章数据刷新印章列表
     */
    SignSeal.prototype.refreshImg = function () {
        var _this = this;
        this.sealContent.innerHTML = '';
        this.options.seals.forEach(function (seal, index) {
            if (seal) {
                var item = document.createElement('div');
                item.className = 'seal-carousel-i';
                var dot = document.createElement('img');
                if (seal.sealPic.match(REGX)) {
                    dot.src = seal.sealPic;
                }
                else {
                    dot.src = "" + PNG_PRE + seal.sealPic;
                }
                dot.className = 'seal-carousel-i-img';
                dot.setAttribute('index', "" + index);
                item.appendChild(dot);
                _this.sealContent.appendChild(item);
            }
        });
        if (this.options.seals.length < 3) {
            this.sealContent.style.justifyContent = 'center';
            return;
        }
        this.sealContent.style.justifyContent = 'start';
    };
    SignSeal.prototype.create = function () {
        this.sealView = document.createElement('div');
        this.sealView.className = 'seal-container';
        this.sealView.style.width = this.options.width || '100%';
        this.sealView.appendChild(this.createTitle());
        this.sealView.appendChild(this.createImgeCarousel());
        this.sealView.appendChild(this.createInfo());
        this.sealView.appendChild(this.createPinInput());
        this.sealView.appendChild(this.createPasswordInput());
        this.sealView.appendChild(this.createError());
        this.sealView.appendChild(this.createSubmit());
        this.options.container.appendChild(this.sealView);
    };
    /**
     * 创建弹框title
     */
    SignSeal.prototype.createTitle = function () {
        var _this = this;
        var sealTitleView = document.createElement('div');
        sealTitleView.className = 'seal-title';
        var titleText = document.createElement('div');
        titleText.textContent = '请选择电子印章';
        titleText.className = 'seal-title-text';
        this.closeBtn = document.createElement('div');
        this.closeBtn.className = 'seal-close-btn';
        sealTitleView.appendChild(titleText);
        sealTitleView.appendChild(this.closeBtn);
        this.closeBtn.addEventListener('click', function () {
            if (_this.options.callBack) {
                _this.resetSeal();
                _this.options.callBack();
            }
        });
        return sealTitleView;
    };
    SignSeal.prototype.resetSeal = function () {
        this.currentIndex = -1;
        this.setCurrentImg(-1);
        this.setCurrentDot(-1);
        this.password = '';
        this.showPinInput(false);
        this.setNote();
        this.showPassInput(false);
        this.canSubmit(false);
    };
    /**
     * 创建错误提示信息
     */
    SignSeal.prototype.createError = function () {
        this.errorView = document.createElement('div');
        this.errorView.className = 'seal-note-error';
        return this.errorView;
    };
    /**
     * 创建印章列表
     */
    SignSeal.prototype.createImgeCarousel = function () {
        var _this = this;
        var carousel = document.createElement('div');
        carousel.className = 'seal-carousel';
        this.sealContent = document.createElement('div');
        this.sealContent.className = 'seal-carousel-container';
        this.refreshImg();
        this.sealContent.addEventListener('click', function (e) {
            var target = e.target;
            if (target.className == 'seal-carousel-i-img') {
                var index = target.getAttribute('index') || '';
                _this.currentIndex = parseInt(index, 10);
                _this.setNote("\u60A8\u6B63\u5728\u8C03\u7528\u201C" + _this.options.seals[_this.currentIndex].sealName + "\u201D");
                if (_this.currentIndex > -1) {
                    if (_this.dotContent) {
                        _this.setCurrentDot(_this.currentIndex);
                    }
                    _this.setCurrentImg(_this.currentIndex);
                    _this.handleVar();
                    _this.setError('');
                }
            }
        });
        carousel.appendChild(this.sealContent);
        if (this.options.seals && this.options.seals.length > 1) {
            this.dotContent = document.createElement('div');
            this.dotContent.className = 'seal-carousel-dots';
            this.options.seals.forEach(function () {
                var dot = document.createElement('div');
                dot.className = 'seal-carousel-dot-i';
                _this.dotContent.appendChild(dot);
            });
            carousel.appendChild(this.dotContent);
        }
        return carousel;
    };
    /**
     * 创建提示信息
     */
    SignSeal.prototype.createInfo = function () {
        this.noteView = document.createElement('div');
        this.noteView.className = 'seal-note-text';
        this.noteView.textContent = '请选择文件所需要加盖的印章';
        return this.noteView;
    };
    /**
     * 创建pin码输入框
     */
    SignSeal.prototype.createPinInput = function () {
        var _this = this;
        this.inputContainer = document.createElement('div');
        this.inputContainer.style.display = 'none';
        var inputNote = document.createElement('div');
        inputNote.textContent = '请输入PIN码';
        inputNote.className = 'seal-input-text';
        this.pinInput = document.createElement('input');
        this.pinInput.placeholder = '请输入用章密码';
        this.pinInput.className = 'seal-input';
        this.pinInput.setAttribute('maxLength', '6');
        this.pinInput.setAttribute('type', 'number');
        this.pinInput.addEventListener('input', function (e) {
            var target = e.target;
            var value = target.value;
            value = value.replace(/[^0-9]/g, '');
            value = value.substring(0, 6);
            target.value = value;
            _this.password = value;
            _this.setError('');
        });
        this.inputContainer.appendChild(inputNote);
        this.inputContainer.appendChild(this.pinInput);
        return this.inputContainer;
    };
    /**
     * 创建6位密码输入框
     */
    SignSeal.prototype.createPasswordInput = function () {
        var _this = this;
        var passwordLength = 6;
        this.passwordContainer = document.createElement('div');
        this.passwordContainer.className = 'seal-password-container';
        this.passwordContainer.style.display = 'none';
        var inputNote = document.createElement('div');
        inputNote.textContent = '请输入密码';
        inputNote.className = 'seal-input-text';
        this.passwordContainer.appendChild(inputNote);
        var inputContent = document.createElement('div');
        inputContent.className = 'password-input';
        var inputLabel = document.createElement('label');
        inputLabel.setAttribute('for', 'password');
        inputLabel.className = 'password-lable';
        var ulEle = document.createElement('ul');
        ulEle.className = 'password-ul';
        for (var i = 0; i < passwordLength; i++) {
            ulEle.appendChild(document.createElement('li'));
        }
        inputLabel.appendChild(ulEle);
        this.passwordInput = document.createElement('input');
        this.passwordInput.setAttribute('id', 'password');
        this.passwordInput.setAttribute('type', 'number');
        this.passwordInput.setAttribute('maxlength', "" + passwordLength);
        inputLabel.appendChild(this.passwordInput);
        this.passwordInput.addEventListener('input', function (e) {
            var target = e.target;
            var value = target.value;
            value = value.replace(/[^0-9]/g, '');
            value = value.substring(0, passwordLength);
            target.value = value;
            _this.password = value;
            for (var i = 0; i < passwordLength; i++) {
                var li = ulEle.querySelectorAll('li')[i];
                if (i < value.length) {
                    li.textContent = '.';
                }
                else {
                    li.textContent = '';
                }
            }
            if (value.length == 6) {
                _this.canSubmit(true);
            }
        });
        this.passwordContainer.appendChild(inputLabel);
        return this.passwordContainer;
    };
    /**
     * 提交操作
     */
    SignSeal.prototype.createSubmit = function () {
        var _this = this;
        this.submitBtn = Button.create({
            type: 'primary',
            text: '确认',
            cssText: 'width: 100%',
            onClick: function () {
                if (_this.currentIndex > -1) {
                    _this.canSubmit(false);
                    _this.setCurrentImg(-1);
                    var seal = _this.options.seals[_this.currentIndex];
                    switch (_this.verify_type) {
                        case VERIFY_TYPE.NONE:
                            _this.verifySuccess(seal);
                            break;
                        case VERIFY_TYPE.PASSWORD:
                            if (_this.options.passwordVerify)
                                _this.options.passwordVerify(seal, _this.password, _this.verifyCallback);
                            break;
                        case VERIFY_TYPE.PIN:
                            if (_this.options.pinVerify)
                                _this.options.pinVerify(seal, _this.password, _this.verifyCallback);
                            break;
                    }
                }
            },
            attrs: {
                disabled: 'disabled',
            },
        });
        return this.submitBtn;
    };
    SignSeal.prototype.verifyCallback = function (res) {
        if (res.success) {
            if (this.verify_type == VERIFY_TYPE.PASSWORD) {
                this.options.seals[this.currentIndex].usePassword = this.password;
            }
            else if (this.verify_type == VERIFY_TYPE.PIN) {
                this.options.seals[this.currentIndex].pin = this.password;
            }
            var seal = this.options.seals[this.currentIndex];
            this.sealVerifys[this.sealVerifyKey].push(seal.sealCode);
            this.verifySuccess(seal);
            return;
        }
        this.canSubmit(true);
        this.setError(res.mess);
    };
    SignSeal.prototype.verifySuccess = function (seal) {
        var selectSeal = __assign({}, seal);
        if (!selectSeal.sealPic.match(REGX)) {
            selectSeal.sealPic = PNG_PRE + selectSeal.sealPic;
        }
        this.options.submit(selectSeal);
        this.resetSeal();
    };
    SignSeal.prototype.setError = function (msg) {
        this.errorView.textContent = msg;
    };
    SignSeal.prototype.setCurrentDot = function (index) {
        if (this.currentDot) {
            this.currentDot.classList.remove('seal-carousel-dot-i-active');
            this.currentDot = (this.dotContent.querySelectorAll('.seal-carousel-dot-i')[index]);
            this.currentDot.classList.add('seal-carousel-dot-i-active');
        }
    };
    SignSeal.prototype.setCurrentImg = function (index) {
        if (this.currentSeal) {
            this.currentSeal.classList.remove('seal-carousel-i-active');
        }
        if (index > -1) {
            this.currentSeal = this.sealContent.querySelectorAll('.seal-carousel-i')[index];
            this.currentSeal.classList.add('seal-carousel-i-active');
        }
    };
    SignSeal.prototype.setNote = function (msg) {
        if (this.currentIndex > -1) {
            this.noteView.textContent = msg || '';
        }
        else {
            this.noteView.textContent = '请选择文件所需要加盖的印章';
        }
    };
    SignSeal.prototype.showPinInput = function (isShow) {
        if (isShow) {
            this.inputContainer.style.display = 'block';
        }
        else {
            this.inputContainer.style.display = 'none';
            this.pinInput.value = '';
        }
    };
    SignSeal.prototype.showPassInput = function (isShow) {
        if (isShow) {
            this.passwordContainer.style.display = 'block';
        }
        else {
            this.passwordContainer.style.display = 'none';
            this.passwordInput.value = '';
        }
    };
    SignSeal.prototype.canSubmit = function (isShow) {
        if (isShow) {
            this.submitBtn.removeAttribute('disabled');
        }
        else {
            this.submitBtn.setAttribute('disabled', 'disabled');
        }
    };
    SignSeal.prototype.formateVerifyType = function () {
        var seal = this.options.seals[this.currentIndex];
        this.verify_type = '';
        if (this.sealVerifys[this.sealVerifyKey] &&
            this.sealVerifys[this.sealVerifyKey].indexOf(seal.sealCode) > -1) {
            this.verify_type = VERIFY_TYPE.NONE;
        }
        switch (seal.useType) {
            case 0:
                this.verify_type = VERIFY_TYPE.NONE;
                break;
            case 1:
                this.verify_type = VERIFY_TYPE.NONE;
                break;
            case 2:
                this.verify_type = VERIFY_TYPE.PASSWORD;
                break;
            case 3:
                this.verify_type = VERIFY_TYPE.PASSWORD;
                break;
            default:
                break;
        }
    };
    SignSeal.prototype.handleVar = function () {
        this.formateVerifyType();
        this.handleUI();
    };
    /**
     *
     * @param type PASSWORD：输入密码，PIN：输入pin SUBMIT：提交
     */
    SignSeal.prototype.handleUI = function () {
        switch (this.verify_type) {
            case VERIFY_TYPE.PASSWORD:
                this.showPassInput(true);
                this.showPinInput(false);
                this.canSubmit(false);
                break;
            case VERIFY_TYPE.PIN:
                this.showPassInput(false);
                this.showPinInput(true);
                this.canSubmit(false);
                break;
            case VERIFY_TYPE.NONE:
                this.showPassInput(false);
                this.showPinInput(false);
                this.canSubmit(true);
                break;
        }
    };
    return SignSeal;
}());
export default SignSeal;
//# sourceMappingURL=main.js.map