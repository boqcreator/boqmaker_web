import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditopeningPage } from './editopening.page';

describe('EditopeningPage', () => {
  let component: EditopeningPage;
  let fixture: ComponentFixture<EditopeningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditopeningPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditopeningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
