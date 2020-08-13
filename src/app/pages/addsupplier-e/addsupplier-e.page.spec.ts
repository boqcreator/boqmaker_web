import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddsupplierEPage } from './addsupplier-e.page';

describe('AddsupplierEPage', () => {
  let component: AddsupplierEPage;
  let fixture: ComponentFixture<AddsupplierEPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsupplierEPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddsupplierEPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
