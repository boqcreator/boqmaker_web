import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditareacatPage } from './editareacat.page';

describe('EditareacatPage', () => {
  let component: EditareacatPage;
  let fixture: ComponentFixture<EditareacatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditareacatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditareacatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
