import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);
const i18n = new VueI18n({
    locale:"en_US",
    messages:{
        "en_US":require("./locale/en_US.js"),
        "zh_CN":require("./locale/zh_CN.js"),
    }
})

export default i18n;
