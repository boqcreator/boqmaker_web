import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditmaterialPage } from './editmaterial.page';

describe('EditmaterialPage', () => {
  let component: EditmaterialPage;
  let fixture: ComponentFixture<EditmaterialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmaterialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditmaterialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
