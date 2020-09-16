import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AreaG5Page } from './area-g5.page';

describe('AreaG5Page', () => {
  let component: AreaG5Page;
  let fixture: ComponentFixture<AreaG5Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaG5Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AreaG5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
