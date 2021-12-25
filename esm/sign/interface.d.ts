import type { SealProps } from '../signSeal';
export declare type ContractRes = {
    contractName: string;
    contractNum: string;
    sign: boolean;
    config: {
        freeSign: boolean;
    };
    signFiles: SignFileProps[];
    user: SignUserPros;
    signatoriesInfos: SignatoriesInfoProps[];
};
export declare type SignatoriesInfoProps = {
    business: SignBusinessProps;
    user: SignUserPros;
};
declare type SignBusinessProps = {
    businessAuthType: number;
    id: string;
    licensenumber: string;
    name: string;
};
declare type SignFileProps = {
    id: number;
    pageNum: number;
    currentFileId: string;
    fileName: string;
    sign: boolean;
    templateFileId: number;
    uploadFileId: string;
    widgetContent: string;
};
declare type SignUserPros = {
    id: string;
    idnum: string;
    name: string;
    rasKey: string;
    telphone: string;
    username: string;
    unifiedUseId: string;
};
declare type LoginParamProps = {
    userId: string;
    appId: number;
    loginmode: number;
};
declare type userBaseProps = {
    exipred: string;
    expiresIn: number;
    idnum: string;
    refreshtoken: string;
    token: string;
};
export declare type UserProps = {
    loginBase: userBaseProps;
    loginVo: {
        name: string;
        businessId: string;
        telphone: string;
    };
};
declare type PoinProps = {};
declare type SignPointProps = {
    data: PoinProps[];
};
/**
 * 上传签字留样的返回数据
 */
declare type SignSampleFileRes = {
    fid: string;
};
/**
 * 提交签字留样的返回数据
 */
declare type SignSampleUploadRes = {
    success: boolean;
};
declare type UploadSignProps = {
    fids: string[];
};
declare type SignDataProps = {
    sign: {
        signContents: any[];
    };
};
/**
 * 校验pin码的参数格式
 */
declare type PinProps = {
    pin: string;
    sealCode: string;
    sealTypeCode: string;
};
/**
 * 校验密码的参数格式
 */
declare type PasswordProps = {
    usePassword: string;
    authId: string;
};
/**
 * 校验笔迹的参数格式
 */
declare type VerificationProps = {
    discern: boolean;
    fakePressure: boolean;
    signPoints: PoinProps[];
};
declare type BaseApiProps = {
    /**
     * 登录
     */
    login: (param: LoginParamProps) => Promise<UserProps>;
    /**
     * 获取印章列表
     */
    getSeals: () => Promise<SealProps[]>;
    /**
     * 获取pdfbase64
     */
    downloadPDF: (fid: string) => Promise<string>;
    /**
     * 查询是否有签字留样
     */
    queryCollectSignInfo: () => Promise<any>;
    /**
     * 提交签字采集数据
     */
    collectSignInfo: (param: SignPointProps) => Promise<SignSampleFileRes>;
    /**
     * 提交签字留样
     */
    userUploadSign: (param: UploadSignProps) => Promise<SignSampleUploadRes>;
    /**
     * 校验pin码
     */
    pinVerify: (param: PinProps) => Promise<any>;
    /**
     * 校验密码
     */
    verifyAuth: (param: PasswordProps) => Promise<any>;
    /**
     * 校验签字笔迹
     */
    verificationDiscern: (param: VerificationProps) => Promise<any>;
};
export declare type ContractApiProps = {
    /**
     * 获取合同详情
     */
    getContractDetail: (cid: string) => Promise<ContractRes>;
    /**
     * 提交签署
     */
    contractSign: (cid: string, param: SignDataProps) => Promise<any>;
} & BaseApiProps;
export declare type FreeApiProps = {
    launchAndSign: (any: any, signInfo: SignDataProps) => Promise<any>;
} & BaseApiProps;
export declare type SignProps = ContractApiProps | FreeApiProps;
declare type OptionsBaseProps = {
    needSeal: boolean;
    appId?: number;
    token: string;
    /**
     * pdf挂载点
     */
    container: HTMLElement;
    beforeSubmit?: () => void;
    /**
     * 返回按钮
     */
    back: () => void;
    submitCallBack: (any?: any) => void;
    loadFinish: (ContractRes: any) => void;
};
export declare type ContractSignProps = {
    /**
     * 合同编号
     */
    cid: string;
} & OptionsBaseProps;
export declare type FreeSignProps = {
    /**
     * 文件id
     */
    signInfo: {
        signFiles: FreeSignFileProps[];
        sign: boolean;
    };
} & OptionsBaseProps;
export declare type OptionsProps = ContractSignProps | FreeSignProps;
declare type FieldProps = {};
declare type SignatureProps = {
    x: number;
    y: number;
    width: number;
    height: number;
    id: string;
    page: number;
    signatoriesUuid: string;
    required: boolean;
    name: string;
    group?: string;
};
declare type SealModuleProps = {
    x: number;
    y: number;
    width: number;
    height: number;
    id: string;
    page: number;
    signatoriesUuid: string;
    required: boolean;
    name: string;
};
declare type FreeSignFileProps = {
    currentFileId?: string;
    widgetContent?: {
        fields: FieldProps[];
        sign: SignatureProps[];
        seal: SealModuleProps[];
    };
    fileName: string;
    url: string;
};
export {};
