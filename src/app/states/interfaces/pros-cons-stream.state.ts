import { ProsConsStreamResponse } from '@/app/services/interfaces';
import { BasemMessageState } from './base-message.state';

export interface ProsConsStreamMessageState extends BasemMessageState<ProsConsStreamInfoState> {}

export type ProsConsStreamInfoState = ProsConsStreamResponse;
