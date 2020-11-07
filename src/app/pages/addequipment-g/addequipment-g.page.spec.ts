import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddequipmentGPage } from './addequipment-g.page';

describe('AddequipmentGPage', () => {
  let component: AddequipmentGPage;
  let fixture: ComponentFixture<AddequipmentGPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddequipmentGPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddequipmentGPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
