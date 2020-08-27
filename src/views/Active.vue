<template>
    <div class="Active">
        <div class="active-container">
            <div class="active-main">
                <!--      活动开头      -->
                <div class="model-title">
                    <img src="../assets/img/activeTitle.png" alt="">
                </div>
                <div class="model-content">
                <!--  活动正在进行-->
                    <dl class="active-list">
                        <dd class="top-item">
                            <div class="item-left">
                                <img src="../assets/img/home1.jpg" alt="">
                            </div>
                            <div class="item-right">
                                <h3>精选5条自驾游路线</h3>
                                <p>即刻出发</p>
                                <el-button type="primary" style="width: 25%;margin-top: 5%" @click="jump1">立即参与</el-button>
                                <p>
                                    <el-button type="warning" style="margin-top: 3%" size="mini">全国</el-button>
                                </p>
                            </div>
                            <div class="activing">
                                <img src="../assets/img/active-ing.png" alt="">
                            </div>
                        </dd>
                        <dd class="top-item">
                            <div class="item-left">
                                <img src="../assets/img/home2.jpg" alt="">
                            </div>
                            <div class="item-right">
                                <h3>免费升级雪地胎，住宿滑雪享低价</h3>
                                <p>超值特惠，立即预订</p>
                                <el-button type="primary" style="width: 25%;margin-top: 5%" @click="jump2">立即参与</el-button>
                                <p>
                                    <el-button type="warning" style="margin-top: 3%" size="mini">全国</el-button>
                                </p>
                            </div>
                            <div class="activing">
                                <img src="../assets/img/active-ing.png" alt="">
                            </div>
                        </dd>
                        <dd class="top-item">
                            <div class="item-left">
                                <img src="../assets/img/home3.jpg" alt="">
                            </div>
                            <div class="item-right">
                                <h3>端午租车，享福利优惠</h3>
                                <p>端午假期，简单出行</p>
                                <el-button type="primary" style="width: 25%;margin-top: 5%" @click="jump3">立即参与</el-button>
                                <p>
                                    <el-button type="warning" style="margin-top: 3%" size="mini">全国</el-button>
                                </p>
                            </div>
                            <div class="activing">
                                <img src="../assets/img/active-ing.png" alt="">
                            </div>
                        </dd>
                        <!--  结束活动-->
                        <div class="actived-list">
                            <div class="list-item">
                                <div class="item-top">
                                    <img src="../assets/img/home4.jpg" alt="" @click="jump4">
                                </div>
                                <div class="item-bottom">
                                    <h3>自主取还无接触指南</h3>
                                    <p>安全出行，3步搞定</p>
                                    <p>
                                        <el-button type="warning" style="margin-top: 3%" size="mini">全国</el-button>
                                    </p>
                                </div>
                                <div class="actived">
                                    <img src="../assets/img/active-ing.png" alt="">
                                </div>
                            </div>
                            <div class="list-item">
                                <div class="item-top">
                                    <img src="../assets/img/home4.jpg" alt="">
                                    <div class="img-cover"></div>
                                </div>
                                <div class="item-bottom">
                                    <h3>自主取还无接触指南</h3>
                                    <p>安全出行，3步搞定</p>
                                    <p>
                                        <el-button type="warning" style="margin-top: 3%" size="mini">全国</el-button>
                                    </p>
                                </div>
                                <div class="actived">
                                    <img src="../assets/img/actived.png" alt="">
                                </div>
                            </div>
                            <div class="list-item">
                                <div class="item-top">
                                    <img src="../assets/img/home4.jpg" alt="">
                                    <div class="img-cover"></div>
                                </div>
                                <div class="item-bottom">
                                    <h3>自主取还无接触指南</h3>
                                    <p>安全出行，3步搞定</p>
                                    <p>
                                        <el-button type="warning" style="margin-top: 3%" size="mini">全国</el-button>
                                    </p>
                                </div>
                                <div class="actived">
                                    <img src="../assets/img/actived.png" alt="">
                                </div>
                            </div>
                            <div class="list-item">
                                <div class="item-top">
                                    <img src="../assets/img/home4.jpg" alt="">
                                    <div class="img-cover"></div>
                                </div>
                                <div class="item-bottom">
                                    <h3>自主取还无接触指南</h3>
                                    <p>安全出行，3步搞定</p>
                                    <p>
                                        <el-button type="warning" style="margin-top: 3%" size="mini">全国</el-button>
                                    </p>
                                </div>
                                <div class="actived">
                                    <img src="../assets/img/actived.png" alt="">
                                </div>
                            </div>
                            <div class="list-item">
                                <div class="item-top">
                                    <img src="../assets/img/home4.jpg" alt="">
                                    <div class="img-cover"></div>
                                </div>
                                <div class="item-bottom">
                                    <h3>自主取还无接触指南</h3>
                                    <p>安全出行，3步搞定</p>
                                    <p>
                                        <el-button type="warning" style="margin-top: 3%" size="mini">全国</el-button>
                                    </p>
                                </div>
                                <div class="actived">
                                    <img src="../assets/img/actived.png" alt="">
                                </div>
                            </div>
                            <div class="list-item">
                                <div class="item-top">
                                    <img src="../assets/img/home4.jpg" alt="">
                                    <div class="img-cover"></div>
                                </div>
                                <div class="item-bottom">
                                    <h3>自主取还无接触指南</h3>
                                    <p>安全出行，3步搞定</p>
                                    <p>
                                        <el-button type="warning" style="margin-top: 3%" size="mini">全国</el-button>
                                    </p>
                                </div>
                                <div class="actived">
                                    <img src="../assets/img/actived.png" alt="">
                                </div>
                            </div>
                            <div class="list-item">
                                <div class="item-top">
                                    <img src="../assets/img/home4.jpg" alt="">
                                    <div class="img-cover"></div>
                                </div>
                                <div class="item-bottom">
                                    <h3>自主取还无接触指南</h3>
                                    <p>安全出行，3步搞定</p>
                                    <p>
                                        <el-button type="warning" style="margin-top: 3%" size="mini">全国</el-button>
                                    </p>
                                </div>
                                <div class="actived">
                                    <img src="../assets/img/actived.png" alt="">
                                </div>
                            </div>
                            <div class="list-item">
                                <div class="item-top">
                                    <img src="../assets/img/home4.jpg" alt="">
                                    <div class="img-cover"></div>
                                </div>
                                <div class="item-bottom">
                                    <h3>自主取还无接触指南</h3>
                                    <p>安全出行，3步搞定</p>
                                    <p>
                                        <el-button type="warning" style="margin-top: 3%" size="mini">全国</el-button>
                                    </p>
                                </div>
                                <div class="actived">
                                    <img src="../assets/img/actived.png" alt="">
                                </div>
                            </div>
                            <div class="list-item">
                                <div class="item-top">
                                    <img src="../assets/img/home4.jpg" alt="">
                                    <div class="img-cover"></div>
                                </div>
                                <div class="item-bottom">
                                    <h3>自主取还无接触指南</h3>
                                    <p>安全出行，3步搞定</p>
                                    <p>
                                        <el-button type="warning" style="margin-top: 3%" size="mini">全国</el-button>
                                    </p>
                                </div>
                                <div class="actived">
                                    <img src="../assets/img/actived.png" alt="">
                                </div>
                            </div>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
        <BottomContent></BottomContent>
    </div>
