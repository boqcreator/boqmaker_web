import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditequipmentPage } from './editequipment.page';

describe('EditequipmentPage', () => {
  let component: EditequipmentPage;
  let fixture: ComponentFixture<EditequipmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditequipmentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditequipmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
