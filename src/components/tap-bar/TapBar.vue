<template>
    <div class="tap-bar">
        <div class="tap-pad">
            <div class="tap-left">
                <img src="../../assets/img/logo.png">
                <span v-for="(item,index) in tap" :class="{active:index==currentIndex}" @click="inShow(index)">{{item}}</span>
            </div>
            <div class="tap-right">
                <div class="right-content" v-show="display">
                    <router-link to="/Login"><a href="#" @click="invisble">登录</a></router-link>
                    <b>/</b>
                    <router-link to="Register"><a href="#" @click="invisble">注册</a></router-link>
                    <span>我的简行</span>
                </div>
                <div class="right-content-two" v-show="!display">
                    <a>{{showAccount}}，欢迎！</a>
                    <b>/</b>
                    <a href="#" @click="clear" class="logout">注销</a>
                </div>
                <img src="../../assets/img/telephone.png">
            </div>
        </div>
    </div>
</template>

<script>
    import {eventBus} from "../../main";

    export default {
        name: "TapBar",
        data(){
            return{
                tap:['首页','租车','我要出租','门店','活动','我的订单','加入我们'],
                currentIndex:0,
                display:true,
                showAccount:'',
            }
        },
        mounted() {
            this.currentIndex=localStorage.getItem('index')
        },
        methods:{
            inShow(index){
                localStorage.setItem("index",index)
                this.currentIndex=localStorage.getItem('index')
                if(index===0){
                    this.$router.push('/HomePage')
                }else if(index===1){
                    this.$router.push('/Lease')
                }else if(index===2){
                    this.$router.push('/Rent')
                }else if(index===3){
                    this.$router.push('/Store')
                }else if(index===4){
                    this.$router.push('/Active')
                }else if(index===5){
                        let judge = localStorage.getItem("token");
                        if (!judge) {
                            this.$message({
                                message: "请先登录",
                                type: "warning",
                                duration: 1000
                            });
                        }else {
                            this.$router.push('/Order')
                        }
                }else if (index===6){
                    this.$router.push('/Join')
                }
            },
            invisble(){
                localStorage.removeItem('index');
                this.currentIndex=99;
            },
            clear(){
                localStorage.removeItem('token')
                localStorage.removeItem('display')
                this.display=true;
            },
        },
        created() {
            if (localStorage.getItem('display')==='false'){
                this.display=false
            }
            this.showAccount=localStorage.getItem('account')
        },
    }
</script>

<style scoped>
    .tap-bar{
        width: 100%;
        background-color: #1b2b3b;
        border-top: 2px solid #eeb81a;
    }
    .tap-pad{
        display: flex;
        padding: 0 10% 0 10%;
    }
    .tap-left{
        width: 50%;
        color: white;
        display: flex;
        justify-content: space-around;
    }
    .tap-left span{
        align-self: center;
        font-size: 1.4em;
        cursor:pointer
    }
    .tap-left span:hover{
        color: #eeb81a;
    }
    .tap-left img{
        width: 30%;
    }
    .active{
        color: #eeb81a;
    }
    .tap-right{
        color: white;
        flex: 1;
        padding-left: 15%;
        font-size: 1.4em;
        display: flex;
    }
    .right-content{
        width: 50%;
        align-self: center;
    }
    .right-content a,b,.right-content-two a,b{
        color: #eeb81a;
    }
    .right-content a:hover{
        text-decoration:underline #eeb81a;
    }
    .right-content span,.right-content-two span{
        padding-left: 8%;
    }
    .right-content-two{
        width: 50%;
        align-self: center;
    }
    .right-content-two .logout:hover{
        text-decoration:underline #eeb81a;
    }
</style>