import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddothertocostPage } from './addothertocost.page';

describe('AddothertocostPage', () => {
  let component: AddothertocostPage;
  let fixture: ComponentFixture<AddothertocostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddothertocostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddothertocostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
