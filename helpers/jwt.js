const jwt = require('jsonwebtoken');


const generateJWT = ( uid ) => {

    return new Promise(  ( resolve, reject ) => {

        const payload = { uid }; //use not important data to create payload

        jwt.sign( payload, process.env.JWT_KEY, { // secretOrPrivateKey => danger! nobody can find this parameter
            expiresIn: '24h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject('JWT could not be generated');
            } else {
                resolve( token );
            }

        });
    });
    
}



module.exports = {
    generateJWT
}