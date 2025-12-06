import { Routes } from '@angular/router';
import { SearchScreen } from './search-screen/search-screen';
import { TestScreen } from './test-screen/test-screen';
import { EditScreen } from './edit-screen/edit-screen';

export const routes: Routes = [
    { path: 'home', component: SearchScreen },
    { path: 'test', component: TestScreen },
    { path: 'edit/:id', component: EditScreen },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' },
];
