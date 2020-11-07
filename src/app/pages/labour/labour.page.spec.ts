import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LabourPage } from './labour.page';

describe('LabourPage', () => {
  let component: LabourPage;
  let fixture: ComponentFixture<LabourPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabourPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LabourPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
