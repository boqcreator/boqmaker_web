import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BoqitemG3Page } from './boqitem-g3.page';

describe('BoqitemG3Page', () => {
  let component: BoqitemG3Page;
  let fixture: ComponentFixture<BoqitemG3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoqitemG3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BoqitemG3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
