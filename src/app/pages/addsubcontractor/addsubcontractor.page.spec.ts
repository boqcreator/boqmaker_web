import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddsubcontractorPage } from './addsubcontractor.page';

describe('AddsubcontractorPage', () => {
  let component: AddsubcontractorPage;
  let fixture: ComponentFixture<AddsubcontractorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsubcontractorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddsubcontractorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
