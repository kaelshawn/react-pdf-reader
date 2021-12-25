export declare type SealPasswordProps = {
    password: string;
    fileId: string[];
    contractId: string[];
};
export declare type SealVerifysProps = {
    [key: string]: string[];
};
export declare type SealProps = {
    authId: string;
    businessName: string;
    width?: number;
    height?: number;
    lawPersonFlag?: boolean;
    sealCode: string;
    sealName: string;
    /**
     * 印章图片的base64
     */
    sealPic: string;
    /**
     * 印章来源1：标品，2公安三所
     */
    sealSource: number;
    /**
     * 印章类型：1-自定义（其他类型） 2-企业公章 3-企业合同章 4-电子证照章 5-法人名章 6-财务章 7-发票章
     */
    sealType: number;
    sealTypeCode: string;
    /**
     * 用章方式, 0：直接使用 1：签字 2：密码 3：签字+密码
     */
    useType: number;
    usePassword?: string;
    pin?: string;
};
export declare type apiServiceProps = {};
export declare type SignSealProps = {
    width: string;
    height?: string;
    container: HTMLElement;
    seals: SealProps[];
    submit: (seal: SealProps) => void;
    pinVerify?: (seal: SealProps, pin: string, callback: Function) => void;
    passwordVerify?: (seal: SealProps, password: string, callback: Function) => void;
    /**
     * 返回事件
     */
    callBack?: () => void;
};
