import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditsuppliermatPage } from './editsuppliermat.page';

describe('EditsuppliermatPage', () => {
  let component: EditsuppliermatPage;
  let fixture: ComponentFixture<EditsuppliermatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsuppliermatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditsuppliermatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
