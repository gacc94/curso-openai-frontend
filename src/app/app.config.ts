import {
    ApplicationConfig,
    EnvironmentProviders,
    importProvidersFrom,
    provideAppInitializer,
    provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideMarkdown } from 'ngx-markdown';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { initializeFirestore, persistentLocalCache, provideFirestore } from '@angular/fire/firestore';
import { environment } from '@/environments/environment';
import { browserSessionPersistence, browserPopupRedirectResolver, initializeAuth } from 'firebase/auth';

// Importaciones para la arquitectura hexagonal
import { AuthFacade } from './core/auth/application/auth.facade';
import { AUTH_PROVIDERS } from './core/auth';

const fbApp = () => initializeApp(environment.firebase);
const authApp = () =>
    initializeAuth(fbApp(), {
        persistence: browserSessionPersistence,
        popupRedirectResolver: browserPopupRedirectResolver,
    });

const firestoreApp = () =>
    initializeFirestore(fbApp(), {
        localCache: persistentLocalCache(),
    });

const firebaseProviders: EnvironmentProviders[] = [provideFirebaseApp(fbApp), provideAuth(authApp), provideFirestore(firestoreApp)];

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(withFetch()),
        provideMarkdown(),
        //TODO: Inicializar servicios
        provideAppInitializer(() => {
            return Promise.resolve(null);
        }),
        //TODO: Firebase config start
        ...firebaseProviders,
        //TODO: Firebase config end

        // TODO: Proveedores para la arquitectura hexagonal
        ...AUTH_PROVIDERS,
        AuthFacade,
    ],
};
