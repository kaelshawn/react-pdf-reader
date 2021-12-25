import { TokenValue } from '../api/paas-sign-service';
import { ApiConfig } from '../api/utils';
import { OverlayPosition } from '../pdf-reader-v2/overlay-manager';
import { PointProps, Position } from '../pdf-reader-v2/types';
import PostMessage from '../utils/post-message';
import ProjectEvent from './event';
export declare type ProjectMode = 'h5' | 'pc';
export declare type SignProjectHelperProps = {
    mode: ProjectMode;
} & ApiConfig;
export declare type ViewInfo = {
    signId: string;
    apiConfig: ApiConfig;
    onInvalidateToken?: (tokenInfo: any) => void;
};
export declare type SignType = 'TOUCH' | 'REMOTE' | 'EXTERNAL';
export declare type SignBoardSize = {
    /**
     * 弹窗内签字板的宽度
     */
    width?: string;
    /**
     * 弹窗内签字板的高度
     */
    height?: string;
    /**
     * 外设签字板的宽度
     */
    originWidth?: number;
    /**
     * 外设签字板的高度
     */
    originHeight?: number;
};
export declare type Aos = {
    defaultPdf: File;
    setToken: (token: string | TokenValue) => void;
    updateToken: () => Promise<string>;
    startSign: (props: Omit<SignInfo, 'apiConfig'>) => void;
    startView: (signId: string) => void;
    close: () => void;
    getToken: () => string;
    postMessage?: PostMessage;
    event: ProjectEvent;
    /**
     * 设置外部签署板的签字内容
     */
    externalSign?: (value: PointProps | PointProps[]) => void;
    /**
     * 提交前的回调函数
     */
    startSubmit: (value: any) => void;
};
export declare type FaceProps = {
    name: string;
    idCard: string;
};
export declare type SignInfoItem = {
    file?: File;
    currentFileId: string;
    seal: Position[];
    sign: Position[];
};
/**
 * 启动签署由第三方传入的数据
 */
export declare type SignInfo = {
    apiConfig: ApiConfig;
    files: SignInfoItem[];
    signId?: string;
    /**
     * 签署模式
     * @default TOUCH
     */
    signType?: SignType;
    /**
     * 是否开启伪压感
     */
    signPressure?: boolean;
    /**
     * 设置最大的压力值
     */
    signMaxPressure?: number;
    /**
     * 签字板尺寸
     */
    signBoardSize?: SignBoardSize;
    /**
     * 社会信用代码
     */
    socialCreditCode?: string;
    /**
     * 第三方业务编号
     */
    thirdBizId: string;
    /**
     * 是否自由签
     */
    isFree?: boolean;
    /**
     * 是否人脸识别
     */
    face?: FaceProps;
    /**
     * 已经签名留样，如果为true则在调章时法人可以切换到签字调章
     * @default false
     */
    signedSample?: boolean;
    /***
     * 签字前的回调
     */
    onSignBefore?: (id: string) => Promise<any>;
    /***
     * 提交前的回调
     */
    onSubmitBefore?: (value: any) => Promise<any>;
};
export declare type SubmitError = {
    code: 'sign-seal' | 'no-handwritingId';
    message: string;
    detail?: OverlayPosition;
};
export declare const WebsocketUrl = "wss://openstandard.isigning.cn/services/";
