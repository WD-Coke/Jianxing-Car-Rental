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
                            <span>注册资金：{{ storeDetails.capital }}</span>
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
                    <div class="car-item" v-for="item in cars">
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
        <!-- 入住人弹框 -->
        <el-dialog
                title="入住人信息"
                :visible.sync="clientFormVisible"
                center
                width="450px"
        >
            <el-form label-width="80px">
                <el-form-item label="姓名">
                    <el-input
                            placeholder="请输入姓名"
                            v-model="inputname"
                            clearable
                    ></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input
                            placeholder="请输入联系电话"
                            v-model="inputphone"
                            clearable
                    ></el-input>
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
    import qs from "qs";
    export default {
        name: "Storelist",
        data() {
            return {
                clientFormVisible: false,
                daynum: 1,
                inputname: "",
                inputphone: "",
                storeDetails: {},
                cars:[]
            };
        },
        computed: {
            allprise: function() {
                return this.daynum * this.carDetails.cprice;
            }
        },
        created() {
            this.getStoreDetails(this.$route.params);
            this.getCar()
        },
        methods: {
            // 入住验证
            client() {
                let judge = localStorage.getItem("token");
                if (!judge) {
                    this.$message({
                        message: "请先登录",
                        type: "warning",
                        duration: 1000
                    });
                } else {
                    this.clientFormVisible = true;
                }
            },

            // 预定房间****
            async reservation() {
                this.clientFormVisible = false;
                const res = await this.$axios.post(
                    "/createorder",
                    qs.stringify({
                        account: localStorage.getItem("account"),
                        houseid: this.carDetails.houseid,
                        price: this.carDetails.cprice,
                        days: this.daynum,
                        occupants: this.inputname,
                        phonenum: this.inputphone
                    }),
                    {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                        } // 修正中文乱码
                    }
                );
                const { status, message } = res.data;
                if (status == 200) {
                    this.$message({
                        message: `${message}`,
                        type: "success",
                        duration: 1000
                    });
                }
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
                }
            },
            async getCar(){
                const res=await this.$axios.get('/search/car', {
                    params:{
                        city:'',
                        sid:this.storeDetails.sid,
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
        margin: 20px auto;
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
        font-size: 2em;
    }
    .rightdiv h1 {
        margin-bottom: 20px;
    }
    .roomall {
        width: 80%;
        margin: 10px auto;
    }
    .leftdiv {
        float: left;
        width: 50%;
        padding:3% 0 0 1%;
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
        height: 274px;
        overflow: hidden;
    }
    .item-bottom{
        padding-left: 5%;
        position: relative;
    }
    .item-bottom h3{
        font-size: 1.6em;
        color: #1b2939;
    }
    .item-bottom h3:hover{
        color: #1890ff;
    }
    .item-bottom p{
        font-size: 1.4em;
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