import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConsultantPage } from './consultant.page';

describe('ConsultantPage', () => {
  let component: ConsultantPage;
  let fixture: ComponentFixture<ConsultantPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
