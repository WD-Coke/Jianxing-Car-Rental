<template>
    <div class="Join">
        <div class="form">
            <img src="../assets/img/join.png">
            <div class="join-form">
                <h2>贵公司是否有意向入驻呢</h2>
                <p>请留下联系方式，我们会尽快联系您，提供专人服务</p>
                <el-form :label-position="labelPosition" :model="formLabelAlign" >
                    <el-form-item>
                        <el-input v-model="formLabelAlign.name" style="width: 40%"  placeholder="公司名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="formLabelAlign.region" style="width: 40%"  placeholder="联系人姓名"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="formLabelAlign.phone" style="width: 40%"  placeholder="联系电话"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="formLabelAlign.city" style="width: 40%"  placeholder="所在城市"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="formLabelAlign.cars" style="width: 40%"  placeholder="可提供车辆数量"></el-input>
                    </el-form-item>
                    <el-button type="success" plain style="width: 20%">立即申请</el-button>
                </el-form>
            </div>
        </div>
        <BottomContent></BottomContent>
    </div>
</template>

<script>
    import BottomContent from "../components/bottom-content/Bottom-content";
    export default {
        name: "Join",
        components:{
            BottomContent,
        },
        data(){
            return{
                labelPosition: 'right',
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: '',
                    phone:'',
                    city:'',
                    cars:'',

                }
            }
        }
    }
</script>

<style scoped>
    .form{
        width: 100%;
    }
    .form img{
        width: 100%;
    }
    .join-form{
        width: 80%;
        margin: auto;
        text-align: center;
        padding-bottom: 5%;
    }
    .join-form h2{
        color: #333;
        font-size: 2.6em;
    }
    .join-form p{
        color: #999;
        font-size: 1.4em;
    }
</style>