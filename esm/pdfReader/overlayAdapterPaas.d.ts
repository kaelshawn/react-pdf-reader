import { EnumSealInfoType, EnumSealUseType } from '../api/paas-sign-service';
import { ISignFile } from './interface';
import OverlayBase from './overlay/base';
import base, { OverlayPositionValueInfo } from './overlayAdapter';
export declare type CropType = [number, number, number, number];
export declare type RectangleType = {
    width: number;
    height: number;
    x: number;
    y: number;
};
export declare type SignData = {
    id: string;
    page: number;
    crop?: CropType;
    rectangle: RectangleType;
    fakePressure: boolean;
    handWrittings: any[];
    height: number;
    width: number;
    thickness: number;
    sourceH: number;
    sourceW: number;
    signPlateW: number;
    signPlateH: number;
    pMin: number;
    pMax: number;
    fingerInfo?: any;
    __value?: any;
};
export declare type SealData = {
    page: number;
    isUseSign: boolean;
    useType: EnumSealUseType;
    rectangle: RectangleType;
    handwritingId: string;
    pin: string;
    sealId: string;
    sealCode: string;
    sealTypeCode: string;
    type: EnumSealInfoType;
    usePassword: string;
    lawPersonFlag: boolean;
    __value?: any;
};
export declare type OverlayResult = {
    currentFileId: string;
    signs: SignData[];
    signSeals: SealData[];
};
export default class OverlayAdapter extends base {
    protected getBaseInfo(overlayInfo: any): {
        id: any;
        rectangle: {
            width: any;
            height: any;
            x: any;
            y: any;
        };
        page: any;
    };
    getSignValue(overlayInfo: any): any;
    getSealValue(overlayInfo: any): any;
    getValues(overlaies: OverlayBase[], signFile: any): any;
    formatValues(file: ISignFile, values?: any): OverlayPositionValueInfo[];
}
