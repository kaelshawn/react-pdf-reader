import type OverlayBase from './base';
export declare enum ENUM_OVERLAY_TYPE {
    INPUT = "INPUT",
    IMG_BLOCK = "IMG_BLOCK",
    CHECKBOX = "CHECKBOX",
    DATE_INPUT = "DATE_INPUT"
}
export declare enum ENUM_ORIGIN_TYPE {
    LEFT_TOP = "LEFT_TOP",
    LEFT_BOTTOM = "LEFT_BOTTOM",
    CENTER = "CENTER"
}
export declare type DIRECTION = 'LEFT_TOP' | 'LEFT_BOTTOM' | 'RIGHT_TOP' | 'RIGHT_BOTTOM';
/**
 * 漂浮物状态
 * INPUT 可以进行输入
 * EDITING 编辑状态
 * FREE 自由签
 */
export declare enum ENUM_OVERLAY_STATUS {
    INPUT = "INPUT",
    EDITING = "EDITING",
    FREE = "FREE"
}
export declare type IOverlayParams = {
    id?: string;
    /**
     * 组件类型名称
     */
    typeName?: string;
    /**
     * 组件类型
     */
    type?: ENUM_OVERLAY_TYPE;
    /**
     * 是否允许拖动
     * @default true
     */
    allowDrag?: boolean;
    /**
     * 是否允许改变尺寸
     * @default true
     */
    allowChangeSize?: boolean;
    /**
     * 是否等比例缩放
     * @default false
     */
    isEqualRatio?: boolean;
    /**
     * 原点位置
     * @default LEFT_TOP
     */
    origin?: ENUM_ORIGIN_TYPE;
    width?: number | string;
    height?: number | string;
    minWidth?: number;
    minHeight?: number;
    /**
     * 组件的样式
     */
    className?: string;
    onClick?: (e: OverlayBase) => void;
    /**
     * 是否显示
     * @default true
     */
    visible?: boolean;
    group?: string;
};
export declare type IInsertParams = {
    /**
     * 需要添加到的PDF页
     */
    pdfPage: any;
    /**
     * 需要添加到的PDF页码
     */
    pdfPageNumber: number;
    /**
     * 插入的left位置
     */
    x: number;
    /**
     * top 位置
     */
    y: number;
    /**
     * 从数据库中读出没有进行计算过的位置
     */
    dataX?: number;
    /**
     * 从数据库中读出没有进行计算过的位置
     */
    dataY?: number;
    status: ENUM_OVERLAY_STATUS;
};
/**
 * 编辑组件的属性
 */
export declare type IOverlaySetParams = {
    x: number;
    y: number;
};
