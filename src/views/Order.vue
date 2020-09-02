<template>
    <div id="app" class="order">
        <div class="order-container">
            <div class="order-content">
                <img class="order-title" src="../assets/img/orderTitle.png" alt="">
                <div class="order-list">
                    <div class="positioning">
                        <h3>我的订单</h3>
                        <ul class="order-select-table">
                            <li v-for="(item,index) in orderTable" :key="index" :class="[index===activeIndex?'active':'normalActive']" @click="addActive(index)">{{item}}</li>
                        </ul>
                        <!-- 表格数据-->
                        <div class="order-table">
                            <el-table
                                    :data="tableData"
                                    style="width: 100%">
                                <el-table-column type="expand">
                                    <template slot-scope="props">
                                        <el-form label-position="left" inline class="demo-table-expand">
                                            <el-form-item label="车辆名称：">
                                                <span>{{ props.row.came }}</span>
                                            </el-form-item>
                                            <el-form-item label="车辆 ID：">
                                                <span>{{ props.row.cid }}</span>
                                            </el-form-item>
                                            <el-form-item label="订单 ID：">
                                                <span>{{ props.row.orderid }}</span>
                                            </el-form-item>
                                            <el-form-item label="价格(元/天)：">
                                                <span>{{ props.row.price }}</span>
                                            </el-form-item>
                                            <el-form-item label="订单时间：">
                                                <span>{{props.row.createtime|formatDate}}</span>
                                            </el-form-item>
                                            <el-form-item label="租用人：">
                                                <span>{{ props.row.username }}</span>
                                            </el-form-item>
                                            <el-form-item label="租用天数：">
                                                <span>{{ props.row.days }}</span>
                                            </el-form-item>
                                            <el-form-item label="还车时间：">
                                                <span>{{ props.row.returntime|formatDate}}</span>
                                            </el-form-item>
                                        </el-form>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="订单 ID"
                                        prop="orderid">
                                </el-table-column>
                                <el-table-column
                                        label="车辆"
                                        prop="pic">
                                    <template slot-scope="scope">
                                        <img :src="scope.row.pic" alt="" style="width: 80%;height: 80px">
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="价格"
                                        prop="price">
                                    <template slot-scope="scope">
                                        {{scope.row.price}}元/天
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="租用天数"
                                        prop="days">
                                    <template slot-scope="scope">
                                        {{scope.row.days}}天
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="订单状态"
                                        prop="conditon">
                                    <template slot-scope="scope">
                                        {{scope.row.conditon|forConditional}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="操作" v-if="activeIndex===0||activeIndex===1">
                                    <template slot-scope="scope">
                                        <el-button
                                                type="info"
                                                size="normal"
                                                icon="el-icon-delete"
                                                v-show="scope.row.conditon===0"
                                                @click="cancel(scope.row.orderid)">
                                            取消
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-dialog title="取消订单" :visible.sync="centerDialog" width="30%" center>
                                <span>您确认要取消订单吗</span>
                                <span slot="footer" class="dialog-footer">
                                <el-button @click="centerDialog = false">取 消</el-button>
                                <el-button type="primary" @click="cancelOrder">确 定</el-button>
                                </span>
                            </el-dialog>
                        </div>
                    </div>
                </div>
            </div>
            <div class="order-item"></div>
        </div>
        <div class="order-bottom">
            <BottomContent></BottomContent>
        </div>
    </div>
</template>

<script>
    import BottomContent from "../components/bottom-content/Bottom-content";
    import {formatDate} from "../common/formatDate"
    import qs from "qs";
    export default {
        components: {
            BottomContent,
        },
        data(){
            return{
                orderTable:['全部订单','审核中','进行中','已完成','已取消','已拒绝'],
                activeIndex:0,
                tableData: [],
                account: '',
                orderid:'',
                centerDialog:false,
            }
        },
        filters: {
            formatDate(time) {
                let date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd hh:mm')
            },
            forConditional(num){
                if (num===0){
                    num="审核中";
                    return num
                } else if (num===1){
                    num="进行中";
                    return num;
                }else if (num===2){
                    num="已完成";
                    return num;
                }else if (num===3){
                    num="已取消";
                    return num;
                } else if(num===4){
                    num="已拒绝";
                    return num;
                }
            },
        },
        methods:{
            async addActive(index){
                this.activeIndex=index;
                this.account=localStorage.getItem('account')
                if (index>=1){
                    const res=await this.$axios.get( '/order/getkindsorder',{params:
                            {
                                account:this.account,
                                state:index-1
                            }
                    });
                    this.tableData=res.data.data
                }else if (index===0){
                    const res=await this.$axios.get( '/order/getkindsorder',{params:
                            {
                                account:this.account,
                            }
                    });
                    this.tableData=res.data.data
                }
            },
            cancel(ev){
                this.centerDialog=true
                this.orderid=ev;
            },

            //请求数据
            async OrderDetails(){
                this.account=localStorage.getItem('account')
                const res=await this.$axios.get( '/order/getallorder',{params:{account:this.account}});
                console.log(res)
                this.tableData=res.data.data
            },
            async cancelOrder(){
                const res=await  this.$axios.post('/order/cancelorder',qs.stringify({orderid:this.orderid}))
                if (res.data.status === '201'){
                    this.$message({
                        message:res.data.message,
                        type:'success'
                    })
                    this.centerDialog=false
                    this.OrderDetails()
                }
            }
        },
        created() {
            this.OrderDetails()
        }
    }
</script>

<style scoped>
    .order-content{
        width: 100%;
        position: relative;
    }
    .order-title{
        width: 100%;
    }
    .order-list{
        height: 700px;
        width: 80%;
        position: absolute;
        top:75%;
        left: 10%;
        background-color: #ffffff;
        box-shadow: #888888 0 0 20px;
        overflow: hidden;
        overflow-y: scroll;
    }
    .positioning{
        padding: 1% 3% 3% 3%;
    }
    .order-list h3{
        font-size: 18px;
        color: rgba(0,0,0,.85);
    }
    .order-select-table{
        display: flex;
    }
    .order-select-table li{
        width: 8%;
        text-align: center;
        font-size: 14px;
        height: 35px;
        line-height: 35px;
    }
    .normalActive{
        color: #93939e;
        background-color: #f8f8fa;
        border: 1px solid #e9ebee;
    }
    .active{
        background-color: #fabe00;
        border: 1px solid #fabe00;
        color: #ffffff;
    }

    .order-item{
        height: 700px;
        background-color: #ffffff;
    }

    /*
    表格数据
     */
    .order-table{
        padding: 3% 0 3% 0;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>
