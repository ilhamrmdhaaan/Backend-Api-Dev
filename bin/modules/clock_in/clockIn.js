const express = require('express');
const router = express.Router();
const domain = require('./domain');
const validate = require("validate.js");
const jwt = require('jsonwebtoken');
const verifyToken = require('../../helpers/verify_token').verifyToken;


router.post('/clock-in', verifyToken, async (req, res) => {
    const tokenSplit = req.headers.token;    
    let clockIn = req.body.jam;
    let dateIn = req.body.tanggal;
    let data  = req. body.data;


    if (validate.isEmpty(clockIn) || validate.isEmpty(dateIn)) {

            res.send({
                status : false,
                code : 400,
                reason : "Please input clock & date",
                result : null
            })

    } else if(validate.isEmpty(data)){

            res.send({
                status : false,
                code : 400,
                reason : "Please input data",
                result : null
            })
    } else {
        
            try {
                const decoded = jwt.verify(tokenSplit, process.env.JWT_SECRET)
                const subToken = decoded.sub;

                let data = await domain.storeClockIn(req.body, subToken)
        
                res.send({
                    status : true,
                    code : 200,
                    reason : "Success"
                })
        
            } catch (error) {
        
                res.send({
                    status : false,
                    code : 500,
                    reason : "Sorry system internal error",
                    result : null
                })
            }
    }
})


module.exports = router