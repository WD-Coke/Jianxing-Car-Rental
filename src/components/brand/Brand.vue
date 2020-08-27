<template>
    <div class="jx-brand">
        <div class="jx-main">
            <ul>
                <li>
                    <img src="../../assets/img/qiche.svg" @click="jump1">
                    <p>
                        <b>100+</b>
                        车型
                    </p>
                </li>
                <li>
                    <img src="../../assets/img/dituhdpi.svg"@click="jump2">
                    <p>千家网点</p>
                </li>
                <li>
                    <img src="../../assets/img/anquan.svg">
                    <p>100%保障</p>
                </li>
                <li>
                    <img src="../../assets/img/licheng_f.svg">
                    <p>无限里程</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Brand",
        methods:{
            jump1(){
                this.$router.push('/Lease')
            },
            jump2(){
                this.$router.push('/Store')
            }
        }
    }
</script>

<style scoped>
    .jx-brand{
        width: 100%;
        border-bottom: 1px solid rgba(200,200,200,0.5);
    }
    .jx-main{
        overflow:auto;
        margin: 0 10% 0 10%;
        border-right: 1px solid rgba(200,200,200,0.5);
    }
    .jx-main li{
        width: 24.8%;
        float: left;
        text-align: center;
        padding-top: 20px;
        font-size: 1.4em;
        border-left: 1px solid rgba(200,200,200,0.5);
    }
    .jx-main img{
        width: 15%;
        cursor: pointer;
    }
    .jx-main p{
        margin-top: 0;
    }
</style>