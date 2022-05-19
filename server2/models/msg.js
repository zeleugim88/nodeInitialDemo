const { Schema, model } = require('mongoose');

const MsgSchema = Schema({
    
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    msg: {
        type: String,
        required: true,
    },
    online: {
        type: String,
        default: false
    }
},{
    timestamps: true
})

//Remove the version from the object
MsgSchema.method('toJSON', function (){
    const {__v, ...object} = this.Object();
    object.uid = _id;
    return object;
})

module.exports = model('Msg', MsgSchema)
//The exported model will be called 'Msg'and has MsgSchema as schema
//mongoose will set the plural (Msgs) automatically