const mongoose = require('mongoose');

let signUpSchema = mongoose.Schema({
    first_name : {type: String , require: true},
    last_name : {type : String , require : true},
    email : {type : String, require : true},
    password : {type : String , require : true},
    type: {type: String, default: "user"},
})

module.exports = mongoose.model("signup", signUpSchema);