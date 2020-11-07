import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddmaterialGPage } from './addmaterial-g.page';

describe('AddmaterialGPage', () => {
  let component: AddmaterialGPage;
  let fixture: ComponentFixture<AddmaterialGPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmaterialGPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddmaterialGPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
