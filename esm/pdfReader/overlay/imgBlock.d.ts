import type { IOverlayDataBase } from '../overlayAdapter';
import OverlayBase from './base';
import type { IOverlayParams } from './interface';
export declare type IOverlayImgBlockParams = {
    placeholder?: HTMLElement | (() => HTMLElement);
} & IOverlayParams;
export declare type IOverlayImgValue = {
    img: string;
};
export default class ImgBlock extends OverlayBase {
    protected placeholder: HTMLElement | null;
    protected imgElement: HTMLImageElement | null;
    protected value: IOverlayImgValue | null;
    options: IOverlayImgBlockParams;
    init(options: IOverlayImgBlockParams, dataInfo?: any): this;
    protected create(): boolean;
    protected render(): void;
    getValue(): {
        value: IOverlayImgValue;
        x: number;
        y: number;
        width: number;
        height: number;
        page: number;
    };
    protected overlayElemClick(): void;
    setValue(values: IOverlayImgValue): void;
    static create(data: IOverlayDataBase): {
        typeName: string;
        overlay: ImgBlock;
        pageNumber: number;
        dataX: number;
        dataY: number;
    };
}
