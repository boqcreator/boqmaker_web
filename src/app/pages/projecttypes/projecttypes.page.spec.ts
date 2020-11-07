import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProjecttypesPage } from './projecttypes.page';

describe('ProjecttypesPage', () => {
  let component: ProjecttypesPage;
  let fixture: ComponentFixture<ProjecttypesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjecttypesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjecttypesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
