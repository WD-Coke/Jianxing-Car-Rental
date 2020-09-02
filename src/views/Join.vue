<template>
    <div class="Join">
        <div class="form">
            <img src="../assets/img/join.png">
            <div class="join-form">
                <h2>贵公司是否有意向入驻呢</h2>
                <p>请留下联系方式，我们会尽快联系您，提供专人服务</p>
                <el-form :label-position="labelPosition" :model="form" >
                    <el-form-item>
                        <el-input v-model="form.sname" style="width: 40%"  placeholder="公司名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="form.representative" style="width: 40%"  placeholder="联系人姓名"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="form.sphone" style="width: 40%"  placeholder="联系电话"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="form.slocation" style="width: 40%"  placeholder="所在城市"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="form.semail" style="width: 40%"  placeholder="公司邮箱"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-upload
                                multiple
                                class="upload-demo"
                                action="a"
                                :file-list="fileList"
                                list-type="picture"
                                :auto-upload="false"
                                ref="uploada1"
                                style="width: 40%">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">
                                请上传店铺照片和营业执照
                            </div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-upload
                                multiple
                                class="upload-demo"
                                action="a"
                                :file-list="fileList2"
                                list-type="picture"
                                :auto-upload="false"
                                ref="uploada2"
                                style="width: 40%">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">
                                请上传营业执照/该项将作为重点审核
                            </div>
                        </el-upload>
                    </el-form-item>
                    <el-button
                            type="success"
                            plain style="width: 20%"
                            @click="submitData"
                            :disabled="form.sname===''||form.representative===''||form.sphone===''||form.slocation===''||form.semail===''">
                        立即申请
                    </el-button>
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
                imgs: [],
                fileList: [], //缓存区文件
                fileList2: [],
                formData: new FormData(),
                form: {
                    sname: '',
                    representative: '',
                    sphone:'',
                    slocation:'',
                    semail:'',
                }
            }
        },
        methods:{
            async submitData() {
                // 添加当前剩余图片文件
                // this.formData.append("photo", this.$refs.uploada.uploadFiles[0]);
                // this.formData.append("zhizhao", this.$refs.uploada.uploadFiles[1]);
                // console.log(this.$refs.uploada.uploadFiles[0])
                // console.log(this.$refs.uploada.uploadFiles[1])
                this.$refs.uploada1.uploadFiles.forEach(ev => {
                    this.formData.append("photo", ev.raw);
                });
                this.$refs.uploada2.uploadFiles.forEach(ev => {
                    this.formData.append("zhizhao", ev.raw);
                });
                console.log(this.$refs.uploada1.uploadFiles)
                console.log(this.$refs.uploada2.uploadFiles)
                // 把form表单的数据加入到FormData中
                Object.keys(this.form).forEach(ele => {
                    this.formData.append(ele, this.form[ele]);
                });
                console.log(this.formData.get('zhizhao'));
                console.log(this.formData.get('photo'));
                const res = await this.$axios.post("/store/register", this.formData, {
                    methods: "post",
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                if (res.data.status === '201') {
                    // 1.提示成功
                    this.$message.success(res.data.message);
                    // 3.清空文本框
                } else {
                    this.$message.warning(res.data.message);
                }
                this.formData=new FormData()
                this.form = {};
                this.fileList=[];
                this.fileList2=[];
            },
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
        font-size: 26px;
    }
    .join-form p{
        color: #999;
        font-size: 14px;
    }
    .upload-demo{
        margin: auto;
    }
</style>