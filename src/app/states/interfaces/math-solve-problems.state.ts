import { MathSolveProblemsResponse } from '@/app/services/interfaces';
import { BasemMessageState } from './base-message.state';

export interface MathSolveProblemMessageState extends BasemMessageState<MathSolveProblemInfo> {}

export interface MathSolveProblemInfo extends MathSolveProblemsResponse {}
