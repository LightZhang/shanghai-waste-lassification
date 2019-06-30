<template>
  <view class="index">
    <van-panel>
      <div>
        <van-field v-model="keyWord" placeholder="请输入关键字，拼音缩写" @change="change">
          <div id="panel-warp"></div>
          <van-button slot="button" size="small" type="primary" @click="confirm()">查询</van-button>
        </van-field>

        <div class="ul-box" v-show="isShowSeach&lists.length>0">
          <ul>
            <li class="li" v-for="item in lists" :key="item._id" @click="confirm(item.name)">
              {{ item.name}}
              <van-tag class="type-tag">{{item.type}}</van-tag>
            </li>
          </ul>
        </div>
      </div>
    </van-panel>

    <div class="tag-box">
      <label>热门搜索关键字</label>
      <van-tag
        class="tag"
        type="success"
        plain
        round
        v-for="hot in hots"
        :key="hot"
        @click="confirm(hot)"
      >{{hot}}</van-tag>
      <label style="text-align:right;color:blue;">更多...</label>
    </div>

    <div class="tip-box" v-if="!isShowResult">
      <ul>
        <li class="li" v-for="item in rubbishTypes" :key="item.name">
          <img :src="item.img" class="left-img" />
          <p class="description">{{item.text}}</p>
        </li>
      </ul>
    </div>

    <div>
      <resultBox v-show="isShowResult" :name="resultObject.name" :type="resultObject.type"></resultBox>
    </div>

    <van-toast id="van-toast" />
  </view>
</template>

<script>
import indexServe from "@/api/index";
import resultBox from "@/components/result-box";
import Toast from "../../../static/vant/lib/toast/toast";
export default {
  computed: {
    rubbishTypes: function() {
      return this.$store.state.rubbishTypes;
    }
  },
  data() {
    return {
      keyWord: "",
      isShowSeach: false,
      isShowResult: false,
      lists: ["纸巾", "面膜", "鸡蛋", "剩饭", "剩菜"],
      hots: [
        "纸巾",
        "面膜",
        "鸡蛋",
        "剩饭",
        "剩菜",
        "所料",
        "小龙虾",
        "玻璃瓶"
      ],
      resultObject: {
        name: "",
        type: "干垃圾"
      }
    };
  },

  components: {
    resultBox
  },

  methods: {},
  created() {
    wx.hideTabBar();
    wx.setNavigationBarTitle({ title: "查询" });
    //获取热门垃圾
    this.getGeneralPurposeByName();
  },
  mounted() {},
  methods: {
    change(event) {
      this.keyWord = event.mp.detail;
      if (this.keyWord != "") {
        //调用云模糊接口
        indexServe.getDownListByName({ keyWord: this.keyWord }, res => {
          this.lists = res.result;
          if (this.lists.length > 0) {
            this.isShowSeach = true;
            this.isShowResult = false;
          }
        });
      } else {
        this.isShowSeach = false;
        this.isShowResult = false;
      }
    },
    confirm(item) {
      if (item) {
        this.keyWord = item;
      }

      if (this.keyWord) {
        //调用查询结果接口
        this.isShowSeach = false;
        indexServe.getResultByName({ keyWord: this.keyWord }, res => {
          if (res.result.length > 0) {
            this.isShowResult = true;
            this.resultObject = res.result[0];
          } else {
            Toast("未查询到当前垃圾");
            this.isShowResult = false;
          }
        });
      }
    },
    getGeneralPurposeByName() {
      indexServe.getGeneralPurposeByName(res => {
        this.hots = res.result;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.index {
  padding: 5px;

  .ul-box {
    background-color: rgba(255, 255, 255, 1);
    position: absolute;
    z-index: 999;
    top: 50px;
    width: 100%;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);

    .li {
      height: 40px;
      line-height: 40px;
      padding: 5px 20px;

      .type-tag {
        float: right;
      }
    }

    .li:hover {
      background-color: #f3f3f3;
    }
  }

  #panel-warp {
    position: absolute;
  }

  .tag-box {
    margin: 20px;

    label {
      display: block;
      margin-bottom: 20px;
    }
    .tag {
      margin: 5px;
      display: inline-block;
    }
  }

  .tip-box {
    height: 65vh;
    display: flex;
    flex-direction: column;
    .li {
      display: flex;
      flex-direction: row;
      margin: 3vh;
      .left-img {
        width: 75px;
        height: 75px;
      }
      .description {
        display: flex;
        flex: 1;
        padding-top: 5px;
        padding-left: 10px;
      }
    }
  }
}
</style>

