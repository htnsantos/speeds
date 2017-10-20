import { GetImagePipe } from './componentes/getImage/loadImage.pipe';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthGuard } from './auth.service';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as $ from 'jquery';
import { ChartsModule } from 'ng2-charts';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UsersComponent } from './users/users.component';
import { ChamadosListComponent } from './chamados/chamados-list/chamados-list.component';
import { MapComponent } from './map/map.component';
import { GraficoComponent } from './grafico/grafico.component';
import { MotoristasComponent } from './motoristas/motoristas.component';
import { ModalComponent } from './modal/modal.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { MotoristasListComponent } from './motoristas-list/motoristas-list.component';

export const firebaseConfig = {
    apiKey: "AIzaSyDDccmvaNyNMMXNTafEzdkPYh0Ym40jQZo",
    authDomain: "speed-solution.firebaseapp.com",
    databaseURL: "https://speed-solution.firebaseio.com",
    projectId: "speed-solution",
    storageBucket: "speed-solution.appspot.com",
    messagingSenderId: "261487848105"
  };
  
@NgModule({
  
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    UsersComponent,
    ChamadosListComponent,
    GetImagePipe,
    MapComponent,
    GraficoComponent,
    MotoristasComponent,
    ModalComponent,
    MotoristasListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    routes,
    BrowserAnimationsModule,
    ChartsModule,
    BootstrapModalModule,//.forRoot({container:document.body})
    HttpClientModule
  ],
  providers: [AuthGuard, LoginComponent, AngularFireDatabase, MapComponent, GraficoComponent, ModalComponent],
  entryComponents: [
        ModalComponent
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
