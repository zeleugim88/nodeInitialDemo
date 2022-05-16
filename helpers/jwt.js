const jwt = require('jsonwebtoken')

const generarJWT = ( uid ) => {

    return new Promise ((resolve, reject) => {
        const payload = { uid } //info easily hackeable
        jwt.sign( payload, process.env.JWT_KEY,{
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject("JWT could not be sent")
            } else {
                resolve
            }
        });
    });
}

module.exports = {
    generarJWT
}