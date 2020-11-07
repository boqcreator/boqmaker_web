import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddsubcontractortocostPage } from './addsubcontractortocost.page';

describe('AddsubcontractortocostPage', () => {
  let component: AddsubcontractortocostPage;
  let fixture: ComponentFixture<AddsubcontractortocostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsubcontractortocostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddsubcontractortocostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
