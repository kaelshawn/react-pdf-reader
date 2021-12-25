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
import ToolBar from '../toolBar/index';
import BaseSign from './main';
/**
 * 根据文件id进行自由签署
 *
 */
var FressSign = /** @class */ (function (_super) {
    __extends(FressSign, _super);
    function FressSign(options) {
        var _this = _super.call(this, options) || this;
        _this.fileUrl = '';
        _this.fileName = '';
        _this.apiServer = __assign({}, options);
        return _this;
    }
    FressSign.prototype.init = function (options) {
        var _this = this;
        this.options = __assign({}, options);
        if (!this.options.signInfo.signFiles || this.options.signInfo.signFiles.length == 0) {
            this.dialog.confirm({
                title: '提示',
                info: '文件列表不能为空',
                hideCancel: true,
                onOk: function () {
                    _this.options.back();
                },
            });
            return this;
        }
        this.options.signInfo.signFiles = this.options.signInfo.signFiles.map(function (item) {
            if (!item.currentFileId) {
                item.currentFileId = "" + new Date().getTime() + parseInt("" + (Math.random() * 1 + 1), 10);
            }
            return item;
        });
        this.filePathType = 'URL';
        _super.prototype.init.call(this, options);
        this.refreshSelect();
        return this;
    };
    FressSign.prototype.getFileList = function () {
        return this.options.signInfo.signFiles;
    };
    FressSign.prototype.getFileId = function (index) {
        return this.options.signInfo.signFiles[index].currentFileId || '';
    };
    FressSign.prototype.loadFile = function () {
        this.switchPdf();
        this.buildToolBar();
    };
    FressSign.prototype.switchPdf = function () {
        var file = this.options.signInfo.signFiles[this.fileCurrentIndex];
        this.loadPdf(file.currentFileId || '', file.url);
    };
    FressSign.prototype.buildToolBar = function () {
        var _this = this;
        this.toolBar = new ToolBar().init({
            hasSeal: false,
            signType: 'SIGN_FREE',
            container: this.toolBarContainer,
            addSeal: function () {
                _this.curPoint = null;
                _this.getSealPoint();
            },
            addSign: function () {
                _this.curPoint = null;
                _this.getSignPoint();
            },
            back: function () {
                _this.options.back();
            },
            submit: function () {
                _this.submit();
            },
        });
    };
    FressSign.prototype.canOprtate = function () {
        if (this.options && this.options.signInfo.sign)
            return true;
        return false;
    };
    FressSign.prototype.submitSign = function () {
        var _this = this;
        this.dialog.loading({
            info: '提交中',
        });
        var contractInfo = {
            contractName: this.user.loginVo.name + "\u53D1\u8D77\u7684\u81EA\u7531\u7B7E\u6D4B\u8BD5\u5408\u540C_" + Date.now(),
            contractDescribe: '',
            signatories: [
                {
                    signatoriesSort: 0,
                    businessId: this.user.loginVo.businessId,
                    telephone: this.user.loginVo.telphone,
                    signatoriesUuid: this.user.loginVo.telphone,
                },
            ],
            files: this.options.signInfo.signFiles.map(function (file) { return ({ url: file.url }); }),
        };
        var signInfo = {
            sign: {
                signContents: this.pdfReader.getAllPdfValues(null),
            },
        };
        this.apiServer
            .launchAndSign(contractInfo, signInfo)
            .then(function (res) {
            _this.options.submitCallBack(res);
        })
            .catch(function (err) {
            _this.submitFail();
            _this.message.show({
                message: err.message,
                type: 'error',
                offset: 200,
            });
        });
    };
    return FressSign;
}(BaseSign));
export default FressSign;
//# sourceMappingURL=freeSign.js.map