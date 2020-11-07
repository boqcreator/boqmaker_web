import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Report1EquipmentPage } from './report1-equipment.page';

describe('Report1EquipmentPage', () => {
  let component: Report1EquipmentPage;
  let fixture: ComponentFixture<Report1EquipmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Report1EquipmentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Report1EquipmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
