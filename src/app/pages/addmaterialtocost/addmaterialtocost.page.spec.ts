import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddmaterialtocostPage } from './addmaterialtocost.page';

describe('AddmaterialtocostPage', () => {
  let component: AddmaterialtocostPage;
  let fixture: ComponentFixture<AddmaterialtocostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmaterialtocostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddmaterialtocostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
