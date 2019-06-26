// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const MAX_LIMIT = 10

// 云函数入口函数
exports.main = async (event, context) => {
  let _name = event.name
  const data = []
  const item = db.collection('_waste').where({
    name:db.RegExp({
      regexp:_name
    })
  }).limit(MAX_LIMIT).get()
  data.push(item)

  return (await Promise.all(data)).reduce((acc,cur) => {
    return {
      data:acc.data.concat(cur.data),
      errMsg:acc.errMsg
    }
  })
}