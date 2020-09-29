import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EquipmentlibPage } from './equipmentlib.page';

describe('EquipmentlibPage', () => {
  let component: EquipmentlibPage;
  let fixture: ComponentFixture<EquipmentlibPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentlibPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EquipmentlibPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
