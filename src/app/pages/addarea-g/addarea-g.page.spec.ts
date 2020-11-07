import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddareaGPage } from './addarea-g.page';

describe('AddareaGPage', () => {
  let component: AddareaGPage;
  let fixture: ComponentFixture<AddareaGPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddareaGPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddareaGPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
