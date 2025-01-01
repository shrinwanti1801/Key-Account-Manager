const express=require('express');
const app=express();
const {connectDB}=require('./src/config');
const {Logger}=require('./src/config');
// const router=require('./src/routes');
const apiRoute = require('./src/routes');

const cookieParser = require('cookie-parser')
const fileUpload=require('express-fileupload');
const cors = require("cors");
require('./src/cron/cron-job');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use(cors());

app.use('/api', apiRoute);

app.get('/',(req,res)=>{
    return res.send("Welcome to KAM")
});

PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`Server is running at PORT number ${PORT}`);
})


connectDB();
