import { PdfReaderV2 } from '../';
import { OverlayPosition } from '../pdf-reader-v2/overlay-manager';
import EventBase from '../utils/eventBase2';
/**
 * 工具区组件
 * 两种模式 1.自由签、2.非自由签
 * 自由签包括，签字、盖章、提交按钮
 * 非自由签包括，提交按钮
 * 控件需要提供方法能对单个、多个、全部按钮进行禁用
 * 每次签署初次点击签字、盖章按钮时需要能显示提示信息
 * 由组件实现向pdfreader插入自由签组件的功能
 * 由组件实现签署提交的功能
 * 由父组件传入签字、签章的方法
 * 需要能删除自由签签署位
 */
export declare type PropsToolsBar = {
    container: HTMLDivElement;
    pdfReader: PdfReaderV2 | (() => PdfReaderV2);
    socialCreditCode?: string | null;
    /**
     * 是否自由签
     * @default false
     */
    isFree?: boolean;
};
declare type ButtonType = 'fixBtn' | 'deleteBtn' | 'submitBtn' | 'signBtn' | 'sealBtn';
export declare type ToolsBarEvent = {
    onFreeStart: {
        position: Omit<OverlayPosition, 'id'>;
    };
    onSubmit: null;
};
export default class ToolsBar extends EventBase<ToolsBarEvent> {
    container: HTMLDivElement;
    private _pdfReader;
    private _activedFreePosition?;
    private buttons;
    private _socialCreditCode?;
    private _isFree;
    private _isAcived;
    private curInsertType?;
    private set isAcived(value);
    get isFree(): boolean;
    set isFree(value: boolean);
    private get activedFreePosition();
    private set activedFreePosition(value);
    constructor(props: PropsToolsBar);
    protected get pdfReader(): PdfReaderV2;
    protected set pdfReader(value: PdfReaderV2);
    set socialCreditCode(code: string | undefined);
    protected create(): void;
    private createBtnCancel;
    private createBtnFix;
    private createBtnDelete;
    private createBtnSubmitSign;
    private createBtnSign;
    private createBtnSeal;
    private createBtn;
    setEnabled(isEnabled?: boolean, buttonName?: ButtonType | Array<ButtonType>): void;
    /**
     *设置当前激活的签署位
     */
    setFreeOverlay(position?: OverlayPosition): void;
    isFreeOverlay(): boolean;
    onSubmit(callback: (e: any) => void): void;
    onDelete(callback: () => void): void;
}
export {};
