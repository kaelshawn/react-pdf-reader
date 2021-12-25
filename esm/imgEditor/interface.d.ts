export declare type ImgEditorProps = {
    container: HTMLElement;
    /**
     * 是否镂空
     * @default false
     */
    isHollow?: boolean;
    /**
     * 是否增强
     * @default false
     */
    isAugment?: boolean;
    /**
     * 是否允许上传
     * @default true
     */
    isChoose?: boolean;
    /**
     * 允许选择文件类型
     * @default image/*
     */
    accept?: string;
    /**
     *截剪参数
     参看 https://github.com/fengyuanchen/cropperjs#options
     */
    cropperOptions?: ImgCropperOptions;
};
export declare type ImgCropperOptions = {} & Cropper.Options;
