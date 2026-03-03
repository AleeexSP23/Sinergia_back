import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js'
import cors from 'cors'
import reservationRouter from "./routes/reservation.routes.js";

const app=express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use("/reservations", reservationRouter);

const PORT=  process.env.PORT||3001;

app.get('/', (req, res)=>{
    res.send("pruebas")
});


app.listen(PORT, ()=>{
    console.log(`estas conectado al servidor http://localhost:${PORT}`)
});