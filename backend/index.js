
const express = require("express")

const app=express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("home")
})

app.listen(8000,()=>{
    console.log("listen to port 8000")
})