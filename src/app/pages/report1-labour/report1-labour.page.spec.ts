import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Report1LabourPage } from './report1-labour.page';

describe('Report1LabourPage', () => {
  let component: Report1LabourPage;
  let fixture: ComponentFixture<Report1LabourPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Report1LabourPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Report1LabourPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
