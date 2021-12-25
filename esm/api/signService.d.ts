export declare class _SignService {
    url: string;
    insertFileUrl(params: TContractInfo): Promise<any>;
    signatories({ contractNum }: {
        contractNum: any;
    }): Promise<any>;
    contractQuery(params?: {}): Promise<any>;
    certificateUnGet(contractNum: any): Promise<void>;
    contractDetail(id: any): Promise<TContractDetail>;
    downloadPDF(id: any): Promise<any>;
    contractSign(id: any, body: any): Promise<any>;
    querySignCollect(): Promise<any>;
    getSignData(id: any): Promise<any>;
    getSignDataList(user_id: any): Promise<any>;
    queryCollectSignInfo(): Promise<any>;
    collectSignInfo(params: any): Promise<any>;
    userUploadSign(params: any): Promise<any>;
    verificationDiscern(params: any): Promise<any>;
    /**
     * 发起并签署
     */
    launchAndSign(contractInfo: TContractInfo, signInfo: TSignContent): Promise<any>;
}
declare type TContractDetail = {
    contractNum: string;
    signFiles: {
        uploadFileId: string;
        currentFileId: string;
        templateFileId: string;
        widgetContent: string;
    }[];
};
declare type TSignatory = {
    signatoriesSort: number;
    businessId: string;
    businessName: string;
    telephone: string;
    signatoriesUuid: string;
};
declare type TFileWidgetInfo = {
    fields: unknown[];
    seal: unknown[];
    sign: unknown[];
    templateFilesName: string;
};
declare type TContractInfo = {
    contractName: string;
    contractDescribe?: string;
    depId?: Number;
    signatories?: TSignatory[];
    endTime?: string;
    metadata?: Record<string, unknown>;
    carbonCopys?: Omit<TSignatory, 'signatoriesUuid'>[];
    files: {
        url: string;
        config: TFileWidgetInfo;
    }[];
};
declare type TSignFile = {
    currentFileId: string;
    templateFileId: string;
    uploadFileId: string;
    signs: unknown[];
    fields: unknown[];
    seal: unknown[];
};
declare type TSignContent = {
    sign: {
        signContents: TSignFile[];
    };
};
declare const _default: _SignService;
export default _default;
