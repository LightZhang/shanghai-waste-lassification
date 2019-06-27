<template>
  <div class="result-box" v-if="rubbishType">

    <label class="seach-name">{{keyWord}}</label>
    <div class="img-box">
      <cover-image :src="rubbishType.img" mode="scaleToFill" style="width:65px;"></cover-image>
    </div>
    <div class="content">
      <div class="stage">
        <label>{{rubbishType.name}}是指：</label>
        <p> {{rubbishType.concept}}</p>
      </div>

      <div class="stage">
        <label>{{rubbishType.name}}主要包括</label>
        <p>{{rubbishType.text}}</p>
      </div>

      <div class="stage">
        <label>{{rubbishType.name}}投放要求</label>
        <ul>
          <li v-for="item in  rubbishType.demand" :key="item">{{item}}</li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "keyWord"],
  computed: {
    rubbishType: function () {
      return this.rubbishTypes.find(p => this.name == p.name);
    },
    rubbishTypes: function () {
      return this.$store.state.rubbishTypes;
    }
  },
  data () {
    return {};
  },
  mounted () { }
};
</script>

<style lang="less" scoped>
.result-box {
  width: 80vw;
  height: 60vh;
  margin: 0 auto;
  border: dashed 1px #000;
  border-radius: 2vh;
  text-align: center;
  overflow: auto;

  .seach-name {
    height: 40px;
    line-height: 40px;
    font-weight: bold;
    font-size: 18px;
    width: 100%;
    display: block;
  }

  .content {
    padding: 10px;
    text-align: left;
    .stage {
      margin: 10px 0px;
    }

    ._label {
      font-weight: bold;
    }
  }

  .img-box {
    width: 65px;
    margin-top: 10px;
    display: inline-block;
  }
}
</style>
