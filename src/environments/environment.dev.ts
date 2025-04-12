const baseUrl = 'http://localhost:3000';

export const environment = {
    name: 'development',
    production: false,
    api: {
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
        },
        orthographyCheck: '/orthography-check',
        grammarCheck: '/grammar-check',
        spellingCheck: '/spelling-check',
        translation: '/translation',
    },
};
