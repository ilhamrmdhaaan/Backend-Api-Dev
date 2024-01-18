const query = require('./queries');



const storeClockOut = async param => {

    const data = await query.insertV1(param)
    const histories = await query.insertV2(param)

    return data
}


module.exports = {
    storeClockOut
}