import type { ToolBarProps } from './interface';
export default class ToolBar {
    protected options: ToolBarProps;
    protected btnBack: HTMLElement;
    protected btnSubmitSign: HTMLElement;
    protected btnSubmitStart: HTMLElement;
    protected btnSign: HTMLElement;
    protected btnSeal: HTMLElement;
    protected btnCancel: HTMLElement;
    protected signContainer: HTMLElement;
    protected signModule: 'SEAL' | 'SIGN' | '';
    init(option: ToolBarProps): this;
    switchOperateStatus(status: boolean): void;
    protected switchBtnStatus(ele: HTMLElement, status: boolean): void;
    protected create(): void;
    protected createBtnBack(): HTMLElement;
    protected createBtnSubmitSign(): HTMLElement;
    protected createBtnSubmitStart(): HTMLElement;
    protected createBtnSign(): HTMLElement;
    protected createBtnSeal(): HTMLElement;
    protected showSigning(): void;
    protected hideSigning(): void;
    protected createSigning(): HTMLElement;
    protected createBtnCancel(): HTMLElement;
}
