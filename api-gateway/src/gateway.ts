import express,{ Application } from "express";
import cors from "cors";
import morgan from "morgan";
import proxy from "express-http-proxy";
import dotenv from "dotenv";


dotenv.config();

const app: Application = express();

const corsOption = {
    origin: "http://localhost:5173",
    Credential: true
}

app.use(cors(corsOption));
app.use(morgan("tiny"));


app.use('/auth-service', proxy("http://localhost:1000"));


const port: number = parseInt(process.env.PORT || "8000");

app.listen(port, () => {
    console.log(`Gateway server Running on Ports: http://localhost:${port}`)
})