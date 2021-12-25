import { OverlayBase, OverlayValue } from './base';
import { ORIGIN_TYPE, OverlayBaseProps } from './types';
export declare type ImgBlockValue = OverlayValue & {
    url: string;
    __value?: any;
};
export default abstract class ImgBlock extends OverlayBase {
    static defaultValue: {
        origin: ORIGIN_TYPE;
    };
    value?: Omit<ImgBlockValue, 'id' | 'x' | 'y' | 'width' | 'height' | 'page'>;
    protected placeholderView?: HTMLElement;
    protected imgView?: HTMLImageElement;
    private _url;
    protected get url(): string;
    protected set url(value: string);
    constructor(props: OverlayBaseProps);
    setValue(value: Omit<ImgBlockValue, 'id' | 'x' | 'y' | 'width' | 'height' | 'page'>): void;
    protected createContent(): void;
    getValue(): ImgBlockValue | null;
}
