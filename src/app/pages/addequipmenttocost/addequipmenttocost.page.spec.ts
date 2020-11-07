import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddequipmenttocostPage } from './addequipmenttocost.page';

describe('AddequipmenttocostPage', () => {
  let component: AddequipmenttocostPage;
  let fixture: ComponentFixture<AddequipmenttocostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddequipmenttocostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddequipmenttocostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
