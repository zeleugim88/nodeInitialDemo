const { validationResult } = require('express-validator');


const validateInputs = (req, res, next ) => {
    //Express validator returns the errors from the request
    const errors = validationResult( req );

    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
            //mapped() is a function created by "validationResult" (Express Validator)
        });
    }
    next();
}

module.exports = {
    validateInputs
}