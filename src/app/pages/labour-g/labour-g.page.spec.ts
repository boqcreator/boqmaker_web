import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LabourGPage } from './labour-g.page';

describe('LabourGPage', () => {
  let component: LabourGPage;
  let fixture: ComponentFixture<LabourGPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabourGPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LabourGPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
