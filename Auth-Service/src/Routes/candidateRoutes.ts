import { Router } from "express";
import { CandidateControllers } from "../Controllers/CandidateController";
import candidateRepository from "../Repositories/candidateRepository";
import { CandidateService } from "../Services/candidateService";

// initialze the controller and service
const candidateService = new CandidateService(candidateRepository);
const candidateController = new CandidateControllers(candidateService);

// create the route
const Candidate_Route = Router();

// define the route
Candidate_Route.post('/google', candidateController.googleAuth.bind(candidateController));
Candidate_Route.post('/sign-up', candidateController.signUpCanidate.bind(candidateController));
Candidate_Route.post('/otp', candidateController.otpVerification.bind(candidateController));
Candidate_Route.post('/resend-otp',candidateController.resendOtp.bind(candidateController));
Candidate_Route.post('/forgot-password', candidateController.forgotPassword.bind(candidateController));
Candidate_Route.post('/email-verify', candidateController.verifyEmail.bind(candidateController));
Candidate_Route.patch('/change-password', candidateController.changePassword.bind(candidateController));
Candidate_Route.post('/login', candidateController.loginCandidate.bind(candidateController));
Candidate_Route.post('/refresh-token', candidateController.validateRefreshToken.bind(candidateController));

export default Candidate_Route;
