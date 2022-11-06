
const express = require("express")
const {connection}=require("./config/db")
const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("home")
})

app.post("/signup",(req,res)=>{
    const {name,email,password}=req.body;
    console.log(name,email,password)
})

app.listen(8000, async() => {
    try{
        await connection
        console.log("connection to db successfully")

    }
    catch(err){
        console.log(err)
    }
    console.log("listen to port 8000")
})