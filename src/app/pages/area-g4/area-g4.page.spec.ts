import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AreaG4Page } from './area-g4.page';

describe('AreaG4Page', () => {
  let component: AreaG4Page;
  let fixture: ComponentFixture<AreaG4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaG4Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AreaG4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
