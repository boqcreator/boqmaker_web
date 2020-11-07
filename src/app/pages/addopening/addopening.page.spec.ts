import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddopeningPage } from './addopening.page';

describe('AddopeningPage', () => {
  let component: AddopeningPage;
  let fixture: ComponentFixture<AddopeningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddopeningPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddopeningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
