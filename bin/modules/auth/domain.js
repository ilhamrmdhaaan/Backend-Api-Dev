const query = require('./queries');
const jwt = require('jsonwebtoken');
const helpers = require('../../helpers/helper');


const login = async param => {
    const data = await query.auth({
        email : param.email,
        password : param.password
    })

    if (data.err) {
        return {
            err : true,
            result : data
        }
    } else {
        
        // Setup exp token
        const expiresIn = 60 * 60;
        // Create jwt token
        const token = jwt.sign({
            sub : {
                id : data.authResult.id,
                email: param.email
            }
        },
            process.env.JWT_SECRET, {
                expiresIn : expiresIn
            }
        )
    
        let dataProfile = []
    
        dataProfile = {
            user_id : data.authResult.id.toString(),
            email : data.authResult.email,
            created_at : helpers.formatedDate(data.authResult.createdAt),
            updated_at : helpers.formatedDate(data.authResult.updatedAt),
            auth : {
                token : token,
                exp : expiresIn
            }
        }
    
        console.log("log token jwt :", token);
    
        console.log("log data domain", data);

        return dataProfile
    }
}


module.exports = {
    login 
}