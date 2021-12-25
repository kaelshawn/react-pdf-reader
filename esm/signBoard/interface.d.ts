import type { SignSampleBarProps, SignToolBarProps } from '../signToolBar/interface';
export declare type SignBoardProps = {
    className?: string;
    forceRotate?: boolean;
    /**
     * 是否启用虚拟压感
     * @default true
     */
    fakePressure?: boolean;
    /**
     * 设置压力最大值
     * @default 1
     */
    maxPressure?: number;
    /**
     * 笔触粗细
     * @default 4
     */
    thickness?: number;
    /**
     * 笔触的颜色
     */
    color?: string;
    /**
     * 采样频率默认20mm
     */
    throttle?: number;
    container: HTMLElement;
    /**
     * 是否启用
     * @default true
     */
    enabled?: boolean;
    /**
     * @default 'SIGN_TOOLS_BAR'
     */
    bgContent?: string | HTMLElement;
    toolsBar?: 'SIGN_TOOLS_BAR' | 'SING_SAMPLE_BAR' | Function;
    toolsBarConfig?: SignToolBarProps | SignSampleBarProps;
};
