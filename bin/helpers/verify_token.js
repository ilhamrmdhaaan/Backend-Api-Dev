const jwt = require('jsonwebtoken');
const helpers = require('./helper');
// const endPoint = require('./endpoint');


const getToken = headers => {
    // return headers
    if (headers && headers.token) {
        return headers.token
    }
    return false
}

const verifyToken = (req,res, next) => {
    const token = getToken(req.headers)
    // const originalUrl = req.originalUrl
    // const split = token && req.headers.token
    // console.log("log token split", split);

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                console.log("logging jwt verify token :", decoded);
                if (err) {
                    res.send({
                        status : false,
                        reason : "Expired token",
                        code : 403,
                    })
                } else {
                    req.user = {
                        id : decoded.sub.id,
                        email : decoded.sub.email
                    }

                    next();
                }
            })
        }
        
        // res.append("Set-Cookie", "HttpOnly;Secure;SameSite=Strict")
        // next();

}


module.exports = {
    verifyToken
}