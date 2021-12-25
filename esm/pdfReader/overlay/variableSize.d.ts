import type OverlayBase from './base';
import type { DIRECTION, ENUM_ORIGIN_TYPE } from './interface';
declare type IVariableSizeChangeValue = {
    width: number;
    height: number;
    x: number;
    y: number;
};
declare type IVariableSizeParams = {
    overlay: OverlayBase;
    origin: ENUM_ORIGIN_TYPE;
    isEqualRatio: boolean;
    minWidth: number;
    minHeight: number;
    /**
     * 获取不能超出的区域高度
     */
    getMaxTop: () => number;
    /**
     * 获取不能超出的区域宽度
     */
    getMaxLeft: () => number;
    getScale: () => number;
    onChange: (value: IVariableSizeChangeValue) => void;
};
declare type IVariableSizeChangeParams = {
    isEqualRatio: boolean;
    /**
     *改变尺寸的元素
     */
    overlayElem: HTMLElement;
    /**
     * 当前PDF的缩放比例
     */
    scale: any;
    /**
     * 鼠标相对于组件左上角x移动的坐标
     */
    x: any;
    /**
     * 鼠标相对于组件左上角y移动的坐标
     */
    y: any;
    /**
     * 最小宽度
     */
    minWidth: any;
    /**
     * 最小高度
     */
    minHeight: any;
    /**
     * 不能超出的高度
     */
    maxTop: any;
    /**
     * 不能超出的宽度
     */
    maxLeft: any;
    /**
     * 改的方向
     */
    direction: DIRECTION;
    startWidth: number;
    startHeight: number;
    startLeft: number;
    startTop: number;
    moveX: number;
    moveY: number;
};
/**
 * 可变尺寸
 */
export declare function variableSize(options: IVariableSizeParams): void;
export declare function changeSize(params: IVariableSizeChangeParams): {
    width: any;
    height: any;
    x: number;
    y: number;
};
export {};
