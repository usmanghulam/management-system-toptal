const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

require("./mongodb/connect");

// Body-Parser
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));


// Routes
app.use('/user', require('./routes/userAuth'));
app.use('/record', require('./routes/userRecords'));



app.use(express.static(path.resolve(__dirname,'../build/')));
app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname,'../build/index.html'))
})

var port = process.env.PORT || 8080
app.listen(port,()=>console.log(`Server is running on localhost:${port}`));