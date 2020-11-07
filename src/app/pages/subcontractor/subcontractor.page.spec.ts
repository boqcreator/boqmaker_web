import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubcontractorPage } from './subcontractor.page';

describe('SubcontractorPage', () => {
  let component: SubcontractorPage;
  let fixture: ComponentFixture<SubcontractorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcontractorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubcontractorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
