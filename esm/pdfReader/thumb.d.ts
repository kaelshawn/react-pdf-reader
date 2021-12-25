import EventBase from '../utils/eventBase';
/**
 * PDF缩略图
 */
export declare type ThumbOptions = {
    container: HTMLElement;
    source: IThumSource;
    width?: number;
    height?: number;
};
export interface IThumSource {
    /**
     * 总页码
     */
    pageCount: number;
    gotoPage: (page: number) => void;
    getThumeView: (page: number, cb: (view: HTMLCanvasElement) => void) => void;
}
declare type PdfThumbEvent = '';
export default class PdfThumb extends EventBase<PdfThumbEvent> {
    protected container: HTMLElement;
    protected source: IThumSource;
    protected thumItemViews: HTMLElement[];
    protected width: number;
    protected height: number;
    protected _index: number;
    get index(): number;
    set index(value: number);
    constructor(_options: ThumbOptions);
    init(): void;
    /**
     * 添加缩略图
     * @param view
     */
    addThumCanvas(view: HTMLCanvasElement, index: number): void;
    /**
     * 移动到指定页
     */
    goIndex(index: number): void;
    /**
     * 创建单个
     * @param page 页码
     */
    protected itemGenerate(page: number): HTMLElement;
    protected makeThumb(pageInfo: any): any;
}
export {};
