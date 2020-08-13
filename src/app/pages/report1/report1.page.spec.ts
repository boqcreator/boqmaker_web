import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Report1Page } from './report1.page';

describe('Report1Page', () => {
  let component: Report1Page;
  let fixture: ComponentFixture<Report1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Report1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Report1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
