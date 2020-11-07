import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BoqitemG1Page } from './boqitem-g1.page';

describe('BoqitemG1Page', () => {
  let component: BoqitemG1Page;
  let fixture: ComponentFixture<BoqitemG1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoqitemG1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BoqitemG1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
