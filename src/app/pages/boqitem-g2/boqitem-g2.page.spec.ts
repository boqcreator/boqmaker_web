import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BoqitemG2Page } from './boqitem-g2.page';

describe('BoqitemG2Page', () => {
  let component: BoqitemG2Page;
  let fixture: ComponentFixture<BoqitemG2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoqitemG2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BoqitemG2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
