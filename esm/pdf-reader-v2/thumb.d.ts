import EventBase from '../utils/eventBase';
/**
 * PDF缩略图
 */
export declare type ThumbProps = {
    container: HTMLElement;
    source: IThumSource;
    width?: number;
    height?: number;
};
export declare type Viewport = {
    width: number;
    height: number;
};
export declare type RenderProps = {
    canvasContext: CanvasRenderingContext2D | null;
    viewport: Viewport;
};
export declare type ThumbSourceView = {
    getViewport: (props: {
        scale: number;
        rotate?: number;
    }) => Viewport;
    rotate: number;
    render: (props: RenderProps) => {
        promise: Promise<HTMLElement>;
    };
};
export interface IThumSource {
    /**
     * 总页码
     */
    pageCount: number;
    gotoPage: (page: number) => void;
    getThumeView: (page: number, cb: (view: ThumbSourceView) => void) => void;
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
    constructor(_options: ThumbProps);
    init(): void;
    /**
     * 添加缩略图
     * @param view
     */
    addThumCanvas(view: HTMLElement, index: number): void;
    /**
     * 移动到指定页
     */
    goIndex(index: number): void;
    /**
     * 创建单个
     * @param page 页码
     */
    protected itemGenerate(page: number): HTMLElement;
    protected makeThumb(pageInfo: ThumbSourceView): Promise<HTMLElement>;
}
export {};
