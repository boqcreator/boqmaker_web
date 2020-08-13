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
  },
  {
    path: 'report-final-priced-bill',
    loadChildren: () => import('./pages/report-final-priced-bill/report-final-priced-bill.module').then( m => m.ReportFinalPricedBillPageModule)
  },
  {
    path: 'report1/:id',
    loadChildren: () => import('./pages/report1/report1.module').then( m => m.Report1PageModule)
  },
  {
    path: 'addsupplier-l',
    loadChildren: () => import('./pages/addsupplier-l/addsupplier-l.module').then( m => m.AddsupplierLPageModule)
  },
  {
    path: 'labour',
    loadChildren: () => import('./pages/labour/labour.module').then( m => m.LabourPageModule)
  },
  {
    path: 'addlabour',
    loadChildren: () => import('./pages/addlabour/addlabour.module').then( m => m.AddlabourPageModule)
  },
  {
    path: 'addsupplier-e',
    loadChildren: () => import('./pages/addsupplier-e/addsupplier-e.module').then( m => m.AddsupplierEPageModule)
  },
  {
    path: 'equipment',
    loadChildren: () => import('./pages/equipment/equipment.module').then( m => m.EquipmentPageModule)
  },
  {
    path: 'addequipment',
    loadChildren: () => import('./pages/addequipment/addequipment.module').then( m => m.AddequipmentPageModule)
  },
  {
    path: 'addsupplier-o',
    loadChildren: () => import('./pages/addsupplier-o/addsupplier-o.module').then( m => m.AddsupplierOPageModule)
  },
  {
    path: 'other',
    loadChildren: () => import('./pages/other/other.module').then( m => m.OtherPageModule)
  },
  {
    path: 'addother',
    loadChildren: () => import('./pages/addother/addother.module').then( m => m.AddotherPageModule)
  },
  {
    path: 'subcontractor',
    loadChildren: () => import('./pages/subcontractor/subcontractor.module').then( m => m.SubcontractorPageModule)
  }
  ,
  {
    path: 'addsubcontractor',
    loadChildren: () => import('./pages/addsubcontractor/addsubcontractor.module').then( m => m.AddsubcontractorPageModule)
  },
  {
    path: 'editboqitem/:id',
    loadChildren: () => import('./pages/editboqitem/editboqitem.module').then( m => m.EditboqitemPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
