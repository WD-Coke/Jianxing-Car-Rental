<template>
    <div class="left-bar">
        <dl>
            <dt>用户服务</dt>
            <dd v-for="(item,index) in order" @click="addActive(index)" :class="{active:index===currentIndex}">{{item}}</dd>
        </dl>
        <dl>
            <dt>门店服务</dt>
            <dd v-for="(item2,index) in message" @click="addActive(index)" :class="{active:index===currentIndex}">{{item2}}</dd>
        </dl>
        <dl>
            <dt>会员条款</dt>
            <dd v-for="(item3,index) in vip" @click="addActive(index)" :class="{active:index===currentIndex}">{{item3}}</dd>
        </dl>
    </div>
</template>

<script>
    export default {
        name: "LeftBar",
        mounted() {
            this.currentIndex=localStorage.getItem('index')
        },
        data(){
            return{
                order:['全部订单','订单申请','订单审核'],
                message:['全部车辆','订单申请','加盟'],
                vip:['会员章程','会员细则'],
                currentIndex:'0',
            }
        },
        methods:{
            addActive(index){
                localStorage.setItem('active',index)
                this.currentIndex=localStorage.getItem('active')
            }
        }
    }
</script>

<style scoped>
    .left-bar{
        width: 20%;
        background-color: rgba(253,253,253,1);
        box-shadow: 2px 2px 2px rgba(158,158,158,.2);
    }
    .left-bar dl{
        margin: 0;
        padding-bottom: 30px;
    }
    .left-bar dt{
        padding:10px 0 10px 15px;
        font-size: 1.6em;
        color: #515151;
        border-bottom: 1px solid rgba(200,200,200,0.3);
        border-top: 1px solid rgba(200,200,200,0.3);
    }
    .left-bar dd{
        color: #8a8a8a;
        font-size: 1.2em;
        padding:7px 0 7px 15px;
        margin: 0;
    }
    .left-bar dd:hover{
        color: #eeb757;
        background-color: rgba(238,183,87,.2);
        cursor:pointer
    }
</style>