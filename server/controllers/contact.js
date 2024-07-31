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
        })
    } 


const putContact=async(req ,res)=>{
    const {contactName , contact , email, dob ,user}=req.body
    const {id}=req.params
   try{
    const updateContact= await Contact.updateOne({_id:id}, {$set:{
        contactName ,
         contact , 
         email, 
         dob ,
         user  
    }})
    res.json({
        success:true,
        message :"Contact Updated  Successfully",
        data:updateContact.data
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

const deleteContact = async (req, res) => {
    const { id } = req.params;
  
      const deleteResult = await Contact.deleteOne({ _id: id, user:id });
  
      if (deleteResult.deletedCount === 0) {
        return res.status(404).json({
          success: false,
          message: 'Contact not found or not authorized to delete this contact.',
        })
      }
  
      res.json({
        success: true,
        message: 'Contact deleted successfully.',
        data: null,
      })
    
  }


export {postContact ,
     getContact ,
     putContact ,
     deleteContact}