</template>

<script>
    import BottomContent from "../components/bottom-content/Bottom-content";
    export default {
        name: "Active",
        components:{
            BottomContent,
        },
        methods:{
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
    .active-container{
        width: 100%;
        background-color: #e6e6e6;
    }
    .active-main{
        width: 80%;
        margin: auto;
        padding: 20px 0 20px 0;
    }
    .model-title{
        text-align: center;
        margin-bottom: 20px;
    }
    .model-content{
        margin-bottom:20px;
        width: 100%;
    }
    .active-list{
        margin: 0;
    }
    .top-item{
        width: 100%;
        margin:0 0 3% 0;
        background-color: #fff;
        display: flex;
        overflow: hidden;
        position: relative;
    }
    .top-item:hover{
        box-shadow:#888888 0 0 10px;
    }
    .item-left{
        width: 55%;
    }
    .top-item img{
        width: 100%;
    }

    .item-right{
        flex: 1;
        padding: 3% 0 0 3%;
    }
    .item-right h3{
        font-size: 2.4em;
        color: #1b2939;
    }
    .item-right p{
        font-size: 1.6em;
        color: #939a9f;
    }
    .activing{
        width: 7%;
        position:absolute;
        top:0;
        left: 0;
    }
    .activing img{
        width: 100%;
        opacity: 0.8;
    }


    /*
    结束活动
     */
    .actived-list{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .list-item{
        width: 30%;
        background-color: #fff;
        margin: 0 0 20px 0;
        overflow: hidden;
        position: relative;
    }
    .list-item:hover{
        box-shadow:#888888 0 0 10px;
    }
    .item-bottom{
        padding-left: 5%;
    }
    .item-bottom h3{
        font-size: 1.6em;
        color: #1b2939;
    }
    .item-bottom p{
        font-size: 1.4em;
        color: #939a9f;
    }
    .list-item img{
        width: 100%;
    }
    .item-top{
        position: relative;
    }
    .img-cover{
        width: 100%;
        height: 100%;
        position: absolute;
        top:0;
        left: 0;
        background-color: rgba(0,0,0,0.4);
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