import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    canActivate: [AuthService]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthService]
  },
  {
    path: 'projects',
    loadChildren: () => import('./pages/projects/projects.module').then( m => m.ProjectsPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'items',
    loadChildren: () => import('./pages/items/items.module').then( m => m.ItemsPageModule)
  },
  {
    path: 'proj-details/:id',
    loadChildren: () => import('./pages/projects/proj-details/proj-details.module').then( m => m.ProjDetailsPageModule)
  },
  {
    path: 'constractor',
    loadChildren: () => import('./pages/constractor/constractor.module').then( m => m.ConstractorPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'add-contractor',
    loadChildren: () => import('./pages/add-contractor/add-contractor.module').then( m => m.AddContractorPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'addproject',
    loadChildren: () => import('./pages/addproject/addproject.module').then( m => m.AddprojectPageModule)
  },
  {
    path: 'area',
    loadChildren: () => import('./pages/area/area.module').then( m => m.AreaPageModule)
  },
  {
    path: 'supplier',
    loadChildren: () => import('./pages/supplier/supplier.module').then( m => m.SupplierPageModule)
  },
  {
    path: 'addsupplier',
    loadChildren: () => import('./pages/addsupplier/addsupplier.module').then( m => m.AddsupplierPageModule)
  },
  {
    path: 'material',
    loadChildren: () => import('./pages/material/material.module').then( m => m.MaterialPageModule)
  },
  {
    path: 'addmaterial',
    loadChildren: () => import('./pages/addmaterial/addmaterial.module').then( m => m.AddmaterialPageModule)
  },
  {
    path: 'boqitem',
    loadChildren: () => import('./pages/boqitem/boqitem.module').then( m => m.BoqitemPageModule)
  },
  {
    path: 'addboqitem',
    loadChildren: () => import('./pages/addboqitem/addboqitem.module').then( m => m.AddboqitemPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
