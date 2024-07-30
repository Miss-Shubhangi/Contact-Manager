import { Contact } from "../models/Contact.js";
import { User } from "../models/User.js";

const postContact = async( req,res)=>{
    const {contactName , contact , email, dob ,user}=req.body

    const newcontact= new Contact({
        contactName,
        contact,
        email,
        dob: new Date(dob),
        user
    })
  try{
    const newContact= await newcontact.save()
    res.json({
            success:true,
            message:"contact Saved ",
            data:newContact

   })
  }
  catch(e){
    res.json({
        success:false,
        message:e.message,
        data:null
    })   
  }
}

const getContact = async (req, res) => {
    const { userId } = req.query;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
                data: null
            });
        }

        const allContacts = await Contact.find({ user: userId }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Contacts loaded successfully",
            data: allContacts
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            data: null
        });
    }
};


export {postContact , getContact}