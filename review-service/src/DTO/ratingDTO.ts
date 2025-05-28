import { IRating } from "../Models/rating.Schema";

export class RatingDTO {
    public candidateId: string;
    public interviewerId: string;
    public scheduledId: string;
    public slotId: string;
    public ratings: number;
    public comment: string;

    constructor(rating: IRating) {
        this.candidateId = rating.candidateId.toString();
        this.interviewerId = rating.interviewerId.toString();
        this.scheduledId = rating.scheduledId.toString();
        this.slotId = rating.slotId.toString();
        this.ratings = rating.ratings;
        this.comment = rating.comment;
    }

    // Static helper methods
    static from(rating: IRating): RatingDTO {
        return new RatingDTO(rating);
    }

    static fromList(ratings: IRating[]): RatingDTO[] {
        return ratings.map(RatingDTO.from);
    }
}
