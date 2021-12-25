import type { IBoxSelectorResult, IOverlayEditorOptions, IDrag, ISignFile } from './interface';
import type PdfReader from './main';
import type OverlayBase from './overlay/base';
import type { IOverlaySetParams, ENUM_OVERLAY_TYPE } from './overlay/interface';
import { ENUM_OVERLAY_STATUS } from './overlay/interface';
import EventBase from '../utils/eventBase';
import { OverlayPositionValueInfo } from './overlayAdapter';
export declare type OverlayEditorEvent = 'onFreeActivedOverlayChange';
export default class OverlayEditor extends EventBase<OverlayEditorEvent> {
    protected options: IOverlayEditorOptions;
    protected _overlay: OverlayBase | null;
    protected reader: PdfReader;
    protected overlayDrags: IDrag[];
    private _freeActivedOverlay;
    get freeActivedOverlay(): OverlayBase | null;
    set freeActivedOverlay(value: OverlayBase | null);
    /**
     * 所有的组件
     */
    overlaies: OverlayBase[];
    status: ENUM_OVERLAY_STATUS;
    /**
     * 被选中的组件
     */
    protected overlaySelected: OverlayBase[];
    protected onChange: (() => void) | null;
    protected emitChange(): void;
    get allValues(): any[];
    set allValues(values: any[]);
    /**
     * 刷新组件
     * @param value
     */
    reRender(): void;
    /**
     * 重新将组件放入pdf
     * @param pageNumber
     */
    reInsert(pageNumber: any, scale: any): void;
    init(options: IOverlayEditorOptions): this;
    /**
     * 放入一个组件
     * @param overlay
     * @param pdfPage
     * @param param2
     */
    insert(overlay: OverlayBase, pdfPage: any, params: {
        pageNumber: any;
        x?: any;
        y?: any;
        dataX?: any;
        dataY?: any;
    }, isFree?: boolean): OverlayBase;
    insertForTemplateData(fields: any, signerTag?: string): void;
    /**
     * 放入一个组件
     * @param type
     * @param params x,y 将会除以缩放比例
     * @param typeName 类型名称
     * @param isFree 是否为自由签署
     */
    insertByType(type: ENUM_OVERLAY_TYPE, params: {
        pageNumber: number;
        x: number;
        y: number;
    }, typeName?: string, isFree?: boolean): OverlayBase;
    /**
     * 清空所有的组件
     */
    clear(isEmitChange?: boolean): void;
    /**
     * 移除指定的组件
     */
    remove(ids: string[]): void;
    /**
     * 获取所有的组件配置信息
     */
    getInfos(): any;
    /**
     *
     * @param widgetContent 其它对组件的配置信息
     * @returns
     */
    getValues(widgetContent: any): any;
    /**
     * 批量设置选中组件的配置信息
     */
    selectedSetInfo(values: IOverlaySetParams): void;
    /**
     * 选中指定区域中的组件
     * @param rect
     */
    selected(rect: IBoxSelectorResult): void;
    /**
     * 根据传入的签署位配置获取格式完整的签署结果
     */
    getFormatValues(file: ISignFile, values: any): OverlayPositionValueInfo[];
}
