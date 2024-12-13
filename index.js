const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const jobRoute = require("./routes/job");
const bodyParser = require("body-parser");
const cors = require("cors")
dotenv.config();
app.use(cors())
const PORT = process.env.PORT || 3000; 

app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
res.send("Hello world")
})

app.use("/api/user", userRoute)
app.use("/api/job",jobRoute);

app.listen(PORT, ()=>{
    console.log("port is running on 3000");
    mongoose.connect((process.env.MONGODB_URI)
    
    ).then(()=>{
        console.log("MongoDB connected");
    }).catch((err)=>{
        console.log(err);
    })
    
})