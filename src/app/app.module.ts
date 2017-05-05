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
import { TagsComponent } from './components/tags/view/tags.component';
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
import { SolutionListComponent } from './components/solution/revision-list/revision-list.component';
import { SolutionStatusViewComponent } from './components/solution/status-view/solution-status-view.component';
import { SharedSolutionListComponent } from './components/shared-solution/list/shared-solution-list.component';
import { UserViewComponent } from './components/user/view/user-view.component';
import { ChallengeListPageComponent } from './components/challenge/list-page/challenge-list-page.component';
import { RateChallengeComponent } from './components/challenge/rate/rate-challenge.component';
import { ShareSolutionComponent } from './components/shared-solution/share/share-solution.component';
import { SharedSolutionViewComponent } from './components/shared-solution/view/shared-solution-view.component';
import {SharedSolutionService} from "./service/shared-solution.service";
import {CommentService} from "./service/comment.service";
import { PlaylistListPageComponent } from './components/playlist/list-page/playlist-list-page.component';
import {PlaylistService} from "./service/playlist.service";
import { CreatePlaylistComponent } from './components/playlist/create/create-playlist.component';
import { ChallengePickerComponent } from './components/challenge/picker/challenge-picker.component';
import { PlaylistListComponent } from './components/playlist/list/playlist-list.component';
import { PlaylistViewComponent } from './components/playlist/view/playlist-view.component';
import { ChallengeViewPageComponent } from './components/challenge/view-page/challenge-view-page.component';
import {HttpServiceFactory} from "./service/http.service";
import {CanActivateAuthorized} from "./security/can-activate-authorized";
import { TopUsersComponent } from './components/user/top/top-users.component';
import { UserLinkComponent } from './components/user/link/user-link.component';

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
  { path: 'challenges/:id/shared/:share_id', component: SharedSolutionViewComponent},
  { path: 'challenges/:id',  component: ChallengeViewPageComponent },
  { path: 'challenges',  component: ChallengeListPageComponent },
  {
    path: 'playlists/create',
    component: CreatePlaylistComponent ,
    canActivate: [CanActivateAuthorized],
  },
  { path: 'playlists/:id',  component: PlaylistViewComponent },
  { path: 'playlists',  component: PlaylistListPageComponent },
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
    PlaylistListPageComponent,
    CreatePlaylistComponent,
    ChallengePickerComponent,
    PlaylistListComponent,
    PlaylistViewComponent,
    ChallengeViewPageComponent,
    TopUsersComponent,
    UserLinkComponent,
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
    CommentService,
    PlaylistService,
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
