import { Router } from "express";
import { CandidateController } from "../Controllers/candidateController";
import candidateRepository from "../Repository/candidateRepository";
import { CandidateService } from "../Services/candidateService";

const candidateService = new CandidateService(candidateRepository);
const candidateController = new CandidateController(candidateService);

const Candidate_Route = Router();

Candidate_Route.get('/feedback', candidateController.fetchCandidateFeedback.bind(candidateController));

export default Candidate_Route;