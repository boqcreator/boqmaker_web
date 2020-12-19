import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditOtherPage } from './edit-other.page';

describe('EditOtherPage', () => {
  let component: EditOtherPage;
  let fixture: ComponentFixture<EditOtherPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOtherPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditOtherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
