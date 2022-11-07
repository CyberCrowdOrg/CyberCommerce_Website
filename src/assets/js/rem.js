(function (doc, win) {
    let docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        reCalc = function () {
            let isMobile = false;
            if ((navigator.userAgent.match(
                /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
            ))) {
                isMobile = true;
            } else {
                isMobile = false;
            }
            if (isMobile) {
                let clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                // 这里的780 取决于设计稿的宽度
                // if (clientWidth >= 375) {
                //     docEl.style.fontSize = '78px';
                // } else {
                //     docEl.style.fontSize = 78 * (clientWidth / 780) + 'px';
                // }
                docEl.style.fontSize = 100 * (clientWidth / 375) + 'px';
            } else {
                let clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                // 这里的1200 取决于设计稿内容的宽度
                if (clientWidth >= 1200) {
                    docEl.style.fontSize = '100px';
                } else {
                    docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px';
                }
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, reCalc, false);
    doc.addEventListener('DOMContentLoaded', reCalc, false);
})(document, window);
