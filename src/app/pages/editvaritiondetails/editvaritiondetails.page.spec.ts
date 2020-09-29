import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditvaritiondetailsPage } from './editvaritiondetails.page';

describe('EditvaritiondetailsPage', () => {
  let component: EditvaritiondetailsPage;
  let fixture: ComponentFixture<EditvaritiondetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditvaritiondetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditvaritiondetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
