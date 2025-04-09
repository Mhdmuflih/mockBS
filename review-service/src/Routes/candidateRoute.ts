import { Router } from "express";
import { CandidateController } from "../Controllers/candidateController";
import candidateRepository from "../Repository/candidateRepository";
import { CandidateService } from "../Services/candidateService";
import candidateRatingRepository from "../Repository/candidateRatingRepository";

const candidateService = new CandidateService(candidateRepository, candidateRatingRepository);
const candidateController = new CandidateController(candidateService);

const Candidate_Route = Router();

Candidate_Route.get('/feedback', candidateController.fetchCandidateFeedback.bind(candidateController));
Candidate_Route.post('/add-review-rating', candidateController.addInterviewRating.bind(candidateController));

export default Candidate_Route;