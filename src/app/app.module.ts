import { BrowserModule } from '@angular/platform-browser';
import {NgModule, LOCALE_ID} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { ChallengeListComponent } from './components/challenge/list/challenge-list.component';
import {InMemoryDataService} from "./service/in-memory-data.service";
import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule, Routes} from "@angular/router";
import {ChallengeService} from "./service/challenge.service";
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/user/login/login.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { EqualValidator } from './directives/equal-validator.directive';
import {TagService} from "./service/tag.service";
import { TagsComponent } from './components/tags/tags.component';
import { UserListComponent } from './components/user/list/user-list.component';
import {UserService} from "./service/user.service";
import { AlertsComponent } from './components/alerts/alerts.component';
import {AlertService} from "./service/alert.service";
import { CreateChallengeComponent } from './components/challenge/create/create-challenge.component';
import {AceEditorComponent} from "ng2-ace-editor";

const routes: Routes = [
  { path: 'login',  component: LoginComponent },
  { path: 'sign-up',  component: SignUpComponent },
  { path: 'users',  component: UserListComponent },
  { path: 'challenges/create',  component: CreateChallengeComponent },
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
    TagsComponent,
    UserListComponent,
    AlertsComponent,
    CreateChallengeComponent,
    AceEditorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,
    HttpModule,
    NgbModule.forRoot(),
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    RouterModule.forRoot(routes),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "ru-RU" },
    ChallengeService,
    TagService,
    UserService,
    AlertService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
