export interface OrthographyMessageState {
    isGpt: boolean;

    userScore: number;
    errors: string[];
    message: string;
    correctedText: string;
}
