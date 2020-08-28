import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArealibPage } from './arealib.page';

describe('ArealibPage', () => {
  let component: ArealibPage;
  let fixture: ComponentFixture<ArealibPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArealibPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArealibPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
