import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddotherPage } from './addother.page';

describe('AddotherPage', () => {
  let component: AddotherPage;
  let fixture: ComponentFixture<AddotherPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddotherPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddotherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
