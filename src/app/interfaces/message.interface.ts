export interface Message {
    text: string;
    isGpt: boolean;
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
