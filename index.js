const express = require('express');
const app  =  express();
const connectDB = require('./config/db')
app.use(express.json({extended: false}));
//connect to db
connectDB();

//Define Routes
app.use('/',require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = 5000

app.listen(PORT, ()=>console.log(`Server running on port : ${PORT}`));
