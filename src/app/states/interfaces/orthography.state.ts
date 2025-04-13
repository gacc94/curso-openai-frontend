export interface OrthographyMessageState {
    isGpt: boolean;
    infoUser?: InfoUser;
    infoGpt?: InfoGpt;
}

export interface InfoUser {
    text: string;
}

export interface InfoGpt {
    userScore: number;
    errors: string[];
    message: string;
    correctedText: string;
}
