import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditsupplierlabPage } from './editsupplierlab.page';

describe('EditsupplierlabPage', () => {
  let component: EditsupplierlabPage;
  let fixture: ComponentFixture<EditsupplierlabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsupplierlabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditsupplierlabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
