import type { IOverlayDataBase } from '../overlayAdapter';
import OverlayBase from './base';
import type { IOverlayParams } from './interface';
export declare type IOverlayCheckBoxParams = {
    fontSize: number;
} & IOverlayParams;
export default class CheckBox extends OverlayBase {
    private value;
    getValue(): {
        value: boolean;
        x: number;
        y: number;
        width: number;
        height: number;
        page: number;
    };
    setValue(values: any): void;
    protected overlayElemClick(): void;
    protected checkBoxElement: HTMLElement | null;
    init(options: IOverlayParams, dataInfo?: any): this;
    protected create(): boolean;
    protected render(): void;
    static create(data: IOverlayDataBase): {
        typeName: string;
        overlay: CheckBox;
        pageNumber: number;
        dataX: number;
        dataY: number;
    };
}
