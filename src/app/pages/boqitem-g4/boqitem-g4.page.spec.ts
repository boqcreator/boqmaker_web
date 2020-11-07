import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BoqitemG4Page } from './boqitem-g4.page';

describe('BoqitemG4Page', () => {
  let component: BoqitemG4Page;
  let fixture: ComponentFixture<BoqitemG4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoqitemG4Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BoqitemG4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
