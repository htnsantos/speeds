import { ConsultaChamadosDetalhesComponent } from './consulta-chamados-detalhes/consulta-chamados-detalhes.component';
import { ConsultaChamadosComponent } from './consulta-chamados/consulta-chamados.component';
import { ServicosComponent } from './servicos/servicos.component';
import { CarrosComponent } from './carros/carros.component';
import { MotoristasComponent } from './motoristas/motoristas.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './auth.service';
import { SignupComponent } from './signup/signup.component';

export const router: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'motoristas', component: MotoristasComponent, canActivate: [AuthGuard] },
    { path: 'carros', component: CarrosComponent, canActivate: [AuthGuard] },
    { path: 'consulta', component: ConsultaChamadosComponent, canActivate: [AuthGuard] },
    { path: 'servicos', component: ServicosComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path : 'consulta-detalhes/:id', component: ConsultaChamadosDetalhesComponent, canActivate: [AuthGuard]}

]

export const routes: ModuleWithProviders = RouterModule.forRoot(router, {useHash: true});