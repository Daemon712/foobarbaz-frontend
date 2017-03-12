import { BrowserModule } from '@angular/platform-browser';
import {NgModule, LOCALE_ID} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { ChallengeListComponent } from './components/challenge/list/challenge-list.component';
import {InMemoryDataService} from "./service/in-memory-data.service";
import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {RouterModule, Routes} from "@angular/router";
import {ChallengeService} from "./service/challenge.service";
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/user/login/login.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { EqualValidator } from './directives/equal-validator.directive';
import {TagService} from "./service/tag.service";
import { TagsComponent } from './components/tags/view/tags.component';
import { UserListComponent } from './components/user/list/user-list.component';
import {UserService} from "./service/user.service";
import { AlertsComponent } from './components/alerts/alerts.component';
import {AlertService} from "./service/alert.service";
import { CreateChallengeComponent } from './components/challenge/create/create-challenge.component';
import {AceEditorComponent} from "ng2-ace-editor";
import {AccordionModule, AlertModule, PaginationModule, TabsModule, ButtonsModule, TypeaheadModule} from 'ng2-bootstrap';
import { ViewChallengeComponent } from './components/challenge/view/view-challenge.component';
import { TagPickerComponent } from './components/tags/picker/tag-picker.component';
import {TestSolutionService} from "./service/test-solution.service";
import { TestResultsTableComponent } from './components/solution/test-results/test-results-table.component';
import { CommentsComponent } from './components/comments/comments.component';
import {ArticleService} from "./service/article.service";
import { ArticleListComponent } from './components/article/list/article-list.component';
import { RevisionListComponent } from './components/solution/revision-list/revision-list.component';
import { SolutionStatusViewComponent } from './components/solution/status-view/solution-status-view.component';
import { SharedSolutionListComponent } from './components/solution/shared-solution-list/shared-solution-list.component';

const routes: Routes = [
  { path: 'login',  component: LoginComponent },
  { path: 'sign-up',  component: SignUpComponent },
  { path: 'users',  component: UserListComponent },
  { path: 'articles',  component: ArticleListComponent },
  { path: 'challenges/create',  component: CreateChallengeComponent },
  { path: 'challenges/:id',  component: ViewChallengeComponent },
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
    ViewChallengeComponent,
    TagPickerComponent,
    TestResultsTableComponent,
    CommentsComponent,
    ArticleListComponent,
    RevisionListComponent,
    SolutionStatusViewComponent,
    SharedSolutionListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    RouterModule.forRoot(routes),
    AccordionModule.forRoot(),
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    TypeaheadModule.forRoot(),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "ru-RU" },
    ArticleService,
    ChallengeService,
    TestSolutionService,
    TagService,
    UserService,
    AlertService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
