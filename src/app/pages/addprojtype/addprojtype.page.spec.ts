import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddprojtypePage } from './addprojtype.page';

describe('AddprojtypePage', () => {
  let component: AddprojtypePage;
  let fixture: ComponentFixture<AddprojtypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddprojtypePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddprojtypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
