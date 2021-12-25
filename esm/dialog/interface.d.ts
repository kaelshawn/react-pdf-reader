export declare type ConfirmProps = {
    title?: string;
    showClose?: boolean;
    width?: string;
    height?: string;
    okText?: string;
    cancelText?: string;
    hideCancel?: boolean;
    onOk?: () => void;
    onClose?: () => void;
} & LoadingProps;
export declare type LoadingProps = {
    shade?: string;
    info?: string | HTMLElement;
};
