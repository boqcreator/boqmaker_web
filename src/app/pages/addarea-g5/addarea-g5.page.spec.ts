import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddareaG5Page } from './addarea-g5.page';

describe('AddareaG5Page', () => {
  let component: AddareaG5Page;
  let fixture: ComponentFixture<AddareaG5Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddareaG5Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddareaG5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
