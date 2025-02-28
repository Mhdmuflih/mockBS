import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import proxy from "express-http-proxy";
import dotenv from "dotenv";
import { verifyJWT } from "./middleware/jwtVerification";

dotenv.config();

const app: Application = express();

const corsOptions = {
    origin: process.env.FrontEnd, 
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true, 
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(morgan("tiny"));

app.use("/auth-service", proxy(process.env.Auth_Service as string || "http://localhost:1010"));
app.use("/user-service", verifyJWT, proxy(process.env.User_Management_Service as string || "http://localhost:2020"));
app.use("/booking-service", verifyJWT, proxy(process.env.Booking_Service as string || "http://localhost:3030"));
app.use("/payment-service", verifyJWT, proxy(process.env.Payment_Service as string || "http://localhost:4040"));

app.use("*", (req: Request, res: Response) => {
    res.status(404).json({ message: "Route not found" });
});

const port: number = parseInt(process.env.PORT || "8080");

app.listen(port, () => {
    console.log(`Gateway server Running on Ports: http://localhost:${port}`)
})