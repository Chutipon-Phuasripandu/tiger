let mongoose = require('mongoose');

//Schema Validation

let userSchema5 = mongoose.Schema({
    fx : {type: String ,required : true },
    Order : {type: Number ,required : true},
    x : {type: Number ,required : true},
    h : {type: Number ,required : true}
});

let forward2_node = mongoose.model('forward2_nonode de',userSchema5);
module.exports = forward2_node;