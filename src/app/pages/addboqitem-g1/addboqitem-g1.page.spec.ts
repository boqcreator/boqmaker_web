import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddboqitemG1Page } from './addboqitem-g1.page';

describe('AddboqitemG1Page', () => {
  let component: AddboqitemG1Page;
  let fixture: ComponentFixture<AddboqitemG1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddboqitemG1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddboqitemG1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
