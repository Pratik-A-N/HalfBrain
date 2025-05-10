import express from "express"
import dotenv from "dotenv"
import authRouter from "./Routes/authRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(express.json())

app.use('/api/auth', authRouter);

app.listen(PORT,()=>{
    console.log(`Server is running only on ${PORT}`);
})