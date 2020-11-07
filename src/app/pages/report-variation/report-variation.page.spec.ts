import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportVariationPage } from './report-variation.page';

describe('ReportVariationPage', () => {
  let component: ReportVariationPage;
  let fixture: ComponentFixture<ReportVariationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportVariationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportVariationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
