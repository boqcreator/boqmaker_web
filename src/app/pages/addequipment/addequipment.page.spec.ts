import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddequipmentPage } from './addequipment.page';

describe('AddequipmentPage', () => {
  let component: AddequipmentPage;
  let fixture: ComponentFixture<AddequipmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddequipmentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddequipmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
