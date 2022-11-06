
const mongoose = require("mongoose")

const bmiSchema= new mongoose.Schema({
    BMI:{type:Number, require:true},
    height:{type:String, require:true},
    weight:{type:String, require:true},
    user_id:{type: String, require:true}
},{
    timestamps:true
})

const BMIModel = mongoose.model("bmiHistory", bmiSchema)

module.exports={BMIModel}