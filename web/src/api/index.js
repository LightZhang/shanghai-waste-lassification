import Toast from '../../static/vant/lib/toast/toast';
class IndexServe {
  constructor() {
    wx.cloud.init()
  }

  //基礎 接口
  getWxCloudBack(name, data, callback) {
    data = data || {};
    wx.cloud
      .callFunction({
        name: name,
        data: data
      })
      .then(res => {
        if (res.result != "error") {
          callback && callback(res)
        } else {
          Toast.fail(res.result);
        }
      })
  }

  //模糊查询接口
  getDownListByName({ keyWord }, callback) {
    this.getWxCloudBack("search", { name: keyWord }, callback);
  }

  //获取当前 名称具体的分类
  getResultByName({ keyWord }, callback) {

    this.getWxCloudBack("search", { name: keyWord },callback);
  }

  //获取常见垃圾名称
  getGeneralPurposeByName({ }, callback) {
    this.getWxCloudBack("search", {}, callback);
  }
}

const indexServe = new IndexServe()
export default indexServe
