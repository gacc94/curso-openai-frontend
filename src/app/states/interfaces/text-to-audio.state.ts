import { TextToAudioResponse } from '@/app/services/interfaces/text-to-audio.response';
import { BasemMessageState } from './base-message.state';

export interface TextToAudioMessageState extends BasemMessageState<TextToAudioInfoState> {}

export interface TextToAudioInfoState extends TextToAudioResponse {}
