import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddContractorPage } from './add-contractor.page';

describe('AddContractorPage', () => {
  let component: AddContractorPage;
  let fixture: ComponentFixture<AddContractorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddContractorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddContractorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
