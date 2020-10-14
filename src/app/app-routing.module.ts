import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'cleaning', loadChildren: './cleaning/cleaning.module#CleaningPageModule' },
  //{ path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'reset-password', loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'transactions', loadChildren: './transactions/transactions.module#TransactionsPageModule' },
  { path: 'bodacleaning', loadChildren: './bodacleaning/bodacleaning.module#BodacleaningPageModule' },
  { path: 'carcleaning', loadChildren: './carcleaning/carcleaning.module#CarcleaningPageModule' },
  { path: 'laundry', loadChildren: './laundry/laundry.module#LaundryPageModule' },
  { path: 'vaccuming', loadChildren: './vaccuming/vaccuming.module#VaccumingPageModule' },
  { path: 'invoices', loadChildren: './invoices/invoices.module#InvoicesPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
