import type Slider from './main';
export declare type ISliderProps = {
    container: HTMLElement;
    /**
     * 是否禁用
     * @default false
     */
    disabled?: boolean;
    /**
     * 目前值
     * @default 0
     */
    value?: number;
    /**
     * 最小的值
     * @default 0
     */
    minValue?: number;
    /**
     * 最大的值
     * @default 100
     */
    maxValue?: number;
    /**
     * @default #108ee9;
     */
    color?: string;
    /**
     * 值被修改时回调
     * value 0-maxValue
     */
    isTip?: boolean;
    onChange?: (value: number, source: Slider) => void;
    onEnd?: (value: number, source: Slider) => void;
};
