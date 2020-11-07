import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BoqitemG5Page } from './boqitem-g5.page';

describe('BoqitemG5Page', () => {
  let component: BoqitemG5Page;
  let fixture: ComponentFixture<BoqitemG5Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoqitemG5Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BoqitemG5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
