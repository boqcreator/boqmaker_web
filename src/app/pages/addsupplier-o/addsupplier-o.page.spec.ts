import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddsupplierOPage } from './addsupplier-o.page';

describe('AddsupplierOPage', () => {
  let component: AddsupplierOPage;
  let fixture: ComponentFixture<AddsupplierOPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsupplierOPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddsupplierOPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
