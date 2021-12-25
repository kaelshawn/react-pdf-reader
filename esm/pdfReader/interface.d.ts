import type PdfReader from './main';
import type { IOverlayParams, ENUM_ORIGIN_TYPE, ENUM_OVERLAY_TYPE, ENUM_OVERLAY_STATUS } from './overlay/interface';
import type { IOverlayAdapter } from './overlayAdapter';
import { ThumbOptions } from './thumb';
export declare type PdfReaderProps = {
    container: HTMLElement;
    /**
     * PDF视图，便于测试
     * 平时可以不用管
     */
    viewer?: HTMLElement;
    /**
     * 2.2.1后支持
     */
    thumOptions?: Partial<Omit<ThumbOptions, 'source'>>;
    /**
     * 模式
     * moblie
     * pc  是否允许框选有效
     * @default MODE_PC
     */
    mode?: 'MODE_MOBILE' | 'MODE_PC';
    /**
     * 是否允许框选 MODE_PC  有效
     * @default true
     */
    allowBoxSelect?: boolean;
    /**
     * 是否允许手势变动缩放 MODE_MOBILE 有效
     * @default true
     */
    allowGesture?: boolean;
    /**
     * 组件配置
     */
    overlayConfig?: IPdfOverlayParams & {
        onChange?: () => void;
        overlayAdapter: IOverlayAdapter;
    };
    /**
     * 初始化完成后的回调
     * @param e scale 当前缩放比例
     */
    loadedCallBack?: ((e: IPdfReaderLoadedResultParams) => void) | null;
    loadedFailBack?: ((e: any) => void) | null;
    /**
     * es引入时需要指定pdf.worker.entry的路径
     */
    workerSrc?: string;
    /**
     * 需要签署的文件列表，传入后可以支持多文件签署
     */
    signFiles?: ISignFile[];
    /**
     * 需要编加的文件列表，传入后可以支持多文件编辑
     */
    templateFiles?: ITemplateFile[];
};
export declare type IPdfOverlayParams = {
    drags?: IDrag[];
    status: ENUM_OVERLAY_STATUS;
} & IOverlayParams;
/**
 * 可拖拽的内容
 */
export declare type IDrag = {
    el: HTMLElement;
    typeName: string;
    type: ENUM_OVERLAY_TYPE;
    /**
     * 原点位置
     * @default LEFT_TOP
     */
    origin?: ENUM_ORIGIN_TYPE;
    /**
     * 是否等比例缩放
     * @default false
     */
    isEqualRatio?: boolean;
    /**
     * 占位元素
     */
    placeholder?: () => void;
};
export declare type IPdfReaderLoadedResultParams = {
    /**
     * 缩放比例
     */
    scale: number;
    /**
     * 页码总数
     */
    pagesCount: number;
};
/**
 * 框选器的初始化参数
 */
export declare type IBoxSelectorParams = {
    /**
     * 使用框选器的容器
     */
    container: HTMLElement;
    /**
     * 选择完毕后回调
     * @param rect 选中的组件列表
     */
    onSelected: (rect: IBoxSelectorResult) => void;
    /**
     * 取消选中
     */
    onCancelSelected: () => void;
    /**
     * 开始画框，如果返回false将退出事件
     */
    onStart?: (params: IPagePlaceValue) => boolean;
};
/**
 * 框选器选择范围
 */
export declare type IBoxSelectorResult = {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    width: number;
    height: number;
    pageNumber: number;
};
/**
 * PDF页面的信息
 */
export declare type IPDFPageInfo = {
    /**
     * 页与屏幕上方的距离，于滚动条有关
     */
    top: number;
    /**
     * 页与屏幕左方的距离，于滚动条有关
     */
    left: number;
    /**
     * 当前页码
     */
    pageNumber: number;
    canvasWrapper: HTMLElement;
};
/**
 * PDF页上的位置
 */
export declare type IPagePlaceValue = {
    /**
     * 相对位置x
     */
    x: number;
    /**
     * 相对位置y
     */
    y: number;
} & IPDFPageInfo;
/**
 * 漂浮物编辑器
 */
export declare type IOverlayEditorOptions = {
    /**
     * 响应容器
     */
    reader: PdfReader;
    /**
     * 组件配置
     */
    config?: IPdfOverlayParams;
    overlayAdapter: IOverlayAdapter;
    onChange?: () => void;
};
export declare type ISignFile = {
    currentFileId: string;
    widgetContent?: any;
};
export declare type ITemplateFile = {
    uploadFileId: string;
    fields: any[];
    seal: any[];
    sign: any[];
};
