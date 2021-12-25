import type { ISliderProps } from './interface';
/**
 * 滑块
 */
export default class Slider {
    options: ISliderProps;
    value: number;
    disabled: boolean;
    sliderLine: HTMLElement;
    sliderProgressLine: HTMLElement;
    sliderBlock: HTMLElement;
    valueTips: HTMLElement;
    init(options: ISliderProps): this;
    protected create(): void;
    /**
     * 设置禁用状态
     */
    setDisabled(value: boolean): this;
    /**
     * 设置值
     * @param value
     */
    setValue(value: number, left?: number): this;
}
