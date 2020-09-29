import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaterialGPage } from './material-g.page';

describe('MaterialGPage', () => {
  let component: MaterialGPage;
  let fixture: ComponentFixture<MaterialGPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialGPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialGPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
