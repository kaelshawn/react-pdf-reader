import EventBase from '../utils/eventBase2';
export declare type ProjectEventType = {
    /**
     * 关闭iframe
     */
    onCloseFrame: undefined;
    /**
     * 签署页面加载完成
     */
    onSignLoadComplete: undefined;
    /**
     * 签字板开始签字
     */
    onSignStart: undefined;
    /**
     *签字板签署完成
     */
    onSignComplete: undefined;
    /**
     * 提交完成关闭签署页面时的回调
     */
    onSubmitSuccess: {
        signId: string;
        thirdBizId: string;
    };
    /**
     * token过期
     */
    onTokenInvalidate: undefined;
};
export default class ProjectEvent extends EventBase<ProjectEventType> {
}
