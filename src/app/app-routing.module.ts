import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'calculator'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'calculator',
  },
  {
    path: 'calculator',
    loadChildren: () => import('./pages/calculator/calculator.module').then(m => m.CalculatorModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
