import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { QuestionsComponent } from './questions/questions.component';
import { AuthGuard } from './auth/auth.guard';
import { QuestionDetailsComponent } from './question-details/question-details.component';
import { MarksComponent } from './marks/marks.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';


const routes: Routes = [
  {path:'', redirectTo:'user/login', pathMatch:'full'},
  {path:'user', redirectTo:'user/login', pathMatch:'full'},
  {path:'admin', redirectTo:'admin/home', pathMatch:'full'},
  {path: 'admin', component: AdminPanelComponent, canActivate:[AuthGuard], data:{permittedRoles:['Lecturer']},
  children:[
    {path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
    {path: 'marks/:id', component: MarksComponent, canActivate:[AuthGuard]},
    {path: 'questions', component: QuestionsComponent, canActivate:[AuthGuard]},


  ]
},
  // {path: 'marks/:id', component: MarksComponent, canActivate:[AuthGuard]},
  {path: 'quest/:id', component: QuestionDetailsComponent, canActivate:[AuthGuard]},
  // {path: 'questions', component: QuestionsComponent, canActivate:[AuthGuard]},
  {path:'user', component: UserComponent,
children:[
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent}
]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
