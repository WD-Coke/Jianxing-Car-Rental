<template>
    <div class="content">
        <div class="login">
            <img src="../../assets/img/Login.jpg">
            <!--  登录界面-->
            <div class="form">
                <div class="top-bar">
                    <div class="left" @click="userShow(1)" :class="{active:1===currentIndex}">
                        登录
                    </div>
                    <div class="right" @click="phoneShow(2)" :class="{active:2===currentIndex}">
                        手机动态码登录
                    </div>
                </div>
                <div class="user" v-if="inShow">
                    <el-form :label-position="labelPosition"  :model="formLabelAlign">
                        <el-form-item prop="userId">
                            <el-input v-model="formLabelAlign.account" prefix-icon="el-icon-user" placeholder="请输入手机号/邮箱"></el-input>
                        </el-form-item>
                        <el-form-item class="inputBox" prop="password">
                            <el-input v-model="formLabelAlign.password" prefix-icon="el-icon-lock" placeholder="请输入密码" show-password></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="remember">
                        <el-checkbox v-model="checked">30天内自动登录</el-checkbox>
                        <a href="#">忘记密码?</a>
                    </div>
                    <el-button
                            type="primary"
                            class="log-button"
                            @click.native="loginConfirm(formLabelAlign.account,formLabelAlign.password)">
                            登录
                    </el-button>
                    <el-button class="register-button" @click="registerConfirm">还不是会员?<a>立即注册</a></el-button>
                </div>
                <div class="user" v-else>
                    <el-form :label-position="labelPosition"  :model="formLabelPhone">
                        <el-form-item prop="phone">
                            <el-input v-model="formLabelPhone.email" prefix-icon="el-icon-user" placeholder="请输入注册邮箱"></el-input>
                        </el-form-item>
                        <el-form-item class="inputBox" prop="verification">
                            <el-input
                                    v-model="formLabelPhone.verification"
                                    prefix-icon="el-icon-message"
                                    placeholder="请输入动态验证码"
                                    style="width: 60%">
                            </el-input>
                            <el-button type="primary" plain style="width: 40%" @click="getVerification">发送验证码</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="remember">
                        <el-checkbox v-model="checked">30天内自动登录</el-checkbox>
                        <a href="#">忘记密码?</a>
                    </div>
                    <el-button type="primary" class="log-button" @click="login(formLabelPhone.email,formLabelPhone.verification)">登录</el-button>
                    <el-button class="register-button" @click="registerConfirm">还不是会员?<a>立即注册</a></el-button>
                </div>
            </div>
            <!-- 底部组件-->
            <div class="jx-bottom">
                <Brand></Brand>
            </div>
        </div>
        <bottom-content></bottom-content>
    </div>
</template>

<script>
    import Brand from "../../components/brand/Brand";
    import BottomContent from "../../components/bottom-content/Bottom-content";
    import qs from 'qs';
    export default {
        name: "login",
        components:{
            BottomContent,
            Brand
        },
        data(){
            return{
                labelPosition: 'right',
                formLabelAlign: {
                    account: '',
                    password: ''
                },
                formLabelPhone:{
                    email:'',
                    verification:'',
                },
                inShow:true,
                currentIndex:1,
                checked:true,
            }
        },
        methods:{
            userShow(index){
                this.inShow=true
                this.currentIndex=index
            },
            phoneShow(index){
                this.inShow=false
                this.currentIndex=index
            },
            registerConfirm(){
                this.$router.push('/Register')
            },

            //请求数据
            async loginConfirm(ev1,ev2){
                const res=await this.$axios.post('/user/login',qs.stringify({
                    account:ev1,
                    password:ev2
                }));
                console.log(res)
                if (res.data.status==='200'){
                    this.$message({
                        message:res.data.message,
                        type:'success'
                    });
                    localStorage.setItem('token',res.data.token);
                    localStorage.setItem('display','false');
                    localStorage.setItem('account',res.data.data.account);
                    this.$router.push('/Homepage')
                    location.reload()
                }else if (res.data.status==='401') {
                    this.$message({
                        message: res.data.message,
                        type: 'warning'
                    })
                }else {
                    this.$message({
                        message:'登录超时',
                        type:'warning'
                    })
                }
            },
            //验证码获取
            async getVerification(){
                const res=await this.$axios.post('/user/dynamic',qs.stringify({
                    cellphone: this.formLabelPhone.email,
                }));
                console.log(res)
            },

            //验证码登录
            async login(ev1,ev2){
                const res=await this.$axios.post('/user/loginphone',qs.stringify({
                    cellphone:ev1,
                    dynamic:ev2,
                }));
                console.log(res)
                if (res.data.status==='200'){
                    this.$message({
                        message:res.data.message,
                        type:'success'
                    });
                    localStorage.setItem('token',res.data.token);
                    localStorage.setItem('display','false');
                    localStorage.setItem('account',res.data.data.account);
                    this.$router.push('/Homepage')
                    location.reload()
                }else if (res.data.status==='401') {
                    this.$message({
                        message: res.data.message,
                        type: 'warning'
                    })
                }else {
                    this.$message({
                        message:'登录超时',
                        type:'warning'
                    })
                }
            },
        }
    }
</script>

<style scoped>
    .login{
        width: 100%;
        position: relative;
    }
    .login img{
        width: 100%;
    }


    .form{
        width: 22%;
        height: 55%;
        position: absolute;
        top: 10%;
        right: 10%;
        background-color: white;
    }
    .top-bar{
        width: 100%;
        height: 15%;
        display: flex;
        font-size: 1.7em;
        color: #8a8a8a;
        background-color: #f3f4f6;
        border-bottom: 1px solid rgba(200,200,200,0.5);
    }
    .top-bar .left{
        width: 50%;
        height: 70%;
        padding-top: 5%;
        border-right: 1px solid rgba(200,200,200,0.5);
        text-align: center;
    }
    .top-bar .right{
        height:70%;
        padding-top: 5%;
        flex: 1;
        border-left: 1px solid rgba(200,200,200,0.5);
        text-align: center;
    }


    .user{
        padding:15px 20px 0 20px;
    }
    .remember{
        padding: 0 5px 8px 0;
    }
    .remember a{
        color: deepskyblue;
        font-size: 1.4em;
        float: right;
    }
    .log-button{
        width: 100%;
    }
    .register-button{
        width: 100%;
        margin-top: 15px;
        margin-left: 0;
    }
    .active{
        background-color: white;
    }


    .jx-bottom{
        width: 100%;
        position: absolute;
        bottom: 0;
        background-color: rgba(168,168,168,0.6);
    }
</style>