import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventosComponent } from './eventos/eventos.component';
import { PalestrantesComponent } from './palestrantes/palestrantes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContatosComponent } from './contatos/contatos.component';
import {UserComponent} from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { EventoEditComponent } from './eventos/evento-edit/evento-edit.component';


const routes: Routes = [
  {path: 'user' , component: UserComponent,
   children: [
    {path: 'login' , component: LoginComponent},
    {path: 'registration' , component: RegistrationComponent}
   ]
},
  {path: 'eventos' , component: EventosComponent, canActivate: [AuthGuard]},
  {path: 'evento/:id/edit' , component: EventoEditComponent, canActivate: [AuthGuard]},
  {path:  'palestrantes' , component: PalestrantesComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'contato', component: ContatosComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
