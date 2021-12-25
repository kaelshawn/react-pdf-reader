import EventBase from '../utils/eventBase2';
import { OverlayTypeNames } from './overlay';
import OverlayManager, { OverlayPosition } from './overlay-manager';
export declare type OverlayPositionSelectorProps = {
    manager: OverlayManager;
    pdfOverlayPosition: OverlayPosition[];
};
export declare type OverlayPositionSelectorEvent = {
    /**
     * Position获取到焦点时的回调
     */
    onFocus: {
        target: OverlayPosition;
    };
    /**
     * Position失去焦点时的回调
     */
    onBlur: {
        target: OverlayPosition;
    };
};
/**
 * 选择器
 */
export declare class OverlayPositionSelector extends EventBase<OverlayPositionSelectorEvent> {
    protected pdfOverlayPosition: OverlayPosition[];
    get all(): OverlayPosition[];
    manager: OverlayManager;
    index: number;
    constructor(props: OverlayPositionSelectorProps);
    protected getEmptyList(type?: OverlayTypeNames, pdfIndex?: number): OverlayPosition[];
    getUpEmpty(type?: OverlayTypeNames, pdfIndex?: number): OverlayPosition;
    getNextEmpty(type?: OverlayTypeNames, pdfIndex?: number): OverlayPosition;
    getByType(type: OverlayTypeNames): OverlayPosition[];
    getById(id: string): OverlayPosition;
    setFocus(id: string): void;
    /**
     * 取消所有组件的焦点状态
     */
    clearFocus(): void;
}
