import { Routes } from '@angular/router';
import { SearchScreen } from './search-screen/search-screen';

export const routes: Routes = [
    { path: '**', component: SearchScreen },
];
