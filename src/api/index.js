import commonRequest from "./commonRequest.js";
import qs from 'qs'
///////////////////////////////////用户数据相关接口///////////////////////////////////
//用户登录接口
export function userLogin (requestBody) {
    let data = qs.stringify(requestBody)
    return commonRequest({
        url: "/user/v1/login",
        method:"post",
        data
    })
}

//用户绑定接口
export function bindAccount (data) {
    return commonRequest({
        url: "/user/v1/loginbind",
        method:"post",
        data
    })
}

//用户个人中信息基础数据
export function getAccountData () {
    return commonRequest({
        url: "/user/v1/personal",
        method:"get",
    })
}

//用户我的店铺数据
export function getUserShopInfo (data) {
    return commonRequest({
        url: "/user/v1/store",
        method:"post",
        data
    })
}

//用户我的团购
export function getUserGroupInfo (data) {
    return commonRequest({
        url: "/user/v1/groupon",
        method:"post",
        data
    })
}

//用户我的分销
export function getUserDistributionInfo (data) {
    return commonRequest({
        url: "/user/v1/distributor",
        method:"post",
        data
    })
}

//用户我的DAO
export function getUserDaoInfo (data) {
    return commonRequest({
        url: "/dao/v1/list",
        method:"post",
        data
    })
}

//用户我的任务
export function getUserMissionInfo (data) {
    return commonRequest({
        url: "/task/user.task.list",
        method:"post",
        data
    })
}

//用户我的交易
export function getUserTransactions (data) {
    return commonRequest({
        url: "/order/v1/list",
        method:"post",
        data
    })
}

///////////////////////////////////商品数据相关接口///////////////////////////////////
//商品列表
export function getProductList (data) {
    return commonRequest({
        url: "/goods/v1/list",
        method:"post",
        showCustomLoading:true,
        data
    })
}

//商品详情
export function getProductDetail (data) {
    return commonRequest({
        url: "/goods/v1/details",
        method:"post",
        data
    })
}

//帮砍价
export function haggle (data) {
    return commonRequest({
        url: "/order/v1/haggle.reward",
        method:"post",
        data
    })
}

//创建购买订单(直接购买和拼团购买)
export function createOrder (data) {
    return commonRequest({
        url: "/order/v1/create",
        method:"post",
        data
    })
}

//商品发起拼团
export function publishGroupTask (formData) {
    return commonRequest({
        url: "/task/v1/groupon.publish",
        method:"post",
        showCustomLoading:true,
        data:formData,
        headers: {
            // 表示上传的是文件,而不是普通的表单数据
            'Content-Type': 'multipart/form-data'
        }
    })
}

//商品发起分销
export function publishDistributionTask (formData) {
    return commonRequest({
        url: "/task/v1/distributor.publish",
        method:"post",
        showCustomLoading:true,
        data:formData,
        headers: {
            // 表示上传的是文件,而不是普通的表单数据
            'Content-Type': 'multipart/form-data'
        }
    })
}

//商品发布
export function publishProduct (formData) {
    return commonRequest({
        url: "/task/v1/sale.publish",
        method:"post",
        showCustomLoading:true,
        data:formData,
        headers: {
            // 表示上传的是文件,而不是普通的表单数据
            'Content-Type': 'multipart/form-data'
        }
    })
}
///////////////////////////////////支付相关接口///////////////////////////////////
//支付渠道列表
export function paymentChannel (data) {
    return commonRequest({
        url: "/channel/v1/list",
        method:"post",
        data
    })
}

//创建支付订单
export function createPaymentOrder (data) {
    return commonRequest({
        url: "/pay/v1/create.order",
        method:"post",
        showCustomLoading:false,
        data
    })
}

///////////////////////////////////DAO数据相关接口///////////////////////////////////
//DAO 详情
export function getAllDaoList (data) {
    return commonRequest({
        url: "/dao/v1/all",
        method:"post",
        showCustomLoading:true,
        data
    })
}

//DAO 详情 本级和父级DAO树
export function daoDetails (data) {
    return commonRequest({
        url: "/dao/v1/details",
        method:"post",
        data
    })
}

//DAO 详情 所有DAO树
export function daoTotalDetails (data) {
    return commonRequest({
        url: "/dao/v2/details",
        method:"post",
        data
    })
}

//创建DAO提案
export function createDaoProposal (formData) {
    // let data = qs.stringify(formData)
    return commonRequest({
        url: "/proposal/v1/create",
        method:"post",
        showCustomLoading:false,
        data:formData,
        headers: {
            // 表示上传的是文件,而不是普通的表单数据
            'Content-Type': 'multipart/form-data'
        }
    })
}

//创建DAO内NFT
export function createDaoNFT (formData) {
    return commonRequest({
        url: "/dao/v1/nftMinit",
        method:"post",
        showCustomLoading:true,
        data:formData,
        headers: {
            // 表示上传的是文件,而不是普通的表单数据
            'Content-Type': 'multipart/form-data'
        }
    })
}
