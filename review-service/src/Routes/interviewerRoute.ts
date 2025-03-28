import { Router } from "express";
import { InterviewerControllers } from "../Controllers/interviewerController";
import interviewerRepository from "../Repository/interviewerRepository";
import { InterviewerServices } from "../Services/interviewerService";

const interviewerService = new InterviewerServices(interviewerRepository);
const interviewerController = new InterviewerControllers(interviewerService);

const Interviewer_Route = Router();

Interviewer_Route.post('/feedback', interviewerController.addFeedback.bind(interviewerController))


export default Interviewer_Route;