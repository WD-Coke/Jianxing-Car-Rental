<template>
  <div class="bcimg">
    <div class="roomall">
      <div class="roomall1">
        <div class="leftdiv">
          <el-carousel trigger="click" height="380px">
            <el-carousel-item v-for="(item, index) in imgs" :key="index">
              <img :src="item" alt="133" class="big-img" />
            </el-carousel-item>
          </el-carousel>
          <div class="small-img">
            <div class="img-list">
              <img
                v-for="(item, index) in imgs"
                :key="index"
                alt="132"
                :src="item"
              />
            </div>
          </div>
        </div>
        <div class="rightdiv">
          <h1>{{ carDetails.cname }}</h1>
          <div class="room-price">
            <div class="price-list moth">
              <label>日租金</label>
              <span>
                <div class="room-price-sale">
                  {{ carDetails.cprice }}
                  <em>元/天</em>
                </div>
              </span>
              <label>总金额</label>
              <span>
                <div class="room-price-sale">
                  <el-input-number
                    v-model="daynum"
                    :min="carDetails.housemin"
                    :max="carDetails.housemax"
                    size="small"
                    label="描述文字"
                  ></el-input-number>
                  <span style="margin-left:60px">{{ allprise }}</span>
                  <em>元</em>
                </div>
              </span>
            </div>
          </div>
          <div class="room-list-new">
            <div>
              <span>品牌：{{ carDetails.cbrand }}</span>
            </div>
            <div>
              <span>车牌号：{{ carDetails.license }}</span>
            </div>
            <div>
              <span>最短出租时间：{{ carDetails.minday }}</span>
            </div>
            <div>
              <span>最长出租时间：{{ carDetails.maxday }}</span>
            </div>
            <div>
              <span>座椅：{{ carDetails.sets }}位</span>
            </div>
              <div>
                  <span>油型：#{{ carDetails.power}}</span>
              </div>
              <div>
                  <span>提前预定：2-4小时</span>
              </div>
            <div>
              <span>邮箱容量：{{ carDetails.volume}}L</span>
            </div>
            <div>
              <span>用车规则：{{ carDetails.roles }}</span>
            </div>
          </div>
          <el-button type="primary" class="btnroom" @click="client()">立 即 预 订</el-button>
        </div>
      </div>
      <el-divider class="easyfont">
        <span>简行租车承诺</span>
      </el-divider>
      <div class="danke-promise">
        <div class="danke-promise-content">
          <div class="danke-promise-item">
            <img
                    src="../assets/img/promise/daocheyingxiang_anhei.png"
                    alt
            />
            <p>倒车影像</p>
          </div>
          <div class="danke-promise-item">
            <img
                    src="../assets/img/promise/tianchuang_anhei.png"
                    alt
            />
            <p>全景天窗</p>
          </div>
          <div class="danke-promise-item">
            <img
                    src="../assets/img/promise/xingchejiluyi_anhei.png"
                    alt
            />
            <p>行车记录仪</p>
          </div>
          <div class="danke-promise-item">
            <img
                    src="../assets/img/promise/daohangyi_anhei.png"
                    alt
            />
            <p>导航仪</p>
          </div>
          <div class="danke-promise-item">
            <img
                    src="../assets/img/promise/zhenpizuoyi_anhei.png"
                    alt
            />
            <p>真皮座椅</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 租车人弹框 -->
    <el-dialog
      title="租车人信息"
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
        <el-form-item label="身份证号">
          <el-input
                  placeholder="请输入身份证号"
                  v-model="inputId"
                  clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clientFormVisible = false">取消</el-button>
        <el-button
                type="primary"
                @click="reservation()"
                :disabled="inputname===''||inputphone===''||inputId===''">
          确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      clientFormVisible: false,
      daynum: 1,
      inputname: "",
      inputphone: "",
      inputId:'',
      carDetails: {},
      imgs: [],
      price:''
    };
  },
  computed: {
    allprise: function() {
      return this.price=this.daynum * this.carDetails.cprice;
    }
  },
  created() {
    this.getCarDetails(this.$route.params);
  },
  methods: {
    // 预定验证
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

    // 预定车辆
    async reservation() {
      this.clientFormVisible = false;
        console.log(localStorage.getItem('account'))
      const res = await this.$axios.put(
        "/order/createorder",
        qs.stringify({
          account: localStorage.getItem("account"),
          cid: this.carDetails.cid,
          came:this.carDetails.cname,
          price: this.price,
          days: this.daynum,
          username: this.inputname,
          cellphone: this.inputphone,
          idnumber:this.inputId,
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
    async getCarDetails(ev) {
      const res = await this.$axios.get(`/car/getcar/${ev.name}`);
      const { status, data, message } = res.data;
      if (status == 200) {
        this.$message({
          message: `${message}`,
          type: "success",
          duration: 1000
        });
        this.carDetails = data;

        this.imgs[0] = data.pic1;
        this.imgs[1] = data.pic2;
        this.imgs[2] = data.pic3;
        this.imgs[3] = data.pic4;
      }
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
};
</script>

<style scoped>
  /*
  .bcimg {
    background: url(../assets/5.png) no-repeat center center fixed;
  }
   */
  .bcimg{
    background-color: #f1f1f1;
  }
  .easyfont span {
    font-weight: 700;
    font-size: 24px;
  }

  .danke-promise {
    width: 1190px;
    margin: 10px auto;
  }
  .danke-promise-content {
    display: flex;
    background-color: #fff;
    width: 100%;
    border-radius: 5px;
    box-shadow: 0 0 10px 3px rgba(231, 231, 231, 0.5);
    padding: 30px 0;
    margin-top: 30px;
    justify-content: space-around;
  }
  .danke-promise-item {
    width: 16.3%;
    text-align: center;
    display: inline-block;
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
    padding-top: 20px;
  }
  em {
    font-style: normal;
  }
  .room-list-new div {
    width: 40%;
    float: left;
    height: 40px;
    margin-left: 20px;
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
    font-size: 32px;
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
    margin: auto;
  }
  .big-img {
    width: 100%;
    margin: 0 auto;
    height: 100%;
  }
  .img-list {
    margin-top: 10px;
  }
  .img-list img {
    height: 100%;
    width: 20%;
    margin: 0 5px;
  }
  .small-img {
    width: 100%;
    text-align: center;
  }
  .leftdiv {
    float: left;
    width: 50%;
    height: 100%;
  }
</style>
