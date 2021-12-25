import type SignBoard from '../signBoard';
export declare type SignToolBarSubmitEvent = {
    points?: any[];
    signBoard: SignBoard;
    boardWidth: number;
    boardHeight: number;
    index?: number;
    info?: any;
};
export declare type SignSampleBarSubmitEvent = {
    stepResultList: any[];
} & SignToolBarSubmitEvent;
export declare type SignToolBarProps = {
    submit?: (e: SignToolBarSubmitEvent | SignSampleBarSubmitEvent) => boolean;
    /**
     * 返回事件
     */
    callBack?: () => void;
};
export declare type SignSampleBarProps = {
    /**
     * 签字次数
     * @default 5
     */
    sampleCount?: number;
    /**
     * 点击下一步的事件,返回保存后的内容，该内容会在提交时全部传入，如果不返回不会进入下一步骤
     */
    nextSubmit?: (e: SignToolBarSubmitEvent) => any;
} & SignToolBarProps;
export declare type ButtonProps = {
    type?: 'primary' | 'danger' | 'default';
    size?: 'small' | '';
    text?: string;
    cssText?: string;
    onClick?: (e: MouseEvent) => void;
    attrs?: Record<string, any>;
};
