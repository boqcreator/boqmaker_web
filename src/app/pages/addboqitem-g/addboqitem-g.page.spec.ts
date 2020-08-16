import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddboqitemGPage } from './addboqitem-g.page';

describe('AddboqitemGPage', () => {
  let component: AddboqitemGPage;
  let fixture: ComponentFixture<AddboqitemGPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddboqitemGPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddboqitemGPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
