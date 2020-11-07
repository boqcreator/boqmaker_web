import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditareasPage } from './editareas.page';

describe('EditareasPage', () => {
  let component: EditareasPage;
  let fixture: ComponentFixture<EditareasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditareasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditareasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
