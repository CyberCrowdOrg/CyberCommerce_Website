import {ethers} from 'ethers';
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

let parseUnits = ethers.utils.parseUnits;
let formatUnits = ethers.utils.formatUnits;

/**
 * 格式化数字
 */
function trimExtraChar(value, _char, regExp) {
    let index = value.indexOf(_char);
    if (index === -1) {
        return value;
    }
    if (_char === '-' && index !== 0) {
        return value.slice(0, index);
    }
    return value.slice(0, index + 1) + value.slice(index).replace(regExp, '');
}

export function formatNumber(value, allowDot, allowMinus) {
    if (value === undefined) {
        value = '';
    }
    if (allowDot === void 0) {
        allowDot = false;
    }
    if (allowMinus === void 0) {
        allowMinus = false;
    }
    if (allowDot) {
        value = trimExtraChar(value, '.', /\./g);
    } else {
        value = value.split('.')[0];
    }
    if (allowMinus) {
        value = trimExtraChar(value, '-', /-/g);
    } else {
        value = value.replace(/-/, '');
    }
    let regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g;
    return value.replace(regExp, '');
}

export function onFormatInput(prop, flag) {
    let arr = prop.split('.');
    if (arr.length === 1) {
        this[arr[0]] = formatNumber((new Function('t', `return t.${prop}`))(this), flag);
    }
    if (arr.length === 2) {
        this[arr[0]][arr[1]] = formatNumber((new Function('t', `return t.${prop}`))(this), flag);
    }
    if (arr.length === 3) {
        this[arr[0]][arr[1]][arr[2]] = formatNumber((new Function('t', `return t.${prop}`))(this), flag);
    }
    if (arr.length === 4) {
        this[arr[0]][arr[1]][arr[2]][arr[3]] = formatNumber((new Function('t', `return t.${prop}`))(this), flag);
    }
}

export function onFormatBlur(prop) {
    let arr = prop.split('.');
    if (arr.length === 1) {
        this[arr[0]] = this[arr[0]] === '' ? '' : Number(this[arr[0]]);
    }
    if (arr.length === 2) {
        this[arr[0]][arr[1]] = this[arr[0]][arr[1]] === '' ? '' : Number(this[arr[0]][arr[1]]);
    }
    if (arr.length === 3) {
        this[arr[0]][arr[1]][arr[2]] = this[arr[0]][arr[1]][arr[2]] === '' ? '' : Number(this[arr[0]][arr[1]][arr[2]]);
    }
    if (arr.length === 4) {
        this[arr[0]][arr[1]][arr[2]][arr[3]] = this[arr[0]][arr[1]][arr[2]][arr[3]] === '' ? '' : Number(this[arr[0]][arr[1]][arr[2]][arr[3]]);
    }
}

export function onFormatTableInput(row, prop, allowDot) {
    row[prop] = formatNumber(row[prop], allowDot)

}

export function onFormatTableBlur(row, prop, allowDot) {
    row[prop] = (row[prop] === '' || row[prop] === null) ? '' : Number(formatNumber(row[prop], allowDot));
}

export function dateFormatter({cellValue,}) {
    return cellValue ? String(cellValue).substr(0, 10) : '';
}

function formatPadStartNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

export function formatTime(date, isTimeStampStr = false) {
    if (isTimeStampStr) {
        date = Number(date);
    }
    date = new Date(date);
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return [year, month, day].map(formatPadStartNumber).join('-') + ' ' + [hour, minute, second].map(formatPadStartNumber).join(':')
}

export function formatTimeToMinute(date, isTimeStampStr = false) {
    if (isTimeStampStr) {
        date = Number(date);
    }
    date = new Date(date);
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    return [year, month, day].map(formatPadStartNumber).join('/') + ' ' + [hour, minute].map(formatPadStartNumber).join(':')
}

export function formatTimeToDay(date, isTimeStampStr = false) {
    if (isTimeStampStr) {
        date = Number(date);
    }
    date = new Date(date);
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return [year, month, day].map(formatPadStartNumber).join('/')
}

export const formatCountDownTime = (val) => {
    let time = {hour: 0, minute: 0, second: 0}
    if (!val || val <= 0) {
        return time;
    } else {
        time.hour = Math.floor(val / 1000 / 60 / 60);
        time.minute = Math.floor(val / 1000 / 60 % 60);
        time.second = Math.floor(val / 1000 % 60);
        return time;
    }
}

