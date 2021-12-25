import PdfReader from '.';
import EventBase from '../utils/eventBase2';
import { ThumbSourceView } from './thumb';
import { PdfDataSource } from './types';
/**
 * PDF加载器
 */
export declare type LoaderProps = {
    container: HTMLElement;
    renderPart: HTMLElement;
    pdfReader: PdfReader;
};
export declare type PdfDocument = {
    getPage: (page: number) => Promise<ThumbSourceView>;
};
export declare type PdfLoaderEvent = {
    onPdfSwitchSuccess: {
        target: PdfReader;
        id: string;
        index: number;
    };
    onPdfSwitchFail: {
        error: any;
    };
    onPdfSwitchComplete: undefined;
    onPdfPageInit: {
        pagesCount: number;
        scale: number;
    };
    onPdfPageLoad: {
        pagesCount: number;
    };
    /**
     * 页面渲染后
     */
    onPdfRendered: {
        /**
         * 被渲染的页码
         */
        page: number;
    };
    /**
     * 页码变化时
     */
    onPdfPageChange: {
        page: number;
    };
    onPdfSwitchBefore: {
        index: number;
    };
};
export default class PdfLoader extends EventBase<PdfLoaderEvent> {
    protected switchIndex: number;
    protected index: number;
    protected eventBus: any;
    protected pdfHistory: any;
    protected pdfViewer: any;
    protected linkService: any;
    protected viewer: HTMLElement;
    protected pdfReader: PdfReader;
    pagesCount: number;
    container: HTMLElement;
    renderPart: HTMLElement;
    pdfDocument: PdfDocument;
    protected _scale: number;
    get scale(): number;
    get currentPdf(): PdfDataSource | null;
    get currentIndex(): number;
    get scrollView(): HTMLElement;
    constructor(props: LoaderProps);
    protected init(): void;
    protected pagesInit({ source }: {
        source: any;
    }): void;
    protected pagesLoaded({ pagesCount }: {
        pagesCount: any;
    }): void;
    protected load(pdf: string): void;
    /**
     * 获取指定的页的信息
     * @param page 从1开始
     */
    getPageView(page: number): {
        div: HTMLDivElement;
        scale: number;
    } | null;
    switchById(id: string): boolean;
    switchByIndex(index: number, force?: boolean): boolean;
    setScale(scale: number): {
        scrollTop: number;
        scrollLeft: number;
        scale: number;
    };
}
