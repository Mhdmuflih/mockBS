import { Router } from "express";
import { InterviewerControllers } from "../Controllers/interviewerController";
import interviewerRepository from "../Repository/interviewerRepository";
import { InterviewerServices } from "../Services/interviewerService";
import interviewerRatingRepository from "../Repository/interviewerRatingRepository";

const interviewerService = new InterviewerServices(interviewerRepository, interviewerRatingRepository);
const interviewerController = new InterviewerControllers(interviewerService);

const Interviewer_Route = Router();

Interviewer_Route.post('/feedback', interviewerController.addFeedback.bind(interviewerController))
Interviewer_Route.get('/review-rating', interviewerController.viewReviewRating.bind(interviewerController));


export default Interviewer_Route;