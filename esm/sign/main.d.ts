import type { SignProps, OptionsProps, ContractRes, UserProps } from './interface';
import type { SealProps } from '../signSeal';
import type { IPagePlaceValue } from '../pdfReader';
import PdfReader from '../pdfReader';
import Dialog from '../dialog';
import type OverlayBase from '../pdfReader/overlay/base';
export default abstract class BaseSign {
    protected apiServer: SignProps;
    protected options: OptionsProps;
    protected seals: SealProps[];
    protected signInfo: ContractRes;
    protected pdfReader: PdfReader;
    protected curOverlay?: OverlayBase;
    protected fileCurrentIndex: number;
    /**
     * 签字组件
     */
    protected signBoard: any;
    protected signBoardElem: HTMLElement;
    /**
     * 签章组件
     */
    protected signSeal: any;
    protected signSealElem: HTMLElement;
    /**
     * 签字留样签字版
     */
    protected sampleBoard: any;
    protected sampleBoardElem: HTMLElement;
    /**
     * 文件列表选择框
     */
    protected SelectContainer: HTMLElement;
    protected SelectContainerElem: HTMLSelectElement;
    /**
     * pdf渲染容器
     */
    protected pdfContainer: any;
    /**
     * toolbar渲染容器
     */
    protected toolBarContainer: any;
    protected toolBar: any;
    protected isVerify: boolean;
    protected message: any;
    protected signContents: any;
    protected personIdentity: string;
    protected stashSignId: string;
    protected dialog: Dialog;
    protected curPoint: IPagePlaceValue | null;
    protected user: UserProps;
    protected fileUrl: string;
    protected filePathType: 'ID' | 'URL';
    protected messsage: any;
    constructor(options: SignProps);
    init(options: OptionsProps): this;
    /**
     * 加载文件列表，由具体的签署类型来实现。
     */
    protected abstract loadFile(): any;
    /**
     * 获取文件列表
     */
    protected abstract getFileList(): any;
    /**
     * 获取指定文件的文件id（唯一标识符）
     * @param index
     */
    protected abstract getFileId(index: any): any;
    /**
     * 切换文件，因为不同的参数切换
     */
    protected abstract switchPdf(): any;
    /**
     * 当前文件是否可签署
     */
    protected abstract canOprtate(): any;
    protected create(): void;
    protected createSelectContainer(): void;
    protected refreshSelect(): void;
    protected showSelect(status: any): void;
    protected getSignPoint(): void;
    protected getSealPoint(): void;
    protected switchFile(index: any): void;
    protected submit(): Promise<void>;
    protected abstract submitSign(): any;
    protected startVerifySign(): void;
    /**
     * 校验印章的签字
     */
    protected verifySealSign(param: any): void;
    protected isNeedSign(): boolean;
    protected sealNeedSign(useType: any): boolean;
    protected submitFail(): void;
    protected createPdfContainer(): void;
    protected createToolBarContainer(): void;
    protected createSignBoard(): void;
    protected createSignSeal(): void;
    protected createSampleBoard(): void;
    protected loadPdf(fid: string, url?: string): void;
    protected loadPdfByUrl(fid: any, url: any): void;
    protected loadPdfById(fid: any): void;
    protected buildPdfReader(): void;
    protected abstract buildToolBar(): any;
    protected initSignBoard(): void;
    protected closeSignBoard(): void;
    protected freeSignEnd(): void;
    protected showSampleBoard(): void;
    protected initSampleBoard(): void;
    protected uploadSampleSign(points: any): Promise<{
        fid: string;
    }>;
    protected submitSampleSign(fids: any): Promise<{
        success: boolean;
    }>;
    protected showSignBoard(): void;
    protected pinVerify(seal: SealProps, pin: string, cb: any): void;
    protected passwordVerify(seal: SealProps, password: string, cb: any): void;
    protected closeSignSeal(): void;
    protected initSignSeal(): void;
    protected showSignSeal(): void;
}
