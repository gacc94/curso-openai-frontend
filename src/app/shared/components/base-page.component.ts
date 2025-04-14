import { OpenAiService } from '@/app/services/openai.service';
import { IStateService } from '@/app/states/interfaces';
import { StateService } from '@/app/states/services/state.service';
import { inject } from '@angular/core';

export abstract class BasePagesComponent {
    protected readonly openaiService = inject(OpenAiService);
    protected readonly state = inject(StateService);

    protected addUserMessage(text: string, key: keyof IStateService) {
        this.state[key] = {
            isGpt: false,
            infoUser: {
                text,
            },
        };
    }
}
