let mongoose = require('mongoose');

//Schema Validation

let userSchema5 = mongoose.Schema({
    fx : {type: String ,required : true },
    xl : {type: Number ,required : true},
    xr : {type: Number ,required : true}
});

let bisec_model = mongoose.model('bisec_model',userSchema5);
module.exports = bisec_model;