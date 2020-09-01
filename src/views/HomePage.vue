<template>
    <div class="home">
        <div class="swiper">
            <!-- 首页轮播图-->
            <div class="block">
                <el-carousel trigger="click" height="500px">
                    <el-carousel-item v-for="(item,index) in img" :key="index" @click="jump(index)">
                        <img
                                class="medium"
                                style="width: 100%; height: 100%"
                                :src="item.mainpic"
                                :alt="index"
                                @click="jump(index)"
                        />
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <Brand></Brand>
        <!--  平台使用步骤-->
        <div class="enjoy-container">
            <div class="enjoy-content">
                <div class="enjoy-title">
                    <img src="../assets/img/enjoy-title.png">
                </div>
                <div class="enjoy-step">
                    <div class="step-item">
                        <img src="../assets/img/step1.png">
                        <div class="step-item-text">
                            <h3>加入简行会员</h3>
                            <span>点击注册，填写注册信息，成为会员</span>
                        </div>
                    </div>
                    <img src="../assets/img/step5.png" class="next">
                    <div class="step-item">
                        <img src="../assets/img/step2.png">
                        <div class="step-item-text">
                            <h3>一键推荐用车</h3>
                            <span>点击租车，只能推荐附近车辆，即时预订</span>
                        </div>
                    </div>
                    <img src="../assets/img/step5.png" class="next">
                    <div class="step-item">
                        <img src="../assets/img/step3.png">
                        <div class="step-item-text">
                            <h3>随时取还，随心自驾</h3>
                            <span>自主操控旅程，想去哪就去哪</span>
                        </div>
                    </div>
                    <img src="../assets/img/step5.png" class="next">
                    <div class="step-item">
                        <img src="../assets/img/step4.png">
                        <div class="step-item-text">
                            <h3>还车锁门，先使用后支付</h3>
                            <span>申请使用期限，交付定金，先使用，归还时交付尾款</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--  优质服务，用车介绍-->
        <div class="service-container">
            <div class="service-title">
                <img src="../assets/img/service-title.png">
            </div>
            <div class="service-content">
                <ul class="service-step">
                    <li class="service-item">
                        <div class="service-item-i">
                            <img src="../assets/img/service1.png">
                            <h3>超多免费充电桩</h3>
                            <el-button type="text" @click="centerDialogVisible = true" class="view-detail">
                                <img src="../assets/img/viewDetail.png">
                            </el-button>
                            <el-dialog
                                    :visible.sync="centerDialogVisible"
                                    width="70%"
                                    center>
                                <div class="bullet-frame">
                                    <div class="bullet-frame-item">
                                        <div class="frame-left">
                                            <img src="../assets/img/service1.png">
                                        </div>
                                        <div class="frame-right">
                                            <h3>超多电桩免费充电</h3>
                                            <i>可用电桩一键可查，支持简行绿色出行</i>
                                            <p>期间如车辆需要充电，可前往长安出行网点扫码充电桩进行充电桩，充电费用由长安出行支付。如您将车辆充电后再还车，还可以在领取及奖励红包</p>
                                            <div class="tag-box">
                                                <div class="detail-tag">
                                                    <span>免费充电</span>
                                                </div>
                                                <div class="detail-tag">
                                                    <span>密集充电</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-dialog>
                        </div>
                    </li>
                    <li class="service-item">
                        <div class="service-item-i">
                            <img src="../assets/img/service2.png">
                            <h3>新能源绿牌不限行</h3>
                            <el-button type="text" @click="centerDialogVisible1 = true" class="view-detail">
                                <img src="../assets/img/viewDetail.png">
                            </el-button>
                            <el-dialog
                                    :visible.sync="centerDialogVisible1"
                                    width="70%"
                                    center>
                                <div class="bullet-frame">
                                    <div class="bullet-frame-item">
                                        <div class="frame-left">
                                            <img src="../assets/img/service2.png">
                                        </div>
                                        <div class="frame-right">
                                            <h3>新能源绿牌全市不限行</h3>
                                            <i>绿色环保，享受当地新能源车辆行驶政策</i>
                                            <p>目前开通城市新能源车辆均不限行。如您选择租用新能源车辆，可无尾号限制，随时全程畅行。使用清洁能源，节约碳排放。环保行动，您和我们一起在路上</p>
                                            <div class="tag-box">
                                                <div class="detail-tag">
                                                    <span>绿色出行</span>
                                                </div>
                                                <div class="detail-tag">
                                                    <span>节能环保</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-dialog>
                        </div>
                    </li>
                    <li class="service-item">
                        <div class="service-item-i">
                            <img src="../assets/img/service3.png">
                            <h3>全程保险，24小时救援</h3>
                            <el-button type="text" @click="centerDialogVisible2 = true" class="view-detail">
                                <img src="../assets/img/viewDetail.png">
                            </el-button>
                            <el-dialog
                                    :visible.sync="centerDialogVisible2"
                                    width="70%"
                                    center>
                                <div class="bullet-frame">
                                    <div class="bullet-frame-item">
                                        <div class="frame-left">
                                            <img src="../assets/img/service1.png">
                                        </div>
                                        <div class="frame-right">
                                            <h3>全程保险 24小时救援</h3>
                                            <i>为您保驾护航，可选增值不计免赔服务</i>
                                            <p>长安出行每辆车均已由正规保险公司完成上路投保。如您在行驶途中发生交通故事，请在保障人身安全的前提下。立即联系客服处理，如您选购不计免赔服务，保险公司将承保最高1500元车损</p>
                                            <div class="tag-box">
                                                <div class="detail-tag">
                                                    <span>24小时救援</span>
                                                </div>
                                                <div class="detail-tag">
                                                    <span>增值不计免赔</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-dialog>
                        </div>
                    </li>
                    <li class="service-item">
                        <div class="service-item-i">
                            <img src="../assets/img/service4.png">
                            <h3>随时还，专属服务</h3>
                            <el-button type="text" @click="centerDialogVisible3 = true" class="view-detail">
                                <img src="../assets/img/viewDetail.png">
                            </el-button>
                            <el-dialog
                                    :visible.sync="centerDialogVisible3"
                                    width="70%"
                                    center>
                                <div class="bullet-frame">
                                    <div class="bullet-frame-item">
                                        <div class="frame-left">
                                            <img src="../assets/img/service1.png">
                                        </div>
                                        <div class="frame-right">
                                            <h3>随时还，专属服务</h3>
                                            <i>支持非网点借还，门店共享</i>
                                            <p>如您无法将车还至指定网点，您可选择任意还服务。将车辆停放至任意正规停车场地，支付任意还服务费即可。您也可发布接力车信息，系统会将您的接力需求发布至租车首页。如有其他用户接力成功，您可在预定时间内将车还至接力地点，无需再支付附加任意还费用</p>
                                            <div class="tag-box">
                                                <div class="detail-tag">
                                                    <span>任意还</span>
                                                </div>
                                                <div class="detail-tag">
                                                    <span>专属服务</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-dialog>
                        </div>
                    </li>
                    <li class="service-item">
                        <div class="service-item-i">
                            <img src="../assets/img/service5.png">
                            <h3>透明计费，最优价格</h3>
                            <el-button type="text" @click="centerDialogVisible4 = true" class="view-detail">
                                <img src="../assets/img/viewDetail.png">
                            </el-button>
                            <el-dialog
                                    :visible.sync="centerDialogVisible4"
                                    width="70%"
                                    center>
                                <div class="bullet-frame">
                                    <div class="bullet-frame-item">
                                        <div class="frame-left">
                                            <img src="../assets/img/service1.png">
                                        </div>
                                        <div class="frame-right">
                                            <h3>透明计费，最优价格</h3>
                                            <i>里程+用车时长综合计费，价格透明合理</i>
                                            <p>车型计费单价在线展示，费用自动计算，订单金额透明。更有优惠促销活动不定时推出，用车红包、套餐优惠，合作商户联合活动等。</p>
                                            <div class="tag-box">
                                                <div class="detail-tag">
                                                    <span>计费透明</span>
                                                </div>
                                                <div class="detail-tag">
                                                    <span>促销优惠</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-dialog>
                        </div>
                    </li>
                    <li class="service-item">
                        <div class="service-item-i">
                            <img src="../assets/img/service6.png">
                            <h3>快速认证，芝麻信用免押</h3>
                            <el-button type="text" @click="centerDialogVisible5 = true" class="view-detail">
                                <img src="../assets/img/viewDetail.png">
                            </el-button>
                            <el-dialog
                                    :visible.sync="centerDialogVisible5"
                                    width="70%"
                                    center>
                                <div class="bullet-frame">
                                    <div class="bullet-frame-item">
                                        <div class="frame-left">
                                            <img src="../assets/img/service1.png">
                                        </div>
                                        <div class="frame-right">
                                            <h3>快速认证 芝麻信用免押</h3>
                                            <i>身份证即可完成认证，自动关联驾照信息。芝麻信用分700以上免保证金</i>
                                            <p>仅需初次用车时将身份证拍照上传，即可秒速完成认证，开启长安出行。芝麻信用分700以上及公务用车用户更可免押用车。构建信用体系，致力打造零押用车，将您的使用门槛一降到底。</p>
                                            <div class="tag-box">
                                                <div class="detail-tag">
                                                    <span>秒速认证</span>
                                                </div>
                                                <div class="detail-tag">
                                                    <span>信用免押</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-dialog>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 优惠活动，点亮生活-->
        <div class="life-container">
            <div class="life-content">
                <h1>优惠活动，点亮生活趁现在</h1>
                <p>多种活动，多种选择，随心所欲，烦恼都忘掉</p>
                <div class="life-list">
                    <div class="life-item">
                        <div class="item-top">
                            <img src="../assets/img/home1.jpg" alt="">
                        </div>
                        <div class="item-bottom">
                                <div class="item-bottom-text">
                                    <div class="positioning">
                                        <h3>精选5条自驾游路线</h3>
                                        <p>即刻出发</p>
                                        <p>
                                            <el-button type="warning" style="margin-top: 3%" size="mini">全国</el-button>
                                        </p>
                                    </div>
                                </div>
                                <div class="participate" @click="jump1">
                                    <span>立即参与></span>
                                </div>
                        </div>
                        <div class="actived">
                            <img src="../assets/img/active-ing.png" alt="">
                        </div>
                    </div>
                    <div class="life-item">
                        <div class="item-top">
                            <img src="../assets/img/home2.jpg" alt="">
                        </div>
                        <div class="item-bottom">
                            <div class="item-bottom-text">
                                <div class="positioning">
                                    <h3>住宿滑雪享低价</h3>
                                    <p>超值特惠，立即预订</p>
                                    <p>
                                        <el-button type="warning" style="margin-top: 3%" size="mini">全国</el-button>
                                    </p>
                                </div>
                            </div>
                            <div class="participate" @click="jump2">
                                <span>立即参与></span>
                            </div>
                        </div>
                        <div class="actived">
                            <img src="../assets/img/active-ing.png" alt="">
                        </div>
                    </div>
                    <div class="life-item">
                        <div class="item-top">
                            <img src="../assets/img/home3.jpg" alt="">
                        </div>
                        <div class="item-bottom">
                            <div class="item-bottom-text">
                                <div class="positioning">
                                    <h3>端午租车，享福利优惠</h3>
                                    <p>端午假期，简单出行</p>
                                    <p>
                                        <el-button type="warning" style="margin-top: 3%" size="mini">全国</el-button>
                                    </p>
                                </div>
                            </div>
                            <div class="participate" @click="jump3">
                                <span>立即参与></span>
                            </div>
                        </div>
                        <div class="actived">
                            <img src="../assets/img/active-ing.png" alt="">
                        </div>
                    </div>
                    <div class="life-item">
                        <div class="item-top">
                            <img src="../assets/img/home4.jpg" alt="">
                        </div>
                        <div class="item-bottom">
                            <div class="item-bottom-text">
                                <div class="positioning">
                                    <h3>自主取还无接触指南</h3>
                                    <p>安全出行，3步搞定</p>
                                    <p>
                                        <el-button type="warning" style="margin-top: 3%" size="mini">全国</el-button>
                                    </p>
                                </div>
                            </div>
                            <div class="participate" @click="jump4">
                                <span>立即参与></span>
                            </div>
                        </div>
                        <div class="actived">
                            <img src="../assets/img/active-ing.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BottomContent></BottomContent>
    </div>
