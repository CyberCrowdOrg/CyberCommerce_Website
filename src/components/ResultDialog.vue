<template>
    <transition-group
        appear
        name="animate__animated animate__bounce"
        enter-active-class="animate__fadeIn"
        leave-active-class="animate__fadeOut">
        <div class="result-dialog-background result-dialog-display" key="1" v-show="show">
            <div class="dialog-box">
                <p class="title">{{title}}</p>
                <p class="content">
                    <i class="icon"
                       :style="getStatusColor()"
                       :class="[
                       { 'el-icon-warning': isStatusEmpty() },//默认为warning，深灰色
                       { 'el-icon-success': status==='success' },
                       { 'el-icon-error': status==='fail' }
                       ]">
                    </i>
                </p>
            </div>
        </div>
    </transition-group>
</template>

<script>
import {isStrEmpty} from "@/utils";
import 'animate.css'

export default {
    name: "ResultDialog",
    props:["title","status"],
    data(){
        return{
            show:false
        }
    },
    created(){},
    mounted(){},
    methods:{
        getStatusColor() {
            console.log("status == "+this.status)
            if (this.status === 'success') {
                return {color: '#20C362'}
            } else if (this.status === 'fail') {
                return {color: '#F94542'}
            } else {
                return {color: '#606266'}
            }
        },
        isStatusEmpty(){
            return isStrEmpty(this.status)
        },
        showDialog(){
            this.show = true;
            setTimeout(() => {
                this.show = false;
                this.onDialogClose();
            }, 1300);
        },
        onDialogClose(){
            this.$emit("onDialogClose");
        },
    }
}
</script>

<style>
.result-dialog-background{display:none;z-index:4000;position:fixed;top:0px;left:0px;width:100%;height:100%;padding:1px;background:rgba(0,0,0,0.3);overflow:auto;}
.result-dialog-display{display:block;}
.result-dialog-background .dialog-box{margin:200px auto;width: 205px;height: 205px;background: #FFFFFF;border-radius: 20px;}
.result-dialog-background .dialog-box .title{width: 100%;padding: 25px 0 0;text-align: center;font-size: 22px;font-family: PingFangSC-Medium, PingFang SC;font-weight: 500;color: #333333;line-height: 30px;}
.result-dialog-background .dialog-box .content{width: 100%;text-align: center;}
.result-dialog-background .dialog-box .icon{font-size: 90px;}
</style>
