const mongoose = require('mongoose')
const validator = require('validator')

const userScheme = new mongoose.Schema({
    fname:{
        type:String,
        require:true,
        trim:true
    },
    lname:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw Error("Not a valid email")
            }
        }
    },
    mobile:{
        type:String,
        require:true,
        unique:true,
        minLength:10,
        maxLength:10
    },
    gender:{
        type:String,
        require:true
    },

    status:{
        type:String,
        require:true,
    },
    profile:{
        type:String,
        require:true,
    },
    location:{
        type:String,
        require:true,
    },
    dob:{
        type:String,
        require:true,
    },
    

})

const users = new mongoose.model("users",userScheme)


module.exports = users

