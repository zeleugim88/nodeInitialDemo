const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        mongoose.connect( process.env.MONGO, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            //useCreateIndex: true, //error
        })

        console.log('DB online')

    } catch (error) {
        console.log(error);
        throw new Error('Error in database')
    }
}

module.exports = {
    dbConnection
}