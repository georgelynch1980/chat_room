/**
 * isIe,isIE6,isIE7,isIE8,isIE9,isIE11
 * isIOS,isIPhone,isIPad,isIPhone4,isIPad3
 * isAndroid,isAndroidMobile
 * isChrome,isSafari,isMozilla
 * isWebkit,isOpera
 * isPC,isTablet,isSmartPhone
 *
 * APP.UserAgent.isPC
 *
 */
APP.namespace('UserAgent');
var e, n, r;
r = navigator.userAgent.toLowerCase();
APP.UserAgent = {
    isIE: false,
    isIE6: false,
    isIE7: false,
    isIE8: false,
    isIE9: false,
    isLtIE9: false,
    isIE11: false,
    isIOS: false,
    isIPhone: false,
    isIPad: false,
    isIPhone4: false,
    isIPad3: false,
    isAndroid: false,
    isAndroidMobile: false,
    isChrome: false,
    isSafari: false,
    isMozilla: false,
    isWebkit: false,
    isOpera: false,
    isPC: false,
    isTablet: false,
    isSmartPhone: false,
    browser: r
};
if (APP.UserAgent.isIE = /msie\s(\d+)/.test(r)) {
    n = RegExp.$1;
    n *= 1;
    APP.UserAgent.isIE6 = n === 6;
    APP.UserAgent.isIE7 = n === 7;
    APP.UserAgent.isIE8 = n === 8;
    APP.UserAgent.isIE9 = n === 9;
    APP.UserAgent.isLtIE9 = n < 9;
}
if (APP.UserAgent.isIE7 && r.indexOf("trident/4.0") !== -1) {
    APP.UserAgent.isIE7 = false;
    APP.UserAgent.isIE8 = true;
}
if (r.indexOf("trident/7.0") !== -1) {
    APP.UserAgent.isIE = true;
    APP.UserAgent.isIE11 = true;
}
if (APP.UserAgent.isIPhone = /i(phone|pod)/.test(r)) {
    APP.UserAgent.isIPhone4 = window.devicePixelRatio === 2;
}
if (APP.UserAgent.isIPad = /ipad/.test(r)) {
    e = window.devicePixelRatio === 2;
}
APP.UserAgent.isIOS = APP.UserAgent.isIPhone || APP.UserAgent.isIPad;
APP.UserAgent.isAndroid = /android/.test(r);
APP.UserAgent.isAndroidMobile = /android(.+)?mobile/.test(r);
APP.UserAgent.isPC = !APP.UserAgent.isIOS && !APP.UserAgent.isAndroid;
APP.UserAgent.isTablet = APP.UserAgent.isIPad || APP.UserAgent.isAndroid && APP.UserAgent.isAndroidMobile;
APP.UserAgent.isSmartPhone = APP.UserAgent.isIPhone || APP.UserAgent.isAndroidMobile;
APP.UserAgent.isChrome = /chrome/.test(r);
APP.UserAgent.isWebkit = /webkit/.test(r);
APP.UserAgent.isOpera = /opera/.test(r);
APP.UserAgent.isMozilla = r.indexOf("compatible") < 0 && /mozilla/.test(r);
APP.UserAgent.isSafari = !APP.UserAgent.isChrome && APP.UserAgent.isWebkit;