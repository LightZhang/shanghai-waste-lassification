<template>
  <div class="result-box" v-if="rubbishType">
    <label class="seach-name">{{type}}</label>
    <div class="img-box">
      <cover-image :src="rubbishType.img" mode="scaleToFill"></cover-image>
    </div>
    <div class="content">
      <div class="stage">
        <label>{{rubbishType.name}}是指：</label>
        <p>{{rubbishType.concept}}</p>
      </div>

      <div class="stage">
        <label>{{rubbishType.name}}主要包括</label>
        <p>{{rubbishType.text}}</p>
      </div>

      <!-- <div class="stage">
        <label>{{rubbishType.name}}投放要求</label>
        <ul>
          <li v-for="item in  rubbishType.demand" :key="item">{{item}}</li>
        </ul>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "type"],
  computed: {
    rubbishType: function() {
      return this.rubbishTypes.find(p => this.type == p.name);
    },
    rubbishTypes: function() {
      return this.$store.state.rubbishTypes;
    }
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.result-box {
  width: 80vw;
  text-align: center;
  overflow: auto;
  margin: 0 auto;
  border-radius: 5px;
  background-color: #ffffff;
  margin-top: 30vh;

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
    width: 75px;
    margin-top: 5px;
    display: inline-block;
  }
}
</style>
