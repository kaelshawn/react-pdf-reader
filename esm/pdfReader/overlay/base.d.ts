import EventBase from '../../utils/eventBase';
import type { IInsertParams, IOverlayParams } from './interface';
import { ENUM_OVERLAY_STATUS } from './interface';
export default abstract class OverlayBase extends EventBase {
    options: IOverlayParams;
    noAllowDrag: boolean;
    private _status;
    get status(): ENUM_OVERLAY_STATUS;
    set status(value: ENUM_OVERLAY_STATUS);
    /**
     * 当前签署位是否为被激活的自由签署位
     */
    private _isActivedFree;
    get isActivedFree(): boolean;
    set isActivedFree(value: boolean);
    get group(): string;
    get type(): import("./interface").ENUM_OVERLAY_TYPE;
    get typeName(): string;
    /**
     * 是否已选中
     */
    isSelected: boolean;
    /**
     * 当前漂浮元素所在PDF页
     */
    protected pdfPage: any;
    protected x: number;
    protected y: number;
    private _dataInfo;
    private _dataX;
    private _dataY;
    protected _height: number;
    protected _width: number;
    /**
     * 漂浮元素显示宽度
     */
    protected get width(): number;
    protected set width(value: number);
    /**
     *漂浮元素显示高度
     */
    protected get height(): number;
    protected set height(value: number);
    protected get dataX(): number;
    protected set dataX(value: number);
    protected get dataY(): number;
    protected set dataY(value: number);
    protected set dataInfo(value: any);
    protected get dataInfo(): any;
    /**
     * 未创建漂浮元素前的拖拽元素
     */
    protected dragElem: HTMLElement | null;
    /**
     * 选中标识
     */
    protected selecteElem?: HTMLElement;
    /**
     * 漂浮元素最小宽度
     */
    protected minWidth: number;
    /**
     * 漂浮元素最小高度
     */
    protected minHeight: number;
    protected create(): boolean;
    protected changeStatus(): void;
    protected dataPositionRefresh(): void;
    /**
     * 渲染漂浮物，将对位置、尺寸进行缩放
     */
    protected render(): void;
    protected pressMove(): void;
    /**
     * 当前漂浮元素所在PDF页码
     */
    pageNumber: number;
    /**
     * 漂浮元素
     */
    overlayElem: HTMLElement | null;
    init(options: IOverlayParams, dataInfo?: any): this;
    reRender(): void;
    reInsert(): void;
    /**
     * 设置
     * @param value
     */
    setSelected(value: boolean): void;
    /**
     * 设置是否允许选中
     * @param value
     */
    setAllowSelected(value: boolean): void;
    /**
     * 拖拽物的渲染
     */
    dragElemRender(x: number, y: number, scale: number, view?: HTMLElement): void;
    /**
     * 设置拖拽元素所在位置
     * @param x
     * @param y
     */
    dragElemSetPosition(x: number, y: number): void;
    /**
     * 将拖拽物插入到pdf页中，渲染漂浮物
     * @param param0
     */
    insert({ status, pdfPage, pdfPageNumber, x, y, dataX, dataY }: IInsertParams): boolean;
    directory(): void;
    /**
     * 设置配置信息
     */
    setInfo(info: any): this;
    /**
     * 获取配置信息
     */
    getInfo(): {
        x: number;
        y: number;
        width: number;
        height: number;
        page: number;
    };
    get id(): any;
    get elemId(): string;
    /**
     * 获取提交数据
     */
    abstract getValue(): any;
    abstract setValue(values: any): any;
    protected abstract overlayElemClick(): any;
}
