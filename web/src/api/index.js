 class IndexServe {


   //模糊查询接口
   getDownListByName({ keyWord }, callback) {
     wx.cloud.callFunction({
       name: 'search',
       data: { name: keyWord }
     }).then(res => {
       callback && callback(res);
     });

   }


   //获取当前 名称具体的分类
   getResultByName({ keyWord }, callback) {
     wx.cloud.callFunction({
       name: 'search',
       data: { name: keyWord }
     }).then(res => {
       callback && callback(res);
     });
   }


   //获取常见垃圾名称
   getGeneralPurposeByName({}, callback) {
     wx.cloud.callFunction({
       name: 'search'
     }).then(res => {
       callback && callback(res);
     });
   }


 }


 const indexServe = new IndexServe();
 export default indexServe;