export interface Message {
    text: string;
    isGpt: boolean;
    info?: MessageInfo;
}

export interface MessageInfo {
    userScore: number;
    errors: string[];
    message: string;
    correctedText: string;
}

export interface TextMessageEvent {
    file?: File;
    prompt?: string;
    selectedOption?: string;
}

export interface OptionSelect {
    id: string;
    text: string;
}
