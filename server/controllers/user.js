import {User} from "./../models/User.js"


const postRegister=async (req,res)=>{
    const {fullName , email ,password}=req.body
  
    const user= new User({
      fullName,
      email,
      password
    })
  try{
    const savedUser = await user.save()
    res.json({
        success:true,
        message:"Registration Succcessful",
        data:savedUser
    })}
     catch (e) {
        res.json({
          success: false,
          message: e.message,
          data: null
        });
      }
  }

  const postLogin=async (req,res)=>{
    const { email ,password}=req.body
    const loginUser = await User.findOne({
      email,
      password
    })
    if(loginUser){
      res.json({
        success:true,
        message:"Login Succcessful",
        data: loginUser
      })
    }
    else{
      res.json({
        success:false,
        message:"Invalid Credential",
        data:null
    
      })
    }
    
  }
    
  
  


  export {postRegister , postLogin}