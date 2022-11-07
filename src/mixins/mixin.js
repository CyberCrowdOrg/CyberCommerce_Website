import {Loading} from "element-ui";
import {isMobile} from "@/utils";

export const string_util = {
    methods: {
        isStrEmpty(str) {
            if (str === undefined || str === null || str.length === 0) {
                return true;
            } else {
                return false;
            }
        }
    },
}

export const number_util = {
    methods: {
        decimalToPercentage(decimal) {
            return (Number(decimal) * 100).toFixed(2)+"%"
        }
    },
}

export const address_filter = {
    methods: {
        addressFilter(val) {
            if (!val) {
                return '';
            } else if (String(val).length <= 13) {
                return val;
            }
            return val.substr(0, 6) + '...' + val.substr(-4);
        },
        addressEndFilter(val) {
            if (!val) {
                return '';
            } else if (String(val).length <= 36) {
                return val;
            }
            return val.substr(0, 36) + '...';
        }
    },
}

export const name_filter = {
    methods: {
        userNameFilter(val){
            if (!val) {
                return '';
            } else if (String(val).length <= 8) {
                return val;
            }
            return val.substr(0, 4) + '...' + val.substr(-4);
        }
    },
}

export const time_filter = {
    methods: {
        formatTimeToSecond(timeStamp) {
            if (!timeStamp || timeStamp ===0){
                return ""
            }
            let numberDate = Number(timeStamp);
            let date = new Date(numberDate);
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDate()
            const hour = date.getHours()
            const minute = date.getMinutes()
            const second = date.getSeconds()
            return [year, month, day].map(this.formatPadStartNumber).join('-') + ' ' + [hour, minute, second].map(this.formatPadStartNumber).join(':')
        },
        formatTimeToMinute(timeStamp) {
            let numberDate = Number(timeStamp);
            let date = new Date(numberDate);
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDate()
            const hour = date.getHours()
            const minute = date.getMinutes()
            return [year, month, day].map(this.formatPadStartNumber).join('/') + ' ' + [hour, minute].map(this.formatPadStartNumber).join(':')
        },
        formatTimeToDay(timeStamp) {
            let numberDate = Number(timeStamp);
            let date = new Date(numberDate);
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDate()
            return [year, month, day].map(this.formatPadStartNumber).join('/')
        },
        formatPadStartNumber(n) {
            n = n.toString()
            return n[1] ? n : '0' + n
        }
    },
}

export const media_util = {
    methods: {
        mediaLink(media) {
            if (media === 'Twitter') {
                window.open("https://twitter.com/CyberCrowdorg");
            } else if (media === 'Telegram') {
                window.open("https://t.me/+uaecbNdoTCIwYzU9");
            } else if (media === 'Discord') {
                window.open("https://discord.com/invite/U34Bm7S8");
            } else if (media === 'Medium') {
                window.open("https://medium.com/@cybercrowd");
            }
        },
    },
}

export const general_util = {
    data() {
        return {
            isMobile: false,
            loadingInstance:null,
        };
    },
    mounted() {
        this.isMobile = isMobile((small) => {
            console.log("isMobile == " + small)
            this.isMobile = small
        })
    },
    methods:{
        showLoading(){
            this.loadingInstance = Loading.service({ fullscreen: true })
        },
        hideLoading(){
            if (this.loadingInstance){
                // 以服务的方式调用的 Loading 需要异步关闭
                this.$nextTick(() => {
                    this.loadingInstance.close();
                });
            }
        }
    }
}
