import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddareaG2Page } from './addarea-g2.page';

describe('AddareaG2Page', () => {
  let component: AddareaG2Page;
  let fixture: ComponentFixture<AddareaG2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddareaG2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddareaG2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
