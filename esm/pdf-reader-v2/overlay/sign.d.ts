import { RectangleType, SignData } from '../../pdfReader/overlayAdapterPaas';
import ImgBlock, { ImgBlockValue } from './img-block';
import { OverlayBaseProps } from './types';
export declare type SignValue = ImgBlockValue & {
    points: any;
    boardWidth: number;
    boardHeight: number;
    thickness: number;
    fake_pressure: boolean;
    deviceInfo: any;
    fgpInfo: any;
    rectangle?: RectangleType;
    color: string;
};
export declare type SignValueSet = Omit<SignValue, 'id' | 'x' | 'y' | 'width' | 'height' | 'page'>;
export declare type SignBlockValueDetails = Omit<SignData, 'rectangle'> & SignValue;
export default class Sign extends ImgBlock {
    value?: SignValue;
    protected minWidth: number;
    protected minHeight: number;
    static defaultValue: {
        width: number;
        height: number;
        origin: import("./types").ORIGIN_TYPE;
    };
    constructor(props: OverlayBaseProps);
    protected createContent(): void;
    setValue(value: SignValueSet): void;
    getValue(): SignBlockValueDetails | null;
}
