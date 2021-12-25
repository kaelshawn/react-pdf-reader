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
import EventEmitter from 'events';
import { DefaultSize } from '../pdf-reader-v2/overlay';
import { getXY } from '../pdf-reader-v2/utils';
import Button from '../signToolBar/button';
import EventBase from '../utils/eventBase2';
import { emptyElement } from '../utils/tools';
var eventEmitter = new EventEmitter();
var ToolsBar = /** @class */ (function (_super) {
    __extends(ToolsBar, _super);
    function ToolsBar(props) {
        var _this = _super.call(this) || this;
        _this.buttons = {};
        _this._isFree = false;
        _this._isAcived = false;
        _this.container = props.container;
        _this._pdfReader = props.pdfReader;
        _this._socialCreditCode = props.socialCreditCode;
        _this.isFree = props.isFree || false;
        _this.pdfReader.addListener('onSelectPosition', function (e) {
            _this.emit('onFreeStart', {
                position: __assign({ pdfId: _this.pdfReader.loader.currentPdf.id, type: _this.curInsertType, page: e.position.page }, getXY({
                    width: DefaultSize[_this.curInsertType].width,
                    height: DefaultSize[_this.curInsertType].height,
                    origin: 'LEFT_BOTTOM',
                    top: e.position.top,
                    left: e.position.left,
                    parentHeight: e.position.pageHeight,
                })),
            });
            _this.curInsertType = undefined;
            _this.isAcived = false;
            _this.setEnabled(true);
            _this.pdfReader.switchPosition(false);
        });
        return _this;
    }
    Object.defineProperty(ToolsBar.prototype, "isAcived", {
        set: function (value) {
            this._isAcived = value;
            this.create();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ToolsBar.prototype, "isFree", {
        get: function () {
            return this._isFree;
        },
        set: function (value) {
            this._isFree = value;
            this.create();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ToolsBar.prototype, "activedFreePosition", {
        get: function () {
            return this._activedFreePosition;
        },
        set: function (value) {
            if (this._activedFreePosition !== value) {
                this._activedFreePosition = value;
                this.create();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ToolsBar.prototype, "pdfReader", {
        get: function () {
            if (typeof this._pdfReader === 'function') {
                return this._pdfReader();
            }
            return this._pdfReader;
        },
        set: function (value) {
            this._pdfReader = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ToolsBar.prototype, "socialCreditCode", {
        set: function (code) {
            this._socialCreditCode = code;
            if (this.buttons.sealBtn) {
                this.buttons.sealBtn.style.display = code ? 'block' : 'none';
            }
        },
        enumerable: false,
        configurable: true
    });
    ToolsBar.prototype.create = function () {
        emptyElement(this.container);
        if (!this.activedFreePosition) {
            if (this.isFree) {
                if (this._isAcived) {
                    this.container.appendChild(this.createBtnCancel());
                }
                else {
                    this.container.appendChild(this.createBtnSign());
                    this.container.appendChild(this.createBtnSeal());
                }
            }
            if (!this._isAcived) {
                this.container.appendChild(this.createBtnSubmitSign());
            }
        }
        else {
            this.container.appendChild(this.createBtnDelete());
            this.container.appendChild(this.createBtnFix());
        }
    };
    ToolsBar.prototype.createBtnCancel = function () {
        var _this = this;
        return Button.create({
            text: '取消',
            cssText: 'width: 100%',
            onClick: function () {
                _this.isAcived = false;
                _this.setEnabled(true);
                _this.pdfReader.switchPosition(false);
            },
        });
    };
    ToolsBar.prototype.createBtnFix = function () {
        var _this = this;
        return this.createBtn('fixBtn', {
            text: '确定',
            onClick: function () {
                _this.activedFreePosition = undefined;
            },
        });
    };
    ToolsBar.prototype.createBtnDelete = function () {
        var _this = this;
        return this.createBtn('deleteBtn', {
            text: '删除',
            type: 'danger',
            onClick: function () {
                var _a;
                _this.pdfReader.overlayManager.clear({ overlayId: (_a = _this.activedFreePosition) === null || _a === void 0 ? void 0 : _a.id });
                _this.activedFreePosition = undefined;
            },
        });
    };
    ToolsBar.prototype.createBtnSubmitSign = function () {
        var _this = this;
        return this.createBtn('submitBtn', {
            text: '提交',
            type: 'primary',
            attrs: {
                disabled: false,
            },
            onClick: function () {
                _this.emit('onSubmit', null);
            },
        });
    };
    ToolsBar.prototype.createBtnSign = function () {
        var _this = this;
        return this.createBtn('signBtn', {
            text: '签字',
            onClick: function () {
                _this.curInsertType = 'Sign';
                _this.pdfReader.switchPosition(true);
                _this.setEnabled(false);
                _this.isAcived = true;
            },
        });
    };
    ToolsBar.prototype.createBtnSeal = function () {
        var _this = this;
        var cssText = this._socialCreditCode ? '' : 'display: none;';
        cssText += 'width: 100%';
        return this.createBtn('sealBtn', {
            text: '印章',
            cssText: cssText,
            onClick: function () {
                _this.curInsertType = 'Seal';
                _this.pdfReader.switchPosition(true);
                _this.setEnabled(false);
                _this.isAcived = true;
            },
        });
    };
    ToolsBar.prototype.createBtn = function (key, props) {
        if (!this.buttons[key]) {
            this.buttons[key] = Button.create(__assign({ cssText: 'width: 100%', attrs: {
                    disabled: true,
                } }, props));
        }
        return this.buttons[key];
    };
    ToolsBar.prototype.setEnabled = function (isEnabled, buttonName) {
        var _this = this;
        var _a;
        if (isEnabled === void 0) { isEnabled = false; }
        var method = isEnabled ? 'removeAttribute' : 'setAttribute';
        var callback = function (key) {
            var btn = _this.buttons[key];
            if (btn) {
                if (isEnabled) {
                    btn.removeAttribute('disabled');
                }
                else {
                    btn.setAttribute('disabled', 'disabled');
                }
            }
        };
        if (typeof buttonName == 'string') {
            (_a = this === null || this === void 0 ? void 0 : this[buttonName]) === null || _a === void 0 ? void 0 : _a[method]('disabled', true);
        }
        else if (Array.isArray(buttonName) && buttonName.length) {
            buttonName.forEach(callback);
        }
        else {
            Object.keys(this.buttons)
                .map(function (item) { return item; })
                .forEach(callback);
        }
    };
    /**
     *设置当前激活的签署位
     */
    ToolsBar.prototype.setFreeOverlay = function (position) {
        this.activedFreePosition = position;
        this.setEnabled(true, ['fixBtn', 'deleteBtn']);
    };
    ToolsBar.prototype.isFreeOverlay = function () {
        return !!this.activedFreePosition;
    };
    ToolsBar.prototype.onSubmit = function (callback) {
        eventEmitter.on('submit', callback);
    };
    ToolsBar.prototype.onDelete = function (callback) {
        eventEmitter.on('delete', callback);
    };
    return ToolsBar;
}(EventBase));
export default ToolsBar;
//# sourceMappingURL=tools-bar.js.map