const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const PORT = process.env.PORT || 3000; 



app.get("/",(req,res)=>{
res.send("Hello world")
})

app.listen(PORT, ()=>{
    console.log("port is running on 3000")
    mongoose.connect((process.env.MONGODB_URI)
        
    ).then(()=>{
        console.log("MongoDB connected")
    }).catch((err)=>{
        console.log(err)
    })
    
})