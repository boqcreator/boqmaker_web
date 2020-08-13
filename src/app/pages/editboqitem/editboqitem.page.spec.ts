import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditboqitemPage } from './editboqitem.page';

describe('EditboqitemPage', () => {
  let component: EditboqitemPage;
  let fixture: ComponentFixture<EditboqitemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditboqitemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditboqitemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
