import Service, { SealListData } from '../api/paas-sign-service';
import Dialog from '../dialog';
import Message from '../message';
import EventBase from '../utils/eventBase';
export declare type PropsSignSealBase = {
    /**
     * 统一社会信用代码
     */
    socialCreditCode: string;
    service: Service;
    /**
     * 用于处理多个文件只校验一次的需求
     */
    verifyKey?: string;
    /**
     * 是否允许法人签字调章
     */
    allowLawSignUse: boolean;
};
export declare type SignSealBaseEvent = 'onSubmit' | 'onClose';
/**
 * 提交时的数据
 */
export declare type PropsSubmit = {
    password?: string;
    pin?: string;
};
export declare type SealSubmitResult = PropsSubmit & SealListData & {
    isUseSign: boolean;
};
export default abstract class SignSealBase extends EventBase<SignSealBaseEvent> {
    protected container: HTMLDivElement;
    protected socialCreditCode: string;
    protected seals: Array<SealListData>;
    protected isLoaded: boolean;
    protected service: Service;
    protected _isUseSign: boolean;
    protected _currentIndex: number;
    protected dialog: Dialog;
    protected message: Message;
    protected authedSeals: Record<string, string>;
    protected verifyKey: string;
    protected allowLawSignUse: boolean;
    constructor(props: PropsSignSealBase);
    show(): Promise<void>;
    close(): void;
    submit(data: PropsSubmit): Promise<void>;
    protected get currentSeal(): SealListData;
    /**
     * 判断当前印章是否已经完成权限校验
     */
    protected get currentSealAuthed(): string;
    protected get currentSealKey(): string;
    protected verifyAuth(data: PropsSubmit): Promise<void>;
    private verifyPasswordOrPin;
    protected loadSeals(): Promise<void>;
    protected abstract create(): any;
}
