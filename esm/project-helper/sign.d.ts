import Service, { SubmitSignData } from '../api/paas-sign-service';
import { OverlayValue } from '../pdf-reader-v2/overlay-manager';
import { SignValueDetails } from '../signBoard/types';
import { SignInfo, SignInfoItem } from './type';
export declare type FaceProps = {
    name: string;
    idCard: string;
};
export declare type CheckSignResult = {
    id: string;
    pass: boolean;
};
export default class SignUtils {
    private service;
    private handledIds;
    constructor(service: Service);
    loadViewInfo(signId: string): Promise<SignInfoItem[]>;
    loadSignInfo(signId: string, files: SignInfoItem[]): Promise<Array<SignInfoItem>>;
    buildSignSeal(overlayValues: OverlayValue[], submitData: SubmitSignData, signSealHandwritingId: string): Promise<void>;
    buildSignId(overlayValues: OverlayValue[], submitData: SubmitSignData): Promise<void>;
    buildFile(signData: SignInfo, submitData: Partial<SubmitSignData>): Promise<void>;
    checkSign(singValue: SignValueDetails): Promise<CheckSignResult>;
    buildSubmitData: (files: SignInfoItem[]) => SubmitSignData;
}
