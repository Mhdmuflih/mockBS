import { Router } from "express";
import { InterviewerControllers } from "../Controllers/InterviewerControllers";
import interviewerRepository from "../Repositories/interviewerRepository";
import { InterviewerService } from "../Services/interviewerService";

const interviewerService = new InterviewerService(interviewerRepository);
const interviewerController = new InterviewerControllers(interviewerService);

const Interviewer_Route = Router();

Interviewer_Route.post('/sign-up', interviewerController.signUpInterviewer.bind(interviewerController));
Interviewer_Route.post('/otp', interviewerController.otpVerification.bind(interviewerController));
Interviewer_Route.post('/resend-otp', interviewerController.resendOtp.bind(interviewerController));
Interviewer_Route.post('/forgot-password', interviewerController.forgotPassword.bind(interviewerController));
Interviewer_Route.post('/email-verify',interviewerController.verifyEmail.bind(interviewerController));
Interviewer_Route.patch('/change-password', interviewerController.changePassword.bind(interviewerController));
Interviewer_Route.post('/login', interviewerController.loginInterviewer.bind(interviewerController));
// Interviewer_Route.post('/details', interviewerController.addDetails.bind(interviewerController));

export default Interviewer_Route;