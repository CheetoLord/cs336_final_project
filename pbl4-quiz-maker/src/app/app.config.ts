import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "pbl4-quiz-maker", appId: "1:150011584476:web:79b917c3fa81d064f03919", storageBucket: "pbl4-quiz-maker.firebasestorage.app", apiKey: "AIzaSyCZn9e8oFp50QIZKYzaFZZYYgZ7BnvFGMw", authDomain: "pbl4-quiz-maker.firebaseapp.com", messagingSenderId: "150011584476"})), provideFirestore(() => getFirestore())
  ]
};
