import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddboqitemG2Page } from './addboqitem-g2.page';

describe('AddboqitemG2Page', () => {
  let component: AddboqitemG2Page;
  let fixture: ComponentFixture<AddboqitemG2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddboqitemG2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddboqitemG2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
