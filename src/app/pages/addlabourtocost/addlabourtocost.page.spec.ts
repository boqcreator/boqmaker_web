import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddlabourtocostPage } from './addlabourtocost.page';

describe('AddlabourtocostPage', () => {
  let component: AddlabourtocostPage;
  let fixture: ComponentFixture<AddlabourtocostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddlabourtocostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddlabourtocostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
