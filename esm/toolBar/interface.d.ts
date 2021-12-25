export declare type ToolBarProps = {
    signType: 'SIGN_START' | 'SIGN_TEMPLATE' | 'SIGN_FREE' | 'SIGN_TEMPLATE_AND_FREE' | '';
    container: HTMLElement;
    hasSeal: boolean;
    /**
     * 发起签署
     */
    startSign?: () => void;
    /**
     * 自由签-点击
     */
    addSign?: () => void;
    /**
     * 自由签-点击印章
     */
    addSeal?: () => void;
    submit?: () => void;
    /**
     * 返回事件
     */
    back?: () => void;
};
