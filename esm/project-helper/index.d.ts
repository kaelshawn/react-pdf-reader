import { PointProps } from '../pdf-reader-v2/types';
import ProjectEvent from './event';
import TokenHelper from './token';
import { SignInfo, SignProjectHelperProps } from './type';
export declare type SignProjectHelperEvent = {
    onCloseFrame: undefined;
};
export declare class SignProjectHelper {
    private apiConfig;
    protected iframe?: HTMLIFrameElement;
    private mode;
    private postMessage?;
    private dialog;
    private message;
    event: ProjectEvent;
    token: TokenHelper;
    constructor({ mode, ...rest }: SignProjectHelperProps);
    get hasIframe(): boolean;
    getUrl(htmlName: string): any;
    openUrl(url: any): void;
    crateIframe(): void;
    closeIframe(): void;
    startSign({ face, onSignBefore, onSubmitBefore, ...props }: Omit<SignInfo, 'apiConfig'>): void;
    startView(signId: string): void;
    externalSign(value: PointProps | PointProps[]): void;
    startSubmit(value: any): void;
}
