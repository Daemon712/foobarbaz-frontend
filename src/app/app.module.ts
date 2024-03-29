import { BrowserModule } from '@angular/platform-browser';
import {NgModule, LOCALE_ID} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Http, HttpModule, JsonpModule, RequestOptions, XHRBackend} from '@angular/http';
import { QuillEditorModule } from 'ng2-quill-editor';

import { AppComponent } from './app.component';
import { ChallengeListComponent } from './components/challenge/list/challenge-list.component';
import {RouterModule, Routes} from "@angular/router";
import {ChallengeService} from "./service/challenge.service";
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/user/login/login.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { EqualValidator } from './directives/equal-validator.directive';
import {TagService} from "./service/tag.service";
import { TopTagsComponent } from './components/tags/top/top-tags.component';
import { UserListComponent } from './components/user/list/user-list.component';
import {UserService} from "./service/user.service";
import { AlertsComponent } from './components/alerts/alerts.component';
import {AlertService} from "./service/alert.service";
import { CreateChallengeComponent } from './components/challenge/create/create-challenge.component';
import {AceEditorComponent} from "ng2-ace-editor";
import {
  AccordionModule, AlertModule, PaginationModule, TabsModule, ButtonsModule, TypeaheadModule,
  ProgressbarModule, ModalModule, RatingModule, SortableModule
} from 'ng2-bootstrap';
import { ViewChallengeComponent } from './components/challenge/view/view-challenge.component';
import { TagPickerComponent } from './components/tags/picker/tag-picker.component';
import {SolutionService} from "./service/solution.service";
import { TestResultsTableComponent } from './components/solution/test-results/test-results-table.component';
import { CommentsComponent } from './components/comments/comments.component';
import { SolutionListComponent } from './components/solution/list/solution-list.component';
import { SolutionStatusViewComponent } from './components/solution/status-view/solution-status-view.component';
import { SharedSolutionListComponent } from './components/shared-solution/list/shared-solution-list.component';
import { UserViewComponent } from './components/user/view/user-view.component';
import { ChallengeListPageComponent } from './components/challenge/list-page/challenge-list-page.component';
import { RateChallengeComponent } from './components/challenge/rate/rate-challenge.component';
import { ShareSolutionComponent } from './components/shared-solution/share/share-solution.component';
import { SharedSolutionViewComponent } from './components/shared-solution/view/shared-solution-view.component';
import {SharedSolutionService} from "./service/shared-solution.service";
import {ChallengeCommentService,SolutionCommentService} from "./service/comment.service";
import { challengeListListPageComponent } from './components/challenge-list/list-page/challenge-list-list-page.component';
import {ChallengeListService} from "./service/challenge-list.service";
import { CreateChallengeListComponent } from './components/challenge-list/create/create-challenge-list.component';
import { ChallengePickerComponent } from './components/challenge/picker/challenge-picker.component';
import { ChallengeListListComponent } from './components/challenge-list/list/challenge-list-list.component';
import { ChallengeListViewComponent } from './components/challenge-list/view/challenge-list-view.component';
import { ChallengeViewPageComponent } from './components/challenge/view-page/challenge-view-page.component';
import {HttpServiceFactory} from "./service/http.service";
import {CanActivateAuthorized} from "./security/can-activate-authorized";
import { TopUsersComponent } from './components/user/top/top-users.component';
import { UserLinkComponent } from './components/user/link/user-link.component';
import { TagsLineComponent } from './components/tags/line/tags-line.component';
import { ChallengeStatusViewComponent } from './components/challenge/status-view/challenge-status-view.component';
import { LowerCaseTransformer } from './directives/lower-case-transformer.directive';
import { ChallengeEditComponent } from './components/challenge/edit/challenge-edit.component';
import { ConfirmationPopupComponent } from './components/common/confirmation-popup/confirmation-popup.component';
import { EditChallengeListComponent } from './components/challenge-list/edit/edit-challenge-list.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RandomChallengeListComponent } from './components/challenge-list/random/random-challenge-list.component';
import { RandomChallengeComponent } from './components/challenge/random/random-challenge.component';

const routes: Routes = [
  { path: 'login',  component: LoginComponent },
  { path: 'sign-up',  component: SignUpComponent },
  { path: 'users/:username',  component: UserViewComponent },
  { path: 'users',  component: UserListComponent },
  {
    path: 'challenges/create',
    component: CreateChallengeComponent,
    canActivate: [CanActivateAuthorized],
  },
  { path: 'challenges/:id',  component: ChallengeViewPageComponent },
  { path: 'challenges',  component: ChallengeListPageComponent },
  { path: 'solutions/:id', component: SharedSolutionViewComponent},
  {
    path: 'challenge-lists/create',
    component: CreateChallengeListComponent ,
    canActivate: [CanActivateAuthorized],
  },
  { path: 'challenge-lists/:id',  component: ChallengeListViewComponent },
  { path: 'challenge-lists',  component: challengeListListPageComponent },
  { path: '', component: HomePageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ChallengeListComponent,
    NavbarComponent,
    LoginComponent,
    SignUpComponent,
    EqualValidator,
    TopTagsComponent,
    UserListComponent,
    UserViewComponent,
    AlertsComponent,
    CreateChallengeComponent,
    AceEditorComponent,
    ViewChallengeComponent,
    TagPickerComponent,
    TestResultsTableComponent,
    CommentsComponent,
    SolutionListComponent,
    SolutionStatusViewComponent,
    SharedSolutionListComponent,
    ChallengeListPageComponent,
    RateChallengeComponent,
    ShareSolutionComponent,
    SharedSolutionViewComponent,
    challengeListListPageComponent,
    CreateChallengeListComponent,
    ChallengePickerComponent,
    ChallengeListListComponent,
    ChallengeListViewComponent,
    ChallengeViewPageComponent,
    TopUsersComponent,
    UserLinkComponent,
    TagsLineComponent,
    ChallengeStatusViewComponent,
    LowerCaseTransformer,
    ChallengeEditComponent,
    ConfirmationPopupComponent,
    EditChallengeListComponent,
    HomePageComponent,
    RandomChallengeListComponent,
    RandomChallengeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AccordionModule.forRoot(),
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    ProgressbarModule.forRoot(),
    RatingModule.forRoot(),
    SortableModule.forRoot(),
    TabsModule.forRoot(),
    TypeaheadModule.forRoot(),
    QuillEditorModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "ru-RU" },
    ChallengeService,
    ChallengeCommentService,
    SolutionCommentService,
    ChallengeListService,
    SolutionService,
    TagService,
    SharedSolutionService,
    UserService,
    AlertService,
    CanActivateAuthorized,
    {
      provide: Http,
      useFactory: HttpServiceFactory,
      deps:[XHRBackend, RequestOptions],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