export const getCurrentTimeStamp = () => {
    return new Date().getTime();
}

/**
 * 返回用','分割的千分位字符串;
 */

export const toThousands = (num, toFixedNum = 2, separator = ",") => {
    // console.log({ toFixedNum });
    if (isNaN(num) || !num) {
        return num;
    }
    let str = exponentialToNumber(num, toFixedNum);
    let result = '';
    let intStr = str.split('.')[0];
    const floatStr = str.split('.')[1];
    const isNegative = Number(intStr) < 0; // 为负数;
    if (isNegative) {
        intStr = intStr.substr(1);
    }
    while (intStr.length > 3) {
        result = separator + intStr.slice(-3) + result;
        intStr = intStr.slice(0, intStr.length - 3);
    }
    result = isNegative ? '-' + intStr + result : intStr + result;
    return floatStr ? result + '.' + floatStr : result;
}

export const fixedFormatNum = (num, fixedLen = 6) => {
    try {
        if (num._isBigNumber) {
            num = formatUnits(num);
        }
    } catch (e) {
        console.error(e);
    }

    try {
        let _num = Number(num);
        if (isNaN(_num) || !_num || Math.abs(_num) == Infinity) {
            return 0;
        }
    } catch (e) {
        return 0;
    }


    num = exponentialToNumber(num, fixedLen);
    let numArr;
    try {
        let bigNum = parseUnits(num).toString();
        numArr = formatUnits(bigNum).split('.');
    } catch {
        numArr = num.split('.');
    }
    let num2 = numArr[1];
    if (fixedLen == 0 || !num2) {
        return numArr[0];
    }
    if (num2) {
        let numLen = String(num2).length;
        let strLen = num2.length;
        if (numLen == strLen) {
            num2 = num2.substr(0, fixedLen)
        } else {
            num2 = num2.substr(0, strLen - numLen + fixedLen);
        }
        return numArr[0] + '.' + num2;
    }
}

export const exponentialToNumber = (exponentialNum, fixedLen = 18) => {
    try {
        let str = exponentialNum.toString();
        let index = str.indexOf('e');
        if (index == -1) {
            try {
                let arr = str.split('.');
                let len = arr[1].length;
                len = fixedLen > len ? len : fixedLen;
                return arr[0] + '.' + arr[1].substr(0, len);
            } catch {
                return str;
            }
        } else {
            let arr = str.split('e');
            let len1 = arr[0].split('.')[1] ? arr[0].split('.')[1].length : 0;
            let len2 = Math.abs(arr[1]);
            if (Number(arr[1]) < 0) {
                let totalLen = len1 + len2;
                if (totalLen > fixedLen) {
                    str = Number(str).toFixed(totalLen);
                    try {
                        let arr = str.split('.');
                        let len = arr[1].length;
                        len = fixedLen > len ? len : fixedLen;
                        return arr[0] + '.' + arr[1].substr(0, len);
                    } catch {
                        return str;
                    }
                } else {
                    return Number(str).toFixed(totalLen);
                }
            } else {
                let arrSplitDot = arr[0].split('.');
                if (arrSplitDot[1]) {
                    if (len2 > len1) {
                        return arrSplitDot[0] + arrSplitDot[1] + '0'.repeat(len2 - len1)
                    } else {
                        throw new Error('exponentialToNumber Error');
                    }
                } else {
                    return arrSplitDot[0] + '0'.repeat(len2);
                }
            }
        }
    } catch (e) {
        console.error(e);
    }
}

export const getDollar = (val, price) => {

    if (Number("0" + val) === 0 || Number("0" + price) === 0) {
        return 0;
    } else {
        return toThousands(formatUnits(parseUnits(String(val), 18).mul(parseUnits(String(price), 18)), 36), 2)
    }
}

export const calcPercentage = (numerator, denominator) => {
    if (denominator === 0) return 0;
    return Math.round((numerator * 100 / denominator) * 100) / 100;
}

export const userNameFilter = (val) => {
    if (!val) {
        return '';
    } else if (String(val).length <= 8) {
        return val;
    }
    return val.substr(0, 4) + '...' + val.substr(-4);
}

export const addressFilter = (val) => {
    if (!val) {
        return '';
    } else if (String(val).length <= 13) {
        return val;
    }
    return val.substr(0, 6) + '...' + val.substr(-4);
}

