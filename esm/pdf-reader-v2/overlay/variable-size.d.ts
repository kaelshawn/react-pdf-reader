import EventBase from '../../utils/eventBase2';
import { DIRECTION } from './types';
export declare type ChangedValue = {
    width: number;
    height: number;
    x: number;
    y: number;
};
export declare type VariableSizeEvent = {
    onSizeChanged: ChangedValue;
};
export declare type VariableSizeProps = {
    target: HTMLElement;
    config: () => VariableSizeConfig;
};
export declare type VariableSizeConfig = {
    minWidth: number;
    minHeight: number;
    maxTop: number;
    maxLeft: number;
    scale: number;
    isEqualRatio: boolean;
};
/**
 * 可变尺寸
 */
export declare class VariableSize extends EventBase<VariableSizeEvent> {
    private _variableSizeAllow;
    get variableSizeAllow(): boolean;
    set variableSizeAllow(value: boolean);
    protected target: HTMLElement;
    protected config: () => VariableSizeConfig;
    constructor(props: VariableSizeProps);
    protected handlers: {
        element: HTMLElement;
        direction: DIRECTION;
    }[];
    protected init(): void;
    protected handlerCreate(): void;
    private variableDrag;
    private render;
}
export declare type CalculationSizeProps = {
    /**
     *改变尺寸的元素
     */
    targetElement: HTMLElement;
    /**
     * 鼠标相对于组件左上角x移动的坐标
     */
    x: number;
    /**
     * 鼠标相对于组件左上角y移动的坐标
     */
    y: number;
    /**
     * 最小宽度
     */
    minWidth: number;
    /**
     * 最小高度
     */
    minHeight: number;
    /**
     * 不能超出的高度
     */
    maxTop: number;
    /**
     * 不能超出的宽度
     */
    maxLeft: number;
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
    isEqualRatio: boolean;
};
export declare const variableCalculationSize: (params: CalculationSizeProps) => ChangedValue;
