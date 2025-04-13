import { OrthographyResponse } from '@/app/services/interfaces';
import { BasemMessageState } from './base-message.state';

export interface OrthographyMessageState
    extends BasemMessageState<OrtographyInfoState> {}

export interface OrtographyInfoState extends OrthographyResponse {}
