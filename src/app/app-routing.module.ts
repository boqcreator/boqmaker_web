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
  },
  {
    path: 'boqitem-g',
    loadChildren: () => import('./pages/boqitem-g/boqitem-g.module').then( m => m.BoqitemGPageModule)
  },
  {
    path: 'addboqitem-g',
    loadChildren: () => import('./pages/addboqitem-g/addboqitem-g.module').then( m => m.AddboqitemGPageModule)
  },
  {
    path: 'boqitemlib',
    loadChildren: () => import('./pages/boqitemlib/boqitemlib.module').then( m => m.BoqitemlibPageModule)
  },
  {
    path: 'area-g',
    loadChildren: () => import('./pages/area-g/area-g.module').then( m => m.AreaGPageModule)
  },
  {
    path: 'addarea-g',
    loadChildren: () => import('./pages/addarea-g/addarea-g.module').then( m => m.AddareaGPageModule)
  },
  {
    path: 'arealib',
    loadChildren: () => import('./pages/arealib/arealib.module').then( m => m.ArealibPageModule)
  },
  {
    path: 'costdetails',
    loadChildren: () => import('./pages/costdetails/costdetails.module').then( m => m.CostdetailsPageModule)
  },
  {
    path: 'addmaterialtocost',
    loadChildren: () => import('./pages/addmaterialtocost/addmaterialtocost.module').then( m => m.AddmaterialtocostPageModule)
  },
  {
    path: 'addlabourtocost',
    loadChildren: () => import('./pages/addlabourtocost/addlabourtocost.module').then( m => m.AddlabourtocostPageModule)
  },
  {
    path: 'addequipmenttocost',
    loadChildren: () => import('./pages/addequipmenttocost/addequipmenttocost.module').then( m => m.AddequipmenttocostPageModule)
  },
  {
    path: 'addsubcontractortocost',
    loadChildren: () => import('./pages/addsubcontractortocost/addsubcontractortocost.module').then( m => m.AddsubcontractortocostPageModule)
  },
  {
    path: 'addothertocost',
    loadChildren: () => import('./pages/addothertocost/addothertocost.module').then( m => m.AddothertocostPageModule)
  },
  {
    path: 'editareas',
    loadChildren: () => import('./pages/editareas/editareas.module').then( m => m.EditareasPageModule)
  },
  {
    path: 'edititems',
    loadChildren: () => import('./pages/edititems/edititems.module').then( m => m.EdititemsPageModule)
  },
  {
    path: 'boqitem-g1',
    loadChildren: () => import('./pages/boqitem-g1/boqitem-g1.module').then( m => m.BoqitemG1PageModule)
  },
  {
    path: 'addboqitem-g1',
    loadChildren: () => import('./pages/addboqitem-g1/addboqitem-g1.module').then( m => m.AddboqitemG1PageModule)
  },
  {
    path: 'boqitem-g2',
    loadChildren: () => import('./pages/boqitem-g2/boqitem-g2.module').then( m => m.BoqitemG2PageModule)
  },
  {
    path: 'boqitem-g3',
    loadChildren: () => import('./pages/boqitem-g3/boqitem-g3.module').then( m => m.BoqitemG3PageModule)
  },
  {
    path: 'boqitem-g4',
    loadChildren: () => import('./pages/boqitem-g4/boqitem-g4.module').then( m => m.BoqitemG4PageModule)
  },
  {
    path: 'boqitem-g5',
    loadChildren: () => import('./pages/boqitem-g5/boqitem-g5.module').then( m => m.BoqitemG5PageModule)
  },
  {
    path: 'addboqitem-g2',
    loadChildren: () => import('./pages/addboqitem-g2/addboqitem-g2.module').then( m => m.AddboqitemG2PageModule)
  },
  {
    path: 'addboqitem-g3',
    loadChildren: () => import('./pages/addboqitem-g3/addboqitem-g3.module').then( m => m.AddboqitemG3PageModule)
  },
  {
    path: 'addboqitem-g4',
    loadChildren: () => import('./pages/addboqitem-g4/addboqitem-g4.module').then( m => m.AddboqitemG4PageModule)
  },
  {
    path: 'addboqitem-g5',
    loadChildren: () => import('./pages/addboqitem-g5/addboqitem-g5.module').then( m => m.AddboqitemG5PageModule)
  },
  {
    path: 'area-g1',
    loadChildren: () => import('./pages/area-g1/area-g1.module').then( m => m.AreaG1PageModule)
  },
  {
    path: 'area-g2',
    loadChildren: () => import('./pages/area-g2/area-g2.module').then( m => m.AreaG2PageModule)
  },
  {
    path: 'area-g3',
    loadChildren: () => import('./pages/area-g3/area-g3.module').then( m => m.AreaG3PageModule)
  },
  {
    path: 'area-g4',
    loadChildren: () => import('./pages/area-g4/area-g4.module').then( m => m.AreaG4PageModule)
  },
  {
    path: 'area-g5',
    loadChildren: () => import('./pages/area-g5/area-g5.module').then( m => m.AreaG5PageModule)
  },
  {
    path: 'addarea-g1',
    loadChildren: () => import('./pages/addarea-g1/addarea-g1.module').then( m => m.AddareaG1PageModule)
  },
  {
    path: 'addarea-g2',
    loadChildren: () => import('./pages/addarea-g2/addarea-g2.module').then( m => m.AddareaG2PageModule)
  },
  {
    path: 'addarea-g3',
    loadChildren: () => import('./pages/addarea-g3/addarea-g3.module').then( m => m.AddareaG3PageModule)
  },
  {
    path: 'addarea-g4',
    loadChildren: () => import('./pages/addarea-g4/addarea-g4.module').then( m => m.AddareaG4PageModule)
  },
  {
    path: 'addarea-g5',
    loadChildren: () => import('./pages/addarea-g5/addarea-g5.module').then( m => m.AddareaG5PageModule)
  },
  {
    path: 'projecttypes',
    loadChildren: () => import('./pages/projecttypes/projecttypes.module').then( m => m.ProjecttypesPageModule)
  },
  {
    path: 'addprojtype',
    loadChildren: () => import('./pages/addprojtype/addprojtype.module').then( m => m.AddprojtypePageModule)
  },
  {
    path: 'opening',
    loadChildren: () => import('./pages/opening/opening.module').then( m => m.OpeningPageModule)
  },
  {
    path: 'addopening',
    loadChildren: () => import('./pages/addopening/addopening.module').then( m => m.AddopeningPageModule)
  },
  {
    path: 'editopening',
    loadChildren: () => import('./pages/editopening/editopening.module').then( m => m.EditopeningPageModule)
  },
  {
    path: 'editareacat',
    loadChildren: () => import('./pages/editareacat/editareacat.module').then( m => m.EditareacatPageModule)
  },
  {
    path: 'editareasubcat',
    loadChildren: () => import('./pages/editareasubcat/editareasubcat.module').then( m => m.EditareasubcatPageModule)
  },
  {
    path: 'editareasubsubcat',
    loadChildren: () => import('./pages/editareasubsubcat/editareasubsubcat.module').then( m => m.EditareasubsubcatPageModule)
  },
  {
    path: 'editarea',
    loadChildren: () => import('./pages/editarea/editarea.module').then( m => m.EditareaPageModule)
  },
  {
    path: 'editvaritiondetails',
    loadChildren: () => import('./pages/editvaritiondetails/editvaritiondetails.module').then( m => m.EditvaritiondetailsPageModule)
  },
  {
    path: 'report-variation/:id',
    loadChildren: () => import('./pages/report-variation/report-variation.module').then( m => m.ReportVariationPageModule)
  },
  {
    path: 'projection',
    loadChildren: () => import('./pages/projection/projection.module').then( m => m.ProjectionPageModule)
  },
  {
    path: 'addprojection',
    loadChildren: () => import('./pages/addprojection/addprojection.module').then( m => m.AddprojectionPageModule)
  },
  {
    path: 'editprojection',
    loadChildren: () => import('./pages/editprojection/editprojection.module').then( m => m.EditprojectionPageModule)
  },
  {
    path: 'material-g',
    loadChildren: () => import('./pages/material-g/material-g.module').then( m => m.MaterialGPageModule)
  },
  {
    path: 'addmaterial-g',
    loadChildren: () => import('./pages/addmaterial-g/addmaterial-g.module').then( m => m.AddmaterialGPageModule)
  },
  {
    path: 'labour-g',
    loadChildren: () => import('./pages/labour-g/labour-g.module').then( m => m.LabourGPageModule)
  },
  {
    path: 'addlabour-g',
    loadChildren: () => import('./pages/addlabour-g/addlabour-g.module').then( m => m.AddlabourGPageModule)
  },
  {
    path: 'addequipment-g',
    loadChildren: () => import('./pages/addequipment-g/addequipment-g.module').then( m => m.AddequipmentGPageModule)
  },
  {
    path: 'equipment-g',
    loadChildren: () => import('./pages/equipment-g/equipment-g.module').then( m => m.EquipmentGPageModule)
  },
  {
    path: 'materiallib',
    loadChildren: () => import('./pages/materiallib/materiallib.module').then( m => m.MateriallibPageModule)
  },
  {
    path: 'labourlib',
    loadChildren: () => import('./pages/labourlib/labourlib.module').then( m => m.LabourlibPageModule)
  },
  {
    path: 'equipmentlib',
    loadChildren: () => import('./pages/equipmentlib/equipmentlib.module').then( m => m.EquipmentlibPageModule)
  },
  {
    path: 'report1-details',
    loadChildren: () => import('./pages/report1-details/report1-details.module').then( m => m.Report1DetailsPageModule)
  },
  {
    path: 'report1-material',
    loadChildren: () => import('./pages/report1-material/report1-material.module').then( m => m.Report1MaterialPageModule)
  },
  {
    path: 'report1-labour',
    loadChildren: () => import('./pages/report1-labour/report1-labour.module').then( m => m.Report1LabourPageModule)
  },
  {
    path: 'report1-equipment',
    loadChildren: () => import('./pages/report1-equipment/report1-equipment.module').then( m => m.Report1EquipmentPageModule)
  },
  {
    path: 'report1-other',
    loadChildren: () => import('./pages/report1-other/report1-other.module').then( m => m.Report1OtherPageModule)
  },
  {
    path: 'costdetails-excel',
    loadChildren: () => import('./pages/costdetails-excel/costdetails-excel.module').then( m => m.CostdetailsExcelPageModule)
  },
  {
    path: 'calculator',
    loadChildren: () => import('./pages/calculator/calculator.module').then( m => m.CalculatorPageModule)
  },
  {
    path: 'costgraph',
    loadChildren: () => import('./pages/costgraph/costgraph.module').then( m => m.CostgraphPageModule)
  },
  {
    path: 'boqitemgraph',
    loadChildren: () => import('./pages/boqitemgraph/boqitemgraph.module').then( m => m.BoqitemgraphPageModule)
  },
  {
    path: 'manageboq',
    loadChildren: () => import('./pages/manageboq/manageboq.module').then( m => m.ManageboqPageModule)
  },
  {
    path: 'editmaterial',
    loadChildren: () => import('./pages/editmaterial/editmaterial.module').then( m => m.EditmaterialPageModule)
  },
  {
    path: 'typespic',
    loadChildren: () => import('./pages/typespic/typespic.module').then( m => m.TypespicPageModule)
  },
  {
    path: 'editsuppliermat',
    loadChildren: () => import('./pages/editsuppliermat/editsuppliermat.module').then( m => m.EditsuppliermatPageModule)
  },
  {
    path: 'editsupplierlab',
    loadChildren: () => import('./pages/editsupplierlab/editsupplierlab.module').then( m => m.EditsupplierlabPageModule)
  },
  {
    path: 'editsuppliereq',
    loadChildren: () => import('./pages/editsuppliereq/editsuppliereq.module').then( m => m.EditsuppliereqPageModule)
  },
  {
    path: 'editsuppliero',
    loadChildren: () => import('./pages/editsuppliero/editsuppliero.module').then( m => m.EditsupplieroPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
