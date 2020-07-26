import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddboqitemPage } from './addboqitem.page';

describe('AddboqitemPage', () => {
  let component: AddboqitemPage;
  let fixture: ComponentFixture<AddboqitemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddboqitemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddboqitemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
