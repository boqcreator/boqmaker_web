import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditareasubsubcatPage } from './editareasubsubcat.page';

describe('EditareasubsubcatPage', () => {
  let component: EditareasubsubcatPage;
  let fixture: ComponentFixture<EditareasubsubcatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditareasubsubcatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditareasubsubcatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
