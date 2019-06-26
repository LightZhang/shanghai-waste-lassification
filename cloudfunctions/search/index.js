// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const MAX_LIMIT = 10

// 云函数入口函数
exports.main = async (event, context) => {
    try{
      //返回经过热度排序的数据库记录
      let myDb = db.collection('_waste')
      let data = await myDb.where(
        {
          name: db.RegExp({ regexp: event.name })
        }
      ).orderBy('hot', 'desc')
      .limit(MAX_LIMIT).get()

      //更新搜索过得数据热度
      //TODO
      return data
    }
  catch(e){
    console.error(e)
    return "error"
  }
}