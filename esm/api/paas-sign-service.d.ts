import { Rectangle } from '../pdf-reader-v2/overlay/types';
import { ApiConfig } from './utils';
export declare type TokenKeys = 'access_token' | 'token_type' | 'refresh_token' | 'expires_in' | 'scope';
export declare type TokenValue = {
    access_token: string;
    refresh_token: string;
    expires_in: number;
};
export declare const startRefersh: (service: any, callback?: (tokenInfo: any) => void) => (expire?: number) => void;
export declare class Service {
    constructor(config: ApiConfig);
    tokenCreate(clientToken: string): Promise<TokenValue>;
    tokenRefresh(props: {
        access_token: string;
        refresh_token: string;
    }): Promise<TokenValue>;
    /**
     * @deprecated 使用 tokenRefresh tokenCreate 替代
     * @param props
     * @returns
     */
    token(props?: any): Promise<TokenValue>;
    fileDownload(id: string): Promise<{
        fileName: string;
        fileData: Blob;
        id: string;
    }>;
    fileUpload(file: File, currentFileId: string): Promise<{
        fileId: string;
        currentFileId: string;
    }>;
    handWritingUpload(params: {
        __value?: any;
        fgpInfo: any;
        deviceInfo: any;
        signData: {
            id?: string;
        };
    }): Promise<{
        pass: boolean;
        id?: string;
        handWritingId: string;
    }>;
    sealList(socialCreditCode: string): Promise<Array<SealListData>>;
    sealVerifyAuth(params: {
        authId: string;
        usePassword: string;
    }): Promise<{
        pass: boolean;
    }>;
    sealVerifyPin(params: {
        pin: string;
        sealId: string;
        sealCode: string;
        sealTypeCode: string;
    }): Promise<{
        pass: boolean;
    }>;
    /**
     * 签署
     */
    sign(props: Partial<SubmitSignData>, thirdBizId: string): Promise<{
        signId: string;
        thirdBizId: string;
    }>;
    /**
     * 获取签署详情
     */
    getSignFileListBySignId(signId: string): Promise<{
        fileList: string[];
    }>;
}
export default Service;
export declare type SubmitSealInfoDataType = {
    /**
     * 笔迹编号
     */
    handwritingId?: string;
    pin?: string;
    usePassword?: string;
    sealCode: string;
    sealTypeCode: string;
    type: EnumSealInfoType;
    sealId: string;
};
export declare enum EnumSealInfoType {
    三所 = 1,
    AOS = 2
}
export declare enum EnumSignType {
    印章 = 1,
    签字 = 2,
    图片 = 3,
    文字 = 4
}
export declare type SubmitFileInfo = {
    fileId: string;
    currentFileId: string;
    signInfo: {
        handwritingInfo?: {
            handwritingId: string;
        };
        page: number;
        rectangle: Rectangle;
        sealInfo?: SubmitSealInfoDataType;
        type: EnumSignType;
    }[];
};
export declare type SubmitSignData = {
    fileInfo: SubmitFileInfo[];
    thirdBizId: string;
};
export declare enum EnumSealUseType {
    pin = 0,
    sign = 1,
    password = 2,
    signAndPassword = 3
}
export declare type SealListData = {
    authId: string;
    businessName: string;
    id: string;
    /**
     * 是否为法人
     */
    lawPersonFlag: boolean;
    sealCode: string;
    sealName: string;
    sealPic: string;
    sealTypeCode: string;
    useType: EnumSealUseType;
};
