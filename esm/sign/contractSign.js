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
 * 根据合同id，完成签署流程
 */
var ContractSign = /** @class */ (function (_super) {
    __extends(ContractSign, _super);
    function ContractSign(options) {
        var _this = _super.call(this, options) || this;
        return _this;
    }
    ContractSign.prototype.init = function (options) {
        var _this = this;
        this.options = __assign({}, options);
        _super.prototype.init.call(this, this.options);
        if (!this.options.cid) {
            this.dialog.confirm({
                title: '提示',
                info: '合同编号不能同时为空',
                hideCancel: true,
                onOk: function () {
                    _this.options.back();
                },
            });
            return this;
        }
        return this;
    };
    ContractSign.prototype.getFileList = function () {
        return this.signInfo.signFiles;
    };
    ContractSign.prototype.getFileId = function (index) {
        return this.signInfo.signFiles[index].currentFileId;
    };
    ContractSign.prototype.loadFile = function () {
        var _this = this;
        this.apiServer
            .getContractDetail(this.options.cid)
            .then(function (res) {
            _this.signInfo = res;
            _this.refreshSelect();
            _this.filePathType = 'ID';
            _this.switchPdf();
            _this.buildToolBar();
            _this.options.loadFinish(res);
        })
            .catch(function (err) {
            _this.message.show({
                message: err.message,
                type: 'error',
                offset: 170,
                duration: 0,
            });
            _this.dialog.close();
        });
    };
    ContractSign.prototype.switchPdf = function () {
        var fid = this.signInfo.signFiles[this.fileCurrentIndex].currentFileId;
        this.loadPdf(fid);
    };
    ContractSign.prototype.canOprtate = function () {
        if (this.signInfo && this.signInfo.sign)
            return true;
        return false;
    };
    ContractSign.prototype.getContractInfo = function () {
        return this.signInfo;
    };
    ContractSign.prototype.switchFile = function (index) {
        this.fileCurrentIndex = index;
        this.dialog.loading({
            info: '加载中',
        });
        var fid = this.signInfo.signFiles[this.fileCurrentIndex].currentFileId;
        this.loadPdf(fid);
    };
    ContractSign.prototype.submitSign = function () {
        var _this = this;
        this.dialog.loading({
            info: '提交中',
        });
        var sumbitData = {
            sign: {
                signContents: this.signContents,
            },
        };
        this.apiServer
            .contractSign(this.options.cid, sumbitData)
            .then(function (res) {
            if (res) {
                _this.message.show({
                    message: '签署成功',
                    type: 'success',
                    offset: 200,
                });
                _this.dialog.close();
                _this.options.submitCallBack();
                return;
            }
            _this.submitFail();
            _this.message.show({
                message: '签署失败',
                type: 'error',
                offset: 200,
            });
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
    ContractSign.prototype.buildToolBar = function () {
        var _this = this;
        this.toolBar = new ToolBar().init({
            hasSeal: true,
            signType: this.getSignType(),
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
    ContractSign.prototype.getSignType = function () {
        if (!this.signInfo)
            return '';
        if (!this.signInfo.sign)
            return '';
        if (this.signInfo.sign && this.signInfo.config.freeSign)
            return 'SIGN_TEMPLATE_AND_FREE';
        return 'SIGN_TEMPLATE';
    };
    return ContractSign;
}(BaseSign));
export default ContractSign;
//# sourceMappingURL=contractSign.js.map