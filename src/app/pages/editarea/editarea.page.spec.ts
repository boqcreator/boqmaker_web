import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditareaPage } from './editarea.page';

describe('EditareaPage', () => {
  let component: EditareaPage;
  let fixture: ComponentFixture<EditareaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditareaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditareaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
