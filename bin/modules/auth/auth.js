const express = require('express');
const router = express.Router();
const domain = require('./domain');
const validate = require("validate.js");


router.post('/login', async (req, res) => {
    let email = req.body.email;


    if (validate.isEmpty(email) || validate.isEmpty(req.body.password)) {
        res.send({
            status : false,
            code : 400,
            reason : "Please input email & password",
            result : null
        })

    } else {
        
        try {
            let data = await domain.login(req.body)
            
            if (data.err) {
                if (data.result.result === "password") {
                    res.send({
                        status: false,
                        code: 400,
                        reason: "Please check email or password not valid",
                        result: null
                     })
                }

            } else {
                res.send({
                    status : true,
                    code : 200,
                    reason : "Success",
                    result : data
                })
            }
    
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
