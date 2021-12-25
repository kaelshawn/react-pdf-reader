import type { ContractSignProps, ContractApiProps, ContractRes } from './interface';
import BaseSign from './main';
/**
 * 根据合同id，完成签署流程
 */
export default class ContractSign extends BaseSign {
    protected apiServer: ContractApiProps;
    protected options: ContractSignProps;
    protected signInfo: ContractRes;
    constructor(options: ContractApiProps);
    init(options: ContractSignProps): this;
    protected getFileList(): {
        id: number;
        pageNum: number;
        currentFileId: string;
        fileName: string;
        sign: boolean;
        templateFileId: number;
        uploadFileId: string;
        widgetContent: string;
    }[];
    protected getFileId(index: any): string;
    protected loadFile(): void;
    protected switchPdf(): void;
    protected canOprtate(): boolean;
    protected getContractInfo(): ContractRes;
    protected switchFile(index: any): void;
    protected submitSign(): void;
    protected buildToolBar(): void;
    private getSignType;
}
