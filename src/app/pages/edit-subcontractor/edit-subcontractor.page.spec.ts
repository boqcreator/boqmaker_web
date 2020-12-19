import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditSubcontractorPage } from './edit-subcontractor.page';

describe('EditSubcontractorPage', () => {
  let component: EditSubcontractorPage;
  let fixture: ComponentFixture<EditSubcontractorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSubcontractorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditSubcontractorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
