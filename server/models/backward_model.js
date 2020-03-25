let mongoose = require('mongoose');

//Schema Validation

let userSchema5 = mongoose.Schema({
    fx : {type: String ,required : true },
    Order : {type: Number ,required : true},
    x : {type: Number ,required : true},
    h : {type: Number ,required : true}
});

let backward_model = mongoose.model('backward_nonode de',userSchema5);
module.exports = backward_model;