// 云函数入口文件

const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

const wasteDb = db.collection('_waste')
const userDb = db.collection('_user')
const notIncluded = db.collection('_notIncluded')

const Unit = require('./unit')

// 根据用户输入查询数据库数据
exports.main = async (event, context) => {
  console.log("actionName:" + event.action);
  switch (event.action) {
    case 'getDownListByName': {
      return await getDownListByName(event)
    }
    case 'getResultByName': {
      return await getResultByName(event)
    }
    case 'getGeneralPurposeByName': {
      return await getGeneralPurposeByName(event)
    }
    default: {
      return
    }
  }

  //下拉模糊
  async function getDownListByName(event) {

    let res = await wasteDb.where({
      name: db.RegExp({ regexp: event.name })
    }).orderBy('hot', 'desc').limit(50).get();

    if (res.data && res.data.length > 0) {
      return Unit.success(res.data);
    }
    else {
      return Unit.fail('未查询到结果！' + res.errMsg);
    }

  }


  //精确搜索
  async function getResultByName(event) {
    let res = await wasteDb.where({ name: event.name }).limit(1).get();//精确匹配的数据
    console.log(res);
    if (res.data && res.data.length > 0) {
      await updateHot(res.data[0]._id);
      await saveSeachInfo(event.name);
      return Unit.success(res.data);
    }
    else {
      await addNotIncluded(event.name);
      return Unit.fail('未查询到结果！');
    }

  }



  //常用垃圾
  async function getGeneralPurposeByName(event) {

    let res = await wasteDb.orderBy('hot', 'desc').limit(14).get();
    if (res.data && res.data.length > 0) {
      return Unit.success(res.data);
    }
    else {
      return Unit.fail('未查询到结果！' + res.errMsg);
    }
  }

  //更新热点数据
  async function updateHot(id) {
    console.log(id)
    let item = wasteDb.doc(id)
    let doc = await item.get();
    console.log(doc);
    let hotNum = doc.data.hot || 0;
    await item.update({
      data: { hot: hotNum + 1 }
    });
  }

  //不在数据库的垃圾
  async function addNotIncluded(name) {
    let { OPENID, APPID } = cloud.getWXContext()
    await notIncluded.add({ data: { openId: OPENID, name: name } });

  }


  //保存搜索用户信息
  async function saveSeachInfo(event) {
    //保存用户openid信息,出于性能考虑使用异步方式
    let { OPENID, APPID } = cloud.getWXContext();
    await userDb.add({
      data: { appId: APPID, openId: OPENID, name: event.name }
    })
  }
}