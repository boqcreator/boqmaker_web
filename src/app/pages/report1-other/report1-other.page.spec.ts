import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Report1OtherPage } from './report1-other.page';

describe('Report1OtherPage', () => {
  let component: Report1OtherPage;
  let fixture: ComponentFixture<Report1OtherPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Report1OtherPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Report1OtherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