</template>

<script>
    import Brand from "../components/brand/Brand";
    import BottomContent from "../components/bottom-content/Bottom-content";
    export default {
        name: "Home",
        mounted() {
            this.getPic();
        },
        data(){
            return{
                img:[],
                centerDialogVisible: false,
                centerDialogVisible1: false,
                centerDialogVisible2: false,
                centerDialogVisible3: false,
                centerDialogVisible4: false,
                centerDialogVisible5: false,
            }
        },
        components:{
            BottomContent,
            Brand,
        },
        methods:{
            async getPic() {
                const res=await this.$axios.get('/content');
                this.img=res.data.data
            },
            jump(index){
                this.currentIndex=localStorage.setItem('index','4')
                if (index===0){
                    this.$router.push('/driving')
                }else if (index===1){
                    this.$router.push('/ski')
                }else if (index===2){
                    this.$router.push('/free')
                }else if(index===3){
                    this.$router.push('/self')
                }
            },
            jump1(){
                this.$router.push('/driving')
            },
            jump2(){
                this.$router.push('/ski')
            },
            jump3(){
                this.$router.push('/free')
            },
            jump4(){
                this.$router.push('/self')
            },
        }
    }
</script>

<style scoped>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }


    /*
    平台使用步骤栏
     */
    .enjoy-container{
        width: 100%;
        background-color: #f4f7fa;
        padding-bottom: 3%;
    }
    .enjoy-content{
        width: 80%;
        margin: auto;
    }
    .enjoy-title{
        text-align: center;
    }
    .enjoy-step{
        width: 100%;
        background-color: #fff;
        display: flex;
        justify-content: space-around;
        box-shadow: 0 4px 16px 0 rgba(0,0,0,.1);
    }
    .enjoy-step .next{
        height: 30px;
        align-self: center;
    }
    .step-item{
        width: 20%;
        text-align: center;
        padding: 5% 0 5% 0;
    }
    .step-item-text h3{
        font-size: 14px;
        color: #303030;
    }
    .step-item-text span{
        font-size: 14px;
        color: #666;
        flex-wrap: wrap;
    }
    .service-container{
        padding: 20px 0 20px 0;
        background: url("../assets/img/service-bg2.png") no-repeat center center;
    }
    .service-content{
        width: 80%;
        margin: auto;
    }
    .service-title{
        text-align: center;
    }
    .service-step{
        width: 70%;
        margin: auto;
        text-align: center;
        display: flex;
        padding: 5% 0 5% 0;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .service-item{
        width: 30%;
        margin-bottom: 5%;
    }
    .service-item-i{
        padding: 5% 0 5% 0;
    }
    .service-item:hover{
        background-color: #fff;
        box-shadow: 0 4px 16px 0 rgba(0,0,0,.1);
    }
    .service-item:hover img{
        opacity: 1;
    }
    .service-item h3{
        font-size: 18px;
    }
    .view-detail img{
        width: 60%;
        opacity: 0;
    }

    /*
    弹窗
     */
    .bullet-frame{
        width: 90%;
        margin: auto;
    }
    .bullet-frame-item{
        display: flex;
    }
    .frame-left{
        width: 20%;
        text-align: center;
        display: flex;
    }
    .frame-left img{
        width: 50%;
        align-self: center;
    }
    .frame-right{
        flex: 1;
    }
    .frame-right h3{
        font-size: 32px;
        color: #303030;
        margin: 0 0 2% 0;
    }
    .frame-right i{
        font-size: 16px;
        color: #e1614a;
    }
    .detail-tag{
        padding: 6px 12px 6px 12px;
        float: left;
        margin-left: 3%;
        background-color: #e16049;
        border-radius: 4px
    }
    .detail-tag span{
        font-size: 12px;
        color: #ffffff;
    }

    /*
    亮点生活
     */
    .life-container{
        background-color: #f2f3f5;
        padding: 5% 0 5% 0;
    }
    .life-content{
        width: 80%;
        margin:auto;
    }
    .life-content h1{
        font-size: 30px;
        color: #1b2939;
        text-align: center;
    }
    .life-content p{
        font-size: 16px;
        color: #71767a;
        text-align: center;
        margin-bottom: 5%;
    }
    .life-list{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .life-item{
        width: 20%;
        background-color: #fff;
        margin: 0 0 20px 0;
        overflow: hidden;
        position: relative;
    }

    .item-bottom-text{
        border-bottom: 1px solid rgba(200,200,200,0.3);
    }
    .positioning{
        padding-left: 8%;
    }
    .participate{
        padding: 5% 0 5% 5%;
        text-align: center;
        font-size: 14px;
        color: #60606c;
    }
    .participate:hover{
        color: #1890ff;
        cursor: pointer;
    }

    .item-bottom h3{
        font-size: 16px;
        color: #1b2939;
    }
    .item-bottom p{
        font-size: 14px;
        color: #939a9f;
        text-align: left;
    }
    .life-item img{
        width: 100%;
    }
    .actived{
        width: 20%;
        position:absolute;
        top:0;
        left: 0;
    }
    .actived img{
        width: 100%;
        opacity: 0.8;
    }
</style>