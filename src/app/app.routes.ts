import { Routes } from '@angular/router';
import LayoutComponent from './views/pages/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'orthography',
                loadComponent: () =>
                    import('./views/pages/orthography/orthography.component'),
                data: {
                    icon: 'fa-solid fa-spell-check',
                    title: 'Ortografía',
                    description: 'Corregir ortografía',
                },
            },
            {
                path: 'pros-cons',
                loadComponent: () =>
                    import('./views/pages/pros-const/pros-const.component'),
                data: {
                    icon: 'fa-solid fa-code-compare',
                    title: 'Pros & Cons',
                    description: 'Comparar pros y contras',
                },
            },
            {
                path: 'pros-cons-stream',
                loadComponent: () =>
                    import(
                        './views/pages/pros-cons-stream/pros-cons-stream.component'
                    ),
                data: {
                    icon: 'fa-solid fa-water',
                    title: 'Como stream',
                    description: 'Con stream de mensajes',
                },
            },
            {
                path: 'translate',
                loadComponent: () =>
                    import('./views/pages/translate/translate.component'),
                data: {
                    icon: 'fa-solid fa-language',
                    title: 'Traducir',
                    description: 'Textos a otros idiomas',
                },
            },
            {
                path: 'text-to-audio',
                loadComponent: () =>
                    import(
                        './views/pages/text-to-audio/text-to-audio.component'
                    ),
                data: {
                    icon: 'fa-solid fa-podcast',
                    title: 'Texto a audio',
                    description: 'Convertir texto a audio',
                },
            },
            {
                path: 'audio-to-text',
                loadComponent: () =>
                    import(
                        './views/pages/audio-to-text/audio-to-text.component'
                    ),
                data: {
                    icon: 'fa-solid fa-comment-dots',
                    title: 'Audio a texto',
                    description: 'Convertir audio a texto',
                },
            },
            {
                path: 'image-generation',
                loadComponent: () =>
                    import(
                        './views/pages/image-generation/image-generation.component'
                    ),
                data: {
                    icon: 'fa-solid fa-image',
                    title: 'Imágenes',
                    description: 'Generar imágenes',
                },
            },
            {
                path: 'image-tunning',
                loadComponent: () =>
                    import(
                        './views/pages/image-tunning/image-tunning.component'
                    ),
                data: {
                    icon: 'fa-solid fa-wand-magic',
                    title: 'Editar imagen',
                    description: 'Generación continua',
                },
            },

            {
                path: 'assistant',
                loadComponent: () =>
                    import('./views/pages/assistant/assistant.component'),
                data: {
                    icon: 'fa-solid fa-user',
                    title: 'Asistente',
                    description: 'Información del asistente',
                },
            },
            {
                path: '**',
                redirectTo: 'orthography',
                pathMatch: 'full',
            },
        ],
    },
];
