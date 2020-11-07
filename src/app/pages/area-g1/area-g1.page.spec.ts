import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AreaG1Page } from './area-g1.page';

describe('AreaG1Page', () => {
  let component: AreaG1Page;
  let fixture: ComponentFixture<AreaG1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaG1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AreaG1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
