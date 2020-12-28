import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorisedComponent } from './common/authorised/authorised.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: '',
    component: AuthorisedComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'product-details', component: ProductDetailsComponent },
      { path: 'userDetails', component: UsersComponent },
      // { path: 'register-hostel', component: RegisterHostelComponent },
      // { path: 'add-room', component: AddRoomsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
