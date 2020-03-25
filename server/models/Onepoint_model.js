let mongoose = require('mongoose');

//Schema Validation

let userSchema5 = mongoose.Schema({
    fx : {type: String ,required : true },
    x0 : {type: Number ,required : true}
});

let Onepoint_model = mongoose.model('Onepoint_model',userSchema5);
module.exports = Onepoint_model;