export const addressEndFilter = (val) => {
    if (!val) {
        return '';
    } else if (String(val).length <= 36) {
        return val;
    }
    return val.substr(0, 36) + '...';
}

export const searchParse = (queryStr) => {
    let resultObj = {};
    if (queryStr && queryStr.length > 1) {
        let search = queryStr.split('?')[1];
        if (!search) {
            return resultObj
        }
        let items = search.split('&');
        for (let index = 0; index < items.length; index++) {
            if (!items[index]) {
                continue;
            }
            let kv = items[index].split('=');
            resultObj[kv[0]] = typeof kv[1] === "undefined" ? "" : kv[1];
        }
    }
    return resultObj;
}

export const getVuexKey = (url, _key = "vuex") => {
    let _url = new URL(url);
    let projectid = searchParse(_url.hash).projectid;
    if (projectid) {
        return _key + projectid;
    } else {
        return _key + _url.host.replace(/:|\./g, "");
    }

}


export function isStrEmpty(str) {
    if (str === undefined || str === null || str.length === 0) {
        return true;
    } else {
        return false;
    }
}

export function hex2int(hex) {
    let len = hex.length, a = new Array(len), code;
    for (let i = 0; i < len; i++) {
        code = hex.charCodeAt(i);
        if (48 <= code && code < 58) {
            code -= 48;
        } else {
            code = (code & 0xdf) - 65 + 10;
        }
        a[i] = code;
    }

    return a.reduce(function (acc, c) {
        acc = 16 * acc + c;
        return acc;
    }, 0);
}

/**
 * 平滑滚动到指定位置
 * @param y
 * @param duration
 * @param element
 */
export const scrollToY = (y, duration = 0, element = document.scrollingElement) => {
    // cancel if already on target position
    if (element.scrollTop === y) {
        return;
    }

    const NUMBER_TWO = 2;
    const cosParameter = (element.scrollTop - y) / NUMBER_TWO;
    let scrollCount = 0;
    let oldTimestamp = null;

    const step = function (newTimestamp) {
        if (oldTimestamp !== null) {
            // if duration is 0 scrollCount will be Infinity
            scrollCount += Math.PI * (newTimestamp - oldTimestamp) / duration;
            if (scrollCount >= Math.PI) {
                element.scrollTop = y;
                return;
            }
            element.scrollTop = cosParameter + y + cosParameter * Math.cos(scrollCount);
        }
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
}

export const isIphone = () => {
    let u = navigator.userAgent;
    // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
}

export const isAndroid = () => {
    let u = navigator.userAgent;
    return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
}

export const isMobile = (callback) => {
    if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
        return true
    }
    let x = window.matchMedia("screen and (max-width: 900px)")
    x.addEventListener('change', (e) => {
        if (e.matches) {
            callback(true)
        }else {
            callback(false)
        }
    });
    return x.matches;
}

export const preLoad = (imgUrl) => {
    let image = new Image()
    image.src = imgUrl
    image.onload = () => {
        console.log("图片加载完毕 : "+imgUrl)
    }
}

//decryptByDESModeCBCHex DES解密
export const decrypt = (key, cipher) => {
    let iv = "12345678"
    let keyHex = CryptoJS.enc.Utf8.parse(key);
    let ivHex = CryptoJS.enc.Utf8.parse(iv);
    let decrypted = CryptoJS.DES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(cipher)
    }, keyHex, {
        iv: ivHex,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

//encryptByDESModeCBCUtf8to64 DES加密
export const encrypt = (key, message) => {
    let ivString = "12345678"
    let keyHex = CryptoJS.enc.Utf8.parse(key);
    let ivHex = CryptoJS.enc.Utf8.parse(ivString);
    let encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        iv: ivHex,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

export function setUserInfo(data){
    let token = Cookies.get("Mvp_Token");
    let encryptUserInfo = encrypt(token, JSON.stringify(data));
    localStorage.setItem("userInfo", encryptUserInfo);
}

export function getUserInfo(){
    let token = Cookies.get("Mvp_Token");
    let encryptUserInfo = localStorage.getItem("userInfo");
    if (token && encryptUserInfo) {
        let userInfoJson = decrypt(token, encryptUserInfo);
        return JSON.parse(userInfoJson);
    }
    return null
}

export function deleteUserInfo(){
    localStorage.setItem("userInfo", "");
}




