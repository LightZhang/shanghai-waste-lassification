// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const MAX_LIMIT = 10
const wasteDb = db.collection('_waste')
const userDb = db.collection('_user')

// 根据用户输入查询数据库数据
exports.main = async (event, context) => {
    try{
      let resData = { code: Number, message: String, data: []}
      let hotId
      let hotNum
      //返回经过热度排序的数据库记录
      let sData = await wasteDb.where({name:event.name}).limit(1).get()//精确匹配的数据
      
      //模糊匹配的数据
      let fuzzyData = await wasteDb.where(
        {
          name: db.RegExp({ regexp: event.name })
        }
      ).orderBy('hot', 'desc')
      .limit(MAX_LIMIT).get()

      if(sData.data.length>0 && fuzzyData.data.length>0){
        resData.code = 1
        resData.message = '查询结果'
        hotId = sData.data[0]._id
        hotNum = sData.data[0].hot
        resData.data.push(sData.data[0])
        fuzzyData.data.forEach(d=>{
          if(d._id != sData.data[0]._id){
            resData.data.push(d)
          }
        })
      }
      else if (sData.data.length == 0 && fuzzyData.data.length > 0){
        resData.code = 1
        resData.message = '查询结果'
        resData.data = fuzzyData.data
      }
      else{
        resData.code = -1
        resData.message = '暂无数据'
      }

      //保存用户openid信息,出于性能考虑使用异步方式
      let { OPENID, APPID } = cloud.getWXContext()
      userDb.add({data:{ appId: APPID, openId: OPENID, input: event.name },
          success: function (res) {
            console.log(res)
          },
          fail: console.error
      }
     )

      //更新搜索过得数据热度（精确查找）
      wasteDb.doc(hotId).update({
        data:{hot:hotNum+1},
        success:function(res){
          console.log(res)
        },
        fail:console.error
      })

      return resData
    }
  catch(e){
    console.error(e)
    resData.code=-1
    resData.message='查询失败'
    return resData
  }
}