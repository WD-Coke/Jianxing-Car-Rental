<template>
    <div class="bcimg">
        <div class="roomall">
            <div class="roomall1">
                <div class="leftdiv">
                    <img :src="storeDetails.mainpic" alt="">
                </div>
                <div class="rightdiv">
                    <h1>{{ storeDetails.sname }}</h1>
                    <div class="room-price">
                        <div class="price-list moth">
                            <label>营业时间：</label>
                            <span>
                <div class="room-price-sale">
                  {{ storeDetails.workdate }}
                </div>
              </span>
                            <label>店铺地址：</label>
                            <span>
                <div class="room-price-sale">
                  {{storeDetails.slocation}}
                </div>
              </span>
                        </div>
                    </div>
                    <div class="room-list-new">
                        <div>
                            <span>门店编号：{{ storeDetails.sid }}</span>
                        </div>
                        <div>
                            <span>门店代表人：{{storeDetails.representative }}</span>
                        </div>
                        <div>
                            <span>注册资金：{{ storeDetails.capital }} 万元</span>
                        </div>
                        <div>
                            <span>联系电话：{{ storeDetails.sphone }}</span>
                        </div>
                        <div>
                            <span>门店邮箱：{{ storeDetails.email }}</span>
                        </div>
                        <div>
                            <span>到期时间：{{ storeDetails.dateline|fmtdata}}</span>
                        </div>
                        <div>
                            <span>门店描述：{{ storeDetails.description }}</span>
                        </div>
                    </div>
                    <el-button type="primary" class="btnroom" @click="client()">成为车主</el-button>
                </div>
            </div>
            <el-divider class="easyfont">
                <span>车辆展示</span>
            </el-divider>
            <div class="car-show">
                <div class="car-list">
                    <div class="car-item" v-for="item in cars" :key="item">
                        <div class="item-top">
                            <img :src="item.pic1" alt="">
                        </div>
                        <div class="item-bottom">
                            <h3>{{item.cname}}</h3>
                            <p>781 2.0T</p>
                            <p>安全出行，3步搞定</p>
                            <p style="color: #ff4d3b">908元/天</p>
                            <el-button type="primary" class="part" @click="getDetails(item)">查看详情</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 车辆弹框 -->
        <el-dialog
                title="车辆信息"
                :visible.sync="clientFormVisible"
                center
                width="450px"
        >
            <el-form label-width="80px">
                <el-form-item label="姓名">
                    <el-input
                            placeholder="请输入姓名"
                            v-model="form.ownername"
                            clearable
                    ></el-input>
                </el-form-item>
                <el-form-item label="车辆品牌">
                    <el-input
                            placeholder="请输入车辆品牌"
                            v-model="form.cbrand"
                            clearable
                    ></el-input>
                </el-form-item>
                <el-form-item label="车辆类型">
                    <el-input
                            placeholder="请输入车辆类型"
                            v-model="form.cname"
                            clearable
                    ></el-input>
                </el-form-item>
                <!--上传车辆图片-->
                <el-form-item>
                    <el-upload
                            multiple
                            class="upload-demo"
                            action="a"
                            :file-list="fileList"
                            list-type="picture"
                            :auto-upload="false"
                            ref="uploada"
                            style="width: 100%">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">
                            只能上传jpg/png文件，且不超过500kb
                        </div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="clientFormVisible = false">取消</el-button>
                <el-button type="primary" @click="reservation()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    // import qs from "qs";
    export default {
        name: "Storelist",
        data() {
            return {
                labelPosition: 'right',
                imgs: [],
                fileList: [], //缓存区文件
                formData: new FormData(),
                clientFormVisible: false,
                form:{
                    account:'',
                    sid:'',
                    ownername: "",
                    cbrand:'',
                    cname:'',
                },
                storeDetails:'',
                cars:[]
            };
        },
        created() {
            this.getStoreDetails(this.$route.params);
            this.getCar(this.$route.params)
        },
        methods: {
            // 入住验证
            client() {
                let judge = localStorage.getItem("token");
                let real=localStorage.getItem('real');
                if (!judge) {
                    this.$message({
                        message: "请先登录",
                        type: "warning",
                        duration: 1000
                    });
                } else if (real!=='true'){
                    this.$message({
                        message: "请进行实名认证",
                        type: "warning",
                        duration: 1000
                    });
                } else {
                    this.clientFormVisible = true;
                }
            },
            getDetails(ev){
                this.$router.push(`/Car/${ev.cid}`)
            },

            // 成为车主
            async reservation() {
                this.clientFormVisible = false;
                this.$refs.uploada.uploadFiles.forEach(ev => {
                    this.formData.append("files", ev.raw);
                });
                // 把form表单的数据加入到FormData中
                Object.keys(this.form).forEach(ele => {
                    this.formData.append(ele, this.form[ele]);
                });
                console.log(this.formData);

                const res = await this.$axios.post("/car/createcar", this.formData, {
                    methods: "post",
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                console.log(res)
                if (res.data.status === '201') {
                    // 1.提示成功
                    this.$message.success(res.data.message);

                } else {
                    this.$message.warning(res.data.message);
                }
                this.formData=new FormData()
                this.form = {};
                this.fileList=[];
            },
            //展示信息
            async getStoreDetails(ev) {
                const res = await this.$axios.get(`/store/getstore/${ev.name}`);
                const { status, data, message } = res.data;
                if (status == 200) {
                    this.$message({
                        message: `${message}`,
                        type: "success",
                        duration: 1000
                    });
                    this.storeDetails = data;
                    this.form.account=localStorage.getItem('account')
                    this.form.sid=data.sid
                    console.log(this.storeDetails.sid)
                }
            },
            async getCar(ev){
                const res=await this.$axios.get('/search/car', {
                    params:{
                        sid:ev.name,
                    }
                });
                this.cars=res.data.data.data
                console.log(this.cars)
            },


            handleCommand(command) {
                this.$message({
                    message: "click on item " + command,
                    duration: 1000
                });
                this.city = command;
            },
            btnli(ev) {
                this.$router.push(`${this.lis[ev].http}`);
            }
        }
    }
</script>

<style scoped>
    .bcimg{
        background-color: #f1f1f1;
    }
    .easyfont span {
        font-weight: 700;
        font-size: 24px;
    }

    .danke-promise-item p {
        font-size: 16px;
        color: #333;
        text-align: center;
        margin-top: 20px;
    }

    .btnroom {
        width: 90%;
        margin: 10px 0 30px 30px;
    }
    .roomall1:after {
        content: "";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
    .roomall1 {
        margin: auto;
        padding-top:20px;
    }
    em {
        font-style: normal;
    }
    .room-list-new div {
        width: 40%;
        float: left;
        height: 40px;
        margin-right: 20px;
        word-break: break-all;
    }
    .room-list-new div:last-child {
        width: 85%;
    }
    .room-list-new div span {
        margin-right: 20px;
        display: block;
        font-weight: 400;
        height: 40px;
        color: #666;
        font-size: 14px;
        line-height: 40px;
    }
    .room-list-new {
        width: 100%;
        display: block;
        padding-left: 40px;
        margin-bottom: 40px;
    }
    .room-price-sale {
        display: block;
        margin: 0 0 0 85px;
    }
    .room-price-sale {
        color: #ff7966;
        font-size: 18px;
        line-height: 42px;
        font-weight: 700;
    }
    .price-list label {
        float: left;
        width: 85px;
        line-height: 42px;
        font-size: 14px;
        color: #999;
        font-weight: 400;
    }
    .price-list {
        padding-top: 20px;
    }
    .room-price {
        overflow: hidden;
        background: #f9f9fb;
        padding: 0 25px 10px;
        min-height: 100px;
    }
    .rightdiv {
        margin-left: 0;
        float: right;
        width: 45%;
        height: 100%;
        font-size: 20px;
    }
    .rightdiv h1 {
        margin-bottom: 20px;
    }
    .roomall {
        width: 80%;
        margin:auto;
    }
    .leftdiv {
        float: left;
        width: 50%;
        height: 405px;
        padding:3% 0 0 1%;
        overflow: hidden;
    }
    .leftdiv img{
        width: 100%;
    }

    .car-show{
        width: 100%;
        background-color: #f3f4f6;
    }
    .car-list{
        width: 100%;
        padding: 3% 2.5% 0 0;
        display: flex;
        flex-wrap: wrap;
    }
    .car-item{
        width: 30%;
        float: left;
        background-color: #fff;
        margin: 0 0 5% 2.5%;
        overflow: hidden;
    }
    .item-top{
        width: 100%;
        height: 240px;
        overflow: hidden;
    }
    .item-bottom{
        padding-left: 5%;
        position: relative;
    }
    .item-bottom h3{
        font-size: 16px;
        color: #1b2939;
    }
    .item-bottom h3:hover{
        color: #1890ff;
    }
    .item-bottom p{
        font-size: 14px;
        color: #939a9f;
    }
    .part{
        position: absolute;
        bottom: 5%;
        right: 5%;
    }
    .car-item img{
        width: 100%;
        cursor: pointer;
    }
    .car-item img:hover{
        box-shadow: #888888 0 0 20px;
    }
</style>