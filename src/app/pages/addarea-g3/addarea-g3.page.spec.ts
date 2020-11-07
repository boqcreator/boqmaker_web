import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddareaG3Page } from './addarea-g3.page';

describe('AddareaG3Page', () => {
  let component: AddareaG3Page;
  let fixture: ComponentFixture<AddareaG3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddareaG3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddareaG3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
