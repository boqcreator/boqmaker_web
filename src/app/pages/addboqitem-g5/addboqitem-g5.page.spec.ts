import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddboqitemG5Page } from './addboqitem-g5.page';

describe('AddboqitemG5Page', () => {
  let component: AddboqitemG5Page;
  let fixture: ComponentFixture<AddboqitemG5Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddboqitemG5Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddboqitemG5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
