import type { ENUM_OVERLAY_STATUS, IOverlayParams } from './overlay/interface';
import { ENUM_ORIGIN_TYPE, ENUM_OVERLAY_TYPE } from './overlay/interface';
import OverlayInput from './overlay/input';
import OverlayImgBlock from './overlay/imgBlock';
import OverlayCheckBox from './overlay/checkBox';
import OverlayDateInput from './overlay/dateInput';
import type OverlayBase from './overlay/base';
import type { IDrag, ISignFile } from './interface';
export declare type OverlayAdapterOptions = {
    /**
     * 组件的状态 默认为可编辑 EDITING
     */
    status?: ENUM_OVERLAY_STATUS;
    text?: {
        el: HTMLElement;
    };
    sign?: {
        el?: HTMLElement;
        onClick: (e: OverlayBase) => void;
    };
    seal?: {
        el?: HTMLElement;
        onClick: (e: OverlayBase) => void;
    };
    checkbox?: {
        el: HTMLElement;
        onClick: (e: OverlayBase) => void;
    };
    dateinput?: {
        el: HTMLElement;
    };
};
export declare enum ENUM_AX_OVERLAY_TYPE {
    INPUT = "INPUT",
    SIGN = "SIGN",
    SEAL = "SEAL",
    CHECKBOX = "CHECKBOX",
    DATEINPUT = "DATEINPUT"
}
export declare type OverlayPositionValueInfo = {
    id: string;
    currentFileId: string;
    typeName: string;
    value: any;
    page: number;
    top: number;
    left: number;
    overlayElementId: string;
};
export declare type IOverlayAdapter = {
    creatOverlayByType: (params: IOverlayParams) => OverlayBase;
    insertByTemplateData: (any: any, signerTag: any) => OverlayViewData[];
    getOverlayDatas: (overlaies: OverlayBase[]) => any;
    getDragsConfig: () => IDrag[];
    getValues: (overlaies: OverlayBase[], widgetContent: any) => any;
    formatValues: (file: ISignFile, values: any) => OverlayPositionValueInfo[];
};
export declare type IOverlayDataBase = {
    fieldId: string;
    name: string;
    page: number;
    x: number;
    y: number;
    width: number;
    height: number;
    signatoriesUuid: string;
    value: string;
    required: boolean;
    typeName: string;
    type: ENUM_AX_OVERLAY_TYPE;
    origin?: ENUM_ORIGIN_TYPE;
};
export declare type OverlayViewData = {
    overlay: OverlayBase;
    typeName: string;
    pageNumber: number;
    dataX?: number;
    dataY?: number;
};
export declare type BlockInfo = {
    origin?: ENUM_ORIGIN_TYPE;
    placeholder?: () => HTMLElement;
    typeName: string;
};
/**
 *
 */
export default class OverlayAdapter implements IOverlayAdapter {
    protected options: OverlayAdapterOptions;
    init(options: OverlayAdapterOptions): this;
    protected insertInput(data: IOverlayDataBase): OverlayViewData;
    protected getInputBlock(): {
        status: ENUM_OVERLAY_STATUS;
        type: ENUM_OVERLAY_TYPE;
    };
    protected getSealBlock(): any;
    protected getSignBlock(): any;
    protected getCheckBoxBlock(): any;
    protected getDateInput(): any;
    insertByTemplateData(widgetParams?: any, signerTag?: string): OverlayViewData[];
    getDragsConfig(): any;
    getOverlayDatas(overlaies: OverlayBase[]): any;
    creatOverlayByType(params: IOverlayParams): OverlayInput | OverlayImgBlock | OverlayCheckBox | OverlayDateInput;
    getValues(overlaies: OverlayBase[], signFile: any): {
        templateFileId: any;
        templateSn: any;
        uploadFileId: any;
        currentFileId: any;
        signs: any;
        signSeals: any;
    };
    getSealValue({ img, ...sealInfo }: {
        [x: string]: any;
        img: any;
    }, rect: any): {
        sealSource: number;
        signFileParam: any;
    };
    getSignValue(signInfo: any): {
        signPlateW: any;
        signPlateH: any;
        sourceW: number;
        sourceH: number;
        signatures: any;
        thickness: any;
        fakePressure: any;
    };
    formatValues(widgetContent: any, values: any): OverlayPositionValueInfo[];
    protected typeNameToDataName(type: string): string;
    protected strToTypeName(str: string): string;
    protected strToTypeEnum(str: string): string;
}
