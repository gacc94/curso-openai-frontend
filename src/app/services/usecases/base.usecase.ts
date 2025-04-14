import { IStateService } from '@/app/states/interfaces';
import { StateService } from '@/app/states/services/state.service';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export abstract class BaseUseCase<T> {
    protected state = inject(StateService);
    protected http = inject(HttpClient);

    protected addGptMessage(response: T, messageKey: keyof IStateService): void {
        this.state[messageKey] = {
            isGpt: true,
            infoGpt: response as any,
        };
    }
}
