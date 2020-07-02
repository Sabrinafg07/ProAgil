import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule  } from "ngx-bootstrap/tabs";
import {BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppRoutingModule } from './app-routing.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxCurrencyModule } from "ngx-currency";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { EventoService } from './_services/evento.service';

import { AppComponent } from './app.component';
import { EventosComponent } from './eventos/eventos.component';
import { NavComponent } from './nav/nav.component';
import { PalestrantesComponent } from './palestrantes/palestrantes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContatosComponent } from './contatos/contatos.component';
import {TituloComponent} from './_shared/titulo/titulo.component';

import { DateTimeFormatPipePipe } from './_helps/DateTimeFormatPipe.pipe';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { EventoEditComponent } from './eventos/evento-edit/evento-edit.component';




@NgModule({
   declarations: [
      AppComponent,
      EventosComponent,
      NavComponent,
      PalestrantesComponent,
      DashboardComponent,
      ContatosComponent,
      TituloComponent,
      DateTimeFormatPipePipe,
      UserComponent,
      LoginComponent,
      RegistrationComponent,
      EventoEditComponent
   ],
   imports: [
      BrowserModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      TooltipModule.forRoot(),
      ModalModule.forRoot(),
      ToastrModule.forRoot(),
      TabsModule.forRoot(),
      NgxMaskModule.forRoot(),
      NgxCurrencyModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule
   ],
   providers: [
      EventoService,
      {
         provide: HTTP_INTERCEPTORS,
         useClass: AuthInterceptor,
         multi: true
      }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
