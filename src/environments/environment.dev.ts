const baseUrl = 'http://localhost:3000';

export const environment = {
    name: 'development',
    production: false,
    apis: {
        auth: {
            login: '/auth/login',
            register: '/auth/register',
        },
        chat: {
            getMessages: '/chat/get-messages',
            sendMessage: '/chat/send-message',
        },
        gpt: {
            orthography: `${baseUrl}/gpt/orthography-check`,
            prosCons: `${baseUrl}/gpt/pros-cons-discusser`,
            prosConsStream: `${baseUrl}/gpt/pros-cons-discusser-stream`,
            translate: `${baseUrl}/gpt/translate`,
            textToAudio: `${baseUrl}/gpt/text-to-audio`,
        },
        orthographyCheck: '/orthography-check',
        grammarCheck: '/grammar-check',
        spellingCheck: '/spelling-check',
        translation: '/translation',
    },
};
