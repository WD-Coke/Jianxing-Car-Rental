<template>
    <div class="Lease">
        <!--  背景图-->
        <div class="lease">
            <img src="../assets/img/rent.png">
        </div>
        <!--  搜索框-->
        <div class="lease-form">
            <div class="form-content">
                <div class="form-title">
                    <ul>
                        <li>
                            简行租车<span>(150+地区)</span>
                        </li>
                    </ul>
                </div>
                <div class="form">
                    <el-form ref="form" :model="form" label-width="60px">
                        <el-form-item label="城市">
                            <el-select v-model="form.city" placeholder="请选择城市" style="width: 100%">
                                <el-option :label="item" :value="item" v-for="item in citys" :key="item" @click.native="getStore">{{item}}</el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="门店">
                            <el-select v-model="form.sid" placeholder="请选择门店" style="width: 100%">
                                <el-option label="" value=""></el-option>
                                <el-option :label="item.sname" :value="item.sid" v-for="item in store" :key="item">{{item.sname}}</el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="车型">
                            <el-select v-model="form.brand" placeholder="请选择车型" style="width: 100%">
                                <el-option :label="item" :value="item" v-for="item in brand" :key="item">{{item}}</el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="租期">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="取车日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2" style="text-align: center">-</el-col>
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="还车日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" plain style="width:95%" @click="searchCar">立即选车</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <!-- 车辆展示-->
        <div class="car-show">
            <div class="car-content">
                <div class="car-title">
                    <img src="../assets/img/car-title.png">
                </div>
                <div class="car-list">
                    <div class="car-item" v-for="item in cars" :key="item">
                        <div class="item-top">
                            <img :src="item.pic1" alt="">
                        </div>
                        <div class="item-bottom">
                            <h3>{{item.cname}}</h3>
                            <p>{{item.license}}</p>
                            <p>安全出行，3步搞定</p>
                            <p style="color: #ff4d3b">{{item.cprice}}元/天</p>
                            <el-button type="primary" class="part" @click="getDetails(item)">查看详情</el-button>
                        </div>
                    </div>
                </div>
                <div class="block">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-size="9"
                            layout="prev, pager, next, jumper"
                            :total="this.size"
                    ></el-pagination>
                </div>
            </div>
        </div>
        <BottomContent></BottomContent>
    </div>
</template>

<script>
    import BottomContent from "../components/bottom-content/Bottom-content";
    export default {
        name: "Lease",
        components: {BottomContent},
        data() {
            return {
                form: {
                    city:'重庆',
                    sid:'',
                    brand:'',
                    date1:'',
                    date2:''
                },
                citys:['重庆','遵义','广州','上海','北京','天津','深圳','杭州','成都','长沙','大连','三亚','济南','武汉','西安'],
                store:[],
                brand:['保时捷','宝马','奥迪','福特','比亚迪','帕萨特','路虎','捷豹','沃尔沃','奔驰','大众','玛莎拉蒂'],
                cars:[],
                currentPage: 1,
                size:1
            }
        },
        created() {
            this.getStore()
            this.searchCar()
        },
        methods:{
            //方法函数
            getDetails(ev){
                this.$router.push(`/Car/${ev.cid}`)
            },
            handleCurrentChange(ev) {
                this.currentPage = ev;
                this.searchCar({
                    city:this.form.city,
                    sid:this.form.sid,
                });
            },

            //请求数据
            async getStore(){
                const res=await this.$axios.get('/search/store',{params:{city:this.form.city}});
                this.store=res.data.data
            },
            async searchCar(){
                const res=await this.$axios.get('/search/car', {
                    params:{
                            city:this.form.city,
                            sid:this.form.sid,
                            cbrand:this.form.brand
                         }
                    });
                this.cars=res.data.data.data
                this.size = res.data.data.size
                console.log(res)
            },
        }
    }
</script>

<style scoped>
    .lease{
        width: 100%;
        position: relative;
    }
    .lease img{
        width: 100%;
    }

    .form-title{
        padding-left: 5%;
        border-bottom: 1px solid rgba(200,200,200,0.3);
    }
    .form-title li{
        font-size: 15px;
        margin-bottom: 3%;
    }
    .form-title span{
        font-size: 10px;
        color: #8a8a8a;
    }
    .lease-form{
        width: 30%;
        height: 55%;
        position: absolute;
        top: 20%;
        left: 10%;
        background-color: white;
        box-shadow:#888888 0 0 10px;
    }
    .form-content{
        padding: 5% 5% 5% 2%;
    }
    .form{
        padding-top:5%;
    }

    /*
    车辆展示
     */
    .car-show{
        width: 100%;
        background-color: #f4f7fa;
        padding-bottom: 5%;
    }
    .car-content{
        width: 80%;
        margin: auto;
    }
    .car-title{
        text-align: center;
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
        padding:0 0 5% 5%;
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
        margin-bottom: 1%;
    }
    .part{
        position: absolute;
        bottom: 12%;
        right: 5%;
    }
    .car-item img{
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
    .car-item img:hover{
        box-shadow: #888888 0 0 20px;
    }
    .block{
        text-align: center;
    }
</style>