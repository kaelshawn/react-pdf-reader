import { EnumSealUseType } from '../../api/paas-sign-service';
import ImgBlock, { ImgBlockValue } from './img-block';
import { OverlayBaseProps } from './types';
export declare type SealValue = ImgBlockValue & {
    pin?: string;
    usePassword?: string;
    sealCode: string;
    sealId: string;
    sealTypeCode: string;
    useType: EnumSealUseType;
    isUseSign: boolean;
};
export default class Seal extends ImgBlock {
    value?: SealValue;
    protected isVariableSize: boolean;
    static defaultValue: {
        width: number;
        height: number;
        origin: import("./types").ORIGIN_TYPE;
    };
    constructor(props: OverlayBaseProps);
    protected createContent(): void;
    setValue(value: Omit<SealValue, 'id' | 'x' | 'y' | 'width' | 'height' | 'page'>): void;
}
