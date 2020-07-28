import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportFinalPricedBillPage } from './report-final-priced-bill.page';

describe('ReportFinalPricedBillPage', () => {
  let component: ReportFinalPricedBillPage;
  let fixture: ComponentFixture<ReportFinalPricedBillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportFinalPricedBillPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportFinalPricedBillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
