import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BoqitemPage } from './boqitem.page';

describe('BoqitemPage', () => {
  let component: BoqitemPage;
  let fixture: ComponentFixture<BoqitemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoqitemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BoqitemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
