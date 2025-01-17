import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import { postRegister ,postLogin } from './controllers/user.js'
import { postContact ,getContact ,putContact ,deleteContact ,getOneContact} from './controllers/contact.js'
dotenv.config()
const app= express()
app.use(cors());
app.use(express.json())

const dbConnetion = async()=>{
    const connection = await mongoose.connect(process.env.MONGODB_URL)
    if (connection)
    {
        console.log("Database connected Successfully 🎁🔗")
    }
    else {
        console.log("Database Not Coonected ⛓️‍💥❌")
    }
} 
dbConnetion()

app.get('/health', (req,res)=>{
    res.send("Server is Up and Running")
})

app.post('/register',postRegister)

app.post('/login', postLogin)

app.post('/contact', postContact )

app.get('/contacts', getContact)

app.get('/contact/:id',getOneContact)

app.put('/contact/:id' , putContact)

app.delete('/contact/:id' , deleteContact)

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server is runnig on port ${PORT}`)
})