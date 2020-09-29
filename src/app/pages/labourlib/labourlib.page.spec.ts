import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LabourlibPage } from './labourlib.page';

describe('LabourlibPage', () => {
  let component: LabourlibPage;
  let fixture: ComponentFixture<LabourlibPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabourlibPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LabourlibPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
