
const express = require("express")
const bcrypt = require('bcrypt');
const {connection}=require("./config/db")
const {UserModel} =require("./models/UserModel")
const jwt = require("jsonwebtoken")
const app = express()

require("dotenv").config()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("home")
})

app.post("/signup",async(req,res)=>{
    const {name,email,password}=req.body;
    console.log(name,email,password)
 
    const isUser= await UserModel.findOne({email})
    if(isUser){
        res.send("user already exists , please try to logging up")
    }

    bcrypt.hash(password, 4,async function(err,hash) {
      if(err){
        res.send("please try again")
      }


      const new_user = new UserModel({
          name,
          email,
          password:hash
      })
      try{
         await new_user.save()
         res.send("sign up successfully")
      }
      catch(err){
          res.send("error occur")
      }
       
    });
})


//login

app.post("/login", async(req,res)=>{
    const {email,password}=req.body
    const user = await UserModel.findOne({email})
    const hash_password= user.password;
    const user_id= user._id;
    console.log(user)
    bcrypt.compare(password,hash_password,function(err,result){
        if(err){
            res.send("try agai later")
        }
        if(result){
            var token = jwt.sign({user_id}, process.env.SECRET_KEY);
            res.send({msg:"login successfull",token})
        }
        else{
            res.send("login failed")
        }
    })
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