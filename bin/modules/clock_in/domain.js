const query = require('./queries');




const storeClockIn = async (param) => {

    const data = await query.insertV1(param)
    const history = await query.insertV2(param)
    
    return data
}




module.exports = {
    storeClockIn,
}