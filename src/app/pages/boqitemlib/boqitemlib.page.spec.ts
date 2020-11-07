import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BoqitemlibPage } from './boqitemlib.page';

describe('BoqitemlibPage', () => {
  let component: BoqitemlibPage;
  let fixture: ComponentFixture<BoqitemlibPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoqitemlibPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BoqitemlibPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
