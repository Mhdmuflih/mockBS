import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

// --------------------------------------------------------------------------------

import Admin_Route from "./Routes/adminRoutes"; 
import connectDB from "./Config/database";
import Candidate_Route from "./Routes/candidateRoutes";
import Interviewer_Route from "./Routes/interviewerRoutes";

// --------------------------------------------------------------------------------


dotenv.config();        // env configuration

connectDB();            // database Connection


const app: Application = express();         // server creation

// cors setting in frontend
// ------------------------------------------------------
const corsOptions = {
    origin: process.env.FrontEnd, // Replace with the frontend URL
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true,  // Allow cookies or credentials to be sent with the request
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
// ------------------------------------------------------


// convert to json format
app.use(express.json());
app.use(morgan("tiny"));


// route redition
// ---------------------------------------------------
app.use('/admin', Admin_Route);
app.use('/interviewer', Interviewer_Route);
app.use('/candidate', Candidate_Route);



// server listen the port
// -----------------------------------------------------------------------------------

// port setting
const port: number = parseInt(process.env.PORT || "1010");

app.listen(port, () => {
    console.log(`Auth service Running on Ports: http://localhost:${port}`);
});

// -----------------------------------------------------------------------------------
