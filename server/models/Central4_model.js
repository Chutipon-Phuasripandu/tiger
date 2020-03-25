let mongoose = require('mongoose');

//Schema Validation

let userSchema5 = mongoose.Schema({
    fx : {type: String ,required : true },
    Order : {type: Number ,required : true},
    x : {type: Number ,required : true},
    h : {type: Number ,required : true}
});

let Central4_node = mongoose.model('Central4_node de',userSchema5);
module.exports = Central4_node;