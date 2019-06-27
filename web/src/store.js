import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    rubbishTypes: [{
        name: "有害垃圾",
        text: '废电池、油漆桶、荧光灯管、废药品及其包装物等',
        img: require("@/assets/images/ico-1.jpg")
      },
      {
        name: "可回收垃圾",
        text: '酱油瓶、玻璃杯、平板玻璃、易拉罐、饮料瓶、 洗发水瓶、塑料玩具、书本、报纸、广告单、 纸板箱、衣服、床上用品等',
        img: require("@/assets/images/ico-2.jpg")
      },
      {
        name: "湿垃圾",
        text: '剩菜剩饭、瓜皮果核、花卉绿植、过期食品等',
        img: require("@/assets/images/ico-3.jpg")
      },
      {
        name: "干垃圾",
        text: '餐盒、餐巾纸、湿纸巾、卫生间用纸、塑料袋、 食品包装袋、污染严重的纸、烟蒂、纸尿裤、 一次性杯子、大骨头、贝壳、花盆、陶瓷等',
        img: require("@/assets/images/ico-4.png")
      }
    ],
  },
  mutations: {
    increment: (state) => {

    },
    decrement: (state) => {

    }
  }
})

export default store
