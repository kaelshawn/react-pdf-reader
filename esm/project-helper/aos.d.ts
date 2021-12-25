/**
 * sdk 引入js
 */
import { ApiConfig } from '../api/utils';
import './index.less';
import { Aos } from './type';
export declare const aosInit: (apiConfig: ApiConfig, callBack: (aos: Aos) => void) => void;
