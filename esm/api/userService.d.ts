export declare class _UserService {
    token: any;
    expire: any;
    userInfo: any;
    cryptoKey: any;
    url: string;
    _update({ token, cryptoKey, ...info }: {
        [x: string]: any;
        token: any;
        cryptoKey: any;
    }): void;
    _clean(): Promise<void>;
    get isLogin(): boolean;
    logout(): Promise<void>;
    private _login2;
    private _generateKey;
    login2({ userId, appId, loginmode, appcode, password, businessId, }: {
        userId: any;
        appId?: number;
        loginmode?: number;
        appcode?: string;
        password: any;
        businessId: any;
    }): any;
    private _thirdAuth;
    thirdAuth(params: any): any;
    private saas;
    private _refresh;
    refresh(): any;
    private _switchBusinessByContractNum;
    private _switchBusiness;
    switchBusiness(params: any): any;
    getUserIdentity(id: any): Promise<any>;
}
declare const _default: _UserService;
export default _default;
