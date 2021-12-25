import type { IPagePlaceValue, IPdfReaderLoadedResultParams, PdfReaderProps } from './interface';
import Multiple from './multiple';
import { OverlayPositionValueInfo } from './overlayAdapter';
import OverlayEditor from './overlayEditor';
import PdfThumb from './thumb';
declare class PdfReader {
    /**
     * 框选div
     */
    protected boxSelections: HTMLDivElement | null;
    protected options: PdfReaderProps;
    protected eventBus: any;
    protected linkService: any;
    protected pdfHistory: any;
    protected pdfDocument: any;
    protected originScale: number;
    protected lastEmptyOverlayId: string;
    container: HTMLElement;
    viewer: HTMLElement;
    pdfViewer: any;
    pageCount: number;
    protected renderPart?: HTMLElement;
    protected multiple: Multiple | null;
    protected pdfThumb?: PdfThumb;
    /**
     * 点击PDF后的回调函数
     */
    protected _pdfClickCallBack: ((params: IPagePlaceValue) => void) | null;
    protected set pdfClickCallBack(value: ((params: IPagePlaceValue) => void) | null);
    protected get pdfClickCallBack(): ((params: IPagePlaceValue) => void) | null;
    /**
     * 是否正在滚动，滚动的时候不会定位pdf的选中页
     */
    protected isScrolling: boolean;
    /**
     * 组件编辑器
     */
    overlayEditor: OverlayEditor | null;
    protected loadedCallBack: ((e: IPdfReaderLoadedResultParams) => void) | null;
    protected loadedCallBackOnce: ((e: IPdfReaderLoadedResultParams) => void) | null;
    protected loadedFailCallback: ((e: any) => void) | null;
    protected initScale(): void;
    protected initOverlayEditor(): void;
    protected pdfClick(info: any): void;
    protected initBoxSelector(): void;
    init(options: PdfReaderProps): this;
    protected createThumb(e: any): void;
    getCurrentPageIndex(targetElem: any): number;
    setLoadedCallBack(value: ((e: IPdfReaderLoadedResultParams) => void) | null): void;
    /**
     * 加载PDF base64文件
     * @param pdf
     */
    load(pdf: string, cb?: any, errcb?: any): void;
    /**
     * 切换pdf
     * @param pdf
     * @param fileId
     */
    switchPdf(pdf: string, fileId: string, sign?: boolean, cb?: any, errcb?: any): void;
    switchTemplate(pdf: string, templateId: string, userTag: string): void;
    /**
     * 获取下一个空白组件
     * @param typeNames 组件的类型名称
     */
    getEmptyOverlay(typeNames: string | string[], order: 'next' | 'up', fileId?: string): OverlayPositionValueInfo;
    /**
     * 获取所有PDF中签署的内容 如果多页没有切换的将不会返回
     * @returns
     */
    getAllPdfValues(widgetContent?: any): any[];
    /**
     * 通过WidgetContent获取所有的签署信息
     * @returns
     */
    getAllPdfValuesByWidgetContent(): OverlayPositionValueInfo[];
    /**
     * 获取所有PDF中的组件配置信息
     */
    getAllPdfWidgetInfos(): any;
    reSnapshot(snapshot: any): void;
    getSnapshot(): any;
    /**
     * 设置缩放比例
     * @param scale
     */
    setScale(scale: number): {
        scrollTop: number;
        scrollLeft: number;
        scale: number;
    };
    getScale(): number;
    reScale(): number;
    getPdfPage(): {
        width: any;
        height: any;
        rotation: any;
    };
    /**
     * 进入或退出可以获取位置的状态，
     * 进入状态后将在下一次点击PDF时回调cb
     * @param cb 如果为空将退出选取位置的状态，反之则进入
     */
    setPositionCallBack(cb?: (params: IPagePlaceValue) => void): void;
    gotoPage(pageIndex: any): void;
    /**
     * 滚动到指定的签署位
     * @param overlayInfo
     * @param sign 是否签署
     * @param getPdf 获取pdf的方法，用于多个文件的切换
     */
    scrollToOverlay(overlayInfo: OverlayPositionValueInfo, sign: boolean, getPdf?: (fileId: string) => Promise<string>): Promise<void>;
    protected gotoPageIsSetThum(pageIndex: number, isSetThum: boolean, cb?: () => void, offset?: number): void;
}
export default PdfReader;
