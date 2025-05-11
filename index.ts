import express from "express"
import dotenv from "dotenv"
import authRouter from "./Routes/authRouter.js";
import contentRouter from "./Routes/contentRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(express.json())

app.use('/api/auth', authRouter);
app.use('/api/content', contentRouter);

app.listen(PORT,()=>{
    console.log(`Server is running only on ${PORT}`);
})