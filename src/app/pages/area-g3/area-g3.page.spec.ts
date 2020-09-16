import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AreaG3Page } from './area-g3.page';

describe('AreaG3Page', () => {
  let component: AreaG3Page;
  let fixture: ComponentFixture<AreaG3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaG3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AreaG3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
