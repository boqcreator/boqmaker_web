import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditsupplieroPage } from './editsuppliero.page';

describe('EditsupplieroPage', () => {
  let component: EditsupplieroPage;
  let fixture: ComponentFixture<EditsupplieroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsupplieroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditsupplieroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
