import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js'
import cors from 'cors'

const app=express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.use('/user', userRouter);

const PORT=  process.env.PORT||3001;

app.get('/', (req, res)=>{
    res.send("pruebas")
});


app.listen(PORT, ()=>{
    console.log(`estas conectado al servidor http://localhost:${PORT}`)
});