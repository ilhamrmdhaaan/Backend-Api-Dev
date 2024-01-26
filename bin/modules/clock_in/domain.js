const query = require('./queries');




const storeClockIn = async (param, subToken) => {
    const getUser = subToken.id;
    // console.log("get user token domain", getUser);

    const data = await query.insertV1(param)
    const history = await query.insertV2(param, getUser)
    
    return data
}




module.exports = {
    storeClockIn,
}