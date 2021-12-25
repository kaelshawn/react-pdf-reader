/**
 * 封装postmessage
创建一个通道，进行数据推送
 */
export declare type MessageInfo = {
    name: string;
    cb: (data: any) => void;
};
export default class PostMessage {
    targetOrigin: string;
    target: Window;
    messageCallBacks: MessageInfo[];
    constructor(target: Window, targetOrigin?: string);
    sendReady(): this;
    send(name: string, value?: unknown): void;
    message<T>(name: string, cb: (data: T) => void): this;
    once<T>(name: string, cb: (data: T) => void): this;
    remove(name: string): void;
}
