import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddareaG1Page } from './addarea-g1.page';

describe('AddareaG1Page', () => {
  let component: AddareaG1Page;
  let fixture: ComponentFixture<AddareaG1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddareaG1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddareaG1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
