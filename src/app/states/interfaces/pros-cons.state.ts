import { ProsConsResponse } from '@/app/services/interfaces';
import { BasemMessageState } from './base-message.state';

export interface ProsConsMessageState
    extends BasemMessageState<ProsConsInfoState> {}

export interface ProsConsInfoState extends ProsConsResponse {}
