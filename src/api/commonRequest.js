import axios from "axios";
import {Loading, Message} from 'element-ui';
import Cookies from 'js-cookie'

//创建axios的一个实例
const simpleInstance = axios.create({
    baseURL: 'https://api.cybercrowd.store/mvp',
    timeout: 180000, //设置超时
    headers: {
        "Accept-Language": "zh_CN"
    },
    // withCredentials: false // 允许携带cookie
});

let loading;
//显示loading
const showLoading = () => {
    loading = Loading.service({ fullscreen: true });
};
//隐藏loading
const hideLoading = () => {
    if (loading) {
        setTimeout(()=>{
            loading.close();
        },0);
    }
};

//请求拦截器
simpleInstance.interceptors.request.use(
    async (config) => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // const token = window.localStorage.getItem('token');
        // token && (config.headers.Authorization = token)

        if (!config.showCustomLoading){
            console.log("showLoading")
            showLoading();
        }

        if (config.method === 'post') {
            if (config.url === "/user/v1/login") {
                //登录
                config.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8;";

            } else if (
                //上传文件
                config.url === "/proposal/v1/create" ||
                config.url === "/dao/v1/nftMinit" ||
                config.url === "/task/v1/groupon.publish" ||
                config.url === "/task/v1/distributor.publish" ||
                config.url === "/task/v1/sale.publish") {

                config.headers["Mvp_Token"] = Cookies.get("Mvp_Token");
                config.headers["Content-Type"] = "multipart/form-data;";

            } else {
                //其他接口
                config.headers["Mvp_Token"] = Cookies.get("Mvp_Token");
                config.headers["Content-Type"] = "application/json;charset=UTF-8;";
                config.data = JSON.stringify(config.data);
            }
        } else {
            if (config.url === "/user/v1/personal"){
                config.headers["Mvp_Token"] = Cookies.get("Mvp_Token");
            }
        }
        console.log("request config", config)
        return config;
    },
    (error) =>
        // 对请求错误做些什么
        Promise.reject(error)
);

//响应拦截器
simpleInstance.interceptors.response.use(
    async (response) => {
        hideLoading();
        console.log("response", response)
        //响应成功
        if (response.data.returnCode === "0000" || response.data.code === "SUCCESS") {
            if (response.data && response.config.url === "/user/v1/login"){
                if (response.data.data.loginToken){
                    Cookies.set('Mvp_Token', response.data.data.loginToken);
                }
            }
            return response.data;
        } else {
            Message.error(response.data.returnMsg);
        }
    },
    (error) => {
        console.log(error);
        //响应错误
        if (error.response && error.response.status) {
            // Message.error("request failed");
        }
        hideLoading();
        return Promise.reject(error);
    }
);

export default simpleInstance;
