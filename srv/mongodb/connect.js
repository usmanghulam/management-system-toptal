const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://usman:usman@cluster0.y7gsf.mongodb.net/TimeManagmentSystem?retryWrites=true&w=majority`
,{ useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
.then(()=> console.log("Database Connected"))
.catch(err => console.log("Mongodb " + err))