import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TypespicPage } from './typespic.page';

describe('TypespicPage', () => {
  let component: TypespicPage;
  let fixture: ComponentFixture<TypespicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypespicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TypespicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
