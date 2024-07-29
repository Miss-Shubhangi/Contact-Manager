import { Schema,model } from "mongoose";

const contactSchema = new Schema(
    {
        fullName:{
            type:String,
            required:true
        },
        contact:{
            type:Number,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        dob:{
            type:Date,
            required:true
        }
    }
)

const Contact = model ('Contact', contactSchema)

export {Contact}