export enum AppActionTypes {
    SET_CAPTCHA = '[APP] Set Captcha',
    ENABLE_CHALLANGE ='[APP] Set challenge'
}

interface IAppSetCaptcha {
  readonly type: AppActionTypes.SET_CAPTCHA;
  payload: any;
}
interface IEnableChallange {
  readonly type: AppActionTypes.ENABLE_CHALLANGE;
  payload: any;
}


export type Actions = IAppSetCaptcha| IEnableChallange;

export function setCaptchaCode(response: any): IAppSetCaptcha {
  return {
    type: AppActionTypes.SET_CAPTCHA,
    payload: response,
  };
}
export function enableChallange(response: any): IEnableChallange {
  return {
    type: AppActionTypes.ENABLE_CHALLANGE,
    payload: response,
  };
}