import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EdititemsPage } from './edititems.page';

describe('EdititemsPage', () => {
  let component: EdititemsPage;
  let fixture: ComponentFixture<EdititemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdititemsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EdititemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
