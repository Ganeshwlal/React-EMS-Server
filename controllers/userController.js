const users = require("../models/userSchema");

//Register Logic
exports.userRegister = async (req,res)=>{
console.log(req.file);

const file = req.file.filename
const {fname,lname,mobile,email,gender,location,status,dob}=req.body

if(!fname || !lname || !mobile || !email || !gender || !location || !status || !dob ||!file)
{
    res.status(403).json("All inputs are required")
}
try {

    const preuser = await users.findOne({email})

    if(preuser){
        res.status(403).json("the user already exist in our database")
    }
    else{

        const newuser = new users({
            fname,lname,email,mobile,gender,status,profile:file,location,dob
        })
        await newuser.save()
        res.status(200).json(newuser)

    }   
} catch (error) {
    res.status(401).json(error)
}
}

//get all users
exports.getalluser =async(req,res)=>{
    //get query parameter from req
    const search = req.query.search
    const query = {
        fname:{$regex:search,$options:"i"}
    }
    try {
        const userdata = await users.find(query)
        res.status(200).json(userdata)
    } catch (error) {
        res.status(401).json(error)

    }
}

//get a user
exports.getuserdetail = async(req,res)=>{
    const {id}=req.params

    try {
        const userdata = await users.findOne({_id:id})
        if(userdata){
            res.status(200).json(userdata)
        }
        else{
            res.status(404).json("user doesnot exist")
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

//EDIT USER
exports.editUser=async(req,res)=>{
    const {id}=req.params
    const {fname,lname,mobile,email,gender,location,status,dob,user_profile}=req.body

    const file = req.file? req.file.filename:user_profile

    try {
        const updatedUser = await users.findByIdAndUpdate({_id:id},
            {fname,lname,email,mobile,gender,status,profile:file,location,dob},{
                new:true
            })

            await updatedUser.save()
            res.status(200).json(updatedUser)
        
    } catch (error) {
        res.status(401).json(error)
    }
}

//DELETE USER
exports.deleteUser=async(req,res)=>{
    const {id} = req.params

    
    try {
        const removeUser = await users.findByIdAndDelete({_id:id})
            res.status(200).json(removeUser)
        
    } catch (error) {
        res.status(401).json(error)
    }

}
