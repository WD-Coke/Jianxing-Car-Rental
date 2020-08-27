<template>
    <div class="register">
        <div class="container">
            <div class="welcome">欢迎注册</div>
            <div class="register-content">
                    <div class="left-content">
                        <div class="user-title">注册新用户</div>
                        <el-form :label-position="labelPosition"  :rules="rules" :model="form">
                            <el-form-item prop="email">
                                <el-input
                                        v-model="form.email"
                                        prefix-icon="el-icon-user"
                                        placeholder="请输入您的邮箱"
                                        style="width: 50%"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input
                                        v-model="form.telephone"
                                        prefix-icon="el-icon-mobile-phone"
                                        placeholder="请输入您的手机号"
                                        style="width: 50%"></el-input>
                            </el-form-item>
                            <el-form-item class="inputBox">
                                <el-input
                                        v-model="form.number"
                                        prefix-icon="el-icon-message"
                                        placeholder="请输入动态验证码"
                                        style="width: 30%">
                                </el-input>
                                <el-button type="primary" plain style="width: 20%" @click="getverification">发送验证码</el-button>
                            </el-form-item>
                            <el-form-item class="inputBox">
                                <el-input
                                        v-model="form.password"
                                        prefix-icon="el-icon-lock"
                                        placeholder="请输入密码"
                                        show-password
                                        style="width: 50%"
                                        @keyup.native="check">
                                </el-input>
                                <ul class="password-safe">
                                    <li :class="[strength1===1?'active':'normal']">弱</li>
                                    <li :class="[strength2===1?'active':'normal']">中</li>
                                    <li :class="[strength3===1?'active':'normal']">强</li>
                                </ul>
                            </el-form-item>
                        </el-form>
                        <div class="remember">
                            <el-checkbox v-model="checked">我已阅读并同意<a href="#">《简行租车会员服务条款》</a> </el-checkbox>
                        </div>
                        <el-button type="primary" class="log-button" style="width: 50%" @click="UserRegistration">注册</el-button>
                    </div>
                    <div class="right-content">
                        <div class="vip-title">已有账号?<router-link to="/Login"><a>立即登录》</a></router-link></div>
                        <div class="active-topic">
                            <img src="../../assets/img/exclusive.png">
                            <router-link to="/Active"><span>查看活动专题>></span></router-link>
                        </div>
                    </div>
            </div>
        </div>
        <brand></brand>
        <bottom-content></bottom-content>
    </div>

</template>

<script>
    import Brand from "../../components/brand/Brand";
    import BottomContent from "../../components/bottom-content/Bottom-content";
    import qs from "qs";
    export default {
        name: "Register",
        components: {
            BottomContent,
            Brand
        },
        data(){
            return{
                labelPosition: 'right',
                checked:true,
                strength1:0,
                strength2:0,
                strength3:0,
                form: {
                    email: '',
                    telephone:'',
                    number:'',
                    password:'',
                },
                rules:{
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        {pattern:/[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+[.]([a-zA-Z]+){1,2}/,message: "请输入正确的邮箱",trigger: 'blur'}
                    ],
                    telephone:[
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        {pattern:/[0-9]{11}/,message: "请输入正确的手机号",trigger: 'blur'}
                    ],
                    password:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6,  message: '密码最小长度为6位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            check(){
                if (this.form.password.length>=12){
                    this.strength1=1
                    this.strength2=1
                    this.strength3=0
                }else if(this.form.password.length>=9){
                    this.strength1=1
                    this.strength2=1
                    this.strength3=0
                }else if (this.form.password.length>=6) {
                    this.strength1=1
                    this.strength2=0
                    this.strength3=0
                }else {
                    this.strength1=0
                    this.strength2=0
                    this.strength3=0
                }
            },

            //请求数据
            async getverification(){
                const res=await this.$axios.post('/user/dynamic',qs.stringify({
                    email: this.form.email,
                    cellphone:this.form.telephone
                }));
                console.log(res)
            },
            async UserRegistration(){
                const res=await this.$axios.post('/user/register',qs.stringify({
                    email: this.form.email,
                    cellphone:this.form.telephone,
                    code:this.form.number,
                    password:this.form.password,
                }));
                console.log(res)
                if (res.data.status==='201'){
                    this.$message({
                        message:res.data.message,
                        type:'success'
                    })
                    console.log(res)
                    this.$router.push('/Login')
                }else if(res.data.status==='422'){
                    this.$message({
                        message:res.data.message,
                        type:'warning'
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .container{
        width: 100%;
        background-color: #f1f1f1;
        padding-bottom: 5%;
    }
    .welcome{
        width: 78%;
        margin: auto;
        font-size: 3em;
        padding: 10px 0 10px 0;
        color: #efcd7e;
    }
    .register-content{
        width: 80%;
        margin: auto;
        display: flex;
        background-color: white;
    }
    .left-content{
        width: 55%;
        padding:3% 0 0 3%;
        border-right: 1px dashed rgba(200,200,200,0.3);
    }
    .user-title{
        margin-bottom: 3%;
        font-size: 2.5em;
    }
    .remember{
        margin-bottom: 3%;
    }
    .log-button{
        margin-bottom: 10%;
    }
    .password-safe{
        width: 40%;
        height: 20px;
        margin-left: 4%;
        display: inline-block;
        vertical-align: middle;
    }
    .password-safe li{
        height: 20px;
        line-height: 20px;
        width: 20%;
        float: left;
        text-align: center;
        color: #bfbfbf;
    }


    .right-content{
        flex: 1;
        padding:3% 0 0 3%;
    }
    .vip-title{
        font-size: 1.4em;
        padding-bottom: 3%;
    }
    .vip-title a{
        color: deepskyblue;
    }
    .active-topic{
        position: relative;
    }
    .active-topic span{
        font-size: 1.4em;
        color: #eeb757;
        position: absolute;
        bottom: 8%;
        left: 30%;
    }
    .active{
        background-color: #fef4da;
        border: 1px solid #eeb757;
    }
    .normal{
        color: #93939e;
        background-color: #f8f8fa;
        border: 1px solid #e9ebee;
    }
</style>