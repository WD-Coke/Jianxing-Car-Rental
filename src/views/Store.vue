<template>
  <div>
    <div class="mapleft">
      <div>
        <span>选择地址：</span>
      <el-select v-model="city" placeholder="请选择" @change="cityChange">
        <el-option v-for="item in citys" :key="item" :value="item"></el-option>
      </el-select>
      </div>
      <div v-for="(item,index) in storelist" :key="index" @click="btnStore(index)" class="storediv">
        <img :src="item.mainpic" alt="123" width="50%" height="90px" />
        <div class="left-bar">
          <h2 class="h2">{{item.sname}}</h2>
          <span>营业时间：{{item.workdate}}</span>
          <br />
          <span>地址：{{item.slocation}}</span>
        </div>
      </div>
    </div>
    <div id="container" />
    <div class="input-card custom-input-card"></div>
  </div>
</template>

<script>
import AMap from "AMap";

export default {
  data() {
    return {
      citys: [
        "重庆",
        "遵义",
        "广州",
        "上海",
        "北京",
        "天津",
        "深圳",
        "杭州",
        "成都",
        "长沙",
        "大连",
        "三亚",
        "济南",
        "武汉",
        "西安",
      ],
      storelist: [],
      lnglat: [],
      city: "重庆",
      content: "",
    };
  },
  created() {
    this.getStore();
  },
  methods: {
    // 更换城市
    cityChange() {
      this.getStore();
    },
    // 获取经纬度
    getlnglat() {
      let arr = [];
      this.storelist.forEach((item) => {
        arr.push([...("" + item.lolattude).split(",")]);
      });
      this.lnglat = arr;
      this.mapinit();
    },
    // 得到门店信息
    async getStore() {
      const res = await this.$axios.get("search/storemap", {
        params: { city: this.city },
      });
      this.storelist = res.data.data;
      console.log(this.storelist);
      this.getlnglat();
    },
    // 点击门店，重新生成地图
    btnStore(ev) {
      this.mapinit(this.lnglat[ev]);
    },
    mapinit(ev) {
      // 生成地图
      var map = new AMap.Map("container", {
        // 定位
        resizeEnable: true,
        center: ev ? ev : this.lnglat[0],
        zoom: 14,
      });

      for (let i = 0; i < this.lnglat.length; i++) {
        var _this = this;
        console.log(_this.lnglat[i]);
        var marker = new AMap.Marker({
          // 标点
          position: _this.lnglat[i],
        });

        marker.on("click", function () {
          this.content =
            '<div class="info-title" style="font-size: 13px">' +
            _this.storelist[i].sname +
            '</div><div class="info-content" style="font-size: 12px">' +
            "<img src=" +
            _this.storelist[i].mainpic +
            ' width=100px height=60px style="margin-right:10px">' +
            _this.storelist[i].slocation +
            "<br/>营业时间：" +
            _this.storelist[i].workdate +
            "<br/>" +
            '<a href="#/store/' +
            _this.storelist[i].sid +
            '">了解商家详情</a></div>';
          var infowindow = new AMap.AdvancedInfoWindow({
            content: this.content,
            closeWhenClickMap: true,
            offset: new AMap.Pixel(0, -30),
          });

          infowindow.open(map, _this.lnglat[i]);
          console.log(i);
        });
        marker.setMap(map);
      }
    },
  },
};
</script>

<!--<style src="../assets/css/API.css" scoped></style>-->
<style>
.left-bar span {
  font-size: 12px;
  display: inline-block;
  line-height: 1;
  font-weight: 100;
}
.h2 {
  margin-top: 0;
  font-size: 18px;
}
.storediv > div {
  width: 45%;
  display: inline-block;
  vertical-align: top;
  word-break: normal;
}
.storediv > div span {
  line-height: 18px;
}
.mapleft img {
  float: left;
  margin: 0 5px 10px 0;
}
.mapleft {
  width: 20%;
  float: left;
}
.storediv {
  border-bottom: 1px solid #bebebe;
  overflow: hidden;
  cursor: pointer;
  margin: 10px;
}
.mapleft > div:hover {
  color: rgb(230, 71, 71);
  /* background-color: #257773; */
}
#container {
  width: 80%;
  height: 800px;
  float: right;
}
.custom-input-card {
  width: 22rem;
}

.custom-input-card .btn {
  margin-right: 1rem;
}

.custom-input-card .btn:last-child {
  margin-right: 0;
}

.info-title {
  color: white;
  font-size: 12px;
  background-color: #25a5f7;
  line-height: 26px;
  padding: 0px 0 0 6px;
  font-weight: lighter;
  letter-spacing: 1px;
}

.info-content {
  font: 12px Helvetica, "Hiragino Sans GB", "Microsoft Yahei", "微软雅黑", Arial;
  padding: 4px;
  color: #666666;
  line-height: 23px;
}

.info-content img {
  float: left;
  margin: 3px;
}

.amap-info-combo .keyword-input {
  height: 25px;
  border-radius: 2px 0 0 2px;
}

.info-title {
  color: white;
  font-size: 12px;
  background-color: #25a5f7;
  line-height: 26px;
  padding: 0px 0 0 6px;
  font-weight: lighter;
  letter-spacing: 1px;
}

.info-content {
  font: 12px Helvetica, "Hiragino Sans GB", "Microsoft Yahei", "微软雅黑", Arial;
  padding: 4px;
  color: #666666;
  line-height: 23px;
}
/*
高德
 */
</style>