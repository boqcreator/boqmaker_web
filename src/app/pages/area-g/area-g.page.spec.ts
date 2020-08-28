import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AreaGPage } from './area-g.page';

describe('AreaGPage', () => {
  let component: AreaGPage;
  let fixture: ComponentFixture<AreaGPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaGPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AreaGPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
