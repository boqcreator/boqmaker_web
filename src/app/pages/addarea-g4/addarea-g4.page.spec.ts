import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddareaG4Page } from './addarea-g4.page';

describe('AddareaG4Page', () => {
  let component: AddareaG4Page;
  let fixture: ComponentFixture<AddareaG4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddareaG4Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddareaG4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
