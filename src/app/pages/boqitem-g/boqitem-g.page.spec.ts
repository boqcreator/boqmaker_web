import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BoqitemGPage } from './boqitem-g.page';

describe('BoqitemGPage', () => {
  let component: BoqitemGPage;
  let fixture: ComponentFixture<BoqitemGPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoqitemGPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BoqitemGPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
