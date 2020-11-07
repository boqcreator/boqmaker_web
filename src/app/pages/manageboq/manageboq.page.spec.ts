import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageboqPage } from './manageboq.page';

describe('ManageboqPage', () => {
  let component: ManageboqPage;
  let fixture: ComponentFixture<ManageboqPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageboqPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageboqPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
