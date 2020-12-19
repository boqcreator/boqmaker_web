import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditLabourPage } from './edit-labour.page';

describe('EditLabourPage', () => {
  let component: EditLabourPage;
  let fixture: ComponentFixture<EditLabourPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLabourPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditLabourPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
