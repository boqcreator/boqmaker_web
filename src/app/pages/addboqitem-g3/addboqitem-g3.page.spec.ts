import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddboqitemG3Page } from './addboqitem-g3.page';

describe('AddboqitemG3Page', () => {
  let component: AddboqitemG3Page;
  let fixture: ComponentFixture<AddboqitemG3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddboqitemG3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddboqitemG3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
