import Vue from 'vue'
import VueRouter from 'vue-router'
import i18n from "../lang";

Vue.use(VueRouter)

//组件引入
//首页
// const Home = () => import('../pages/home/Index.vue');
// const Solution = () => import('../pages/solution/Index.vue');

import Home from '../pages/home/Index.vue'
import OAuth from '../components/OAuth.vue'
import Detail from '../pages/product/Detail.vue'
import Buy from '../pages/product/Buy.vue'
import StartDistribution from '../pages/product/StartDistribution.vue'
import StartGroup from '../pages/product/StartGroup.vue'
import StartRelease from '../pages/product/StartRelease.vue'
import CheckoutPage from '../pages/product/CheckoutPage.vue'
import UserCenter from '../pages/user/UserCenter.vue'
import UserAccount from '../pages/user/UserAccount.vue'
import UserShop from '../pages/user/UserShop.vue'
import UserGroup from '../pages/user/UserGroup.vue'
import UserDistribution from '../pages/user/UserDistribution.vue'
import UserDao from '../pages/user/UserDao.vue'
import UserMission from '../pages/user/UserMission.vue'
import UserTransaction from '../pages/user/UserTransaction.vue'
import DaoManage from '../pages/dao/DaoManage.vue'

//页面路由
const routes = [
    //首页
    {path: '/', name: "Home", component: Home,meta: {title: "common.title"}},
    {path: '/oauth/callback', name: "OAuth", component: OAuth,meta: {title: "common.title"}},
    {path: '/product/detail', name: "Detail", component: Detail, meta: {title: "common.title"}},
    {path: '/product/buy', name: "Buy", component: Buy, meta: {title: "common.title"}},
    {path: '/product/distribution', name: "StartDistribution", component: StartDistribution, meta: {title: "common.title"}},
    {path: '/product/group', name: "StartGroup", component: StartGroup, meta: {title: "common.title"}},
    {path: '/product/release', name: "StartRelease", component: StartRelease, meta: {title: "common.title"}},
    {path: '/product/checkout', name: "CheckoutPage", component: CheckoutPage, meta: {title: "common.title"}},
    {path: '/user', redirect: '/user/account', name: "UserCenter", component: UserCenter, meta: {title: "common.title"},
        children: [
            {path: 'account', name: "UserAccount", component: UserAccount, meta: {title: "common.title",childPath:"account"}},
            {path: 'shop', name: "UserShop", component: UserShop, meta: {title: "common.title",childPath:"shop"}},
            {path: 'group', name: "UserGroup", component: UserGroup, meta: {title: "common.title",childPath:"group"}},
            {path: 'distribution', name: "UserDistribution", component: UserDistribution, meta: {title: "common.title",childPath:"distribution"}},
            {path: 'dao', name: "UserDao", component: UserDao, meta: {title: "common.title",childPath:"dao"}},
            {path: 'mission', name: "UserMission", component: UserMission, meta: {title: "common.title",childPath:"mission"}},
            {path: 'transaction', name: "UserTransaction", component: UserTransaction, meta: {title: "common.title",childPath:"transaction"}},
        ]
    },
    {path: '/dao', name: "DaoManage", component: DaoManage, meta: {title: "common.title"}},

]

const router = new VueRouter({
    mode:'history',
    routes
})
router.afterEach((to) => {
    if (to.meta.title) {
        document.title =  i18n.t(to.meta.title)
    }
})
export default router
