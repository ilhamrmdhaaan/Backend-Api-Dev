const { User, sequelize } = require('../../../models/index')
const bcrypt = require('bcrypt');



const auth = async param => {

    try {
       
       const result = await User.findOne({
            attributes : ['id','email', 'password', 'createdAt', 'updatedAt'],
            where : {
                email : param.email
            }
       });

       if (result) {
          const isValid = bcrypt.compareSync(param.password, result.password)
          
          if (!isValid) {
                return {
                    err : true,
                    message : "wrong password",
                    result : "password"
                }
          } else {
            // console.log("log", result);
            return {
                err : false,
                authResult : result
            }
          }

       }
    } catch (e) {

        // console.log("error", e);
        return e
    }
}


module.exports = {
    auth
}