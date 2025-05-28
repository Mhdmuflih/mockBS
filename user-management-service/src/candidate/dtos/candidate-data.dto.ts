import { ICandidate } from "../interface/interface";

export class CandidateDTO {

    public _id: string;
    public name: string;
    public email: string;
    public mobile: string;
    public profileURL?: string;
    public isVerified?: boolean;
    public premium?: boolean;

    constructor(candidate: ICandidate) {
        this._id = candidate._id.toString();
        this.name = candidate.name;
        this.email = candidate.email;
        this.mobile = candidate.mobile;
        this.profileURL = candidate.profileURL;
        this.isVerified = candidate.isVerified;
        this.premium = candidate.premium;
    }

    static from(candidate: ICandidate): CandidateDTO {
        return new CandidateDTO(candidate);
    }

    static formList(candidates: ICandidate[]): CandidateDTO[] {
        return candidates.map(CandidateDTO.from);
    }
}