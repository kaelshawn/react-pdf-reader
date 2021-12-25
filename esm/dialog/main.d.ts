import type { ConfirmProps, LoadingProps } from './interface';
export default class Dialog {
    protected container: HTMLElement;
    protected timer: any;
    protected options: ConfirmProps;
    loading(option: LoadingProps): void;
    confirm(option: ConfirmProps): this;
    protected createConfirm(): void;
    protected createTitle(): HTMLDivElement;
    protected createBody(): HTMLDivElement;
    protected createFooter(): HTMLDivElement;
    protected createContainer(): void;
    protected createLoading(): void;
    close(): void;
}
