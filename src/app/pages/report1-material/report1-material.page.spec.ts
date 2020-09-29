import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Report1MaterialPage } from './report1-material.page';

describe('Report1MaterialPage', () => {
  let component: Report1MaterialPage;
  let fixture: ComponentFixture<Report1MaterialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Report1MaterialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Report1MaterialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
