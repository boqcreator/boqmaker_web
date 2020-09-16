import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddboqitemG4Page } from './addboqitem-g4.page';

describe('AddboqitemG4Page', () => {
  let component: AddboqitemG4Page;
  let fixture: ComponentFixture<AddboqitemG4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddboqitemG4Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddboqitemG4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
