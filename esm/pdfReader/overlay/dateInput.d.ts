import type { IOverlayDataBase } from '../overlayAdapter';
import OverlayBase from './base';
import type { IOverlayParams } from './interface';
export default class DateInput extends OverlayBase {
    protected value: string;
    protected textElem: HTMLDivElement;
    getValue(): {
        type: string;
        value: string;
        x: number;
        y: number;
        width: number;
        height: number;
        page: number;
    };
    setValue(values: any): void;
    protected overlayElemClick(): void;
    init(options: IOverlayParams, dataInfo?: any): this;
    protected create(): boolean;
    protected render(): void;
    static create(data: IOverlayDataBase): {
        typeName: string;
        overlay: DateInput;
        pageNumber: number;
        dataX: number;
        dataY: number;
    };
}
