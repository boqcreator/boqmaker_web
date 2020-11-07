import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddareaPage } from './addarea.page';

describe('AddareaPage', () => {
  let component: AddareaPage;
  let fixture: ComponentFixture<AddareaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddareaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddareaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
