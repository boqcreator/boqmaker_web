import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditareasubcatPage } from './editareasubcat.page';

describe('EditareasubcatPage', () => {
  let component: EditareasubcatPage;
  let fixture: ComponentFixture<EditareasubcatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditareasubcatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditareasubcatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
