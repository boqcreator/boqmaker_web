import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditsuppliereqPage } from './editsuppliereq.page';

describe('EditsuppliereqPage', () => {
  let component: EditsuppliereqPage;
  let fixture: ComponentFixture<EditsuppliereqPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsuppliereqPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditsuppliereqPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
