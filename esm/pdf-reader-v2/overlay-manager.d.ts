import EventBase from '../utils/eventBase2';
import PdfReader from './index';
import { OverlayPositionSelector } from './overlay-position-selector';
import { OverlayTypeNames, TypeOverlay } from './overlay/';
import { OverlayBase } from './overlay/base';
import OverlaySeal from './overlay/seal';
import OverlaySign from './overlay/sign';
import { OverlayBaseProps } from './overlay/types';
import { Position } from './types';
export declare type InsertOverlayProps = {
    type: OverlayTypeNames;
} & Omit<OverlayBaseProps, 'pdfReader'>;
/**
 * 小组件的管理
 * 1. 创建、删除、查询
 * 2. 获取指定页的组件层
 */
export declare type OverlayManagerProps = {
    pdfReader: PdfReader;
};
export declare type OverlayPosition = {
    pdfId: string;
    type: OverlayTypeNames;
    id: string;
    overlayView?: OverlayBase;
    name?: string;
} & Position;
export declare type OverlayManagerEvent = {
    onSignClick: {
        target: OverlaySign;
        position: OverlayPosition;
    };
    onSealClick: {
        target: OverlaySeal;
        position: OverlayPosition;
    };
    /**
     * 签署位数量、签署位值变化时触发
     */
    onChange: undefined;
};
export declare type OverlayValue = {
    pdfId: string;
    type: OverlayTypeNames;
    id: string;
    value: any;
};
export default class OverlayManager extends EventBase<OverlayManagerEvent> {
    pdfReader: PdfReader;
    private _pdfOverlayPosition?;
    /**
     * 获取全部的Overlay位置信息
     */
    protected get pdfOverlayPosition(): OverlayPosition[];
    /**
     * 获取当前PDF的Overlay位置信息
     */
    get currentPdfOverlay(): OverlayPosition[];
    get currentPdfId(): string;
    /**
     * 组件位置选择器
     */
    positionSelector: OverlayPositionSelector;
    constructor(props: OverlayManagerProps);
    insert<T extends OverlayTypeNames>(props: Omit<InsertOverlayProps, 'type'> & {
        type: T;
    }): TypeOverlay[T];
    /**
     *
     * @param page 从1开始
     * @returns
     */
    getOverlayLayer(page: number): HTMLElement;
    /**
     * 如果必填内容没完成将抛出异常 no-input
     * 如果非必填，并且未填的组件将不会被返回
     * @returns
     */
    getValues(): OverlayValue[];
    clear(props?: {
        pdfIndex?: number;
        overlayId?: string;
    }): void;
    reRender(page: number): void;
    /**
     * 将pdf定位到指定的组件位置
     * @param overlay
     */
    goto(overlay: OverlayPosition): void;
    protected createOverlay<T extends OverlayTypeNames>(props: Omit<OverlayPosition, 'type'> & {
        type: T;
    }): TypeOverlay[T];
    private pdfLoad;
}
