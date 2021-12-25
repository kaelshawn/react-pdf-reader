import type { IOverlayDataBase } from '../overlayAdapter';
import OverlayBase from './base';
import type { IOverlayParams } from './interface';
export declare type IAutoSize = {
    /**
     * 固定宽度，如果为false将不换行，否则将自动换行
     */
    fixedWidth: boolean;
};
export default class Input extends OverlayBase {
    protected value: string;
    /**
     * 用于计算文本高宽的div
     */
    protected textElem: HTMLDivElement;
    protected textAreaElem: HTMLTextAreaElement;
    init(options: IOverlayParams, dataInfo?: any): this;
    /**
     *漂浮元素显示高度
     */
    protected get height(): number;
    protected set height(value: number);
    protected create(): boolean;
    protected render(): void;
    protected textAreaOnblur(): void;
    protected textAreaInput(e: any): void;
    protected overlayElemClick(): void;
    protected measure(text: any): {
        width: number;
        height: number;
    };
    setValue(values: any): void;
    getValue(): {
        value: string;
        x: number;
        y: number;
        width: number;
        height: number;
        page: number;
    };
    static create(data: IOverlayDataBase): {
        typeName: string;
        overlay: Input;
        pageNumber: number;
        dataX: number;
        dataY: number;
    };
}
