import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ChallengeListComponent } from './challenge-list/challenge-list.component';
import {InMemoryDataService} from "./service/in-memory-data.service";
import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule, Routes} from "@angular/router";
import {ChallengeService} from "./service/challenge.service";
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { EqualValidator } from './directives/equal-validator.directive';

const routes: Routes = [
  { path: 'login',  component: LoginComponent },
  { path: 'sign-up',  component: SignUpComponent },
  { path: 'challenges',  component: ChallengeListComponent },
  { path: '', redirectTo: '/challenges', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ChallengeListComponent,
    NavbarComponent,
    LoginComponent,
    SignUpComponent,
    EqualValidator,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    RouterModule.forRoot(routes)
  ],
  providers: [ChallengeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
