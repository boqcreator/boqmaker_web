import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContractorCatPage } from './contractor-cat.page';

describe('ContractorCatPage', () => {
  let component: ContractorCatPage;
  let fixture: ComponentFixture<ContractorCatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorCatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContractorCatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
