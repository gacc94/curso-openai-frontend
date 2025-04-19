import { OpenAiService } from '@/app/services/openai.service';
import { UtilsService } from '@/app/services/utils.service';
import { IStateService } from '@/app/states/interfaces';
import { StateService } from '@/app/states/services/state.service';
import { DestroyRef, inject } from '@angular/core';

export abstract class BasePagesComponent {
    protected readonly openaiService = inject(OpenAiService);
    protected readonly state = inject(StateService);
    protected readonly utils = inject(UtilsService);
    protected readonly destrofRef = inject(DestroyRef);

    protected addUserMessage(text: string, key: keyof IStateService, imageUrl?: string) {
        this.state[key] = {
            isGpt: false,
            infoUser: {
                text,
                imageUrl,
            },
        };
    }
}
