import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddprojectionPage } from './addprojection.page';

describe('AddprojectionPage', () => {
  let component: AddprojectionPage;
  let fixture: ComponentFixture<AddprojectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddprojectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddprojectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
