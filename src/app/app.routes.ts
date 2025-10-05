import { Routes } from '@angular/router';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { Main } from './pages/main/main';
import { Editprofile } from './pages/editprofile/editprofile';
export const routes: Routes = [
    { path: '', component: Login },
    { path: 'register', component: Register },
    { path: 'main', component: Main },
    { path: 'edit-profile', component: Editprofile }

];
