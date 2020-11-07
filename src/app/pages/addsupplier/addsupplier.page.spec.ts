import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddsupplierPage } from './addsupplier.page';

describe('AddsupplierPage', () => {
  let component: AddsupplierPage;
  let fixture: ComponentFixture<AddsupplierPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsupplierPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddsupplierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
