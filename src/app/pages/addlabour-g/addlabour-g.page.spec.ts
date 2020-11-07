import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddlabourGPage } from './addlabour-g.page';

describe('AddlabourGPage', () => {
  let component: AddlabourGPage;
  let fixture: ComponentFixture<AddlabourGPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddlabourGPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddlabourGPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
