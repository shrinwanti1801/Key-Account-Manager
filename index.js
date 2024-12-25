const express=require('express');
const app=express();
const {connectDB}=require('./src/config');
const {Logger}=require('./src/config');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/',(req,res)=>{
    return res.send("Welcome to KAM")
});

PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`Server is running at PORT number ${PORT}`);
})


connectDB();
