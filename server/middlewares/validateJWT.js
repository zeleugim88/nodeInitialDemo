
const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {

    try {
        const token = req.header('x-token');

        if(!token) {
            return res.status(401).json({
                ok: false,
                msg: "Missing token in client request"
            })
        }

        const payload = jwt.verify( token,  process.env.JWT_KEY );
        /* res.status(200).json({
            ok: true,
            payload
        }) */
        req.uid = payload.uid //by saving uid in the request, we can access it in the controler
        //which is after this middleware

        next();

    } catch(e) {
        res.status(401).json({
            ok: false,
            msg: 'Token not valid'
        })
    }
}

module.exports = {
    validateJWT
}