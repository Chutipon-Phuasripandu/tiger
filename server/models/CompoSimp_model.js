let mongoose = require('mongoose');

//Schema Validation

let userSchema5 = mongoose.Schema({
    fx : {type: String ,required : true },
    n : {type: Number ,required : true},
    a : {type: Number ,required : true},
    b : {type: Number ,required : true}
});

let CompoSimp_model = mongoose.model('CompoSimp_model de',userSchema5);
module.exports = CompoSimp_model;