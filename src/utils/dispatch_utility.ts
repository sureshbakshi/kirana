
import { Dispatch } from 'redux';

declare const InstallTrigger;
class Utility {
    mapDispatchToProps(dispatch: Dispatch<any>): { Dispatch: Dispatch<any> } {
        return {
            Dispatch: dispatch
        };
    }

    getPlatformString = () => {

        if (navigator.userAgent.match(/Android/i)) {
            return 'android';
        }

        if ((navigator.userAgent.match(/BlackBerry/i)) || (navigator.userAgent.match(/RIM Tablet OS/i)) || (navigator.userAgent.match(/BB10/i))) {
            return 'blackberry';
        }

        if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
            return 'ios';
        }

        if (navigator.userAgent.match(/Windows Phone|IEMobile|WPDesktop/i)) {
            return 'wp';
        }
        let isOpera = !!window['opera'] || navigator.userAgent.indexOf(' OPR/') >= 0;
        if (isOpera) {
            return 'opera';
        }

        let isFirefox = typeof InstallTrigger !== 'undefined';
        if (isFirefox) {
            return 'firefox';
        }

        let isSafari = Object.prototype.toString.call(window['HTMLElement']).indexOf('Constructor') > 0;

        if (isSafari) {
            return 'safari';
        }

        let isEdge = navigator.userAgent.indexOf(' Edge/') >= 0;
        if (isEdge) {
            return 'edge';
        }

        let isChrome = !!window['chrome'] && !isOpera && !isEdge;
        if (isChrome) {
            return 'chrome';
        }

        let isIE = /*@cc_on!@*/false || !!document['documentMode'];
        if (isIE) {
            return 'ie';
        }

        return 'unknown';
    }

}

export const utility = new Utility();
