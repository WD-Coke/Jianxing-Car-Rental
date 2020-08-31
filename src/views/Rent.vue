<template>
    <div class="Rent">
        <div class="rent-title">
            <img src="../assets/img/rentTitle.png" class="rent-bg">
            <div class="explanation">
                <ul>
                    <li>
                        <h3><img src="../assets/img/explanation1.png"> </h3>
                        <h4>租期灵活</h4>
                        <p>一个月起租</p>
                    </li>
                    <li>
                        <h3><img src="../assets/img/explanation2.png"> </h3>
                        <h4>免费检测</h4>
                        <p>出租前，免费检测</p>
                    </li>
                    <li>
                        <h3><img src="../assets/img/explanation3.png"> </h3>
                        <h4>车况无忧</h4>
                        <p>私人车辆，专业工程师检测</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="store-container">
            <div class="store-title">
                <img src="../assets/img/map-title.png">
            </div>
            <!-- 店铺筛选-->
            <div class="store-show">
                <h3 class="show-title">支持全国主流城市，任意地点随你挑选</h3>
                <div class="city-select">
                    <div class="city-box"><span>城市</span></div>
                    <div class="city-item" v-for="(item,index) in citys" :key="index" @click="addActive(index)" :class="{active:index===newIndex}">{{item}}</div>
                    <div class="select-box">
                        <el-select
                                v-model="value"
                                placeholder="请选择"
                                filterable
                                clearable
                                style="float: right">
                            <el-option-group
                                    v-for="group in options"
                                    :key="group.label"
                                    :label="group.label">
                                <el-option
                                        v-for="item in group.options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        @click.native="searchStore">
                                </el-option>
                            </el-option-group>
                        </el-select>
                    </div>
                </div>
                <!--  店铺列表-->
                <div class="store-list">
                    <div class="store-item" v-for="item in storeList" :key="item">
                        <div class="item-top">
                            <img :src="item.mainpic" alt="">
                        </div>
                        <div class="item-bottom">
                            <h3>{{item.sname}}</h3>
                            <p>地址：{{item.slocation}}</p>
                            <p>简行租车，值得信赖</p>
                            <p style="color: #ff4d3b">营业时间：{{item.workdate}}</p>
                            <el-button type="warning" class="part" @click="getDetails(item)">进入店铺</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BottomContent></BottomContent>
    </div>
</template>

<script>
    import BottomContent from "../components/bottom-content/Bottom-content";
    export default {
        name: "Rent",
        components: {
            BottomContent,
        },
        data(){
            return{
                newIndex:0,
                citys:['遵义','重庆','成都','广州','深圳','北京','上海'],
                city:'遵义',
                storeList:[],
                options: [{
                    label: '热门城市',
                    options: [{
                        value: '重庆',
                        label: '重庆'
                    },{
                        value: '遵义',
                        label: '遵义'
                    }, {
                        value: '北京',
                        label: '北京'
                    },{
                        value:'成都',
                        label:'成都',
                    }]
                }, {
                    label: '城市名',
                    options: [{
                        value: '天津',
                        label: '天津'
                    }, {
                        value: '深圳',
                        label: '深圳'
                    }, {
                        value: '广州',
                        label: '广州'
                    }, {
                        value: '大连',
                        label: '大连'
                    },{
                        value:'济南',
                        label:'济南',
                    },{
                        value:'武汉',
                        label:'武汉',
                    },{
                        value:'西安',
                        label:'西安',
                    },{
                        value:'长沙',
                        label:'长沙',
                    },{
                        value:'杭州',
                        label:'杭州',
                    },{
                        value:'三亚',
                        label:'三亚',
                    }]
                }],
                value: ''
            }
        },
        created() {
            this.addActive(0)
        },
        methods:{
            getDetails(ev){
                this.$router.push(`/store/${ev.sid}`)
            },


            async addActive(index){
                this.newIndex=index;
                this.city=this.citys[index];
                const res=await this.$axios.get('/search/rent',{params:{city:this.city}});
                this.storeList=res.data.data
                this.value='';
            },
            async searchStore(){
                this.newIndex='';
                const res=await this.$axios.get('/search/rent',{params:{city:this.value}});
                this.storeList=res.data.data
                console.log(res)
            }
        }
    }
</script>

<style scoped>
    .rent-title{
        position: relative;
    }
    .rent-bg{
        width: 100%;
    }
    .explanation{
        position: absolute;
        top: 75%;
        left: 10%;
        width: 80%;
        text-align: center;
    }
    .explanation ul{
        width: 70%;
        display: flex;
       margin: auto;
    }
    .explanation li{
        width: 35%;
        background-color: #ffffff;
        text-align: center;
        box-shadow: #888888 0 0 20px;
        margin-right: 5%;
    }
    .explanation img{
        width: 30%;
    }
    .explanation h4{
        font-size: 1.8em;
        color: #333;
        margin: 0;
    }
    .explanation p{
        font-size: 1.4em;
        color: #999;
    }

    /*
    筛选商家
     */
    .store-container{
        width: 100%;
        padding: 6% 0 6% 0;
    }
    .store-title{
        width: 80%;
        margin: auto;
        text-align: center;
    }
    .store-title img{
        width: 100%;
    }
    .store-show{
        width: 80%;
        margin: auto;
    }
    .show-title{
        font-size: 2.4em;
        color: #333;
        text-align: center;
        margin: 1% 0 3% 0;
    }
    .city-select{
        width: 100%;
        height: 40px;
        line-height: 40px;
        display: flex;
        border: 1px solid rgba(200,200,200,0.4);
        border-radius: 5px;
    }
    .city-box{
        width: 10%;
        text-align: center;
        font-size: 1.3em;
        background-color: #f1f1f1;
        border-left: 1px solid rgba(200,200,200,0.4);
    }
    .city-item{
        width: 10%;
        text-align: center;
        font-size: 1.3em;
    }
    .city-item:hover{
        color: #1890ff;
        cursor: pointer;
    }
    .active{
        color: #1890ff;
    }
    .select-box{
        flex: 1;
    }
    .store-list{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 3% 0 0 0;
        background-color: #f4f7fa;
    }
    .store-item{
        width: 30%;
        float: left;
        background-color: #fff;
        margin: 0 0 5% 2.5%;
        overflow: hidden;
    }
    .item-bottom{
        padding-left: 5%;
        position: relative;
    }
    .store-item img{
        width: 100%;
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