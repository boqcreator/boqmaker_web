import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditprojectionPage } from './editprojection.page';

describe('EditprojectionPage', () => {
  let component: EditprojectionPage;
  let fixture: ComponentFixture<EditprojectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditprojectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditprojectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
