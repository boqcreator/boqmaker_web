import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MateriallibPage } from './materiallib.page';

describe('MateriallibPage', () => {
  let component: MateriallibPage;
  let fixture: ComponentFixture<MateriallibPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriallibPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MateriallibPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
