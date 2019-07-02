
class Unit {

    static success(data) {
        console.log(data)
        let resData = { code: 1, message: "调用成功！", data: [] };
        resData.data = data;
        return resData;
    }


    static fail(msg) {
        console.log(msg)
        let message = msg || '调用失败！';
        let resData = { code: 0, message: message, data: [] };
        return resData;
    }
}

module.exports = Unit;
