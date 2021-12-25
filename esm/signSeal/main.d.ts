import type { SealVerifysProps, SignSealProps } from './interface';
export default class SignSeal {
    protected options: SignSealProps;
    protected sealView: HTMLElement;
    protected closeBtn: HTMLElement;
    protected noteView: HTMLElement;
    protected submitBtn: HTMLElement;
    protected inputContainer: HTMLElement;
    protected pinInput: HTMLInputElement;
    protected dotContent: HTMLElement;
    protected currentDot: HTMLElement;
    protected sealContent: HTMLElement;
    protected currentSeal: HTMLElement;
    protected passwordContainer: HTMLElement;
    protected passwordInput: HTMLInputElement;
    protected errorView: HTMLElement;
    protected currentIndex: number;
    protected showDotted: boolean;
    protected sealVerifys: SealVerifysProps;
    protected sealVerifyKey: string;
    protected password: string;
    /**
     * 当前选择印章的校验方式
     */
    protected verify_type: string;
    /**
     * 初始化印章组件
     * @param options
     */
    init(options: SignSealProps): this;
    /**
     * 传入当前签字位判断校验的标识
     * @param key
     */
    showSeals(key: string): void;
    /**
     * 根据印章数据刷新印章列表
     */
    refreshImg(): void;
    protected create(): void;
    /**
     * 创建弹框title
     */
    protected createTitle(): HTMLDivElement;
    protected resetSeal(): void;
    /**
     * 创建错误提示信息
     */
    protected createError(): HTMLElement;
    /**
     * 创建印章列表
     */
    protected createImgeCarousel(): HTMLDivElement;
    /**
     * 创建提示信息
     */
    protected createInfo(): HTMLElement;
    /**
     * 创建pin码输入框
     */
    protected createPinInput(): HTMLElement;
    /**
     * 创建6位密码输入框
     */
    protected createPasswordInput(): HTMLElement;
    /**
     * 提交操作
     */
    protected createSubmit(): HTMLElement;
    protected verifyCallback(res: any): void;
    protected verifySuccess(seal: any): void;
    protected setError(msg: any): void;
    protected setCurrentDot(index: number): void;
    protected setCurrentImg(index: number): void;
    protected setNote(msg?: string): void;
    protected showPinInput(isShow: boolean): void;
    protected showPassInput(isShow: boolean): void;
    protected canSubmit(isShow: boolean): void;
    protected formateVerifyType(): void;
    protected handleVar(): void;
    /**
     *
     * @param type PASSWORD：输入密码，PIN：输入pin SUBMIT：提交
     */
    protected handleUI(): void;
}
