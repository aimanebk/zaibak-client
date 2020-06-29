import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/helpers/auth.guard';
import { Role } from './core/models/role';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';


const routes: Routes = [
  { 
    path : 'login', 
    loadChildren : () => import('./login/login.module').then(m => m.LoginModule )
  },
  { 
    path: 'register', 
    loadChildren : () => import('./register/register.module').then(m => m.RegisterModule )
  },
  { 
    path : '',
    canActivate : [AuthGuard],
    children : [
      {
        path : '',
        component : MainComponent
      },
      { 
        path : 'admin',
        data: { roles: [Role.Admin] },
        loadChildren : () => import('./admin/admin.module').then(m => m.AdminModule)
      },
      {
        path : 'storekeeper',
        data: { roles: [Role.User, Role.Admin] },
        loadChildren : () => import('./storekeeper/storekeeper.module').then(m => m.StorekeeperModule )
      },
    ]
  },


  // otherwise redirect to home
  { 
    path: '**',
    component : NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
