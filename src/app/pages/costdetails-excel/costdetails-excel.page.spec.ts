import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CostdetailsExcelPage } from './costdetails-excel.page';

describe('CostdetailsExcelPage', () => {
  let component: CostdetailsExcelPage;
  let fixture: ComponentFixture<CostdetailsExcelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostdetailsExcelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CostdetailsExcelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
