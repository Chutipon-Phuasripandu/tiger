let mongoose = require('mongoose');

//Schema Validation

let userSchema5 = mongoose.Schema({
    fx : {type: String ,required : true },
    xl : {type: Number ,required : true},
    xr : {type: Number ,required : true}
});
nof
let forward_node = mongoose.model('forward_nonode de',userSchema5);
module.exports = forward_node;