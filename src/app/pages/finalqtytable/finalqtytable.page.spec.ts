import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FinalqtytablePage } from './finalqtytable.page';

describe('FinalqtytablePage', () => {
  let component: FinalqtytablePage;
  let fixture: ComponentFixture<FinalqtytablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalqtytablePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FinalqtytablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
