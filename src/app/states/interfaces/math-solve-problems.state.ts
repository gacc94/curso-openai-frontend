import { BasemMessageState } from './base-message.state';

export interface MathSolveProblemMessageState extends BasemMessageState<MathSolveProblemInfo> {}

export interface MathSolveProblemInfo {
    success: boolean;
    data: string;
    originalImage: string;
    timestamp?: string;
}
