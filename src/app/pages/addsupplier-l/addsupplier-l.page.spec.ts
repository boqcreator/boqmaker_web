import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddsupplierLPage } from './addsupplier-l.page';

describe('AddsupplierLPage', () => {
  let component: AddsupplierLPage;
  let fixture: ComponentFixture<AddsupplierLPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsupplierLPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddsupplierLPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
