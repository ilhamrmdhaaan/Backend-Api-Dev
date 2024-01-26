const query = require('./queries');



const storeClockOut = async (param, subToken) => {
    const getUser = subToken.id;

    const data = await query.insertV1(param)
    const histories = await query.insertV2(param, getUser)

    return data
}


module.exports = {
    storeClockOut
}