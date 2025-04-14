import { TranslateResponse } from '@/app/services/interfaces';
import { BasemMessageState } from './base-message.state';

export interface TranslateMessageState extends BasemMessageState<TranslateInfoState> {}

export interface TranslateInfoState extends TranslateResponse {}
