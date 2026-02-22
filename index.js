// importaciones
import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js'

// configuraciones
const app=express();
dotenv.config()
app.use(express.json());


app.use('/user', userRouter)

const PORT=  process.env.PORT||3001;

// API
app.get('/', (req, res)=>{
    res.send("pruebas")
})


app.listen(PORT, ()=>{
    console.log(`estas conectado al servidor http://localhost:${PORT}`)
})