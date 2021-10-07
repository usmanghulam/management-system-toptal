const mongoose = require('mongoose');

let records = mongoose.Schema({
    userId : {type: String , require: true},
    date : {type: Date , require: true},
    perdayhour : {type: String , require: true},
    totalhour : {type: String , require: true},
    Note1 : {type : String , require : true},
    Note2 : {type : String, require : true},
    Note3 : {type : String , require : true},
})

module.exports = mongoose.model("records", records);