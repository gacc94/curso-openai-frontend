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
            imageGenerate: `${baseUrl}/gpt/image-generate`,
        },
        math: {
            solveProblem: `${baseUrl}/math/solve-problem`,
        },
        orthographyCheck: '/orthography-check',
        grammarCheck: '/grammar-check',
        spellingCheck: '/spelling-check',
        translation: '/translation',
    },
    firebase: {
        apiKey: 'AIzaSyAvgGy5fw1kpKAr6onnnBFaqY7DX1h4onM',
        authDomain: 'fir-gpt-f68c2.firebaseapp.com',
        projectId: 'fir-gpt-f68c2',
        storageBucket: 'fir-gpt-f68c2.firebasestorage.app',
        messagingSenderId: '370493938872',
        appId: '1:370493938872:web:2bc71af405ecd2740ea84d',
    },
};
