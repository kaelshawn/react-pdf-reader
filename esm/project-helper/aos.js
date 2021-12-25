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
import { SignProjectHelper } from '../project-helper';
import './index.less';
import pdfBase64 from './pdfBase64';
export var aosInit = function (apiConfig, callBack) {
    apiConfig = Object.assign({
        remoteServiceUrl: '//opendev.isigning.cn/sdk/projects/h5/',
        remoteService: false,
    }, apiConfig);
    var projectHelper = new SignProjectHelper(__assign({ mode: 'h5' }, apiConfig));
    var aosInfo = {
        defaultPdf: pdfBase64,
        event: projectHelper.event,
        setToken: projectHelper.token.set.bind(projectHelper.token),
        updateToken: projectHelper.token.updateToken.bind(projectHelper.token),
        getToken: function () {
            return projectHelper.token.value;
        },
        startSign: projectHelper.startSign.bind(projectHelper),
        externalSign: projectHelper.externalSign.bind(projectHelper),
        startView: projectHelper.startView.bind(projectHelper),
        close: function () {
            projectHelper.closeIframe();
        },
        startSubmit: projectHelper.startSubmit.bind(projectHelper),
    };
    callBack(aosInfo);
};
//# sourceMappingURL=aos.js.map