import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AreaG2Page } from './area-g2.page';

describe('AreaG2Page', () => {
  let component: AreaG2Page;
  let fixture: ComponentFixture<AreaG2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaG2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AreaG2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
