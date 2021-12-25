import Dialog from '../dialog';
import EventBase from '../utils/eventBase2';
import PdfLoader from './loader';
import OverlayManager from './overlay-manager';
import './styles.less';
import PdfThumb from './thumb';
import { PdfDataSource, PdfDataSourceParams, PdfMode, PdfReaderPorps, ReaderStatus } from './types';
export declare type SelectPositionValue = {
    left: number;
    top: number;
    /**
     * 从1开始
     */
    page: number;
    pageHeight: number;
};
export declare type PdfReaderEvent = {
    /**
     * 移动到指定位置后的回调
     */
    onGotoPageComplete: {
        pageIndex: number;
    };
    onSelectPosition: {
        position: SelectPositionValue;
    };
};
export default class PdfReader extends EventBase<PdfReaderEvent> {
    pdfDatas: PdfDataSource[];
    container: HTMLElement;
    overlayManager: OverlayManager;
    pageCount: number;
    loader: PdfLoader;
    /**
     * 从1开始
     */
    pageIndex: number;
    status: ReaderStatus;
    mode: PdfMode;
    protected renderPart: HTMLElement;
    protected thuembContainer?: HTMLElement;
    protected thumb: PdfThumb;
    protected isScrolling: boolean;
    protected props: PdfReaderPorps;
    protected dialog: Dialog;
    protected originScale: number;
    protected pdfStatus: 'NORMAL' | 'POSITION';
    constructor(props: PdfReaderPorps);
    /**
     * @param pageIndex 下标应该从0开始
     */
    gotoPage(pageIndex: number, offset?: number): void;
    setPdfDatas(values: PdfDataSourceParams[]): this;
    /**
     *开启或关闭选择位置的功能
     */
    switchPosition(flag: boolean): void;
    private positionLayer;
    protected pageRendered(page: number): void;
    private initThumb;
    private initLoader;
}
