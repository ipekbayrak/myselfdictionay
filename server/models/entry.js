var mongoose=require('mongoose');

const confiq=require('../config/config').get(process.env.NODE_ENV);
const salt=10;

const entrySchema=mongoose.Schema({
    word:{
        type: String,
        required: true,
        maxlength: 100
    },
    meaning:{
        type: String,
        required: true,
        maxlength: 100
    },
    userID:{
        type: Schema.Types.ObjectId,
        required: true,
        unique: 1
    }
});

module.exports=mongoose.model('Entry',entrySchema);