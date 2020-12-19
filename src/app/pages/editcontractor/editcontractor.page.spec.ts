import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditcontractorPage } from './editcontractor.page';

describe('EditcontractorPage', () => {
  let component: EditcontractorPage;
  let fixture: ComponentFixture<EditcontractorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcontractorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditcontractorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
