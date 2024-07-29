import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'

dotenv.config()
const app= express()
app.use(cors())
app.use(express.json())

const dbConnetion = async()=>{
    const connection = await mongoose.connect(process.env.MONGODB_URL)
    if (connection)
    {
        console.log("Database connected Successfully 🎁🔗")
    }
    else {
        console.log("Database Not Coonected⛓️‍💥❌")
    }
} 
dbConnetion()


const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server is runnig on port ${PORT}`)
})