import { ImageGenerateResponse } from '@/app/services/interfaces';
import { BasemMessageState } from './base-message.state';

export interface ImageGenerateMessageState extends BasemMessageState<ImageGenerateInfoState> {}

export interface ImageGenerateInfoState extends ImageGenerateResponse {}
