const { ClockIn, History, sequelize } = require('../../../models/index')



// Insert data ke tabel clock in
const insertV1 = async param => {
    // Prepare transactions
    const t = await sequelize.transaction()
    const options = { transaction : t }

    try {
        const clockIn = await ClockIn.create({
            jam : param.jam,
            tanggal : param.tanggal,
            keterangan  : param.keterangan
        }, options)
    
        await t.commit();
    
        return clockIn

    } catch (e) {

        await t.rollback();

        return e
    }
   
}

// Insert data ke tabel histories
const insertV2 = async param => {
        // Prepare transactions
        const t = await sequelize.transaction()
        const options = { transaction : t }

    
    try {
        
        let dataHistories = param.data;
        // Use forEach to insert each data entry into the History table
        const insertedHistories = [];

        if (dataHistories.length > 0) {
            
            (dataHistories.map(async (data) => {
            const { ip_address, latitude, longitude } = data;
            const newHistory = await History.create({
                ip_address,
                latitude,
                longitude
            });
            insertedHistories.push(newHistory);
            }), options);
        }
        await t.commit()
            
        // console.log("log insert v2");


    } catch (e) {

        // console.log("log error", e);

        await t.rollback();

        return e
    }

}



module.exports = {
    insertV1,
    insertV2,
}