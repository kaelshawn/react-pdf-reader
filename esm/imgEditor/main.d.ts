import Cropper from 'cropperjs';
import type { ImgEditorProps } from './interface';
import Slider from '../slider';
export default class ImgEditor {
    protected options: ImgEditorProps;
    /**
     * 图片展示元素
     */
    protected tailoringImg: HTMLImageElement;
    /**
     * 右侧的工具区
     */
    protected toolBox: HTMLDivElement;
    /**
     * 左侧的图片展示区
     */
    protected pavedArea: HTMLDivElement;
    /**
     * 左侧图片选择层
     */
    protected chooseLayer: HTMLLabelElement;
    protected previewBox: HTMLLabelElement;
    protected _previewImgView?: HTMLImageElement;
    protected get previewImgView(): HTMLImageElement;
    private _cutCanvas?;
    /**
     * 镂空用的控制器
     */
    protected slider: Record<string, Slider>;
    /**
     * 截剪组件
     */
    protected cropper: Cropper;
    init(options: ImgEditorProps): this;
    protected create(): void;
    protected createImgSelector(): void;
    /**
     * 图片加载成功后
     */
    protected imgLoadEnd(): void;
    protected createCropper(): void;
    /**
     * 创建滑块操作区
     */
    protected createHandlerSlider({ txt, key }: {
        txt: any;
        key: any;
    }): void;
    protected adjustCutout(): Promise<void>;
    /**
     * 获取编辑结果
     * @param param0
     */
    getEditResult({ width, height }: {
        width: any;
        height: any;
    }): Promise<unknown>;
    /**
     * 加载图片
     * @param img
     */
    load(img: string | File): Promise<void>;
    /**
     * 清空数据
     */
    clear(): Promise<void>;
    /**
     *
     * @param img 图片数据
     * @param value 抠图阈值
     * @param repairReadValue 补强红色
     */
    protected cutout(img: any, value: any, repairReadValue: any, toBlobCallBack?: any): string;
}
