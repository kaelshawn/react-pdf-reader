export declare type MessageType = 'success' | 'warning' | 'info' | 'error';
export declare type MessageProps = {
    message: string;
    type?: MessageType;
    duration?: number;
    showClose?: boolean;
    offset?: number;
    width?: string;
    onClose?: () => void;
};
