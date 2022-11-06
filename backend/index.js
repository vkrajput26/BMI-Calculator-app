
const express = require("express")
const bcrypt = require('bcrypt');
const {connection}=require("./config/db")
const {UserModel} =require("./models/UserModel")
const jwt = require("jsonwebtoken");
const { authentication } = require("./middlewares/authentication");
const { BMIModel } = require("./models/BMIModel");
const app = express()
const cors =require("cors")
app.use(cors())
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
        res.send("user already exists ,  please try to logging up")
    }

    else{  bcrypt.hash(password, 4,async function(err,hash) {
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
         res.send({"msg": "sign up successfully"})
      }
      catch(err){
          res.send({ "msg" : "error occur"})
      }
       
    });
}
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
            res.send({ "msg":"try agai later"})
        }
        if(result){
            var token = jwt.sign({user_id}, process.env.SECRET_KEY);
            res.send({msg:"login successfull",token})
        }
        else{
            res.send({"msg":"login failed"})
        }
    })
})

 app.get("/getProfiler", authentication, async (req,res)=>{
    const {user_id}=req.body
    const user= await UserModel.findOne({_id:user_id})
    console.log(user)
    const {name,email}=user
    res.send({name,email})
 })

 app.post("/calculate",authentication, async (req,res)=>{
 const {height,weight,user_id}=req.body;
 const height_in_m=Number(height)*0.3048
 const BMI =Number(weight)/(height_in_m)**2
 const new_bmi = new BMIModel({
    BMI,
    height : height_in_m,
    weight,
    user_id
 })
 await new_bmi.save()
 res.send({BMI})
 })

 app.get("/getCalculate",authentication, async (req,res)=>{
    const {user_id}=req.body;
    const all_bmi_data = await BMIModel.find({user_id:user_id})
    
  
    res.send({history:all_bmi_data})
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