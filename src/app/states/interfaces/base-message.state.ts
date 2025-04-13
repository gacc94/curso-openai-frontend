export interface BasemMessageState<T> {
    isGpt: boolean;
    infoUser?: InfoUser;
    infoGpt?: T;
}

export interface InfoUser {
    text: string;
}
