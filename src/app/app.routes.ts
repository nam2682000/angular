import { UserAddComponent } from './component/user-manager/user-add/user-add.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { UserManagerComponent } from './component/user-manager/user-list/user-manager.component';
import { UserComponent } from './component/user-manager/user/user.component';
import { UserUpdateComponent } from './component/user-manager/user-update/user-update.component';
import { LoginComponent } from './component/login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'user', component: UserManagerComponent },
    { path: 'user/add', component: UserAddComponent },
    { path: 'user/:id', component: UserComponent },
    { path: 'user/:id/edit', component: UserUpdateComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];
