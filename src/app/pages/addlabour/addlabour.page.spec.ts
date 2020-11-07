import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddlabourPage } from './addlabour.page';

describe('AddlabourPage', () => {
  let component: AddlabourPage;
  let fixture: ComponentFixture<AddlabourPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddlabourPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddlabourPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
