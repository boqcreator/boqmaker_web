import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConstractorPage } from './constractor.page';

describe('ConstractorPage', () => {
  let component: ConstractorPage;
  let fixture: ComponentFixture<ConstractorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstractorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConstractorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
