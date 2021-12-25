import type { MessageProps } from './interface';
export default class Message {
    protected container: HTMLElement;
    protected timer: any;
    protected options: MessageProps;
    show(option: MessageProps): void;
    protected createMessage(): void;
    protected clearTimer(): void;
    protected dismiss(): void;
}
