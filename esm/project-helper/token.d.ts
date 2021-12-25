import { TokenValue } from '../api/paas-sign-service';
import { ApiConfig } from '../api/utils';
export default class TokenHelper {
    private service;
    private _token?;
    constructor(apiConfig: ApiConfig);
    set(token: string | TokenValue): void;
    get value(): string;
    refresh(): Promise<false | TokenValue>;
    login(): Promise<TokenValue>;
    updateToken(): Promise<string>;
}
